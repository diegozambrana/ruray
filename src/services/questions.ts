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
        answer,
        favorite
      ),
      alternativeQuestions: ruray_question (
        id,
        question
      ),
      tags: ruray_tag(id, name, slug)
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

export const editQuestion = async (questionId: string, data: any) => {
  const supabase = createClient();

  if (data.question) {
    const { error: errorQuestion, data: dataQuestion } = await supabase
      .from("ruray_question")
      .update({ question: data.question })
      .eq("id", questionId)
      .select("*");

    if (errorQuestion) {
      return {
        error: errorQuestion.message,
        data: null,
      };
    }
  }

  if (data.newAlternativeQuestions?.length > 0) {
    const { error: errorAltQuestions, data: dataAltQuestions } = await supabase
      .from("ruray_question")
      .insert(
        data.newAlternativeQuestions.map((altQuestion: string) => ({
          alternative_of: questionId,
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

  if (data.removedAlterntaiveQuestions?.length > 0) {
    const { error: errorAltQuestions, data: dataAltQuestions } = await supabase
      .from("ruray_question")
      .delete()
      .in("id", data.removedAlterntaiveQuestions)
      .select("*");
    if (errorAltQuestions) {
      return {
        error: errorAltQuestions.message,
        data: null,
      };
    }
  }

  if (data.newTags?.length > 0) {
    const { error: errorTags, data: dataTags } = await supabase
      .from("ruray_tag_question")
      .insert(
        data.newTags.map((tag: string) => ({
          question_id: questionId,
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

  if (data.removedTags?.length > 0) {
    const { error: errorTags, data: dataTags } = await supabase
      .from("ruray_tag_question")
      .delete()
      .in("tag_id", data.removedTags)
      .eq("question_id", questionId)
      .select("*");
    if (errorTags) {
      return {
        error: errorTags.message,
        data: null,
      };
    }
  }

  return { error: null, data: { message: "Updated Successfully" } };
};
