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

  if (newData.tags.length > 0) {
    const { error: errorTags, data: dataTags } = await supabase
      .from("ruray_tag_question")
      .insert(
        newData.tags.map((tag) => ({
          question_id: question.id,
          tag_id: tag,
        }))
      )
      .select("*");
    if (errorTags) {
      return {
        error: errorTags.message,
        data: null,
      };
    }
  }

  return { error: null, data: dataQuestion };
};

export const getQuestions = async () => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("ruray_question")
    .select(
      `
      id,
      question,
      answers: ruray_answer (
        id,
        answer
      ),
      alternativeQuestions: ruray_question (
        id,
        question
      ),
      tags: ruray_tag_question (
        tag: ruray_tag(id, name, slug, description)
      )
    `
    )
    .is("alternative_of", null);
  return { data, error };
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
