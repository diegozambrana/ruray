import { deleteQuestion, editQuestion } from "@/services/questions";
import { NextResponse } from "next/server";

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  console.log("Delete question with id: ", id);
  const response = await deleteQuestion(id);
  const { error, data } = response;

  if (error) {
    return new NextResponse(JSON.stringify({ message: error }), {
      status: 400,
    });
  }

  return new NextResponse(
    JSON.stringify({ message: "Question deleted successfully", data }),
    { status: 200 }
  );
};

export const PUT = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const body = await request.json();
  const response = await editQuestion(id, body);
  const { error } = response;

  if (error) {
    return new NextResponse(JSON.stringify({ message: error }), {
      status: 400,
    });
  }

  return new NextResponse(JSON.stringify({ message: "Question updated" }), {
    status: 201,
  });
};
