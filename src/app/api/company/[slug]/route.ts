// src/app/api/company/[slug]/route.ts

import fs from "fs";
import path from "path";

import { NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const companyCache = new Map<string, any>();

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const code = slug.toUpperCase();

    // ambil dari memory cache
    if (companyCache.has(code)) {
      return NextResponse.json(
        {
          success: true,
          data: companyCache.get(code),
          cached: true,
        },
        {
          headers: {
            "Cache-Control":
              "public, s-maxage=3600, stale-while-revalidate=86400",
          },
        }
      );
    }

    const filePath = path.join(
      process.cwd(),
      "src",
      "data",
      "company",
      "detail",
      `${code}.json`
    );

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        {
          success: false,
          message: "Company not found",
        },
        { status: 404 }
      );
    }

    const file = fs.readFileSync(filePath, "utf-8");

    const parsed = JSON.parse(file);

    // simpan ke memory cache
    companyCache.set(code, parsed);

    return NextResponse.json(
      {
        success: true,
        data: parsed,
        cached: false,
      },
      {
        headers: {
          "Cache-Control":
            "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
