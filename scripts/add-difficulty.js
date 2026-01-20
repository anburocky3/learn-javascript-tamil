import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const coursesPath = join(__dirname, "../src/data/courses.json");

// Read courses.json
const courses = JSON.parse(readFileSync(coursesPath, "utf-8"));

let challengesUpdated = 0;

// Add difficulty to all challenges that don't have it
for (const course of courses) {
  for (const video of course.videos) {
    if (video.challenges && Array.isArray(video.challenges)) {
      for (const challenge of video.challenges) {
        if (!challenge.difficulty) {
          challenge.difficulty = "Easy"; // Default difficulty
          challengesUpdated++;
        }
      }
    }
  }
}

// Write back to courses.json
writeFileSync(coursesPath, JSON.stringify(courses, null, 2), "utf-8");

console.log(`✅ Added difficulty field to ${challengesUpdated} challenges`);
