import React from "react";
import { Folder } from "lucide-react";
import { GroupSection } from "./group-section";

interface NotStartedGroupsProps {
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

export const NotStartedGroups: React.FC<NotStartedGroupsProps> = ({
  groups,
  onGroupSelect,
}) => {
  return (
    <GroupSection
      title="Not Started"
      icon={Folder}
      iconClassName="text-muted-foreground"
      groups={groups}
      onGroupSelect={onGroupSelect}
    />
  );
};
