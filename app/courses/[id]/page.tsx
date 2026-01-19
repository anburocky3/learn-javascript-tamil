import courses from "@/data/courses.json";
import CourseDetail from "@/components/CourseDetail";
import type { Course } from "@/types";
import Link from "next/link";

export default async function CoursePage({
  params,
}: {
  params: { id?: string } | Promise<{ id?: string }>;
}) {
  const resolvedParams = await params;
  const idParam = String(resolvedParams?.id ?? "").toLowerCase();
  if (!idParam) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
        <div className="max-w-md text-center">
          <h1 className="text-3xl font-bold text-slate-100 mb-4">
            Course not found
          </h1>
          <p className="text-slate-400 mb-6">
            Please select a course from the available list.
          </p>
          <Link
            href="/courses"
            className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors"
          >
            View Courses
          </Link>
        </div>
      </div>
    );
  }

  const course = (courses as Course[]).find(
    (c: Course) => String(c?.id ?? "").toLowerCase() === idParam,
  );
  if (!course) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 backdrop-blur">
            <h2 className="text-2xl font-bold text-slate-100 mb-4">
              Course not found
            </h2>
            <p className="text-slate-300 mb-6">
              Searched id:{" "}
              <code className="bg-slate-900 px-3 py-1 rounded text-indigo-400">
                {idParam}
              </code>
            </p>
            <p className="text-slate-400 mb-4">Available course ids:</p>
            <ul className="space-y-2 mb-6">
              {(courses as Course[]).map((c: Course) => (
                <li key={c.id} className="text-slate-300">
                  <span className="font-medium text-indigo-400">{c.id}</span>
                  <span className="text-slate-500"> — {c.title}</span>
                </li>
              ))}
            </ul>
            <div>
              <Link
                href="/courses"
                className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors"
              >
                Back to Courses
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="border-b border-slate-700/50 backdrop-blur bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors mb-4"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Courses
          </Link>
          <h1 className="text-4xl font-bold text-slate-100 mb-3">
            {course.title}
          </h1>
          <p className="text-lg text-slate-300">{course.description}</p>
          <div className="flex items-center gap-4 mt-4">
            <span className="inline-block px-4 py-2 bg-indigo-600/20 text-indigo-400 rounded-full text-sm font-medium border border-indigo-500/30">
              {course.category}
            </span>
            <span className="text-slate-400 text-sm">
              {course.videos.length} videos •{" "}
              {Math.round(
                course.videos.reduce((acc, v) => {
                  const [mins, secs] = v.duration.split(":").map(Number);
                  return acc + mins * 60 + (secs || 0);
                }, 0) / 60,
              )}{" "}
              min total
            </span>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="py-8 mx-auto max-w-7xl p-6">
        <CourseDetail course={course} />
      </div>
    </div>
  );
}
