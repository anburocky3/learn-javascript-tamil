"use client";

import courses from "@/data/courses.json";
import CourseCard from "@/components/CourseCard";
import { useProgress } from "@/hooks/useProgress";
import type { Course } from "@/types";

export default function Home() {
  const { countForCourse } = useProgress();

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
