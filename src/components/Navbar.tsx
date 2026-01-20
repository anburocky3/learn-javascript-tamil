import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-slate-800/80 backdrop-blur border-b border-slate-700/50 shadow-lg">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-linear-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-yellow-500/30 group-hover:shadow-yellow-500/50 transition-all">
            JS
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-slate-100 group-hover:text-indigo-400 transition-colors">
              Learn JavaScript
            </span>
            <span className="text-xs text-slate-400">
              in <span className="font-ta tracking-wider">தமிழ்</span>
            </span>
          </div>
        </Link>

        <div className="flex gap-2 items-center text-sm">
          <Link
            href="/courses"
            className="px-4 py-2 text-slate-300 hover:text-slate-100 hover:bg-slate-700/50 rounded-lg transition-colors font-medium"
          >
            Courses
          </Link>
        </div>
      </div>
    </nav>
  );
}
