import { NextResponse } from "next/server";
import Comment from "@/db/models/Comment";
import dbConnect from "@/db/connect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req, { params }) {
  await dbConnect();
  const { id } = params;
  const comments = await Comment.find({ questionId: { $eq: id } });

  return NextResponse.json(comments, { status: 200 });
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
      userName: session.user.name,
      profileImage: session.user.image,
      userId: session.user.userId,
    });

    return NextResponse.json({ entryData }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}

export async function PATCH(request, response) {
  await dbConnect();
  const session = await getServerSession(authOptions);

  const { commentId } = await request.json();
  const userId = session.user.userId;

  try {
    const updatedComments = await Comment.findById(commentId).then((post) => {
      const index = post.likedByUserId.findIndex((id) => id.equals(userId));
      if (index === -1) {
        return Comment.updateOne(
          { _id: commentId },
          { $push: { likedByUserId: userId } },
          { new: true }
        );
      } else {
        return Comment.updateOne(
          { _id: commentId },
          { $pull: { likedByUserId: userId } },
          { new: true }
        );
      }
    });
    return NextResponse.json(updatedComments);
  } catch (e) {
    return NextResponse.status(400).json({ error: e.message });
  }
}

export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    const body = await req.json();

    await Comment.findByIdAndUpdate(id, {
      $set: body,
    });
    return NextResponse.json({ status: 200 });
  } catch (e) {
    console.error(e);
    return response.status(400).json({ error: e.message });
  }
}

export async function DELETE(req, { params }) {
  await dbConnect();
  const { id } = params;

  try {
    await Comment.findByIdAndDelete(id);
    return NextResponse.json({
      status: 200,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.status(400).json({ error: e.message });
  }
}
