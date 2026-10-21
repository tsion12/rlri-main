import { NextResponse } from "next/server";

/**
 * Proxies WordPress uploads. The Hostinger certificate on
 * www.reallifeinstitute.org cannot be renewed while the public site is on
 * Vercel, so the browser loads these files from us over HTTPS instead.
 */
const UPSTREAM_ORIGIN = "http://www.reallifeinstitute.org";

type Params = { params: Promise<{ path: string[] }> };

export async function GET(_request: Request, { params }: Params) {
  const { path } = await params;
  if (
    path.length === 0 ||
    path.some((part) => part === "" || part === "." || part === ".." || part.includes("\\"))
  ) {
    return new NextResponse(null, { status: 400 });
  }

  const upstream = `${UPSTREAM_ORIGIN}/wp-content/uploads/${path.map((part) => encodeURIComponent(part)).join("/")}`;
  const upstreamResponse = await fetch(upstream, {
    redirect: "manual",
    next: { revalidate: 86_400 },
  });
  if (!upstreamResponse.ok || !upstreamResponse.body) {
    return new NextResponse(null, { status: upstreamResponse.status || 502 });
  }

  const headers = new Headers();
  const contentType = upstreamResponse.headers.get("content-type");
  if (contentType) headers.set("content-type", contentType);
  headers.set("cache-control", "public, max-age=86400");
  return new NextResponse(upstreamResponse.body, { status: 200, headers });
}
