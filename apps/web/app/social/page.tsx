"use client";

import { useState } from "react";
import { t } from "@lingui/macro";
import { Card } from "@workspace/ui/components/card";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@workspace/ui/components/tabs";
import { Button } from "@workspace/ui/components/button";
import { Switch } from "@workspace/ui/components/switch";
import { Input } from "@workspace/ui/components/input";
import { User, Users, Trophy, Search, Construction } from "lucide-react";

export default function SocialPage() {
  const [activeTab, setActiveTab] = useState("challenges");
  const [shareSteps, setShareSteps] = useState(false);

  return (
    <div className="w-full px-2 sm:px-4 space-y-6 relative">
      {/* WIP Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="bg-white/90 dark:bg-gray-900/90 p-6 rounded-lg shadow-lg text-center max-w-md mx-4">
          <Construction className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
          <h2 className="text-xl font-semibold mb-2">{t`Work in Progress`}</h2>
          <p className="text-gray-600 dark:text-gray-300">{t`We're building something amazing! This feature will be available soon.`}</p>
        </div>
      </div>

      {/* Header with user info */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-white">
            A
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold">0 days</span>
            <span className="text-2xl">🌬️</span>
          </div>
        </div>
        <div className="text-lg font-semibold">
          <span className="text-gray-600">₴</span>195.43
        </div>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full justify-start bg-transparent border-b rounded-none h-auto p-0 mb-6 overflow-x-auto">
          <TabsTrigger
            value="challenges"
            className="data-[state=active]:border-b-0 rounded-none px-2 sm:px-3 py-1.5 whitespace-nowrap text-xs sm:text-sm"
          >
            {t`Challenges`}
          </TabsTrigger>
          <TabsTrigger
            value="clubs"
            className="data-[state=active]:border-b-0 rounded-none px-2 sm:px-3 py-1.5 whitespace-nowrap text-xs sm:text-sm"
          >
            {t`Groups`}
          </TabsTrigger>
          <TabsTrigger
            value="friends"
            className="data-[state=active]:border-b-0 rounded-none px-2 sm:px-3 py-1.5 whitespace-nowrap text-xs sm:text-sm"
          >
            {t`Buddies`}
          </TabsTrigger>
        </TabsList>

        {/* Challenges Content */}
        <TabsContent value="challenges" className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">{t`Tailored for you`}</h2>
          <Card className="p-0 overflow-hidden">
            <div className="aspect-video w-full bg-gray-900 relative">
              <img
                src="/images/meditation.jpg"
                alt="Meditation"
                className="w-full h-full object-cover opacity-80"
              />
            </div>
            <div className="p-4 sm:p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                <span className="text-sm sm:text-base">{t`Mindful Breathing Club`}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold">{t`30-Day Mindful Breathing Challenge`}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <div className="text-sm text-gray-500">{t`Prize`}</div>
                  <div className="font-semibold">₴50</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">{t`Daily Goal`}</div>
                  <div className="font-semibold">20 min</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">{t`Group Minutes`}</div>
                  <div className="font-semibold">1.2M</div>
                </div>
              </div>
              <Button className="w-full">{t`Join now`}</Button>
            </div>
          </Card>
        </TabsContent>

        {/* Clubs Content */}
        <TabsContent value="clubs" className="space-y-4">
          <div className="space-y-4">
            <Card className="p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="/images/breathing-group.png"
                  alt="Breathing Group"
                  className="w-10 sm:w-12 h-10 sm:h-12 rounded-lg"
                />
                <div>
                  <h3 className="font-semibold text-sm sm:text-base">{t`Calm Breathing Collective`}</h3>
                  <div className="text-xs sm:text-sm text-gray-500">{t`Mindfulness`}</div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-sm text-gray-500">{t`Members`}</div>
                  <div className="font-semibold">12,312</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">{t`Total Minutes`}</div>
                  <div className="font-semibold">369K</div>
                </div>
              </div>
              <Button className="w-full">{t`Join Group`}</Button>
            </Card>
          </div>
        </TabsContent>

        {/* Friends Content */}
        <TabsContent value="friends" className="space-y-4">
          <div className="space-y-4">
            <Card className="p-4 sm:p-6">
              <div className="text-center py-6 sm:py-8">
                <Users className="w-10 sm:w-12 h-10 sm:h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-sm sm:text-base text-gray-600 mb-2">{t`Connect with breathing buddies and`}</p>
                <p className="text-sm sm:text-base text-gray-600">{t`share your mindfulness journey`}</p>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-2">
                <Switch checked={shareSteps} onCheckedChange={setShareSteps} />
                <div>
                  <div className="font-medium text-sm sm:text-base">{t`Share breathing progress`}</div>
                  <div className="text-xs sm:text-sm text-gray-500">{t`Share your breathing exercises with your buddies`}</div>
                </div>
              </div>
            </Card>

            <div className="space-y-2">
              <h3 className="text-base sm:text-lg font-semibold">{t`Find Breathing Buddies`}</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 sm:w-5 h-4 sm:h-5" />
                <Input
                  placeholder={t`Search by username`}
                  className="pl-10 text-sm sm:text-base"
                />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
