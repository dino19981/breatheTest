import { Input } from "@workspace/ui/components/input";
import { Search } from "lucide-react";
import { LearningCard } from "./components/LearningCard";
import { LearningBreadcrumb } from "./components/LearningBreadcrumb";

export default function LearningCenter() {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
      <LearningBreadcrumb />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-gray-900 dark:text-gray-100">
            Breathing Techniques & Health
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
            Backed by scientific research and proven to improve physical and
            mental well-being
          </p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input placeholder="Search techniques..." className="pl-8 w-full" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-6">
        <LearningCard
          title="Breathing Techniques"
          description="Learn various breathing methods"
          content="Explore box breathing, 4-7-8 technique, and advanced methods like Wim Hof"
          linkHref="/learning-center/techniques"
          linkText="View Techniques"
        />

        <LearningCard
          title="Health Protocols"
          description="Daily and specialized routines"
          content="Morning routines, sleep protocols, and stress relief techniques"
          linkHref="/learning-center/protocols"
          linkText="View Protocols"
        />

        <LearningCard
          title="Health Benefits"
          description="Physical and mental improvements"
          content="Discover how breathing affects your body and mind"
          linkHref="/learning-center/benefits"
          linkText="View Benefits"
        />

        <LearningCard
          title="Research & History"
          description="Scientific evidence and origins"
          content="Explore the history and scientific research behind breathing techniques"
          linkHref="/learning-center/research"
          linkText="View Research"
        />
      </div>
    </div>
  );
}
