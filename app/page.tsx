"use client";

import courses from "@/data/courses.json";
import CourseCard from "@/components/CourseCard";
import { useProgress } from "@/hooks/useProgress";
import type { Course } from "@/types";

export default function Home() {
  const { countForCourse, completed } = useProgress();

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
    <div className="mx-auto max-w-4xl p-6">
      <section className="mb-8">
        <div className="rounded-lg bg-linear-to-r from-indigo-600 to-indigo-400 text-white p-8">
          <h1 className="text-3xl font-bold">CyberDude Learning Portal</h1>
          <p className="mt-2 text-slate-100">
            30-day practical challenges to master JavaScript DOM
          </p>
        </div>
      </section>

      {/* Overall Progress Section */}
      <section className="mb-8 bg-linear-to-br from-indigo-900/40 to-purple-900/40 border border-indigo-500/30 rounded-2xl p-6 backdrop-blur-xl">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <div className="text-xs font-medium text-indigo-300 uppercase tracking-wide mb-1">
              Overall Progress
            </div>
            <div className="text-2xl font-bold bg-linear-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              {overallPercentage}%
            </div>
          </div>
          <div>
            <div className="text-xs font-medium text-purple-300 uppercase tracking-wide mb-1">
              Completed
            </div>
            <div className="text-2xl font-bold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {totalCompleted}
            </div>
          </div>
          <div>
            <div className="text-xs font-medium text-pink-300 uppercase tracking-wide mb-1">
              Total Videos
            </div>
            <div className="text-2xl font-bold text-slate-300">
              {totalAllCourses}
            </div>
          </div>
        </div>

        {/* Overall Progress Bar */}
        <div className="relative h-2 bg-slate-700/50 rounded-full overflow-hidden border border-slate-600/30">
          <div
            className="h-full bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-500 shadow-lg shadow-purple-500/50"
            style={{ width: `${overallPercentage}%` }}
          />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">All Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(courses as Course[]).map((c: Course) => (
            <CourseCard
              key={c.id}
              course={c}
              completed={countForCourse(c.id, c.videos)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
