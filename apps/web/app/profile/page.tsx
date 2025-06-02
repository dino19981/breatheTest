"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs";
import { useAuth } from "@/providers/AuthProvider";
import { OverviewTab } from "./components/overview-tab";
import { PersonalInfoTab } from "./components/personal-info-tab";
import { AccountTab } from "./components/account-tab";
import { UserProgress } from "./components/user-progress";
import { useGetUserAchievementsQuery } from "@/hooks/queries/use-get-user-achievements.query";
import { useHealthCheck } from "@/hooks/queries/use-health-check";
import { useGetAchievementsQuery } from "@/hooks/queries/use-get-achievements.query";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const tabParam = searchParams.get("tab");
  const defaultTab = tabParam || "overview";

  const handleTabChange = (value: string) => {
    router.push(`/profile?tab=${value}`);
  };

  // const { data: userAchievements } = useGetUserAchievementsQuery();
  const { data: healthCheck } = useHealthCheck();
  const { data: achievements } = useGetAchievementsQuery();

  // Mock data - replace with actual data from your backend
  const userStats = {
    totalSessions: 42,
    totalMinutes: 210,
    currentStreak: 7,
    longestStreak: 14,
    tokens: 100,
    personalInfo: {
      height: "177cm",
      weight: "72 kg",
      dateOfBirth: "12 Mar 1994",
      sexAssignedAtBirth: "Male",
    },
    achievements: [
      {
        id: 1,
        name: "First Breath",
        description: "Completed your first session",
        earned: true,
      },
      {
        id: 2,
        name: "7-Day Streak",
        description: "Maintained a 7-day breathing streak",
        earned: true,
      },
      {
        id: 3,
        name: "Zen Master",
        description: "Completed 100 sessions",
        earned: false,
      },
    ],
  };

  return (
    <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full">
          <Tabs
            value={defaultTab}
            onValueChange={handleTabChange}
            className="space-y-4"
          >
            <TabsList className="w-full justify-start">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <OverviewTab userStats={userStats} />
            </TabsContent>

            <TabsContent value="personal">
              <PersonalInfoTab personalInfo={userStats.personalInfo} />
            </TabsContent>

            <TabsContent value="account">
              <AccountTab user={user} onLogout={logout} />
            </TabsContent>

            <TabsContent value="progress">
              <UserProgress />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
