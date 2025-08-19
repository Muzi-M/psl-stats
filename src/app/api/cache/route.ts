import { NextRequest, NextResponse } from "next/server";
import { getCacheStats, clearAllCache, clearCache } from "@/lib/cachedFetcher";

export async function GET() {
  try {
    const stats = getCacheStats();
    return NextResponse.json({
      success: true,
      stats,
      message: "Cache statistics retrieved successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const endpoint = searchParams.get("endpoint");

    if (endpoint) {
      clearCache(endpoint);
      return NextResponse.json({
        success: true,
        message: `Cache cleared for endpoint: ${endpoint}`,
      });
    } else {
      clearAllCache();
      return NextResponse.json({
        success: true,
        message: "All cache cleared successfully",
      });
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
