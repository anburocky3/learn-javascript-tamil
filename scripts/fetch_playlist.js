#!/usr/bin/env node

// Usage: node scripts/fetch_playlist.mjs <playlistId> <courseId> <courseTitle> <category> <thumbnail>
// Example: node scripts/fetch_playlist.mjs PL73Obo20O_7ihsIM5K-hHYPrcqkkdQcLa js-fundamentals "JavaScript Fundamentals" "JS Fundamentals" "/thumbnails/js-fundamentals.svg"

import fs from "fs";
import path from "path";
import ytpl from "@distube/ytpl";
import { log } from "console";

async function main() {
  const targets = [
    {
      playlistId: "PL73Obo20O_7ihsIM5K-hHYPrcqkkdQcLa",
      courseId: "js-fundamentals",
      courseTitle: "JavaScript Fundamentals",
      category: "JS Fundamentals",
      thumbnail: "/thumbnails/js-fundamentals.svg",
    },
    {
      playlistId: "PL73Obo20O_7jhOOPDASWk0PVcRxGEyrm9",
      courseId: "js-dom",
      courseTitle: "JavaScript DOM",
      category: "JS DOM",
      thumbnail: "/thumbnails/js-dom.svg",
    },
  ];

  const courses = [];
  const coursesPath = path.join(process.cwd(), "src", "data", "courses.json");

  for (const t of targets) {
    try {
      console.log(
        "Fetching playlist",
        `https://www.youtube.com/playlist?list=${t.playlistId}`
      );
      const playlist = await ytpl(
        `https://www.youtube.com/playlist?list=${t.playlistId}`
      );

      log(`Fetched ${playlist.items.length} videos.`);

      const videos = playlist.items.map((item) => ({
        videoId: item.id,
        title: item.title,
        duration: item.duration || "0:00",
        task: {
          title: `Practice: ${item.title}`,
          problemStatement: `Implement the example shown in the video titled "${item.title}".`,
          difficulty: "Medium",
          expectedOutput: "/placeholders/output-placeholder.svg",
        },
      }));

      const newCourse = {
        id: t.courseId,
        title: t.courseTitle,
        description: playlist.description || `Playlist: ${playlist.title}`,
        thumbnail: t.thumbnail || "/placeholders/output-placeholder.svg",
        category: t.category || "Uncategorized",
        videos,
        challenges: [],
      };

      courses.push(newCourse);
    } catch (err) {
      console.error(
        "Failed to fetch playlist",
        t.playlistId,
        err?.message ?? err
      );
    }
  }

  if (courses.length === 0) {
    console.error("No courses generated. Exiting.");
    process.exit(1);
  }

  fs.writeFileSync(coursesPath, JSON.stringify(courses, null, 2), "utf8");
  console.log(
    "courses.json overwritten with:",
    courses.map((c) => c.id).join(", ")
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
