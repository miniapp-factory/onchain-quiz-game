import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { score } = await request.json();
  // Placeholder: In a real implementation, you would call your NFT minting contract.
  console.log(`Minting badge for score ${score}`);
  return NextResponse.json({ success: true, badgeUrl: "/badge.png" });
}
