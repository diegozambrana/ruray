import { getImprovedText } from "@/services/ai";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const { text } = await request.json();
  const result = await getImprovedText(text);

  if (!result) {
    return new NextResponse(JSON.stringify({ message: "Error" }), {
      status: 400,
    });
  }

  return new NextResponse(result.content, { status: 200 });
};
