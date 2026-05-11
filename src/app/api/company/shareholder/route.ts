// src/app/api/company/shareholder/route.ts

import fs from "fs";
import path from "path";

import { NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let cachedData: any = null;

export async function GET() {
  try {
    // gunakan cache memory
    if (cachedData) {
      return NextResponse.json(
        {
          success: true,
          data: cachedData,
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
      "shareholders.json"
    );

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        {
          success: false,
          message: "Shareholder file not found",
        },
        { status: 404 }
      );
    }

    const file = fs.readFileSync(filePath, "utf-8");

    cachedData = JSON.parse(file);

    return NextResponse.json(
      {
        success: true,
        data: cachedData,
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
