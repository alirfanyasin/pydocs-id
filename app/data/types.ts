export interface CodeExample {
  previewImages?: string[];
  id: string;
  title: string;
  description: string;
  code: string;
  output: string;
  defaultStdin?: string;
  lineExplanations?: {
    line: string;
    explanation: string;
  }[];
}

export interface QuizItem {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface CodingChallenge {
  expectedImages?: string[];
  id: string;
  title: string;
  difficulty: "Mudah" | "Sedang" | "Menantang";
  scenario?: string;
  instructions: string;
  tasks: string[];
  starterCode: string;
  expectedOutput: string;
  defaultStdin?: string;
  hint: string;
  solutionCode: string;
}

export interface ConceptTable {
  title: string;
  headers: string[];
  rows: string[][];
}

export interface DocSection {
  id: string;
  number: number;
  filePath?: string;
  title: string;
  subtitle: string;
  level: "Pemula" | "Dasar" | "Menengah Dasar" | "Menengah" | "Ujian Akhir";
  readTime: string;
  summary: string;
  keyPoints: string[];
  conceptTable?: ConceptTable;
  examples: CodeExample[];
  tips?: string[];
  commonMistakes?: {
    wrong: string;
    correct: string;
    reason: string;
  }[];
  quiz?: QuizItem;
  quizzes?: QuizItem[];
  caseStudies?: CodingChallenge[];
  codingChallenges?: CodingChallenge[];
  isCustom?: boolean;
  isExam?: boolean;
}
