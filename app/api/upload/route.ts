import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import crypto from "crypto";
import path from "path";

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "application/pdf",
  "text/csv",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
]);

const ALLOWED_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".webp",
  ".pdf",
  ".csv",
  ".xls",
  ".xlsx",
]);

const MAX_FILE_SIZE = 10 * 1024 * 1024;

function sanitizeFilename(filename: string): string {
  const basename = path.basename(filename);
  return basename.replace(/[^a-zA-Z0-9.\-_]/g, "_");
}

function getFileExtension(filename: string): string {
  return path.extname(filename).toLowerCase();
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as HandleUploadBody;

    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        const extension = getFileExtension(pathname);
        if (!ALLOWED_EXTENSIONS.has(extension)) {
          throw new Error(
            `File type not allowed. Allowed types: ${Array.from(ALLOWED_EXTENSIONS).join(", ")}`
          );
        }

        const safeFilename = sanitizeFilename(pathname);
        const uniqueFolder = crypto.randomBytes(8).toString("hex");
        const blobPath = `${uniqueFolder}/${safeFilename}`;

        return {
          allowedContentTypes: Array.from(ALLOWED_MIME_TYPES),
          maximumSizeInBytes: MAX_FILE_SIZE,
          addRandomSuffix: false,
          pathname: blobPath,
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // Upload completed - blob is already saved to Vercel Blob
        // You can add additional logic here if needed (e.g., database updates)
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload failed" },
      { status: 400 }
    );
  }
}
