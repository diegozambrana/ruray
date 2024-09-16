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
