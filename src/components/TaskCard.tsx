"use client";

import Image from "next/image";
import type { Task } from "@/types";

export default function TaskCard({
  task,
  completed,
  onToggle,
}: {
  task: Task;
  completed: boolean;
  onToggle: () => void;
}) {
  const getDifficultyStyles = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return {
          bg: "bg-green-500/10",
          border: "border-green-500/30",
          badge: "bg-green-500/20 text-green-400",
          icon: "text-green-400",
        };
      case "Medium":
        return {
          bg: "bg-yellow-500/10",
          border: "border-yellow-500/30",
          badge: "bg-yellow-500/20 text-yellow-400",
          icon: "text-yellow-400",
        };
      case "Hard":
        return {
          bg: "bg-red-500/10",
          border: "border-red-500/30",
          badge: "bg-red-500/20 text-red-400",
          icon: "text-red-400",
        };
      default:
        return {
          bg: "bg-slate-500/10",
          border: "border-slate-500/30",
          badge: "bg-slate-500/20 text-slate-400",
          icon: "text-slate-400",
        };
    }
  };

  const styles = getDifficultyStyles(task.difficulty);

  return (
    <div
      className={`border ${styles.border} ${styles.bg} rounded-lg p-6 backdrop-blur`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div
              className={`p-2 rounded-lg ${styles.bg} border ${styles.border}`}
            >
              <svg
                className={`w-5 h-5 ${styles.icon}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-slate-100 text-lg">
                {task.title}
              </h4>
              <span
                className={`inline-block mt-1 text-xs px-2 py-1 rounded-full ${styles.badge}`}
              >
                {task.difficulty} Level
              </span>
            </div>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed mt-4">
            {task.problemStatement}
          </p>
        </div>

        <button
          onClick={onToggle}
          className={`flex-shrink-0 px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 ${
            completed
              ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg shadow-green-500/50"
              : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/50"
          }`}
        >
          <div className="flex items-center gap-2">
            {completed && (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            <span>{completed ? "Completed" : "Mark as Complete"}</span>
          </div>
        </button>
      </div>

      {task.expectedOutput && (
        <div className="mt-6 pt-6 border-t border-slate-600/50">
          <p className="text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wide">
            Expected Output
          </p>
          <div className="w-full h-56 relative rounded-lg overflow-hidden border border-slate-600/50 bg-slate-800">
            <Image
              src={task.expectedOutput}
              alt={`${task.title} expected output`}
              fill
              className="object-contain p-4"
            />
          </div>
        </div>
      )}
    </div>
  );
}
