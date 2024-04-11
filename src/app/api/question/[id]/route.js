import { NextResponse } from "next/server";
import Question from "@/db/models/Question";
import dbConnect from "@/db/connect";

export async function GET(req, { params }) {
  await dbConnect();
  const { id } = params;
  const question = await Question.findById(id);

  return NextResponse.json(question, { status: 200 });
}
