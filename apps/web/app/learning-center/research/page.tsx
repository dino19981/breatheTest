import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";

export default function ResearchPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-gray-900 dark:text-gray-100">
          Research & History
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
          Explore the scientific evidence and historical development of
          breathing techniques
        </p>
      </div>

      {/* Historical Research */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Historical Research</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-gray-100">
                Ancient Origins
              </CardTitle>
              <CardDescription className="text-gray-500 dark:text-gray-400">
                Historical development
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                <li>• 3000 BCE: First documented practices</li>
                <li>• 500 BCE: Pranayama development</li>
                <li>• 200 BCE: Taoist techniques</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modern Research */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">Modern Research</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-gray-100">
                Scientific Studies
              </CardTitle>
              <CardDescription className="text-gray-500 dark:text-gray-400">
                Recent research findings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                <li>• Autonomic nervous system studies</li>
                <li>• Immune system research</li>
                <li>• Brain function analysis</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-gray-100">
                Future Directions
              </CardTitle>
              <CardDescription className="text-gray-500 dark:text-gray-400">
                Emerging research areas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                <li>• Sports performance</li>
                <li>• Mental health treatment</li>
                <li>• Chronic disease management</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
