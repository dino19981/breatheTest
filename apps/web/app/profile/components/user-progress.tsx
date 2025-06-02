import React, { useState } from "react";
import {
  breathingTaskGroups,
  getTotalTasks,
  getCompletedTasks,
  getGroupProgress,
} from "../../components/breathing-tasks";
import { ProgressOverview } from "./user-progress/progress-overview";
import { CompletedGroups } from "./user-progress/completed-groups";
import { InProgressGroups } from "./user-progress/in-progress-groups";
import { NotStartedGroups } from "./user-progress/not-started-groups";

// Create a copy of the task groups and mark some tasks as completed
const modifiedTaskGroups = breathingTaskGroups.map((group, groupIndex) => {
  const tasks = group.tasks.map((task, taskIndex) => ({
    ...task,
    // Mark first 2 groups as completed and 5 tasks from the 3rd group
    completed: groupIndex < 2 || (groupIndex === 2 && taskIndex < 5),
  }));
  return { ...group, tasks };
});

// Helper functions for modified task groups
const getModifiedTotalTasks = () =>
  modifiedTaskGroups.reduce((acc, group) => acc + group.tasks.length, 0);

const getModifiedCompletedTasks = () =>
  modifiedTaskGroups.reduce(
    (acc, group) => acc + group.tasks.filter((task) => task.completed).length,
    0,
  );

const getModifiedGroupProgress = (groupId: number) => {
  const group = modifiedTaskGroups.find((g) => g.id === groupId);
  if (!group) return 0;
  const completed = group.tasks.filter((task) => task.completed).length;
  return Math.round((completed / group.tasks.length) * 100);
};

export const UserProgress: React.FC = () => {
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);

  // Calculate overall progress using modified task groups
  const totalTasks = getModifiedTotalTasks();
  const completedTasks = getModifiedCompletedTasks();
  const progress = Math.round((completedTasks / totalTasks) * 100);

  // Get completed groups
  const completedGroups = modifiedTaskGroups.filter((group) =>
    group.tasks.every((task) => task.completed),
  );

  // Get in-progress groups
  const inProgressGroups = modifiedTaskGroups.filter(
    (group) =>
      group.tasks.some((task) => task.completed) &&
      !group.tasks.every((task) => task.completed),
  );

  // Get not started groups
  const notStartedGroups = modifiedTaskGroups.filter(
    (group) => !group.tasks.some((task) => task.completed),
  );

  return (
    <div className="w-full max-w-6xl mx-auto py-6 space-y-8">
      <ProgressOverview
        progress={progress}
        completedTasks={completedTasks}
        totalTasks={totalTasks}
        completedGroups={completedGroups.length}
        inProgressGroups={inProgressGroups.length}
        notStartedGroups={notStartedGroups.length}
      />

      <CompletedGroups
        groups={completedGroups}
        onGroupSelect={setSelectedGroup}
      />

      <InProgressGroups
        groups={inProgressGroups}
        onGroupSelect={setSelectedGroup}
      />

      <NotStartedGroups
        groups={notStartedGroups}
        onGroupSelect={setSelectedGroup}
      />
    </div>
  );
};
