import { FindPathResponse } from "@/app/types";
import { NextRequest, NextResponse } from "next/server";

const HAPPYWALK_CHATGPT_DEV_KEY = process.env.HAPPYWALK_CHATGPT_DEV_KEY;

/**
 * Gets a suggested path from the ChatGPT API.
 */

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${HAPPYWALK_CHATGPT_DEV_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    const data = (await response.json()) as FindPathResponse;
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" + error },
      { status: 500 }
    );
  }
}
