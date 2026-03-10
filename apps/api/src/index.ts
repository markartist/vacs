export interface Env {
  APP_NAME: string;
  APP_ENV: string;
  AI_GATEWAY_BASE_URL?: string;
  AI_GATEWAY_ENABLED?: string;

  VACS_DB?: D1Database;
  VACS_ASSETS?: R2Bucket;
  VACS_VECTOR_INDEX?: VectorizeIndex;
  VACS_GENERATION_QUEUE?: Queue;
}

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8"
    }
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === "GET" && url.pathname === "/health") {
      return jsonResponse({
        status: "ok",
        service: "vacs-api",
        mode: "foundation",
        env: env.APP_ENV ?? "unknown",
        timestamp: new Date().toISOString()
      });
    }

    return jsonResponse(
      {
        error: "NOT_FOUND",
        message: "Route not found"
      },
      404
    );
  }
} satisfies ExportedHandler<Env>;
