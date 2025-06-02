export interface BreathingTask {
  id: number;
  title: string;
  completed: boolean;
}

export interface TaskGroup {
  id: number;
  name: string;
  level: number;
  description: string;
  tasks: BreathingTask[];
  badge: string;
}

export const breathingTaskGroups: TaskGroup[] = [
  {
    id: 1,
    name: "Getting Started",
    level: 1,
    description: "Breathing Basics",
    badge: "Breath Explorer",
    tasks: [
      {
        id: 1,
        title: "Complete your first 1-minute breath awareness session",
        completed: false,
      },
      {
        id: 2,
        title: "Learn about nose vs. mouth breathing",
        completed: false,
      },
      {
        id: 3,
        title: "Watch the 'What is Diaphragmatic Breathing?' tutorial",
        completed: false,
      },
      {
        id: 4,
        title: "Practice 3 minutes of nasal breathing",
        completed: false,
      },
      {
        id: 5,
        title: "Try the Carbon Dioxide Tolerance Test",
        completed: false,
      },
      { id: 6, title: "Record your baseline BOLT score", completed: false },
      {
        id: 7,
        title: "Journal your experience after a breath session",
        completed: false,
      },
      {
        id: 8,
        title: "Try slow breathing at 6 breaths per minute for 3 minutes",
        completed: false,
      },
      {
        id: 9,
        title: "Practice breathing while lying down with a book on your belly",
        completed: false,
      },
      {
        id: 10,
        title: "Earn your first badge: 'Breath Explorer'",
        completed: false,
      },
    ],
  },
  {
    id: 2,
    name: "Building Awareness",
    level: 2,
    description: "Observation & Control",
    badge: "Breath Observer",
    tasks: [
      {
        id: 11,
        title: "Practice 5 minutes of breath awareness for 3 days in a row",
        completed: false,
      },
      {
        id: 12,
        title: "Complete your first diaphragmatic breathing exercise",
        completed: false,
      },
      {
        id: 13,
        title: "Record 3 consecutive days of nasal-only breathing",
        completed: false,
      },
      { id: 14, title: "Try 4-6 breathing for 3 minutes", completed: false },
      {
        id: 15,
        title: "Journal your stress level before/after a session",
        completed: false,
      },
      {
        id: 16,
        title: "Try breath-focused body scanning for 5 minutes",
        completed: false,
      },
      {
        id: 17,
        title: "Watch a tip video on posture and breath",
        completed: false,
      },
      {
        id: 18,
        title: "Practice 5 light air hunger breath holds",
        completed: false,
      },
      {
        id: 19,
        title: "Log your Control Pause (CP) daily for 3 days",
        completed: false,
      },
      { id: 20, title: "Earn badge: 'Breath Observer'", completed: false },
    ],
  },
  {
    id: 3,
    name: "Habit Building",
    level: 3,
    description: "Daily Practice",
    badge: "Habit Builder",
    tasks: [
      {
        id: 21,
        title: "Practice breathing every day for 7 consecutive days",
        completed: false,
      },
      {
        id: 22,
        title: "Complete a breathing streak of 5 days",
        completed: false,
      },
      {
        id: 23,
        title: "Do morning breath practice for 3 consecutive days",
        completed: false,
      },
      {
        id: 24,
        title: "Try bedtime breathing (4-7-8 or extended exhale)",
        completed: false,
      },
      {
        id: 25,
        title: "Schedule a daily breath reminder and follow through",
        completed: false,
      },
      {
        id: 26,
        title: "Share a reflection on breath practice with a friend",
        completed: false,
      },
      {
        id: 27,
        title: "Practice 5 minutes of breathing 7 days in a row",
        completed: false,
      },
      {
        id: 28,
        title: "Log how you felt before and after 3 sessions",
        completed: false,
      },
      {
        id: 29,
        title: "Identify one emotional pattern linked to your breathing",
        completed: false,
      },
      { id: 30, title: "Earn badge: 'Habit Builder'", completed: false },
    ],
  },
  {
    id: 4,
    name: "Exploring Techniques",
    level: 4,
    description: "Skill Expansion",
    badge: "Technique Explorer",
    tasks: [
      { id: 31, title: "Try box breathing for 5 minutes", completed: false },
      {
        id: 32,
        title: "Try alternate nostril breathing (nadi shodhana)",
        completed: false,
      },
      { id: 33, title: "Try 4-7-8 breathing for 3 nights", completed: false },
      {
        id: 34,
        title: "Try coherent breathing (5.5 seconds in/out)",
        completed: false,
      },
      {
        id: 35,
        title: "Watch 'How to Use Breath for Focus' video",
        completed: false,
      },
      {
        id: 36,
        title:
          "Complete an energizing breath session (e.g., Wim Hof light version)",
        completed: false,
      },
      {
        id: 37,
        title: "Complete a relaxing breath session (e.g., 6-2-8)",
        completed: false,
      },
      {
        id: 38,
        title: "Record your favorite technique in your journal",
        completed: false,
      },
      {
        id: 39,
        title: "Use a breathing visual guide (circular animation)",
        completed: false,
      },
      { id: 40, title: "Earn badge: 'Technique Explorer'", completed: false },
    ],
  },
  {
    id: 5,
    name: "Measuring Progress",
    level: 5,
    description: "Awareness & Metrics",
    badge: "Mindful Measurer",
    tasks: [
      { id: 41, title: "Retake the CO2 tolerance test", completed: false },
      {
        id: 42,
        title: "Measure BOLT score improvement after 2 weeks",
        completed: false,
      },
      { id: 43, title: "Track your weekly breathing streak", completed: false },
      {
        id: 44,
        title: "Complete a self-assessment on breath control and ease",
        completed: false,
      },
      {
        id: 45,
        title: "Reflect on journal entries over 2 weeks",
        completed: false,
      },
      {
        id: 46,
        title: "Analyze mood vs. breathing session patterns",
        completed: false,
      },
      {
        id: 47,
        title: "View your personal breath trends in a progress chart",
        completed: false,
      },
      {
        id: 48,
        title: "Practice nasal breathing during light walking",
        completed: false,
      },
      {
        id: 49,
        title: "Try a guided breath scan (guided body + breath awareness)",
        completed: false,
      },
      { id: 50, title: "Earn badge: 'Mindful Measurer'", completed: false },
    ],
  },
  {
    id: 6,
    name: "Deepening Practice",
    level: 6,
    description: "Longer Sessions",
    badge: "Deep Diver",
    tasks: [
      {
        id: 51,
        title: "Complete a 10-minute breathing session",
        completed: false,
      },
      {
        id: 52,
        title: "Try a 15-minute breathing meditation",
        completed: false,
      },
      {
        id: 53,
        title: "Finish a full week of 10-minute daily breathing",
        completed: false,
      },
      {
        id: 54,
        title: "Try a silent breath meditation for 10 minutes",
        completed: false,
      },
      {
        id: 55,
        title: "Use breath to manage physical discomfort (guided session)",
        completed: false,
      },
      {
        id: 56,
        title: "Reflect on emotional changes after a 15-minute session",
        completed: false,
      },
      {
        id: 57,
        title: "Create a personalized breathing session",
        completed: false,
      },
      {
        id: 58,
        title: "Try a session with calming background music",
        completed: false,
      },
      {
        id: 59,
        title: "Use the visual timer for a 15-minute session",
        completed: false,
      },
      { id: 60, title: "Earn badge: 'Deep Diver'", completed: false },
    ],
  },
  {
    id: 7,
    name: "Performance & Energy",
    level: 7,
    description: "High Performance",
    badge: "Energy Enhancer",
    tasks: [
      {
        id: 61,
        title:
          "Practice performance breath (e.g., nasal breathing with light cardio)",
        completed: false,
      },
      {
        id: 62,
        title: "Track your breath during a 10-minute walk",
        completed: false,
      },
      {
        id: 63,
        title: "Try the pre-workout breathing warm-up",
        completed: false,
      },
      {
        id: 64,
        title: "Complete an endurance-focused breath hold session",
        completed: false,
      },
      {
        id: 65,
        title: "Record perceived energy levels before/after breathwork",
        completed: false,
      },
      {
        id: 66,
        title: "Try 'Breathing Ladder' (pyramid breath holds)",
        completed: false,
      },
      {
        id: 67,
        title: "Do performance breathing 3 times in one week",
        completed: false,
      },
      {
        id: 68,
        title: "Use breath during light resistance training",
        completed: false,
      },
      {
        id: 69,
        title: "Reflect on changes in stamina or energy",
        completed: false,
      },
      { id: 70, title: "Earn badge: 'Energy Enhancer'", completed: false },
    ],
  },
  {
    id: 8,
    name: "Recovery & Relaxation",
    level: 8,
    description: "Calm & Restore",
    badge: "Rest & Reset",
    tasks: [
      {
        id: 71,
        title: "Complete a breath session post-exercise",
        completed: false,
      },
      {
        id: 72,
        title: "Use breath to wind down before bed (7-11 breath)",
        completed: false,
      },
      {
        id: 73,
        title: "Practice parasympathetic breathing (e.g., 6-6 or 4-6)",
        completed: false,
      },
      {
        id: 74,
        title: "Use belly breathing before or after meals",
        completed: false,
      },
      {
        id: 75,
        title: "Measure heart rate variability pre/post breathing",
        completed: false,
      },
      {
        id: 76,
        title: "Combine breath with progressive muscle relaxation",
        completed: false,
      },
      {
        id: 77,
        title: "Pair breathing with a gentle stretching routine",
        completed: false,
      },
      {
        id: 78,
        title: "Complete 5 bedtime sessions in one week",
        completed: false,
      },
      {
        id: 79,
        title: "Use 'recovery breathing' after a stress trigger",
        completed: false,
      },
      { id: 80, title: "Earn badge: 'Rest & Reset'", completed: false },
    ],
  },
  {
    id: 9,
    name: "Emotional Mastery",
    level: 9,
    description: "Breath & Mind",
    badge: "Emotional Alchemist",
    tasks: [
      {
        id: 81,
        title: "Use breath to shift mood (guided practice)",
        completed: false,
      },
      {
        id: 82,
        title: "Pair breath with emotional labeling",
        completed: false,
      },
      {
        id: 83,
        title: "Try breathing with affirmations or visualizations",
        completed: false,
      },
      { id: 84, title: "Use box breathing to calm anxiety", completed: false },
      {
        id: 85,
        title: "Notice breath during a stressful moment",
        completed: false,
      },
      {
        id: 86,
        title: "Journal emotional shifts after 3 different breath types",
        completed: false,
      },
      {
        id: 87,
        title: "Reflect on mood patterns linked to breath",
        completed: false,
      },
      {
        id: 88,
        title: "Practice breath during a difficult conversation",
        completed: false,
      },
      {
        id: 89,
        title: "Explore breath-body-emotion guided session",
        completed: false,
      },
      { id: 90, title: "Earn badge: 'Emotional Alchemist'", completed: false },
    ],
  },
  {
    id: 10,
    name: "Mastery & Sharing",
    level: 10,
    description: "Legacy",
    badge: "Breath Master",
    tasks: [
      {
        id: 91,
        title: "Guide a breathing session with a friend or family member",
        completed: false,
      },
      {
        id: 92,
        title: "Create a 7-day breath challenge for yourself",
        completed: false,
      },
      {
        id: 93,
        title: "Share a journal entry or insight publicly",
        completed: false,
      },
      {
        id: 94,
        title: "Reflect on your top 3 breathwork benefits",
        completed: false,
      },
      {
        id: 95,
        title: "Support a new user in the community",
        completed: false,
      },
      {
        id: 96,
        title: "Record a personal message on your breathwork journey",
        completed: false,
      },
      { id: 97, title: "Complete a 30-day breathing streak", completed: false },
      {
        id: 98,
        title: "Retake baseline assessments and compare results",
        completed: false,
      },
      { id: 99, title: "Earn 'Breath Master' title", completed: false },
      {
        id: 100,
        title: "Celebrate with a digital certificate and share badge",
        completed: false,
      },
    ],
  },
];

// Helper functions
export const getTotalTasks = () =>
  breathingTaskGroups.reduce((acc, group) => acc + group.tasks.length, 0);

export const getCompletedTasks = () =>
  breathingTaskGroups.reduce(
    (acc, group) => acc + group.tasks.filter((task) => task.completed).length,
    0,
  );

export const getGroupProgress = (groupId: number) => {
  const group = breathingTaskGroups.find((g) => g.id === groupId);
  if (!group) return 0;
  const completed = group.tasks.filter((task) => task.completed).length;
  return Math.round((completed / group.tasks.length) * 100);
};
