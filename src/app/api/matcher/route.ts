import { getMatchers } from "@/services/matcher";
import { NextResponse } from "next/server";

export const GET = async () => {
  const response = await getMatchers();
  const { error, data } = response;

  if (error) {
    return new NextResponse(JSON.stringify({ message: error }), {
      status: 400,
    });
  }

  return new NextResponse(JSON.stringify(data), { status: 200 });
};
