import { logger, task, wait } from "@trigger.dev/sdk/v3";
import axios from 'axios';

const apiUrl = "https://api.studio.doin9.com";

interface WebStudioPublishPayload {
  projectId: string;
  shareLink: string;
}

interface WebStudioPublishResponse {
  status: 'success' | 'error';
  message: string;
  data?: {
    id: string;
    projectId: string;
    shareLink: string;
    status: string;
    completedAt: string;
  };
}

export const webStudioPublishTask = task({
  id: "web-studio-publish",
  // Set maxDuration to handle the 3-5 minute processing time
  maxDuration: 600, // 10 minutes in seconds (buffer for the max 5 minute processing)
  queue: {
    concurrencyLimit: 1,
  },
  run: async (payload: WebStudioPublishPayload, { ctx }) => {
    logger.log("Starting Web Studio publish process", { payload, ctx });

    await wait.for({ seconds: 5 });

    logger.log("Web Studio publish in progress", { payload, ctx });

    // Simulate a long-running request (3-5 minutes)
    const processingTime = Math.floor(Math.random() * (5 - 3 + 1) + 3) * 60; // Random time between 3-5 minutes in seconds
    logger.log(`Publishing will take approximately ${Math.round(processingTime / 60)} minutes`, { processingTimeSeconds: processingTime });

    // Use background mode for long-running operations
    await wait.for({ seconds: processingTime });

    // const response = await axios.post(
    //   `${apiUrl}//webhook/deploy`,
    //   {
    //     projectId: payload.projectId,
    //     shareLink: payload.shareLink
    //   },
    //   {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Accept': 'application/json',
    //     }
    //   }
    // );

    // Simulate response
    const response = {
      data: {
        is_success: true,
        message: "Web Studio publish completed successfully",
        data: {
          id: "pub_" + Math.random().toString(36).substring(7),
          projectId: payload.projectId,
          shareLink: payload.shareLink,
          status: "completed",
          completedAt: new Date().toISOString()
        }
      }
    };

    const responseData = response.data;

    logger.log("Web Studio publish completed", { responseData });

    if (responseData.is_success) {
      return {
        status: 'success',
        message: responseData.message,
        data: responseData.data
      } as WebStudioPublishResponse;
    } else {
      return {
        status: 'error',
        message: responseData.message
      } as WebStudioPublishResponse;
    }
  },
});