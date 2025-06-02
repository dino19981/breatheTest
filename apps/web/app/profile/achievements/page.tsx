import { Trophy } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";

interface Achievement {
  id: number;
  name: string;
  description: string;
  earned: boolean;
  progress?: number;
  category: "beginner" | "intermediate" | "advanced";
  requirements: string;
}

// This would typically come from your API/database
const achievements: Achievement[] = [
  {
    id: 1,
    name: "First Breath",
    description: "Complete your first breathing session",
    earned: true,
    category: "beginner",
    requirements: "Complete 1 session",
  },
  {
    id: 2,
    name: "Week Warrior",
    description: "Complete 7 days of breathing exercises",
    earned: false,
    progress: 5,
    category: "beginner",
    requirements: "Complete 7 sessions",
  },
  {
    id: 3,
    name: "Mind Master",
    description: "Complete 30 days of breathing exercises",
    earned: false,
    progress: 5,
    category: "intermediate",
    requirements: "Complete 30 sessions",
  },
  {
    id: 4,
    name: "Zen Master",
    description: "Complete 100 days of breathing exercises",
    earned: false,
    category: "advanced",
    requirements: "Complete 100 sessions",
  },
  {
    id: 5,
    name: "Early Bird",
    description: "Complete 5 morning sessions",
    earned: false,
    progress: 2,
    category: "beginner",
    requirements: "Complete 5 morning sessions",
  },
  {
    id: 6,
    name: "Night Owl",
    description: "Complete 5 evening sessions",
    earned: false,
    progress: 1,
    category: "beginner",
    requirements: "Complete 5 evening sessions",
  },
];

const categoryColors = {
  beginner: "bg-green-500/10 text-green-500",
  intermediate: "bg-blue-500/10 text-blue-500",
  advanced: "bg-purple-500/10 text-purple-500",
};

export default function AchievementsPage() {
  const earnedCount = achievements.filter((a) => a.earned).length;
  const totalCount = achievements.length;

  return (
    <div className="container py-6 md:py-10 px-4 md:px-6 space-y-6 md:space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Link
              href="/profile"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Profile
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-sm">Achievements</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Achievements
          </h1>
          <p className="text-muted-foreground mt-2 text-sm md:text-base">
            Track your progress and unlock new achievements
          </p>
        </div>
        <div className="flex items-center gap-2 bg-yellow-500/10 px-4 py-2 rounded-full">
          <Trophy className="h-5 w-5 text-yellow-500" />
          <span className="font-medium text-sm md:text-base">
            {earnedCount}/{totalCount} Unlocked
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {achievements.map((achievement) => (
          <Card
            key={achievement.id}
            className={`transition-all duration-200 hover:shadow-md ${
              achievement.earned ? "" : "opacity-75"
            }`}
          >
            <CardHeader className="p-5 pb-2">
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="text-lg font-semibold line-clamp-1">
                  {achievement.name}
                </CardTitle>
                <Badge
                  variant="secondary"
                  className={`${categoryColors[achievement.category]} whitespace-nowrap`}
                >
                  {achievement.category}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-5 pt-2 space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {achievement.description}
              </p>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Requirements</span>
                  <span className="font-medium">
                    {achievement.requirements}
                  </span>
                </div>
                {achievement.progress !== undefined && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">
                      {achievement.progress}/
                      {achievement.requirements.split(" ")[1]}
                    </span>
                  </div>
                )}
              </div>
              {achievement.earned && (
                <div className="flex items-center gap-2 text-sm text-yellow-500 bg-yellow-500/10 px-3 py-1.5 rounded-full w-fit">
                  <Trophy className="h-4 w-4" />
                  <span>Unlocked</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
