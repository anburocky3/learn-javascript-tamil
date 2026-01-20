import { readFileSync, writeFileSync, existsSync, unlinkSync } from "fs";
import { join } from "path";

const dataDir = "src/data";

// Load all task files
const loadTaskFiles = () => {
  const taskFiles = [
    "video-tasks-10-27.json",
    "video-tasks-28-42.json",
    "video-tasks-28-55.json",
    "video-tasks-56-70.json",
    "video-tasks-71-83.json",
  ];

  const allTasks = {};

  taskFiles.forEach((file) => {
    const filePath = join(dataDir, file);
    const content = readFileSync(filePath, "utf8");
    const tasks = JSON.parse(content);

    // Index tasks by videoId
    tasks.forEach((task) => {
      allTasks[task.videoId] = {
        task: task.task,
        challenges: task.challenges || [],
      };
    });
  });

  return allTasks;
};

// Main merge function
const mergeTasks = () => {
  console.log("Loading task files...");
  const allTasks = loadTaskFiles();

  console.log("Loading courses.json...");
  const coursesPath = join(dataDir, "courses.json");
  const coursesContent = readFileSync(coursesPath, "utf8");
  const courses = JSON.parse(coursesContent);

  console.log("Merging tasks into courses...");
  let mergedCount = 0;
  let totalVideos = 0;

  // Merge tasks into each course
  courses.forEach((course) => {
    if (course.videos && Array.isArray(course.videos)) {
      course.videos.forEach((video) => {
        totalVideos++;
        if (allTasks[video.videoId]) {
          video.task = allTasks[video.videoId].task;
          video.challenges = allTasks[video.videoId].challenges;
          mergedCount++;
        }
      });
    }
  });

  console.log(
    `Merged ${mergedCount} videos out of ${totalVideos} total videos`,
  );

  // Write back merged courses.json
  console.log("Writing merged courses.json...");
  writeFileSync(coursesPath, JSON.stringify(courses, null, 2), "utf8");
  console.log("✓ courses.json updated successfully");

  // Delete individual task files
  console.log("\nDeleting individual task files...");
  const taskFiles = [
    "video-tasks-10-27.json",
    "video-tasks-28-42.json",
    "video-tasks-28-55.json",
    "video-tasks-56-70.json",
    "video-tasks-71-83.json",
  ];

  taskFiles.forEach((file) => {
    const filePath = join(dataDir, file);
    if (existsSync(filePath)) {
      unlinkSync(filePath);
      console.log(`✓ Deleted ${file}`);
    }
  });

  console.log("\n✓ All done! Task data merged successfully.");
};

// Run the merge
try {
  mergeTasks();
} catch (error) {
  console.error("Error:", error.message);
  process.exit(1);
}
