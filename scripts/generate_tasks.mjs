#!/usr/bin/env node

import fs from "fs";
import path from "path";

const COURSES_PATH = path.join(process.cwd(), "src", "data", "courses.json");

function guessDifficulty(title) {
  const s = title.toLowerCase();
  if (/intro|what is|why|setting up|first|what's|beginner|basics/.test(s))
    return "Easy";
  if (
    /arrays|objects|functions|loops|operators|scope|modules|events|dom|forms|validation/.test(
      s
    )
  )
    return "Medium";
  return "Hard";
}

function genTaskFromTitle(title) {
  const s = title.toLowerCase();
  if (/variables|const|constants/.test(s)) {
    return {
      title: "Variables & Scope Exercise",
      problemStatement:
        "Create examples demonstrating `var`, `let`, and `const`. Show hoisting, scope differences, and give small snippets explaining when to use each. Include short assertions.",
    };
  }
  if (/arrays/.test(s)) {
    return {
      title: "Array Utilities",
      problemStatement:
        "Implement `unique`, `pluck`, and `groupBy` utility functions for arrays and include simple usage examples.",
    };
  }
  if (/objects|oop|object/.test(s)) {
    return {
      title: "Objects & OOP Exercise",
      problemStatement:
        "Create a constructor or factory making a simple `Counter` with methods and show prototypal or class-based usage. Include a brief explanation of `this` behaviour.",
    };
  }
  if (/functions/.test(s)) {
    return {
      title: "Closures & Higher-order Functions",
      problemStatement:
        "Build a `memoize` wrapper and a `once` function to demonstrate closures and higher-order functions. Include short examples.",
    };
  }
  if (/operators|ternary|logical|comparison|equality/.test(s)) {
    return {
      title: "Operator Corner Cases",
      problemStatement:
        "Create small examples that demonstrate tricky cases for comparison and logical operators, including truthy/falsy and loose vs strict equality.",
    };
  }
  if (/loops/.test(s)) {
    return {
      title: "Loop Patterns",
      problemStatement:
        "Write examples using `for`, `for..of`, `for..in`, and `while` loops to process arrays and objects, showing when each is useful.",
    };
  }
  if (/dom|document/.test(s)) {
    return {
      title: "DOM Basics",
      problemStatement:
        "Select elements, modify their content, and dynamically create new elements. Add event listeners and demonstrate removing elements.",
    };
  }
  if (/events/.test(s)) {
    return {
      title: "Event Handling",
      problemStatement:
        "Implement a todo list that uses event delegation for item actions and supports keyboard interactions for accessibility.",
    };
  }
  // default
  return {
    title: `Practice: ${title}`,
    problemStatement: `Recreate the example shown in the video titled "${title}" and explain the key points.`,
  };
}

function generateChallengesForCourse(course) {
  const base = course.title.toLowerCase();
  if (base.includes("fundament")) {
    return [
      {
        id: "fund-ch-1",
        title: "Mini Calculator",
        description:
          "Build a calculator supporting + - * / with edge-case handling and tests.",
        expectedOutput: "/placeholders/output-placeholder.svg",
        difficulty: "Medium",
      },
      {
        id: "fund-ch-2",
        title: "Memoize and Benchmark",
        description:
          "Implement memoize and show performance improvement on an expensive recursive function.",
        expectedOutput: "/placeholders/output-placeholder.svg",
        difficulty: "Hard",
      },
    ];
  }

  if (base.includes("dom")) {
    return [
      {
        id: "dom-ch-1",
        title: "Accessibility Checklist",
        description:
          "Improve a small widget for keyboard and screen reader accessibility and document changes.",
        expectedOutput: "/placeholders/output-placeholder.svg",
        difficulty: "Easy",
      },
      {
        id: "dom-ch-2",
        title: "Interactive Gallery",
        description:
          "Build a gallery with lazy-loading, keyboard navigation, and lightbox support.",
        expectedOutput: "/placeholders/output-placeholder.svg",
        difficulty: "Medium",
      },
    ];
  }

  // fallback
  return [
    {
      id: `${course.id}-ch-1`,
      title: `${course.title} Challenge 1`,
      description: `A practice challenge for ${course.title}`,
      expectedOutput: "/placeholders/output-placeholder.svg",
      difficulty: "Medium",
    },
  ];
}

function main() {
  const raw = fs.readFileSync(COURSES_PATH, "utf8");
  const courses = JSON.parse(raw);

  const updated = courses.map((course) => {
    const videos = course.videos.map((v) => {
      const guess = genTaskFromTitle(v.title);
      return {
        ...v,
        task: {
          title: guess.title,
          problemStatement: guess.problemStatement,
          difficulty: guessDifficulty(v.title),
          expectedOutput:
            v.task?.expectedOutput ?? "/placeholders/output-placeholder.svg",
        },
      };
    });

    const challenges = generateChallengesForCourse(course);

    return {
      ...course,
      videos,
      challenges,
    };
  });

  fs.writeFileSync(COURSES_PATH, JSON.stringify(updated, null, 2), "utf8");
  console.log("Updated tasks and challenges written to", COURSES_PATH);
}

main();
