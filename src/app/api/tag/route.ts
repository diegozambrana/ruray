import { getTags } from "@/services/tags";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const response = await getTags();
  const { error, data } = response;

  if (error) {
    return new NextResponse(JSON.stringify({ message: error }), {
      status: 400,
    });
  }

  return new NextResponse(JSON.stringify(data), { status: 200 });
};
