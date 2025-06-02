import React from "react";
import { Award, CheckCircle2, Circle } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerTrigger,
} from "@workspace/ui/components/drawer";
import { useBreakpointsContext } from "@/providers/breakpoints-provider";

interface GroupDrawerProps {
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
  children: React.ReactNode;
}

export const GroupDrawer: React.FC<GroupDrawerProps> = ({
  group,
  progress,
  completedCount,
  children,
}) => {
  const primaryColor = "var(--primary)";
  const { breakpoints } = useBreakpointsContext();
  const direction = breakpoints.isAbove("md") ? "top" : "bottom";
  return (
    <Drawer direction={direction}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" style={{ color: primaryColor }} />
            {group.name}
          </DrawerTitle>
          <DrawerDescription>
            Level {group.level} • {group.description}
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Progress: {progress}%</span>
            <span>
              {completedCount} of {group.tasks.length} tasks completed
            </span>
          </div>
          <div className="space-y-3">
            {group.tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-3 p-3 rounded-lg border bg-card"
              >
                {task.completed ? (
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                ) : (
                  <Circle className="h-5 w-5 text-muted-foreground" />
                )}
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{task.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t p-4 bg-muted/50">
          <div className="flex items-center justify-between text-sm">
            <div className="space-y-1">
              <p className="text-muted-foreground">Group Level</p>
              <p className="font-medium">{group.level}</p>
            </div>
            <div className="space-y-1 text-right">
              <p className="text-muted-foreground">Completion Rate</p>
              <p className="font-medium">{progress}%</p>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
