export type Difficulty = "Beginner" | "Intermediate" | "Advanced";
export type Category =
  | "Biology"
  | "History"
  | "Computer Science"
  | "Law"
  | "Economics"
  | "Chemistry"
  | "Physics"
  | "Mathematics";

export interface StudySet {
  id: string;
  title: string;
  description: string;
  category: Category;
  difficulty: Difficulty;
  flashcards: number;
  quizQuestions: number;
  uploadedBy: string;
  avatar: string;
  createdAt: string;
}

export const studySets: StudySet[] = [
  {
    id: "1",
    title: "Cell Biology — Membrane Transport",
    description: "Key mechanisms of active and passive transport across cell membranes including osmosis, diffusion, and protein channels.",
    category: "Biology",
    difficulty: "Intermediate",
    flashcards: 24,
    quizQuestions: 15,
    uploadedBy: "Sarah Chen",
    avatar: "SC",
    createdAt: "2025-06-10",
  },
  {
    id: "2",
    title: "World War II — Causes & Consequences",
    description: "Comprehensive overview of the political, economic, and social factors that led to WWII and its lasting global impact.",
    category: "History",
    difficulty: "Beginner",
    flashcards: 32,
    quizQuestions: 20,
    uploadedBy: "Marcus Williams",
    avatar: "MW",
    createdAt: "2025-06-12",
  },
  {
    id: "3",
    title: "Data Structures — Trees & Graphs",
    description: "Binary trees, AVL trees, BFS, DFS, and graph traversal algorithms with complexity analysis.",
    category: "Computer Science",
    difficulty: "Advanced",
    flashcards: 40,
    quizQuestions: 25,
    uploadedBy: "Priya Patel",
    avatar: "PP",
    createdAt: "2025-06-14",
  },
  {
    id: "4",
    title: "Contract Law — Offer & Acceptance",
    description: "Fundamentals of contract formation including offer, acceptance, consideration, and capacity to contract.",
    category: "Law",
    difficulty: "Intermediate",
    flashcards: 28,
    quizQuestions: 18,
    uploadedBy: "James Okafor",
    avatar: "JO",
    createdAt: "2025-06-15",
  },
  {
    id: "5",
    title: "Macroeconomics — GDP & Inflation",
    description: "Understanding national income accounting, inflation metrics, and the relationship between money supply and price levels.",
    category: "Economics",
    difficulty: "Beginner",
    flashcards: 20,
    quizQuestions: 12,
    uploadedBy: "Lena Müller",
    avatar: "LM",
    createdAt: "2025-06-16",
  },
  {
    id: "6",
    title: "Organic Chemistry — Reaction Mechanisms",
    description: "SN1, SN2, E1, and E2 reactions with nucleophiles, leaving groups, and stereochemistry considerations.",
    category: "Chemistry",
    difficulty: "Advanced",
    flashcards: 45,
    quizQuestions: 30,
    uploadedBy: "Diego Ramirez",
    avatar: "DR",
    createdAt: "2025-06-17",
  },
  {
    id: "7",
    title: "Quantum Mechanics — Wave Functions",
    description: "Introduction to Schrödinger's equation, wave-particle duality, and probability distributions in quantum systems.",
    category: "Physics",
    difficulty: "Advanced",
    flashcards: 38,
    quizQuestions: 22,
    uploadedBy: "Aisha Kamara",
    avatar: "AK",
    createdAt: "2025-06-18",
  },
  {
    id: "8",
    title: "Linear Algebra — Matrices & Vectors",
    description: "Matrix operations, determinants, eigenvalues, eigenvectors, and their applications in data science.",
    category: "Mathematics",
    difficulty: "Intermediate",
    flashcards: 34,
    quizQuestions: 20,
    uploadedBy: "Tom Fischer",
    avatar: "TF",
    createdAt: "2025-06-19",
  },
  {
    id: "9",
    title: "Genetics — DNA Replication",
    description: "Detailed walkthrough of DNA replication, repair mechanisms, and the role of polymerases and helicases.",
    category: "Biology",
    difficulty: "Advanced",
    flashcards: 42,
    quizQuestions: 28,
    uploadedBy: "Sarah Chen",
    avatar: "SC",
    createdAt: "2025-06-20",
  },
  {
    id: "10",
    title: "Cold War — Ideological Conflict",
    description: "US vs Soviet Union tensions, proxy wars, arms race, and the eventual collapse of the Soviet bloc.",
    category: "History",
    difficulty: "Intermediate",
    flashcards: 30,
    quizQuestions: 18,
    uploadedBy: "Marcus Williams",
    avatar: "MW",
    createdAt: "2025-06-21",
  },
  {
    id: "11",
    title: "Algorithms — Sorting & Searching",
    description: "Bubble, merge, quick, and heap sort with binary search and time complexity comparisons.",
    category: "Computer Science",
    difficulty: "Intermediate",
    flashcards: 36,
    quizQuestions: 22,
    uploadedBy: "Priya Patel",
    avatar: "PP",
    createdAt: "2025-06-22",
  },
  {
    id: "12",
    title: "Calculus — Integration Techniques",
    description: "Substitution, integration by parts, partial fractions, and trigonometric integrals with worked examples.",
    category: "Mathematics",
    difficulty: "Beginner",
    flashcards: 26,
    quizQuestions: 16,
    uploadedBy: "Tom Fischer",
    avatar: "TF",
    createdAt: "2025-06-23",
  },
];