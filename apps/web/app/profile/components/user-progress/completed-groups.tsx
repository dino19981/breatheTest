import React from "react";
import { Trophy } from "lucide-react";
import { GroupSection } from "./group-section";

interface CompletedGroupsProps {
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

export const CompletedGroups: React.FC<CompletedGroupsProps> = ({
  groups,
  onGroupSelect,
}) => {
  return (
    <GroupSection
      title="Completed Groups"
      icon={Trophy}
      groups={groups}
      onGroupSelect={onGroupSelect}
      isCompleted={true}
    />
  );
};
