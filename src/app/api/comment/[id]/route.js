import { NextResponse } from "next/server";
import Comment from "@/db/models/Comment";
import dbConnect from "@/db/connect";

export async function GET(req, { params }) {
  await dbConnect();
  const { id } = params;
  const comment = await Comment.findById(id);

  return NextResponse.json(comment, { status: 200 });
}

export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    const body = await req.json();

    await Question.findByIdAndUpdate(id, {
      $set: body,
    });
    return NextResponse.json({ status: 200 });
  } catch (e) {
    console.error(e);
    return response.status(400).json({ error: e.message });
  }
}

export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    await Comment.findByIdAndDelete(id);
    return NextResponse.json({
      status: 200,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.status(400).json({ error: e.message });
  }
}
