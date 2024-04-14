import { NextResponse } from "next/server";
import Comment from "@/db/models/Comment";
import dbConnect from "../../../db/connect";

export async function GET(request) {
  await dbConnect();
  const entries = await Comment.find();
  return NextResponse.json(entries, { status: 200 });
}

export async function POST(request, response) {
  await dbConnect();
  try {
    const entryData = await request.json();

    await Comment.create(entryData);

    return NextResponse.json({ entryData }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
