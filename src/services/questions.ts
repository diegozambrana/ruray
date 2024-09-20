import { newQuestionFormat } from "@/types";
import { createClient } from "@/utils/supabase/server";

export const createNewQuestion = async (newData: newQuestionFormat) => {
  const supabase = createClient();

  const { error: errorQuestion, data: dataQuestion } = await supabase
    .from("ruray_question")
    .insert({ question: newData.question })
    .select("*");
  if (errorQuestion) {
    return {
      error: errorQuestion.message,
      data: null,
    };
  }
  const question = dataQuestion[0];

  if (newData.alternativeQuestions.length > 0) {
    const { error: errorAltQuestions, data: dataAltQuestions } = await supabase
      .from("ruray_question")
      .insert(
        newData.alternativeQuestions.map((altQuestion) => ({
          alternative_of: question.id,
          question: altQuestion,
        }))
      )
      .select("*");
    if (errorAltQuestions) {
      return {
        error: errorAltQuestions.message,
        data: null,
      };
    }
  }

  if (newData.answers.length > 0) {
    const { error: errorAnswers, data: dataAnswers } = await supabase
      .from("ruray_answer")
      .insert(
        newData.answers.map((answer) => ({
          question: question.id,
          answer,
        }))
      )
      .select("*");
    if (errorAnswers) {
      return {
        error: errorAnswers.message,
        data: null,
      };
    }
  }

  return { error: null, data: dataQuestion };
};

export const getQuestions = async () => {
  const supabase = createClient();

  const { data: questions, error: questionError } = await supabase
    .from("ruray_question")
    .select("*")
    .is("alternative_of", null);

  if (questionError) {
    return {
      error: questionError.message,
      data: null,
    };
  }

  // Mapeamos cada pregunta para obtener sus alternativas y respuestas
  const formattedQuestions = await Promise.all(
    questions.map(async (question) => {
      // Obtener preguntas alternativas
      const { data: alternativeQuestions, error: alternativeError } =
        await supabase
          .from("ruray_question")
          .select("*")
          .eq("alternative_of", question.id); // Obtenemos las preguntas alternativas vinculadas

      if (alternativeError) {
        return {
          error: alternativeError.message,
          data: null,
        };
      }

      // Obtener respuestas para la pregunta
      const { data: answers, error: answerError } = await supabase
        .from("ruray_answer")
        .select("*")
        .eq("question", question.id); // Obtenemos las respuestas vinculadas

      if (answerError) {
        return {
          error: answerError.message,
          data: null,
        };
      }

      // Formateamos los datos en el formato requerido
      return {
        id: question.id,
        question: question.question,
        alternativeQuestions: alternativeQuestions.map((alt) => ({
          id: alt.id,
          question: alt.question,
        })),
        answers: answers.map((answer) => ({
          id: answer.id,
          answer: answer.answer,
        })),
      };
    })
  );

  // Devolvemos el resultado en el formato adecuado
  return {
    error: null,
    data: formattedQuestions,
  };
};

export const deleteQuestion = async (questionId: string) => {
  const supabase = createClient();

  const { error: errorQuestion, data: dataQuestion } = await supabase
    .from("ruray_question")
    .delete()
    .eq("id", questionId)
    .select("*");

  if (errorQuestion) {
    return {
      error: errorQuestion.message,
      data: null,
    };
  }

  return { error: null, data: dataQuestion };
};

export const addAnswerToQuestion = async (
  questionId: string,
  answer: string
) => {
  const supabase = createClient();

  const { error: errorAnswer, data: dataAnswer } = await supabase
    .from("ruray_answer")
    .insert({ question: questionId, answer })
    .select("*");

  if (errorAnswer) {
    return {
      error: errorAnswer.message,
      data: null,
    };
  }

  return { error: null, data: dataAnswer };
};
