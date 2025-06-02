import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import Link from "next/link";
import { LearningBreadcrumb } from "@/app/learning-center/components/LearningBreadcrumb";

export default function ProtocolsPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
      <LearningBreadcrumb />

      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-gray-900 dark:text-gray-100">
          Health Protocols
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
          Daily and specialized breathing routines for optimal health
        </p>
      </div>

      {/* Daily Protocols */}
      <div className="mb-12 mt-6">
        <h2 className="text-2xl font-semibold mb-6">Daily Protocols</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-gray-100">
                Morning Protocol
              </CardTitle>
              <CardDescription className="text-gray-500 dark:text-gray-400">
                Start your day right
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                5 minutes of deep breathing
              </p>
              <p className="text-sm mt-2 text-gray-900 dark:text-gray-100">
                • 2 minutes of box breathing
              </p>
              <p className="text-sm text-gray-900 dark:text-gray-100">
                • 3 minutes of energizing breaths
              </p>
              <Button asChild className="mt-4 w-full">
                <Link href="/learning-center/protocols/morning">
                  View Morning Protocol
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-gray-100">
                Sleep Protocol
              </CardTitle>
              <CardDescription className="text-gray-500 dark:text-gray-400">
                Better sleep preparation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                15-minute pre-sleep routine
              </p>
              <p className="text-sm mt-2 text-gray-900 dark:text-gray-100">
                • 4-7-8 breathing (5 cycles)
              </p>
              <p className="text-sm text-gray-900 dark:text-gray-100">
                • Slow diaphragmatic breathing
              </p>
              <Button asChild className="mt-4 w-full">
                <Link href="/learning-center/protocols/sleep">
                  View Sleep Protocol
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Specialized Protocols */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">Specialized Protocols</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-gray-100">
                Stress Relief Protocol
              </CardTitle>
              <CardDescription className="text-gray-500 dark:text-gray-400">
                Quick stress management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                10-minute stress relief routine
              </p>
              <p className="text-sm mt-2 text-gray-900 dark:text-gray-100">
                • 4-7-8 breathing (3 cycles)
              </p>
              <p className="text-sm text-gray-900 dark:text-gray-100">
                • Progressive relaxation breathing
              </p>
              <Button asChild className="mt-4 w-full">
                <Link href="/learning-center/protocols/stress">
                  View Stress Protocol
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
