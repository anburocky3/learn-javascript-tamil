export type Task = {
  title: string;
  problemStatement: string;
  difficulty: "Easy" | "Medium" | "Hard";
  expectedOutput?: string;
};

export type Challenge = {
  id: string;
  title: string;
  description: string;
  expectedOutput?: string;
  difficulty: "Easy" | "Medium" | "Hard";
};

export type Video = {
  videoId: string;
  title: string;
  duration: string;
  task: Task;
  challenges?: Challenge[];
};

export type Course = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  videos: Video[];
  challenges?: Challenge[];
};
