import { createNewQuestion } from "@/services/questions";
import { newQuestionFormat } from "@/types";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const body: newQuestionFormat = await request.json();
  const response = await createNewQuestion(body);
  const { error, data } = response;

  if (error) {
    return new NextResponse(JSON.stringify({ message: error }), {
      status: 400,
    });
  }

  return new NextResponse(
    JSON.stringify({ message: "Question added successfully" }),
    { status: 200 }
  );
};
