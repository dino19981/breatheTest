import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Star, Sparkles } from "lucide-react";

interface ProgressOverviewProps {
  progress: number;
  completedTasks: number;
  totalTasks: number;
  completedGroups: number;
  inProgressGroups: number;
  notStartedGroups: number;
}

export const ProgressOverview: React.FC<ProgressOverviewProps> = ({
  progress,
  completedTasks,
  totalTasks,
  completedGroups,
  inProgressGroups,
  notStartedGroups,
}) => {
  const primaryColor = "var(--primary)";

  return (
    <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
      <div className="flex flex-col items-center">
        <div className="relative" style={{ width: 240, height: 240 }}>
          {/* Outer glow effect */}
          <div
            className="absolute inset-0 rounded-full opacity-20 blur-xl"
            style={{
              background: `radial-gradient(circle at center, ${primaryColor} 0%, transparent 70%)`,
              transform: "scale(1.1)",
            }}
          />

          {/* Main progress circle */}
          <div className="relative">
            <CircularProgressbar
              value={progress}
              strokeWidth={10}
              styles={buildStyles({
                pathColor: `url(#gradient-${progress})`,
                trailColor: "#e5e7eb",
                strokeLinecap: "round",
                pathTransitionDuration: 0.5,
              })}
            />

            {/* Gradient definition */}
            <svg width="0" height="0">
              <defs>
                <linearGradient
                  id={`gradient-${progress}`}
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor={primaryColor} />
                  <stop offset="100%" stopColor={`${primaryColor}99`} />
                </linearGradient>
              </defs>
            </svg>

            {/* Center content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="relative">
                  <div
                    className="text-5xl font-bold"
                    style={{ color: primaryColor }}
                  >
                    {progress}%
                  </div>
                  {progress >= 100 && (
                    <Sparkles className="absolute -top-2 -right-2 h-5 w-5 text-primary animate-pulse" />
                  )}
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  Overall Progress
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  {completedTasks} of {totalTasks} tasks
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mt-8 grid grid-cols-3 gap-4 w-full max-w-md">
          <div className="text-center p-4 rounded-xl bg-primary/5 border border-primary/10">
            <div className="text-2xl font-bold" style={{ color: primaryColor }}>
              {completedGroups}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Completed Groups
            </div>
          </div>
          <div className="text-center p-4 rounded-xl bg-primary/5 border border-primary/10">
            <div className="text-2xl font-bold" style={{ color: primaryColor }}>
              {inProgressGroups}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              In Progress
            </div>
          </div>
          <div className="text-center p-4 rounded-xl bg-primary/5 border border-primary/10">
            <div className="text-2xl font-bold" style={{ color: primaryColor }}>
              {notStartedGroups}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Not Started
            </div>
          </div>
        </div>

        {/* Task completion summary */}
        <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Star className="h-4 w-4" style={{ color: primaryColor }} />
          <span>
            {completedTasks} of {totalTasks} tasks completed
          </span>
        </div>
      </div>
    </div>
  );
};
