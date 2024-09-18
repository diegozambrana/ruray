import { questionType } from "@/types";
import { create } from "zustand";

export type questionsAnswersType = {
  questions: questionType[];
  setQuestions: (questions: questionType[]) => void;
};

export const useQuestionsAnswers = create<questionsAnswersType>((set) => ({
  questions: [],
  setQuestions: (questions: questionType[]) => set({ questions }),
}));
