import { getServerSession } from "next-auth";

export async function POST(request, { params }) {
  await dbConnect();
  const { commentId } = params;
  const session = await getServerSession(authOptions);

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    const index = comment.likes.indexOf(session.user.userId);
    if (index === -1) {
      comment.likes.push(session.user.userId);
    } else {
      comment.likes.splice(index, 1);
    }

    await comment.save();

    return NextResponse.json({ likes: comment.likes.length }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
