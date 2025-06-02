import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { ArrowLeft, Clock, Heart, Brain, Moon, Target } from "lucide-react";
import Link from "next/link";
import { LearningBreadcrumb } from "@/app/learning-center/components/LearningBreadcrumb";

export default function BoxBreathing() {
  return (
    <div className="container mx-auto py-4 sm:py-8 px-4">
      <LearningBreadcrumb />

      <div className="max-w-4xl mx-auto mt-4 sm:mt-6">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 text-foreground">
            Box Breathing
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            A powerful breathing technique used by Navy SEALs, athletes, and
            mindfulness practitioners
          </p>
        </div>

        <div className="grid gap-4 sm:gap-8">
          {/* Visual Breathing Guide */}
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl text-center text-foreground">
                Visual Breathing Guide
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-2xl mx-auto">
                <div className="text-center p-3 sm:p-4 bg-card rounded-lg shadow-sm">
                  <div className="h-16 w-16 sm:h-24 sm:w-24 mx-auto mb-2 border-4 border-primary rounded-lg animate-pulse"></div>
                  <p className="font-semibold text-sm sm:text-base text-foreground">
                    Inhale
                  </p>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    4 seconds
                  </p>
                </div>
                <div className="text-center p-3 sm:p-4 bg-card rounded-lg shadow-sm">
                  <div className="h-16 w-16 sm:h-24 sm:w-24 mx-auto mb-2 border-4 border-primary/80 rounded-lg"></div>
                  <p className="font-semibold text-sm sm:text-base text-foreground">
                    Hold
                  </p>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    4 seconds
                  </p>
                </div>
                <div className="text-center p-3 sm:p-4 bg-card rounded-lg shadow-sm">
                  <div className="h-16 w-16 sm:h-24 sm:w-24 mx-auto mb-2 border-4 border-primary/60 rounded-lg animate-pulse"></div>
                  <p className="font-semibold text-sm sm:text-base text-foreground">
                    Exhale
                  </p>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    4 seconds
                  </p>
                </div>
                <div className="text-center p-3 sm:p-4 bg-card rounded-lg shadow-sm">
                  <div className="h-16 w-16 sm:h-24 sm:w-24 mx-auto mb-2 border-4 border-primary/40 rounded-lg"></div>
                  <p className="font-semibold text-sm sm:text-base text-foreground">
                    Hold
                  </p>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    4 seconds
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow bg-card">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl text-foreground">
                What is Box Breathing?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base sm:text-lg mb-4 text-foreground">
                Box breathing, also known as four-square breathing or square
                breathing, is a simple yet profoundly effective breath control
                technique with roots in both ancient practices and modern
                physiology. Popularized by elite performers including Navy SEALs
                and athletes, it's used to reduce stress, sharpen focus, and
                enhance physical and mental performance.
              </p>
              <div className="bg-primary/5 dark:bg-primary/10 p-3 sm:p-4 rounded-lg mt-4">
                <p className="text-base sm:text-lg font-semibold mb-2 text-foreground">
                  The 4-4-4-4 Pattern:
                </p>
                <ul className="list-disc ml-6 space-y-2 text-foreground">
                  <li>Inhale for 4 seconds</li>
                  <li>Hold for 4 seconds</li>
                  <li>Exhale for 4 seconds</li>
                  <li>Hold for 4 seconds</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow bg-card">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl text-foreground">
                The Physiology of Box Breathing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base sm:text-lg mb-4 text-foreground">
                Box breathing works by regulating the autonomic nervous system,
                enhancing parasympathetic (rest-and-digest) activation while
                reducing sympathetic (fight-or-flight) dominance. Scientific
                findings and expert insights from Patrick McKeown's The
                Breathing Cure and Belisa Vranich's Breathing for Warriors
                support that controlled breathing:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div className="bg-card/50 p-3 sm:p-4 rounded-lg shadow-sm">
                  <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-primary mb-2" />
                  <h3 className="font-semibold mb-2 text-foreground">
                    Physical Benefits
                  </h3>
                  <ul className="list-disc ml-4 space-y-1 text-sm sm:text-base text-muted-foreground">
                    <li>Reduces cortisol levels</li>
                    <li>Lowers heart rate</li>
                    <li>Decreases blood pressure</li>
                    <li>Enhances oxygen delivery</li>
                  </ul>
                </div>
                <div className="bg-card/50 p-3 sm:p-4 rounded-lg shadow-sm">
                  <Brain className="h-5 w-5 sm:h-6 sm:w-6 text-primary mb-2" />
                  <h3 className="font-semibold mb-2 text-foreground">
                    Mental Benefits
                  </h3>
                  <ul className="list-disc ml-4 space-y-1 text-sm sm:text-base text-muted-foreground">
                    <li>Improves emotional regulation</li>
                    <li>Increases CO₂ tolerance</li>
                    <li>Enhances focus</li>
                    <li>Boosts resilience</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow bg-card">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl text-foreground">
                How to Practice
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <ol className="list-decimal ml-6 space-y-3 sm:space-y-4 text-foreground">
                    <li>
                      <strong className="text-foreground">
                        Find a comfortable position
                      </strong>
                      <p className="text-sm sm:text-base text-muted-foreground mt-1">
                        Sit with a straight spine in a quiet, distraction-free
                        environment.
                      </p>
                    </li>
                    <li>
                      <strong className="text-foreground">
                        Close your eyes
                      </strong>
                      <p className="text-sm sm:text-base text-muted-foreground mt-1">
                        This helps focus attention inward and reduces external
                        distractions.
                      </p>
                    </li>
                    <li>
                      <strong className="text-foreground">
                        Inhale (4 seconds)
                      </strong>
                      <p className="text-sm sm:text-base text-muted-foreground mt-1">
                        Breathe in slowly through your nose, filling your lungs
                        completely.
                      </p>
                    </li>
                    <li>
                      <strong className="text-foreground">
                        Hold (4 seconds)
                      </strong>
                      <p className="text-sm sm:text-base text-muted-foreground mt-1">
                        Keep your breath in, maintaining a relaxed body.
                      </p>
                    </li>
                    <li>
                      <strong className="text-foreground">
                        Exhale (4 seconds)
                      </strong>
                      <p className="text-sm sm:text-base text-muted-foreground mt-1">
                        Release the breath gently through your nose or mouth.
                      </p>
                    </li>
                    <li>
                      <strong className="text-foreground">
                        Hold (4 seconds)
                      </strong>
                      <p className="text-sm sm:text-base text-muted-foreground mt-1">
                        Maintain empty lungs, staying relaxed.
                      </p>
                    </li>
                  </ol>
                </div>
                <div className="bg-primary/5 dark:bg-primary/10 p-4 sm:p-6 rounded-lg">
                  <h3 className="font-semibold text-base sm:text-lg mb-4 text-foreground">
                    Progression Tips
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-primary mr-2 mt-1" />
                      <span className="text-sm sm:text-base text-foreground">
                        Start with 2-3 minutes and gradually increase to 5-10
                        minutes
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Target className="h-4 w-4 sm:h-5 sm:w-5 text-primary mr-2 mt-1" />
                      <span className="text-sm sm:text-base text-foreground">
                        Beginners may start with a 3-second count and build up
                        to 4 seconds
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Moon className="h-4 w-4 sm:h-5 sm:w-5 text-primary mr-2 mt-1" />
                      <span className="text-sm sm:text-base text-foreground">
                        Practice regularly for best results
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow bg-card">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl text-foreground">
                Real-World Applications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-card/50 p-4 sm:p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-base sm:text-lg mb-4 text-foreground">
                    Professional Settings
                  </h3>
                  <ul className="space-y-3 sm:space-y-4">
                    <li>
                      <strong className="text-foreground">
                        Military and Tactical
                      </strong>
                      <p className="text-sm sm:text-base text-muted-foreground mt-1">
                        Used by Navy SEALs in high-stress environments for
                        composure and decision-making.
                      </p>
                    </li>
                    <li>
                      <strong className="text-foreground">
                        Athletic Training
                      </strong>
                      <p className="text-sm sm:text-base text-muted-foreground mt-1">
                        Helps athletes stabilize heart rate and reduce
                        performance anxiety.
                      </p>
                    </li>
                  </ul>
                </div>
                <div className="bg-card/50 p-4 sm:p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-base sm:text-lg mb-4 text-foreground">
                    Personal Development
                  </h3>
                  <ul className="space-y-3 sm:space-y-4">
                    <li>
                      <strong className="text-foreground">
                        Corporate and Creative
                      </strong>
                      <p className="text-sm sm:text-base text-muted-foreground mt-1">
                        Assists in managing overwhelm and boosting creative
                        flow.
                      </p>
                    </li>
                    <li>
                      <strong className="text-foreground">
                        Therapeutic Use
                      </strong>
                      <p className="text-sm sm:text-base text-muted-foreground mt-1">
                        Applied in trauma therapy and anxiety treatment
                        programs.
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow bg-card">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl text-foreground">
                Expert Endorsements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                <div className="bg-card/50 p-3 sm:p-4 rounded-lg shadow-sm">
                  <h3 className="font-semibold mb-2 text-foreground">
                    Stuart Sandeman
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    "Breathe In, Breathe Out" - Primary tool for optimizing
                    focus and calming nerves.
                  </p>
                </div>
                <div className="bg-card/50 p-3 sm:p-4 rounded-lg shadow-sm">
                  <h3 className="font-semibold mb-2 text-foreground">
                    Jesse Coomer
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    "A Practical Guide to Breathwork" - Foundational protocol
                    for emotional control.
                  </p>
                </div>
                <div className="bg-card/50 p-3 sm:p-4 rounded-lg shadow-sm">
                  <h3 className="font-semibold mb-2 text-foreground">
                    Andrew Smart & Danny Penman
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Accessible mindfulness tools for daily practice.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl text-foreground">
                Conclusion
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base sm:text-lg text-foreground">
                Box breathing is a minimalist yet mighty tool. It's accessible,
                science-supported, and remarkably effective across all walks of
                life—from boardrooms to battlefields. By cultivating a steady
                breath, you build a steady mind, reinforcing the idea that your
                breath is not just air — it's your most direct path to calm,
                control, and clarity.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
