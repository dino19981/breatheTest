import { t } from "@lingui/core/macro";
import { StarIcon } from "@heroicons/react/24/solid";

export function Testimonials() {
  return (
    <div className="mt-32">
      <h2 className="text-4xl font-bold text-center mb-16">{t`What Our Users Say`}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Testimonial 1 */}
        <div className="rounded-xl border p-6 bg-card">
          <div className="flex items-center mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
              ))}
            </div>
          </div>
          <p className="text-muted-foreground mb-4">
            {t`"Breathtake has completely transformed my daily routine. The AI-guided sessions are incredibly effective at reducing my stress levels. I've never felt more in control of my breathing and overall well-being."`}
          </p>
          <div className="font-semibold">Sarah M.</div>
          <div className="text-sm text-muted-foreground">{t`Yoga Instructor`}</div>
        </div>

        {/* Testimonial 2 */}
        <div className="rounded-xl border p-6 bg-card">
          <div className="flex items-center mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
              ))}
            </div>
          </div>
          <p className="text-muted-foreground mb-4">
            {t`"As a professional athlete, I need every advantage I can get. Breathtake's real-time feedback and personalized sessions have significantly improved my performance and recovery times."`}
          </p>
          <div className="font-semibold">Michael R.</div>
          <div className="text-sm text-muted-foreground">{t`Professional Athlete`}</div>
        </div>

        {/* Testimonial 3 */}
        <div className="rounded-xl border p-6 bg-card">
          <div className="flex items-center mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
              ))}
            </div>
          </div>
          <p className="text-muted-foreground mb-4">
            {t`"The premium content library is worth every penny. The medical expert insights and clinical protocols have helped me better understand and manage my anxiety. Highly recommended!"`}
          </p>
          <div className="font-semibold">Emma L.</div>
          <div className="text-sm text-muted-foreground">{t`Healthcare Professional`}</div>
        </div>

        {/* Testimonial 4 */}
        <div className="rounded-xl border p-6 bg-card">
          <div className="flex items-center mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
              ))}
            </div>
          </div>
          <p className="text-muted-foreground mb-4">
            {t`"I was skeptical at first, but the scientific research backing Breathtake convinced me to try it. The results have been amazing - better sleep, more focus, and reduced stress levels."`}
          </p>
          <div className="font-semibold">David K.</div>
          <div className="text-sm text-muted-foreground">{t`Software Engineer`}</div>
        </div>

        {/* Testimonial 5 */}
        <div className="rounded-xl border p-6 bg-card">
          <div className="flex items-center mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
              ))}
            </div>
          </div>
          <p className="text-muted-foreground mb-4">
            {t`"The self-paced approach is perfect for my busy schedule. I love being able to customize my sessions and track my progress over time. It's become an essential part of my daily routine."`}
          </p>
          <div className="font-semibold">Lisa T.</div>
          <div className="text-sm text-muted-foreground">{t`Entrepreneur`}</div>
        </div>

        {/* Testimonial 6 */}
        <div className="rounded-xl border p-6 bg-card">
          <div className="flex items-center mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
              ))}
            </div>
          </div>
          <p className="text-muted-foreground mb-4">
            {t`"As a meditation teacher, I'm always looking for new tools to recommend to my students. Breathtake's combination of traditional techniques and modern technology is truly innovative."`}
          </p>
          <div className="font-semibold">James W.</div>
          <div className="text-sm text-muted-foreground">{t`Meditation Teacher`}</div>
        </div>
      </div>
    </div>
  );
}
