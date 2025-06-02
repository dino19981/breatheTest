"use client";

import React, { useState } from "react";
import { Switch } from "@workspace/ui/components/switch";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import { Plus, Trash2 } from "lucide-react";
import AddReminder from "./components/add-reminder";

type Reminder = {
  days: string[];
  times: string[];
};

export default function NotificationsPage() {
  // State for toggles and reminders
  const [allowNotifications, setAllowNotifications] = useState(true);
  const [remindersEnabled, setRemindersEnabled] = useState(true);
  const [reminders, setReminders] = useState<Reminder[]>([]);

  // Helper to render day circles
  const renderDays = (selectedDays: string[]) => {
    const days = ["M", "Tu", "W", "Th", "F", "S", "Su"];
    return (
      <div className="flex gap-1 sm:gap-2">
        {days.map((d, i) => (
          <div
            key={i}
            className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center font-semibold text-sm sm:text-lg ${
              selectedDays.includes(d)
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background text-muted-foreground border-muted"
            }`}
          >
            {d}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl">Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 sm:space-y-8">
          {/* Allow Notifications Section */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold">
                Allow notifications
              </h2>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Receive notifications about your breathing exercises
              </p>
            </div>
            <Switch
              checked={allowNotifications}
              onCheckedChange={setAllowNotifications}
            />
          </div>

          {/* Reminders Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold">Reminders</h2>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  Set up daily reminders for your breathing exercises
                </p>
              </div>
              <Switch
                checked={remindersEnabled}
                onCheckedChange={setRemindersEnabled}
              />
            </div>

            {/* Reminders List */}
            <div className="space-y-3 sm:space-y-4">
              {reminders.map((rem, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-3 sm:p-4 rounded-lg border"
                >
                  {renderDays(rem.days)}
                  <div className="text-base sm:text-lg border-b-2 border-dashed border-muted">
                    at {rem.times.join(" and ")}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-auto text-destructive hover:text-destructive/90"
                    onClick={() => {
                      setReminders((prev) =>
                        prev.filter((_, index) => index !== idx),
                      );
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Add Reminder Button */}
            <AddReminder
              onAddReminder={(newReminder) => {
                setReminders((prev) => [...prev, newReminder]);
              }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
