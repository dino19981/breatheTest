import React from "react";
import { Award } from "lucide-react";
import { GroupCard } from "./group-card";
import { GroupDrawer } from "./group-drawer";

interface InProgressGroupsProps {
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
}

export const InProgressGroups: React.FC<InProgressGroupsProps> = ({
  groups,
  onGroupSelect,
}) => {
  if (groups.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Award className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">In Progress</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {groups.map((group) => {
          const completedCount = group.tasks.filter((t) => t.completed).length;
          const totalCount = group.tasks.length;
          const progress = Math.round((completedCount / totalCount) * 100);

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
                onClick={() => onGroupSelect(group.id)}
              />
            </GroupDrawer>
          );
        })}
      </div>
    </div>
  );
};
