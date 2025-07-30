import { type NextRequest, NextResponse } from "next/server";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_ENDPOINT || "http://localhost:3001";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { text } = await request.json();

    if (!text || typeof text !== "string" || !text.trim()) {
      return NextResponse.json(
        { error: "Comment text is required" },
        { status: 400 }
      );
    }

    const postId = params.id;

    const response = await fetch(`${BACKEND_URL}/posts/${postId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: text.trim() }),
    });

    if (!response.ok) {
      const errorBody = await response.json();
      return NextResponse.json(
        { error: errorBody.error || "Failed to add comment" },
        { status: response.status }
      );
    }

    const updatedPost = await response.json();
    return NextResponse.json(updatedPost);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
