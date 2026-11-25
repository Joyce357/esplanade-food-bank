export type ParseJsonResult =
  | { ok: true; data: unknown }
  | { ok: false; status: 400 | 413; message: string };

/**
 * Safely parses an incoming JSON request body while enforcing a strict byte limit
 * to protect endpoints from oversized payloads.
 */
export async function parseJsonBodyWithLimit(
  req: Request,
  maxBytes: number
): Promise<ParseJsonResult> {
  const contentLengthHeader = req.headers.get("content-length");
  if (contentLengthHeader) {
    const contentLength = Number(contentLengthHeader);
    if (!Number.isNaN(contentLength) && contentLength > maxBytes) {
      return {
        ok: false,
        status: 413,
        message: "Request payload is too large.",
      };
    }
  }

  let rawText: string;
  try {
    rawText = await req.text();
  } catch {
    return {
      ok: false,
      status: 400,
      message: "Invalid request payload. Expected JSON.",
    };
  }

  if (Buffer.byteLength(rawText, "utf8") > maxBytes) {
    return {
      ok: false,
      status: 413,
      message: "Request payload is too large.",
    };
  }

  try {
    return { ok: true, data: JSON.parse(rawText) };
  } catch {
    return {
      ok: false,
      status: 400,
      message: "Invalid request payload. Expected JSON.",
    };
  }
}
