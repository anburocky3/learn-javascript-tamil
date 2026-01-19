"use client";

import courses from "@/data/courses.json";
import { useProgress } from "@/hooks/useProgress";
import type { Course } from "@/types";

export default function ProgressPage() {
  const { completed } = useProgress();

  const totalAllCourses = (courses as Course[]).reduce(
    (acc, c) => acc + c.videos.length,
    0,
  );
  const totalCompleted = (courses as Course[]).reduce((acc, c) => {
    const done = c.videos.reduce(
      (count: number, v) =>
        completed.has(`${c.id}:${v.videoId}`) ? count + 1 : count,
      0,
    );
    return acc + done;
  }, 0);

  const overallPercentage = Math.round(
    (totalCompleted / totalAllCourses) * 100,
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      {/* Header Section */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
          Your Learning Journey
        </h1>
        <p className="text-slate-400 text-lg">
          Track your progress across all courses
        </p>
      </div>

      {/* Overall Progress Card */}
      <div className="mb-10 bg-linear-to-br from-indigo-900/40 to-purple-900/40 border border-indigo-500/30 rounded-2xl p-8 backdrop-blur-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <div className="text-sm font-medium text-indigo-300 uppercase tracking-wide mb-2">
              Overall Progress
            </div>
            <div className="text-4xl font-bold bg-linear-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              {overallPercentage}%
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-purple-300 uppercase tracking-wide mb-2">
              Videos Completed
            </div>
            <div className="text-4xl font-bold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {totalCompleted}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-pink-300 uppercase tracking-wide mb-2">
              Total Videos
            </div>
            <div className="text-4xl font-bold text-slate-300">
              {totalAllCourses}
            </div>
          </div>
        </div>

        {/* Overall Progress Bar */}
        <div className="relative h-3 bg-slate-700/50 rounded-full overflow-hidden border border-slate-600/30">
          <div
            className="h-full bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-500 shadow-lg shadow-purple-500/50"
            style={{ width: `${overallPercentage}%` }}
          />
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {(courses as Course[]).map((c: Course, index: number) => {
          const total = c.videos.length;
          const done = c.videos.reduce(
            (acc: number, v) =>
              completed.has(`${c.id}:${v.videoId}`) ? acc + 1 : acc,
            0,
          );
          const percentage = Math.round((done / total) * 100);
          const gradients = [
            "from-blue-900/40 to-cyan-900/40 border-blue-500/30",
            "from-purple-900/40 to-pink-900/40 border-purple-500/30",
            "from-green-900/40 to-emerald-900/40 border-green-500/30",
            "from-orange-900/40 to-red-900/40 border-orange-500/30",
          ];
          const accentColors = [
            "from-blue-400 to-cyan-400",
            "from-purple-400 to-pink-400",
            "from-green-400 to-emerald-400",
            "from-orange-400 to-red-400",
          ];
          const progressGradients = [
            "from-blue-500 via-cyan-500 to-blue-500",
            "from-purple-500 via-pink-500 to-purple-500",
            "from-green-500 via-emerald-500 to-green-500",
            "from-orange-500 via-red-500 to-orange-500",
          ];

          return (
            <div
              key={c.id}
              className={`bg-linear-to-br ${gradients[index % 4]} border rounded-2xl p-6 backdrop-blur-xl hover:border-opacity-100 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-slate-900/50 group`}
            >
              {/* Course Header */}
              <div className="mb-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-linear-to-r group-hover:bg-clip-text transition-all duration-300">
                      {c.title}
                    </h3>
                    <p className="text-sm text-slate-400">{c.category}</p>
                  </div>
                  <div className="text-right">
                    <div
                      className={`text-2xl font-bold bg-linear-to-r ${accentColors[index % 4]} bg-clip-text text-transparent`}
                    >
                      {percentage}%
                    </div>
                  </div>
                </div>

                {/* Progress Stats */}
                <div className="text-sm text-slate-300 mb-4">
                  <span className="font-semibold text-white">{done}</span>
                  <span className="text-slate-400"> of </span>
                  <span className="font-semibold text-white">{total}</span>
                  <span className="text-slate-400"> videos completed</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative h-2 bg-slate-700/50 rounded-full overflow-hidden border border-slate-600/30">
                <div
                  className={`h-full bg-linear-to-r ${progressGradients[index % 4]} rounded-full transition-all duration-500 shadow-lg`}
                  style={{
                    width: `${percentage}%`,
                    boxShadow:
                      index % 4 === 0
                        ? "0 0 10px rgba(34, 211, 238, 0.5)"
                        : index % 4 === 1
                          ? "0 0 10px rgba(236, 72, 153, 0.5)"
                          : index % 4 === 2
                            ? "0 0 10px rgba(34, 197, 94, 0.5)"
                            : "0 0 10px rgba(251, 146, 60, 0.5)",
                  }}
                />
              </div>

              {/* Course Description */}
              <p className="text-xs text-slate-400 mt-4 line-clamp-2">
                {c.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Motivational Message */}
      <div className="mt-12 text-center">
        <p className="text-slate-400">
          {overallPercentage === 100
            ? "🎉 Congratulations! You've completed all courses!"
            : overallPercentage >= 75
              ? "📚 You're almost there! Keep up the amazing work!"
              : overallPercentage >= 50
                ? "⚡ You're halfway there! Keep learning!"
                : "🚀 Great start! Continue your learning journey!"}
        </p>
      </div>
    </div>
  );
}
