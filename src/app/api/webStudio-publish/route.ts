// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { webStudioPublishTask } from "../../../../trigger/webStudioPublish";
import { tasks } from "@trigger.dev/sdk/v3";
import { NextResponse } from 'next/server';

//tasks.trigger also works with the edge runtime
//export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { projectId, shareLink } = body;

    console.log('Received parameters:', { projectId, shareLink });

    if (!projectId || !shareLink) {
      return NextResponse.json(
        { success: false, error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    const handle = await tasks.trigger<typeof webStudioPublishTask>(
      "web-studio-publish",
      {
        projectId : projectId,
        shareLink : shareLink
      }
    );

    return NextResponse.json({
      success: true,
      message: { handle }
    });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { success: false, error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
