import { useEffect, useState } from "react";

const STORAGE_KEY = "cyberdude:progress";

export function useProgress() {
  const [completed, setCompleted] = useState<Set<string>>(() => {
    try {
      if (typeof window !== "undefined") {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) return new Set(JSON.parse(raw));
      }
    } catch (e) {
      console.error("Failed to read progress during initialization:", e);
    }
    return new Set();
  });

  useEffect(() => {
    try {
      const arr = Array.from(completed);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
    } catch (e) {
      console.error("Failed to save progress:", e);
    }
  }, [completed]);

  function key(courseId: string, videoId: string) {
    return `${courseId}:${videoId}`;
  }

  function challengeKey(courseId: string, challengeId: string) {
    return `${courseId}:challenge:${challengeId}`;
  }

  function isCompleted(courseId: string, videoId: string) {
    return completed.has(key(courseId, videoId));
  }

  function toggleCompleted(courseId: string, videoId: string) {
    setCompleted((prev) => {
      const next = new Set(prev);
      const k = key(courseId, videoId);
      if (next.has(k)) next.delete(k);
      else next.add(k);
      return next;
    });
  }

  function isChallengeCompleted(courseId: string, challengeId: string) {
    return completed.has(challengeKey(courseId, challengeId));
  }

  function toggleChallengeCompleted(courseId: string, challengeId: string) {
    setCompleted((prev) => {
      const next = new Set(prev);
      const k = challengeKey(courseId, challengeId);
      if (next.has(k)) next.delete(k);
      else next.add(k);
      return next;
    });
  }

  function countForCourse(courseId: string, videos: { videoId: string }[]) {
    return videos.reduce(
      (acc, v) => (isCompleted(courseId, v.videoId) ? acc + 1 : acc),
      0
    );
  }

  return {
    isCompleted,
    toggleCompleted,
    isChallengeCompleted,
    toggleChallengeCompleted,
    countForCourse,
    completed,
  };
}
