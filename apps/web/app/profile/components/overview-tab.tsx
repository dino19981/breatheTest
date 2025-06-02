import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Progress } from "@workspace/ui/components/progress";
import { Badge } from "@workspace/ui/components/badge";
import { CalendarDays, Flame, Trophy } from "lucide-react";
import Link from "next/link";
import { UserProgress } from "./user-progress";

interface UserStats {
  totalSessions: number;
  totalMinutes: number;
  currentStreak: number;
  longestStreak: number;
  tokens: number;
  achievements: Array<{
    id: number;
    name: string;
    description: string;
    earned: boolean;
  }>;
}

interface OverviewTabProps {
  userStats: UserStats;
}

export function OverviewTab({ userStats }: OverviewTabProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="px-6 py-4 border-b">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Flame className="h-5 w-5 text-orange-500" />
            Current Streak
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6 py-6">
          <div className="text-5xl font-bold mb-2 text-orange-500">
            {userStats.currentStreak} days
          </div>
          <p className="text-sm text-muted-foreground">
            Longest streak: {userStats.longestStreak} days
          </p>
        </CardContent>
      </Card>

      <Card className="hover:shadow-md transition-shadow bg-gradient-to-br from-primary/5 to-primary/10">
        <CardHeader className="px-6 py-4 border-b border-primary/10">
          <CardTitle className="flex items-center gap-2 text-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 text-primary animate-pulse"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
            BREATH Tokens
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6 py-6">
          <div className="flex items-baseline gap-2">
            <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/90 to-primary/80 animate-gradient">
              {userStats.tokens}
            </div>
            <span className="text-sm font-medium text-primary/80">BREATH</span>
          </div>
          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="bg-primary/10 text-primary hover:bg-primary/20 px-3 py-1.5 transition-all duration-300 hover:scale-105"
              >
                +{Math.floor(userStats.tokens / 10)} this week
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
              Earned from breathing sessions
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="px-6 py-4 border-b">
          <CardTitle className="flex items-center gap-2 text-lg">
            <CalendarDays className="h-5 w-5 text-blue-500" />
            Weekly Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6 py-6">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="text-sm font-medium">This Week</div>
              <div className="text-sm font-medium text-blue-500">5/7 days</div>
            </div>
            <div className="flex gap-1.5">
              {[true, true, true, true, true, false, false].map(
                (completed, index) => (
                  <div
                    key={index}
                    className={`h-2.5 flex-1 rounded-full transition-colors ${
                      completed ? "bg-blue-500" : "bg-muted"
                    }`}
                  />
                ),
              )}
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Total Minutes</span>
                <span className="font-medium text-blue-500">45 min</span>
              </div>
              <Progress value={64} className="h-2.5" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="px-6 py-4 border-b">
          <CardTitle className="text-lg">Detailed Stats</CardTitle>
        </CardHeader>
        <CardContent className="px-6 py-6">
          <div className="space-y-8">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Total Sessions</span>
                <span className="font-medium text-primary">
                  {userStats.totalSessions}
                </span>
              </div>
              <Progress
                value={(userStats.totalSessions / 100) * 100}
                className="h-2.5"
              />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Total Minutes</span>
                <span className="font-medium text-primary">
                  {userStats.totalMinutes} min
                </span>
              </div>
              <Progress
                value={(userStats.totalMinutes / 1000) * 100}
                className="h-2.5"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2 hover:shadow-md transition-shadow">
        <CardHeader className="px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Trophy className="h-5 w-5 text-yellow-500" />
              Achievements
            </CardTitle>
            <Link
              href="/profile/achievements"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              View All
            </Link>
          </div>
        </CardHeader>
        <CardContent className="px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {userStats.achievements.map((achievement) => (
              <Card
                key={achievement.id}
                className={`hover:shadow-md transition-all ${
                  achievement.earned ? "hover:scale-[1.02]" : "opacity-50"
                }`}
              >
                <CardContent className="p-5">
                  <div className="flex items-center gap-4">
                    <Trophy
                      className={`h-7 w-7 ${achievement.earned ? "text-yellow-500" : "text-muted"}`}
                    />
                    <div>
                      <h3 className="font-medium text-sm">
                        {achievement.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2 hover:shadow-md transition-shadow">
        <CardHeader className="px-6 py-4 border-b">
          <CardTitle className="text-lg">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="px-6 py-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 rounded-lg hover:bg-muted/50 transition-colors">
              <div>
                <p className="font-medium text-sm">Morning Breathing</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Today, 8:30 AM
                </p>
              </div>
              <Badge variant="secondary" className="text-xs px-3 py-1">
                5 min
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
