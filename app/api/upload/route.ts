import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import crypto from "crypto";
import path from "path";

// Security: Allowed file types
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

// Security: Max file size (10MB)
const MAX_FILE_SIZE = 10 * 1024 * 1024;

function sanitizeFilename(filename: string): string {
  // Remove path separators and dangerous characters
  const basename = path.basename(filename);
  // Remove any characters that aren't alphanumeric, dots, hyphens, or underscores
  const sanitized = basename.replace(/[^a-zA-Z0-9.\-_]/g, "_");
  // Generate unique prefix to prevent collisions
  const uniquePrefix = crypto.randomBytes(8).toString("hex");
  return `${uniquePrefix}-${sanitized}`;
}

function getFileExtension(filename: string): string {
  const ext = path.extname(filename).toLowerCase();
  return ext;
}

export async function POST(request: Request): Promise<NextResponse> {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");

  if (!filename) {
    return NextResponse.json({ error: "Filename required" }, { status: 400 });
  }

  if (!request.body) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  // Security: Validate file extension
  const extension = getFileExtension(filename);
  if (!ALLOWED_EXTENSIONS.has(extension)) {
    return NextResponse.json(
      { error: `File type not allowed. Allowed types: ${Array.from(ALLOWED_EXTENSIONS).join(", ")}` },
      { status: 400 }
    );
  }

  // Security: Validate Content-Type
  const contentType = request.headers.get("content-type");
  if (contentType && !ALLOWED_MIME_TYPES.has(contentType)) {
    return NextResponse.json(
      { error: "Invalid file type" },
      { status: 400 }
    );
  }

  // Security: Validate file size
  const contentLength = request.headers.get("content-length");
  if (contentLength && parseInt(contentLength, 10) > MAX_FILE_SIZE) {
    return NextResponse.json(
      { error: `File too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024}MB` },
      { status: 400 }
    );
  }

  // Security: Sanitize filename to prevent path traversal
  const safeFilename = sanitizeFilename(filename);

  const blob = await put(safeFilename, request.body, {
    access: "public",
    contentType: contentType || undefined,
  });

  return NextResponse.json(blob);
}
