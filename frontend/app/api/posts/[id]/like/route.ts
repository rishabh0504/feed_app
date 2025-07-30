import { type NextRequest, NextResponse } from "next/server";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_ENDPOINT || "http://localhost:3001";

export async function POST(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const res = await fetch(`${BACKEND_URL}/posts/${params.id}/like`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Like Error:", error);
    return NextResponse.json(
      { error: "Failed to like the post" },
      { status: 500 }
    );
  }
}
