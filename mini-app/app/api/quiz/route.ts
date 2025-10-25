import { NextResponse } from "next/server";

export async function GET() {
  const questions = [
    {
      id: 1,
      question: "What is Base's L2?",
      options: ["Ethereum", "Polygon", "Base", "Optimism"],
      answer: 2,
    },
    {
      id: 2,
      question: "Which protocol introduced the concept of 'gas fees'?",
      options: ["Bitcoin", "Ethereum", "Solana", "Cardano"],
      answer: 1,
    },
    {
      id: 3,
      question: "What does NFT stand for?",
      options: ["Non-Fungible Token", "New Financial Token", "Network File Transfer", "None of the above"],
      answer: 0,
    },
    {
      id: 4,
      question: "Which layer is responsible for consensus in a blockchain?",
      options: ["Layer 1", "Layer 2", "Layer 3", "Layer 0"],
      answer: 0,
    },
    {
      id: 5,
      question: "What is the native token of the Polygon network?",
      options: ["MATIC", "ETH", "BTC", "DOT"],
      answer: 0,
    },
  ];
  return NextResponse.json(questions);
}
