// src/app/api/company/[slug]/route.ts

import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const filePath = path.join(
      process.cwd(),
      "src",
      "data",
      "company",
      `shareholders.json`
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

    return NextResponse.json({
      success: true,
      data: JSON.parse(file),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
