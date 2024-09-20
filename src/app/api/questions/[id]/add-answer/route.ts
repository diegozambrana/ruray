import { addAnswerToQuestion } from "@/services/questions";
import { NextResponse } from "next/server";

export const POST = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const body: { answer: string } = await request.json();
  console.log("add answer to question with id: ", id);
  const response = await addAnswerToQuestion(id, body.answer);
  const { error, data } = response;

  if (error) {
    return new NextResponse(JSON.stringify({ message: error }), {
      status: 400,
    });
  }

  return new NextResponse(
    JSON.stringify({ message: "Answer added successfully", data }),
    { status: 200 }
  );
};
