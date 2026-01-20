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
          <h1 className="text-4xl font-bold text-slate-100 mb-3 flex items-center gap-4">
            {course.title}{" "}
            <span className="inline-block px-4 py-2 bg-indigo-600/20 text-indigo-400 rounded-full text-sm font-medium border border-indigo-500/30">
              {course.category}
            </span>
          </h1>
          <p className="text-lg text-slate-300">{course.description}</p>
          <div className="flex items-center gap-4 mt-4">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-6">
              {/* Author */}
              <div className="bg-linear-to-br from-slate-700/30 to-slate-800/30 border border-slate-600/30 rounded-lg p-4 backdrop-blur-sm hover:border-slate-500/50 transition-all">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <svg
                      className="w-5 h-5 text-blue-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wide">
                      Instructor
                    </p>
                    <p className="text-sm font-semibold text-slate-200">
                      Anbuselvan
                    </p>
                  </div>
                </div>
              </div>

              {/* Videos */}
              <div className="bg-linear-to-br from-slate-700/30 to-slate-800/30 border border-slate-600/30 rounded-lg p-4 backdrop-blur-sm hover:border-slate-500/50 transition-all">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                      className="w-5 h-5 text-purple-400"
                    >
                      <path
                        fill="currentColor"
                        d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h12q.825 0 1.413.588T18 6v4.5l3.15-3.15q.25-.25.55-.125t.3.475v8.6q0 .35-.3.475t-.55-.125L18 13.5V18q0 .825-.587 1.413T16 20zm0-2h12V6H4zm0 0V6z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wide">
                      Videos
                    </p>
                    <p className="text-sm font-semibold text-slate-200">
                      {course.videos.length}
                    </p>
                  </div>
                </div>
              </div>

              {/* Duration */}
              <div className="bg-linear-to-br from-slate-700/30 to-slate-800/30 border border-slate-600/30 rounded-lg p-4 backdrop-blur-sm hover:border-slate-500/50 transition-all">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-orange-500/10 border border-orange-500/20">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 512 512"
                      className="w-5 h-5 text-orange-400"
                      fill="currentColor"
                    >
                      <path
                        fill="currentColor"
                        d="M256 23c-3.7 0-7.4.1-11.1.27l.8 17.98c3.4-.16 6.8-.25 10.3-.25c118.8 0 215 96.2 215 215s-96.2 215-215 215c-89.6 0-166.35-54.7-198.65-132.6l27.63-8.3l-48.43-34.3l-19.05 54.5l22.55-6.7C74.68 428.8 158.4 489 256 489c128.6 0 233-104.4 233-233S384.6 23 256 23m-30.8 2.04c-13.3 1.75-26.1 4.6-38.6 8.48l5.6 17.09c11.4-3.54 23.3-6.15 35.4-7.75zm-57 15.12c-12.4 5.05-24.2 11.12-35.4 18.12l9.5 15.21c10.3-6.44 21.2-12.03 32.6-16.67zM116.4 69.5a234 234 0 0 0-29.35 26.12l13.05 12.28c8.3-8.77 17.4-16.81 27-24.06l-4.8-6.57zm69.5 8.58l-4.4 17.44l217 55.48l4.4-17.4zM74.07 110.5c-8.19 10.2-15.54 21.2-21.94 32.7l15.65 8.8c5.91-10.7 12.69-20.8 20.26-30.3zm127.63 8.8c-3.9 26 2.8 55.2 14.2 79.2c6.4 13.4 14.2 25.2 21.9 33.8c4.2 4.7 8.4 8.3 12.2 10.9l-5.4 21.2c-4.6.4-10 1.6-16 3.7c-10.9 3.8-23.4 10.4-35.4 19.1c-21.6 15.6-41.4 37.9-50.4 62.6l167.5 42.9c3.9-26-2.8-55.2-14.2-79.2c-6.4-13.4-14.2-25.2-21.9-33.8c-4.2-4.7-8.4-8.3-12.2-10.9l5.4-21.2c4.5-.5 10-1.6 16-3.7c10.9-3.8 23.4-10.4 35.4-19.1c21.6-15.6 41.4-37.9 50.4-62.6zM43.24 160.9c-5.33 12-9.7 24.4-13 37.3l17.48 4.2c3.03-11.8 7.04-23.2 11.95-34.2zM26.2 217.5C24.11 230 23 242.9 23 256v.9l18-.2v-.7c0-12.1 1.02-24 2.95-35.6zM113.5 361l-4.4 17.4l217 55.5l4.4-17.4z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wide">
                      Duration
                    </p>
                    <p className="text-sm font-semibold text-slate-200">
                      {(() => {
                        const totalSeconds = course.videos.reduce((acc, v) => {
                          const [mins, secs] = v.duration
                            .split(":")
                            .map(Number);
                          return acc + mins * 60 + (secs || 0);
                        }, 0);
                        const totalMinutes = Math.round(totalSeconds / 60);
                        const hours = Math.floor(totalMinutes / 60);
                        const minutes = totalMinutes % 60;

                        if (hours > 0) {
                          return `${hours}h ${minutes}m`;
                        }
                        return `${totalMinutes}m`;
                      })()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Practice Tasks */}
              <div className="bg-linear-to-br from-slate-700/30 to-slate-800/30 border border-slate-600/30 rounded-lg p-4 backdrop-blur-sm hover:border-slate-500/50 transition-all">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20">
                    <svg
                      className="w-5 h-5 text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wide">
                      Practice
                    </p>
                    <p className="text-sm font-semibold text-slate-200">
                      {
                        course.videos.filter(
                          (v) => v.task && Object.keys(v.task).length > 0,
                        ).length
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* Challenges */}
              <div className="bg-linear-to-br from-slate-700/30 to-slate-800/30 border border-slate-600/30 rounded-lg p-4 backdrop-blur-sm hover:border-slate-500/50 transition-all">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                      className="w-5 h-5 text-green-400"
                    >
                      <path
                        fill="currentColor"
                        d="M7 21v-2h4v-3.1q-1.225-.275-2.187-1.037T7.4 12.95q-1.875-.225-3.137-1.637T3 8V5h4V3h10v2h4v3q0 1.9-1.263 3.313T16.6 12.95q-.45 1.15-1.412 1.913T13 15.9V19h4v2zm0-10.2V7H5v1q0 .95.55 1.713T7 10.8m5 3.2q1.25 0 2.125-.875T15 11V5H9v6q0 1.25.875 2.125T12 14m5-3.2q.9-.325 1.45-1.088T19 8V7h-2zm-5-1.3"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wide">
                      Challenges
                    </p>
                    <p className="text-sm font-semibold text-slate-200">
                      {course.videos.reduce(
                        (acc, v) => acc + (v.challenges?.length || 0),
                        0,
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
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
