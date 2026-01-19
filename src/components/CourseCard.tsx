import Link from "next/link";
import Image from "next/image";
import type { Course } from "@/types";

export default function CourseCard({
  course,
  completed = 0,
}: {
  course: Course;
  completed?: number;
}) {
  const completionPercentage = Math.round(
    (completed / course.videos.length) * 100,
  );

  return (
    <Link
      href={`/courses/${course.id}`}
      className="group block h-full bg-gradient-to-br from-slate-700/40 to-slate-800/40 border border-slate-600/50 rounded-xl overflow-hidden hover:border-indigo-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 backdrop-blur"
    >
      <div className="h-48 bg-slate-800 relative overflow-hidden">
        <Image
          src={course.thumbnail}
          alt={course.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-bold text-lg text-slate-100 flex-1 group-hover:text-indigo-400 transition-colors">
            {course.title}
          </h3>
        </div>

        <span className="inline-block px-3 py-1 bg-indigo-600/20 text-indigo-400 rounded-full text-xs font-semibold border border-indigo-500/30 mb-3">
          {course.category}
        </span>

        <p className="text-sm text-slate-400 mb-4 line-clamp-2">
          {course.description}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4 p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
          <div className="text-center">
            <div className="text-lg font-bold text-indigo-400">
              {course.videos.length}
            </div>
            <div className="text-xs text-slate-400">Videos</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-400">{completed}</div>
            <div className="text-xs text-slate-400">Completed</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Progress</span>
            <span className="text-xs font-semibold text-indigo-400">
              {completionPercentage}%
            </span>
          </div>
          <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden border border-slate-600/50">
            <div
              className="bg-gradient-to-r from-indigo-600 to-indigo-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        {/* CTA Button */}
        <button className="w-full mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors group-hover:shadow-lg group-hover:shadow-indigo-500/30">
          {completionPercentage === 100 ? "Review Course" : "Continue Learning"}
        </button>
      </div>
    </Link>
  );
}
