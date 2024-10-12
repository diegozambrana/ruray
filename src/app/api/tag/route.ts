import { createTag, getTags } from "@/services/tags";
import { NextResponse } from "next/server";

export const GET = async () => {
  const response = await getTags();
  const { error, data } = response;

  if (error) {
    return new NextResponse(JSON.stringify({ message: error }), {
      status: 400,
    });
  }

  return new NextResponse(JSON.stringify(data), { status: 200 });
};

export const POST = async (request: Request) => {
  const body = await request.json();
  const response = await createTag(body.name);
  const { error, data } = response;

  if (error) {
    return new NextResponse(JSON.stringify({ message: error }), {
      status: 400,
    });
  }

  if (!data?.length) {
    return new NextResponse(JSON.stringify({ message: "No data" }), {
      status: 400,
    });
  }

  return new NextResponse(JSON.stringify(data[0]), { status: 200 });
};
