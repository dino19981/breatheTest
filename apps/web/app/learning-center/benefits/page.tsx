import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { LearningBreadcrumb } from "@/app/learning-center/components/LearningBreadcrumb";

export default function BenefitsPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
      <LearningBreadcrumb />

      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-gray-900 dark:text-gray-100">
          Health Benefits
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
          Discover how breathing techniques can improve your physical and mental
          well-being
        </p>
      </div>

      {/* Physical Benefits */}
      <div className="mb-12 mt-6">
        <h2 className="text-2xl font-semibold mb-6">Physical Benefits</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-gray-100">
                Cardiovascular Health
              </CardTitle>
              <CardDescription className="text-gray-500 dark:text-gray-400">
                Heart and circulation benefits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                <li>• Reduced blood pressure (up to 15 mmHg)</li>
                <li>• Improved heart rate variability</li>
                <li>• Enhanced circulation</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-gray-100">
                Respiratory Benefits
              </CardTitle>
              <CardDescription className="text-gray-500 dark:text-gray-400">
                Lung and breathing improvements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                <li>• Increased lung capacity (20-30%)</li>
                <li>• Better oxygen delivery</li>
                <li>• Improved breathing efficiency</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Mental Benefits */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">Mental Benefits</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-gray-100">
                Cognitive Benefits
              </CardTitle>
              <CardDescription className="text-gray-500 dark:text-gray-400">
                Mental performance improvements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                <li>• Better focus and concentration</li>
                <li>• Enhanced memory retention</li>
                <li>• Improved decision-making</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-gray-100">
                Emotional Benefits
              </CardTitle>
              <CardDescription className="text-gray-500 dark:text-gray-400">
                Mental well-being improvements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                <li>• Reduced anxiety (35-40%)</li>
                <li>• Better stress management</li>
                <li>• Enhanced emotional regulation</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
