import { createClient } from "@/utils/supabase/server";

export const deleteAnswer = async (answerId: string) => {
  const supabase = createClient();

  const { error: errorQuestion, data: dataQuestion } = await supabase
    .from("ruray_answer")
    .delete()
    .eq("id", answerId)
    .select("*");

  if (errorQuestion) {
    return {
      error: errorQuestion.message,
      data: null,
    };
  }

  return { error: null, data: dataQuestion };
};

export const editAnswer = async (
  answerId: string,
  data: { answer?: string; favorite?: boolean }
) => {
  const supabase = createClient();

  const { error: errorQuestion, data: dataQuestion } = await supabase
    .from("ruray_answer")
    .update(data)
    .eq("id", answerId)
    .select("*");

  if (errorQuestion) {
    return {
      error: errorQuestion.message,
      data: null,
    };
  }

  return { error: null, data: dataQuestion };
};
