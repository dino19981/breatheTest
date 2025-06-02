"use client";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@workspace/ui/components/tabs";
import { Card } from "@workspace/ui/components/card";
import { PrivacyPolicy } from "./components/privacy-policy";
import { TermsOfUse } from "./components/terms-of-use";
import { ScrollArea } from "@workspace/ui/components/scroll-area";

export default function LegalPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">Legal Information</h1>

      <Card className="p-6">
        <Tabs defaultValue="privacy" className="w-full">
          <TabsList>
            <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
            <TabsTrigger value="terms">Terms of Use</TabsTrigger>
          </TabsList>

          <TabsContent value="privacy" className="mt-6">
            <PrivacyPolicy />
          </TabsContent>

          <TabsContent value="terms" className="mt-6">
            <TermsOfUse />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
