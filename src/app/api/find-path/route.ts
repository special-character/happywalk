import { FindPathResponse } from "@/app/types";
import { NextRequest, NextResponse } from "next/server";

const HAPPYWALK_CHATGPT_DEV_KEY = process.env.HAPPYWALK_CHATGPT_DEV_KEY;

/**
 * Gets a suggested path from the ChatGPT API.
 */

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();
    // const response = await fetch("https://api.openai.com/v1/chat/completions", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${HAPPYWALK_CHATGPT_DEV_KEY}`,
    //   },
    //   body: JSON.stringify({
    //     model: "gpt-4o-mini",
    //     messages: [
    //       {
    //         role: "system",
    //         content: "You are a helpful assistant.",
    //       },
    //       {
    //         role: "user",
    //         content: prompt,
    //       },
    //     ],
    //   }),
    // });

    // const data = (await response.json()) as FindPathResponse;
    const data = {
      id: "chatcmpl-ApgXcJJPmrk8fK9DTNYRFZ80VqIyW",
      object: "chat.completion",
      created: 1736881620,
      model: "gpt-4o-mini-2024-07-18",
      choices: [
        {
          index: 0,
          message: {
            role: "assistant",
            content:
              '```json\n{\n  "type": "FeatureCollection",\n  "features": [\n    {\n      "type": "Feature",\n      "geometry": {\n        "type": "LineString",\n        "coordinates": [\n          [-122.293223, 47.591574],\n          [-122.293218, 47.592100],\n          [-122.293191, 47.592700],\n          [-122.293068, 47.593300],\n          [-122.292792, 47.593800],\n          [-122.292450, 47.594200],\n          [-122.292000, 47.594500],\n          [-122.291500, 47.594700],\n          [-122.291000, 47.594850],\n          [-122.290500, 47.594800],\n          [-122.290000, 47.594600],\n          [-122.289800, 47.594200],\n          [-122.289700, 47.593600],\n          [-122.289800, 47.593000],\n          [-122.290000, 47.592400],\n          [-122.290300, 47.591800],\n          [-122.290700, 47.591200],\n          [-122.291000, 47.590800],\n          [-122.291400, 47.590500],\n          [-122.291800, 47.590300],\n          [-122.292200, 47.590200],\n          [-122.292700, 47.590100],\n          [-122.293000, 47.590200],\n          [-122.293223, 47.591574]\n        ]\n      },\n      "properties": {\n        "length": "1 mile"\n      }\n    }\n  ]\n}\n```',
            refusal: null,
          },
          logprobs: null,
          finish_reason: "stop",
        },
      ],
      usage: {
        prompt_tokens: 59,
        completion_tokens: 382,
        total_tokens: 441,
        prompt_tokens_details: {
          cached_tokens: 0,
          audio_tokens: 0,
        },
        completion_tokens_details: {
          reasoning_tokens: 0,
          audio_tokens: 0,
          accepted_prediction_tokens: 0,
          rejected_prediction_tokens: 0,
        },
      },
      service_tier: "default",
      system_fingerprint: "fp_72ed7ab54c",
    };
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" + error },
      { status: 500 }
    );
  }
}
