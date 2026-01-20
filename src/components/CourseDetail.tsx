"use client";

import { useState } from "react";
import Image from "next/image";
import VideoPlayer from "@/components/VideoPlayer";
import TaskCard from "@/components/TaskCard";
import { useProgress } from "@/hooks/useProgress";
import type { Course, Video } from "@/types";
import { isObjEmpty } from "@/utils/helper";

export default function CourseDetail({ course }: { course: Course }) {
  const [index, setIndex] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"task" | "challenges">("task");
  const video: Video = course.videos[index];
  const {
    isCompleted,
    toggleCompleted,
    isChallengeCompleted,
    toggleChallengeCompleted,
  } = useProgress();

  const completedVideos = course.videos.filter((v) =>
    isCompleted(course.id, v.videoId),
  ).length;

  const filteredVideos = course.videos.filter(
    (v) =>
      v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.duration.includes(searchQuery),
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-600 bg-green-50";
      case "Medium":
        return "text-yellow-600 bg-yellow-50";
      case "Hard":
        return "text-red-600 bg-red-50";
      default:
        return "text-slate-600 bg-slate-50";
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Progress Bar */}
      <div className="sticky top-0 z-40 bg-slate-800/80 backdrop-blur border-b border-slate-700 px-6 py-4">
        <div className="">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-slate-200">
              Course Progress
            </h3>
            <span className="text-sm font-medium text-indigo-400">
              {completedVideos} / {course.videos.length} videos
            </span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div
              className="bg-linear-to-r from-indigo-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${(completedVideos / course.videos.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-full mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left Sidebar - Expanded Video Concepts List */}
          <aside className="lg:col-span-2">
            <div className="sticky top-24 space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search videos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <svg
                  className="absolute right-3 top-2.5 w-5 h-5 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              {/* Video Counter - Only show when filtering */}
              {searchQuery && (
                <div className="bg-slate-700/50 rounded-lg p-3 border border-slate-600">
                  <p className="text-xs text-slate-400">Videos found</p>
                  <p className="text-lg font-semibold text-indigo-400">
                    {filteredVideos.length} / {course.videos.length}
                  </p>
                </div>
              )}

              {/* Video List */}
              <div className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto">
                {filteredVideos.map((v: Video, i: number) => {
                  const originalIndex = course.videos.indexOf(v);
                  const isActive = originalIndex === index;
                  const isVideoCompleted = isCompleted(course.id, v.videoId);

                  return (
                    <button
                      key={v.videoId}
                      onClick={() => setIndex(originalIndex)}
                      className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                        isActive
                          ? "bg-linear-to-r from-indigo-600 to-indigo-700 ring-2 ring-indigo-500"
                          : "bg-slate-700 hover:bg-slate-600"
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm text-slate-100 truncate">
                            {(() => {
                              const cleaned = v.title
                                .replace(
                                  / - \(தமிழில்\) \(Tamil\) \| JavaScript \w+/g,
                                  "",
                                )
                                .trim();
                              return cleaned.length > 120
                                ? cleaned.substring(0, 120) + "..."
                                : cleaned;
                            })()}
                          </div>
                          <div className="text-xs text-slate-400 mt-1">
                            {v.duration} mins
                          </div>
                        </div>
                        {isVideoCompleted && (
                          <div className="shrink-0 text-green-400">
                            <svg
                              className="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Right Section - Video Preview & Tasks */}
          <main className="lg:col-span-3 space-y-6">
            {/* Video Player Preview */}
            <div className="sticky top-24 bg-slate-700/30 rounded-xl overflow-hidden border border-slate-600/50 backdrop-blur">
              <div className="aspect-video bg-black">
                <VideoPlayer videoId={video.videoId} />
              </div>

              {/* Video Header Info */}
              <div className="p-4 border-t border-slate-600/50 bg-slate-800/50">
                <h2 className="font-semibold text-lg text-slate-100 line-clamp-2 mb-2">
                  {video.title}
                </h2>
                <div className="flex items-center gap-3 justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">
                      {video.duration} mins
                    </span>
                    {isCompleted(course.id, video.videoId) && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-500/20 text-green-400 rounded text-xs">
                        <svg
                          className="w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Done
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => toggleCompleted(course.id, video.videoId)}
                    className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                      isCompleted(course.id, video.videoId)
                        ? "bg-green-600 text-white"
                        : "bg-indigo-600 text-white hover:bg-indigo-700"
                    }`}
                  >
                    {isCompleted(course.id, video.videoId) ? "✓" : "Mark Done"}
                  </button>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setIndex(Math.max(0, index - 1))}
                disabled={index === 0}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-600 hover:bg-slate-500 disabled:bg-slate-700 disabled:opacity-50 text-slate-100 rounded-lg transition-colors font-medium"
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
                Previous
              </button>
              <button
                onClick={() =>
                  setIndex(Math.min(course.videos.length - 1, index + 1))
                }
                disabled={index === course.videos.length - 1}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 disabled:opacity-50 text-white rounded-lg transition-colors font-medium"
              >
                Next
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            {/* Practice Task & Challenges Tabs */}
            {(!isObjEmpty(video.task) ||
              (video.challenges && video.challenges.length > 0)) && (
              <div className="bg-slate-700/70 rounded-xl border border-slate-600 backdrop-blur overflow-hidden">
                {/* Tab Headers */}
                <div className="flex border-b border-slate-600/50">
                  <button
                    onClick={() => setActiveTab("task")}
                    className={`flex-1 px-6 py-4 font-medium transition-colors ${
                      activeTab === "task"
                        ? "bg-indigo-600/20 text-indigo-400 border-b-2 border-indigo-500"
                        : "text-slate-400 hover:text-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                      Practice Task
                    </div>
                  </button>
                  {video.challenges && video.challenges.length > 0 && (
                    <button
                      onClick={() => setActiveTab("challenges")}
                      className={`flex-1 px-6 py-4 font-medium transition-colors ${
                        activeTab === "challenges"
                          ? "bg-orange-600/20 text-orange-400 border-b-2 border-orange-500"
                          : "text-slate-400 hover:text-slate-300"
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                        Challenges
                        <span className="ml-2 px-2 py-1 bg-orange-500/30 text-orange-400 rounded text-xs">
                          {video.challenges.length}
                        </span>
                      </div>
                    </button>
                  )}
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  {activeTab === "task" && (
                    <div>
                      <TaskCard
                        task={video.task}
                        completed={isCompleted(course.id, video.videoId)}
                        onToggle={() =>
                          toggleCompleted(course.id, video.videoId)
                        }
                      />
                    </div>
                  )}

                  {activeTab === "challenges" && video.challenges && (
                    <div className="space-y-4">
                      {video.challenges.length === 0 ? (
                        <div className="text-center py-8 text-slate-400">
                          <p>No challenges available for this video yet.</p>
                        </div>
                      ) : (
                        video.challenges.map((ch) => {
                          const isChallengeComplete = isChallengeCompleted(
                            course.id,
                            ch.id,
                          );
                          return (
                            <div
                              key={ch.id}
                              className="bg-linear-to-br from-orange-900/30 to-red-900/20 border border-orange-500/30 rounded-xl p-5 hover:border-orange-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20"
                            >
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-3">
                                    <h4 className="font-bold text-slate-100 text-lg">
                                      {ch.title}
                                    </h4>
                                    <span
                                      className={`text-xs px-3 py-1 rounded-full font-semibold ${
                                        ch.difficulty === "Easy"
                                          ? "bg-green-500/30 text-green-300"
                                          : ch.difficulty === "Medium"
                                            ? "bg-yellow-500/30 text-yellow-300"
                                            : "bg-red-500/30 text-red-300"
                                      }`}
                                    >
                                      {ch.difficulty}
                                    </span>
                                  </div>
                                  <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                                    {ch.description}
                                  </p>
                                  {ch.expectedOutput && (
                                    <div className="mt-4">
                                      <p className="text-xs font-medium text-slate-400 mb-2">
                                        Expected Output:
                                      </p>
                                      <div className="w-full h-48 relative rounded-lg overflow-hidden border border-slate-600">
                                        <Image
                                          src={ch.expectedOutput}
                                          alt={ch.title}
                                          fill
                                          className="object-contain p-4 bg-slate-800"
                                        />
                                      </div>
                                    </div>
                                  )}
                                </div>

                                <button
                                  onClick={() =>
                                    toggleChallengeCompleted(course.id, ch.id)
                                  }
                                  className={`shrink-0 px-4 py-2 rounded-lg font-medium transition-all ${
                                    isChallengeComplete
                                      ? "bg-green-600 text-white hover:bg-green-700"
                                      : "bg-orange-600 text-white hover:bg-orange-700"
                                  }`}
                                >
                                  {isChallengeComplete ? (
                                    <span className="flex items-center gap-2">
                                      <svg
                                        className="w-4 h-4"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                      Completed
                                    </span>
                                  ) : (
                                    "Complete"
                                  )}
                                </button>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
