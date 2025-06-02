import React from "react";
import { LucideIcon } from "lucide-react";
import { GroupCard } from "./group-card";
import { GroupDrawer } from "./group-drawer";

interface GroupSectionProps {
  title: string;
  icon: LucideIcon;
  iconClassName?: string;
  groups: Array<{
    id: number;
    name: string;
    description: string;
    level: number;
    tasks: Array<{
      id: number;
      title: string;
      completed: boolean;
    }>;
  }>;
  onGroupSelect: (groupId: number) => void;
  isCompleted?: boolean;
}

export const GroupSection: React.FC<GroupSectionProps> = ({
  title,
  icon: Icon,
  iconClassName = "text-primary",
  groups,
  onGroupSelect,
  isCompleted = false,
}) => {
  if (groups.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Icon className={`h-5 w-5 ${iconClassName}`} />
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {groups.map((group) => {
          const completedCount = isCompleted
            ? group.tasks.length
            : group.tasks.filter((t) => t.completed).length;
          const totalCount = group.tasks.length;
          const progress = isCompleted
            ? 100
            : Math.round((completedCount / totalCount) * 100);

          return (
            <GroupDrawer
              key={group.id}
              group={group}
              progress={progress}
              completedCount={completedCount}
            >
              <GroupCard
                group={group}
                progress={progress}
                completedCount={completedCount}
                totalCount={totalCount}
                isCompleted={isCompleted}
                onClick={() => onGroupSelect(group.id)}
              />
            </GroupDrawer>
          );
        })}
      </div>
    </div>
  );
};
