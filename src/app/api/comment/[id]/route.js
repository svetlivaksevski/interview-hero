import { NextResponse } from "next/server";
import Comment from "@/db/models/Comment";
import dbConnect from "@/db/connect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req, { params }) {
  await dbConnect();
  const { id } = params;
  const comment = await Comment.findById(id);

  return NextResponse.json(comment, { status: 200 });
}

export async function POST(request, { params }) {
  await dbConnect();
  const { id } = params;
  const session = await getServerSession(authOptions);

  try {
    const entryData = await request.json();

    await Comment.create({
      ...entryData,
      questionId: id,
      userId: session.user.userId,
    });

    return NextResponse.json({ entryData }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
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
