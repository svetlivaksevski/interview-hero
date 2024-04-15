import { NextResponse } from "next/server";
import Comment from "@/db/models/Comment";
import dbConnect from "../../../db/connect";

export async function GET(request) {
  await dbConnect();
  const entries = await Comment.find();
  return NextResponse.json(entries, { status: 200 });
}
