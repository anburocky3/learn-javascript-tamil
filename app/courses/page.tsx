"use client";

import courses from "@/data/courses.json";
import CourseCard from "@/components/CourseCard";
import { useProgress } from "@/hooks/useProgress";
import type { Course } from "@/types";

export default function CoursesIndex() {
  const { countForCourse } = useProgress();

  const totalVideos = (courses as Course[]).reduce(
    (sum, c) => sum + c.videos.length,
    0,
  );
  const totalCompleted = (courses as Course[]).reduce(
    (sum, c) => sum + countForCourse(c.id, c.videos),
    0,
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <div className="border-b border-slate-700/50 backdrop-blur bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-100 mb-3">
            Learn JavaScript in Tamil
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mb-6">
            Master modern JavaScript with comprehensive courses, interactive
            lessons, and hands-on challenges—all in Tamil.
          </p>

          {/* Overall Progress */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-700/50 border border-slate-600/50 rounded-lg p-4 backdrop-blur">
              <div className="text-sm text-slate-400 mb-1">Total Courses</div>
              <div className="text-3xl font-bold text-indigo-400">
                {courses.length}
              </div>
            </div>
            <div className="bg-slate-700/50 border border-slate-600/50 rounded-lg p-4 backdrop-blur">
              <div className="text-sm text-slate-400 mb-1">Total Videos</div>
              <div className="text-3xl font-bold text-indigo-400">
                {totalVideos}
              </div>
            </div>
            <div className="bg-slate-700/50 border border-slate-600/50 rounded-lg p-4 backdrop-blur">
              <div className="text-sm text-slate-400 mb-1">
                Videos Completed
              </div>
              <div className="text-3xl font-bold text-green-400">
                {totalCompleted}{" "}
                <span className="text-sm text-slate-400">
                  {totalVideos > 0 &&
                    `(${Math.round((totalCompleted / totalVideos) * 100)}%)`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-slate-100 mb-8 flex items-center gap-3">
          <div className="w-1 h-8 bg-linear-to-b from-indigo-600 to-indigo-400 rounded-full" />
          Available Courses
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(courses as Course[]).map((c: Course) => (
            <CourseCard
              key={c.id}
              course={c}
              completed={countForCourse(c.id, c.videos)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
