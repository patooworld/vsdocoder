import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /fonts (inside /public)
     * 4. /examples (inside /public)
     * 5. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api|_next|examples|[\\w-]+\\.\\w+).*)",
  ],
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Get hostname of request (e.g. demo.patoosite.net, demo.localhost:3000)
  const hostname = req.headers.get("host") || "demo.vercel.pub";

  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  const path = url.pathname;

  // Only for demo purposes - remove this if you want to use your root domain as the landing page
  if (hostname === "patoosite.net" || hostname === "platforms.patoosite.net") {
    return NextResponse.redirect("https://demo.patoosite.net");
  }

  /*  You have to replace ".vercel.pub" with your own domain if you deploy this example under your domain.
      You can also use wildcard subdomains on .vercel.app links that are associated with your Vercel team slug
      in this case, our team slug is "patoospace", thus *.patoospace.patoosite.net works. Do note that you'll
      still need to add "*.patoospace.patoosite.net" as a wildcard domain on your Vercel dashboard. */
  const currentHost =
    process.env.NODE_ENV === "production" && process.env.VERCEL === "1"
      ? hostname
          .replace(`.patoosite.net`, "")
          .replace(`.patoospace.patoosite.net`, "")
      : hostname.replace(`.localhost:3000`, "");
  // rewrites for app pages
  if (currentHost === "app") {
    const session = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    if (!session?.email && path !== "/login") {
      return NextResponse.redirect(new URL("/login", req.url));
    } else if (session?.email && path === "/login") {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.rewrite(new URL(`/_app${path}`, req.url));
  }

  // rewrite root application to `/home` folder
  if (hostname === "localhost:3000" || hostname === "patoosite.net") {
    return NextResponse.rewrite(new URL(`/home/${path}`, req.url));
  }

  // rewrite everything else to `/_sites/[site] dynamic route
  return NextResponse.rewrite(
    new URL(`/_sites/${currentHost}${path}`, req.url)
  );
}
