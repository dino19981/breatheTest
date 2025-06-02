import React from "react";
import { Award, ArrowRight } from "lucide-react";

interface GroupCardProps {
  group: {
    id: number;
    name: string;
    description: string;
    level: number;
    tasks: Array<{
      id: number;
      title: string;
      completed: boolean;
    }>;
  };
  progress: number;
  completedCount: number;
  totalCount: number;
  isCompleted?: boolean;
  onClick: () => void;
}

export const GroupCard: React.FC<GroupCardProps> = ({
  group,
  progress,
  completedCount,
  totalCount,
  isCompleted = false,
  onClick,
}) => {
  const primaryColor = "var(--primary)";

  return (
    <div
      className="bg-card rounded-xl p-4 shadow-sm border border-border hover:shadow-md transition-all duration-200 hover:scale-[1.02] hover:border-primary/20 cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <div
            className={`w-10 h-10 rounded-full ${
              isCompleted ? "bg-primary/10" : "bg-muted"
            } flex items-center justify-center group-hover:bg-primary/20 transition-colors`}
          >
            <Award
              className="h-5 w-5"
              style={{
                color: isCompleted ? primaryColor : "var(--muted-foreground)",
              }}
            />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-medium text-sm text-foreground truncate">
              {group.name}
            </h3>
            <span
              className={`text-xs font-medium px-2 py-1 rounded-full ${
                isCompleted
                  ? "bg-primary/10 text-primary"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              Level {group.level}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-2">
            {group.description}
          </p>
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
            <span>
              {completedCount} of {totalCount} tasks
            </span>
            <span>{progress}%</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${progress}%`,
                backgroundColor: primaryColor,
              }}
            />
          </div>
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-border flex items-center justify-end text-xs text-primary group-hover:text-primary/80 transition-colors">
        <span>{isCompleted ? "View Exercises" : "View tasks"}</span>
        <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
};
