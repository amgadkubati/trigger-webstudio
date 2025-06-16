// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { helloWorldTask } from "../../../../trigger/example";
import { tasks } from "@trigger.dev/sdk/v3";

//tasks.trigger also works with the edge runtime
//export const runtime = "edge";

export async function GET() {
  const handle = await tasks.trigger<typeof helloWorldTask>(
    "hello-world",
    "Amgad"
  );

  return new Response(JSON.stringify(handle), {
    status: 200,
  });
}
