import { NextResponse } from "next/server";
import Question from "@/db/models/Question";
import dbConnect from "@/db/connect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req, { params }) {
  await dbConnect();
  const { id } = params;
  const question = await Question.findById(id);

  return NextResponse.json(question, { status: 200 });
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
    return NextResponse.status(400).json({ error: e.message });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    await dbConnect();
    await Question.findByIdAndDelete(id);
    return NextResponse.json({
      status: 200,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.status(400).json({ error: e.message });
  }
}

export async function PATCH(request, { params }) {
  const { rating } = await request.json();
  await dbConnect();
  const { id } = params;

  const session = await getServerSession(authOptions);

  const userId = session.user.userId;

  try {
    const existingRating = await Question.findById(id);

    const userRate = existingRating.ratedByUserId.find((user) => {
      const userStr = user.userId.toString();
      return userStr === userId;
    });

    let updatedRating;

    if (userRate) {
      updatedRating = await Question.findOneAndUpdate(
        { _id: id, "ratedByUserId.userId": userId },
        { $set: { "ratedByUserId.$.rating": rating } },
        { new: true }
      );
    } else {
      updatedRating = await Question.findOneAndUpdate(
        { _id: id },
        { $push: { ratedByUserId: { userId, rating } } },
        { new: true }
      );
    }

    if (!updatedRating) {
      return NextResponse.status(404).json({ error: "Rating not found" });
    }

    return NextResponse.json(updatedRating);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
