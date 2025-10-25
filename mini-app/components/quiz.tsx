"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Share } from "./share";
import { cn } from "@/lib/utils";

interface Question {
  id: number;
  question: string;
  options: string[];
  answer: number; // index of correct option
}

export default function Quiz() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [badgeMinted, setBadgeMinted] = useState(false);

  useEffect(() => {
    async function fetchQuestions() {
      const res = await fetch("/api/quiz");
      const data = await res.json();
      setQuestions(data);
    }
    fetchQuestions();
  }, []);

  const handleOptionClick = (index: number) => {
    setSelected(index);
  };

  const handleNext = async () => {
    if (selected === null) return;
    if (selected === questions[current].answer) {
      setScore((s) => s + 1);
    }
    setSelected(null);
    if (current + 1 < questions.length) {
      setCurrent((c) => c + 1);
    } else {
      setFinished(true);
      // Mint badge if score >= 4
      if (score + (selected === questions[current].answer ? 1 : 0) >= 4) {
        await mintBadge();
      }
    }
  };

  const mintBadge = async () => {
    try {
      const res = await fetch("/api/mint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ score }),
      });
      if (res.ok) {
        setBadgeMinted(true);
      }
    } catch (e) {
      console.error("Mint failed", e);
    }
  };

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  if (finished) {
    return (
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-xl">Quiz finished!</h2>
        <p>Your score: {score} / {questions.length}</p>
        {badgeMinted && (
          <p className="text-green-600">Badge minted! Share it below.</p>
        )}
        <Share text={`I scored ${score}/${questions.length} on the Crypto Quiz Game!`} />
      </div>
    );
  }

  const q = questions[current];

  return (
    <div className="w-full max-w-md">
      <h3 className="text-lg mb-2">{q.question}</h3>
      <div className="flex flex-col gap-2">
        {q.options.map((opt, idx) => (
          <Button
            key={idx}
            variant={selected === idx ? "secondary" : "outline"}
            onClick={() => handleOptionClick(idx)}
            className={cn("w-full justify-start")}
          >
            {opt}
          </Button>
        ))}
      </div>
      <div className="mt-4 flex justify-between">
        <Button disabled={selected === null} onClick={handleNext}>
          {current + 1 < questions.length ? "Next" : "Finish"}
        </Button>
      </div>
    </div>
  );
}
