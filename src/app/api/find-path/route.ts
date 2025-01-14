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
      id: "chatcmpl-ApTcZtp2vSsT4SnNMRVBB5v0C7H1D",
      object: "chat.completion",
      created: 1736831955,
      model: "gpt-4o-mini-2024-07-18",
      choices: [
        {
          index: 0,
          message: {
            role: "assistant",
            content:
              'Here is a GeoJSON representation of a suggested walking route near 1316 30th Ave S, Seattle, focusing on parks:\n\n```json\n{\n  "type": "FeatureCollection",\n  "features": [\n    {\n      "type": "Feature",\n      "geometry": {\n        "type": "LineString",\n        "coordinates": [\n          [-122.292551, 47.586043], // Start Point: 1316 30th Ave S\n          [-122.292386, 47.585616], // Park Entrance\n          [-122.293196, 47.586455], // Washington Park Arboretum\n          [-122.292099, 47.586055], // Arboretum area\n          [-122.288095, 47.586019], // Lake Washington Blvd\n          [-122.287823, 47.585625], // Continue towards the park\n          [-122.286245, 47.586110], // Continue along park path\n          [-122.285321, 47.586455], // Viewpoint\n          [-122.284511, 47.585900], // Return via trail towards Arboretum\n          [-122.292551, 47.586043]  // End Point: back at 1316 30th Ave S\n        ]\n      },\n      "properties": {\n        "name": "Park Loop Walk",\n        "description": "A scenic 2-3 mile loop through Washington Park Arboretum and surrounding areas."\n      }\n    }\n  ]\n}\n```\n\nThis route provides a pleasant walk through natural areas and parks in Seattle and totals approximately 2-3 miles. Adjust the coordinates further for specific points of interest along your route.',
            refusal: null,
          },
          logprobs: null,
          finish_reason: "stop",
        },
      ],
      usage: {
        prompt_tokens: 48,
        completion_tokens: 363,
        total_tokens: 411,
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
