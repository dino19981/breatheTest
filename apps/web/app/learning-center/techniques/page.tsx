import { LearningBreadcrumb } from "../components/LearningBreadcrumb";
import { BreathingTechniqueCard } from "./components/BreathingTechniqueCard";

export default function TechniquesPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
      <LearningBreadcrumb />

      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-gray-900 dark:text-gray-100">
          Breathing Techniques
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
          Learn various breathing methods to improve your physical and mental
          well-being
        </p>
      </div>

      {/* Basic Techniques */}
      <div className="mb-12 mt-6">
        <h2 className="text-2xl font-semibold mb-6">Basic Techniques</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <BreathingTechniqueCard
            title="Box Breathing"
            description="4-4-4-4 breathing pattern"
            difficulty="Beginner"
            benefits="Perfect for stress reduction and focus enhancement"
            pattern="Inhale 4s → Hold 4s → Exhale 4s → Hold 4s"
            href="/learning-center/techniques/box-breathing"
          />
          <BreathingTechniqueCard
            title="Wim Hof Method"
            description="Power breathing technique"
            difficulty="Advanced"
            benefits="Enhances immune system and stress resilience"
            pattern="30-40 deep breaths followed by breath retention"
            href="/learning-center/techniques/wim-hof"
            variant="secondary"
          />
        </div>
      </div>

      {/* Nervous System Regulation */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">
          Nervous System Regulation & Calm
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <BreathingTechniqueCard
            title="7-11 Breathing"
            description="Stuart Sandeman's technique for anxiety relief"
            difficulty="Beginner"
            benefits="Activates parasympathetic response, ideal for anxiety or pre-sleep winding down"
            pattern="Inhale 7s → Exhale 11s"
            href="/learning-center/techniques/7-11-breathing"
          />
          <BreathingTechniqueCard
            title="Extended Exhale"
            description="Coomer & Vranich's protocol"
            difficulty="Beginner"
            benefits="Switches off fight-or-flight responses through lengthened exhales"
            pattern="Exhale 2x inhale duration"
            href="/learning-center/techniques/extended-exhale"
            variant="outline"
          />
        </div>
      </div>

      {/* Sleep & Recovery */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">
          Better Sleep & Nighttime Recovery
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <BreathingTechniqueCard
            title="Breathing Recovery Exercise"
            description="McKeown's technique for better sleep"
            difficulty="Beginner"
            benefits="Quietens the mind before bed through light nasal breathing"
            pattern="Light nasal breathing with relaxed pauses"
            href="/learning-center/techniques/breathing-recovery"
          />
          <BreathingTechniqueCard
            title="4-7-8 Breath"
            description="Weil & Coomer's sleep technique"
            difficulty="Beginner"
            benefits="Induces deeply sedative response, effective for insomnia"
            pattern="Inhale 4s → Hold 7s → Exhale 8s"
            href="/learning-center/techniques/4-7-8-breathing"
            variant="outline"
          />
        </div>
      </div>

      {/* Performance & Endurance */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Performance & Endurance</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <BreathingTechniqueCard
            title="Rhythmic Running Breath"
            description="Budd Coates' technique"
            difficulty="Intermediate"
            benefits="Balances impact forces, enhances endurance"
            pattern="3:2 or 2:2 step-to-breath ratio"
            href="/learning-center/techniques/rhythmic-running"
          />
          <BreathingTechniqueCard
            title="Nasal Breathing for Athletes"
            description="McKeown & Vranich's protocol"
            difficulty="Intermediate"
            benefits="Boosts nitric oxide, improves VO2 max and endurance"
            pattern="Exclusive nasal breathing during exercise"
            href="/learning-center/techniques/nasal-athletic"
            variant="outline"
          />
        </div>
      </div>

      {/* Energy & Activation */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Energy & Activation</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <BreathingTechniqueCard
            title="Energizing Breath"
            description="Smart & Coomer's technique"
            difficulty="Beginner"
            benefits="Stimulates alertness and energy before workouts or mental tasks"
            pattern="Fast, rhythmic nasal inhales"
            href="/learning-center/techniques/energizing-breath"
          />
          <BreathingTechniqueCard
            title="Bellows Breath"
            description="Traditional Bhastrika technique"
            difficulty="Advanced"
            benefits="Stimulates alertness and generates heat"
            pattern="Vigorous inhale-exhale cycles"
            href="/learning-center/techniques/bellows-breath"
            variant="outline"
          />
        </div>
      </div>

      {/* Mindfulness & Awareness */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Mindfulness & Awareness</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <BreathingTechniqueCard
            title="Counting Breath Meditation"
            description="Smart's focus training technique"
            difficulty="Beginner"
            benefits="Enhances focus and mindfulness"
            pattern="Count breaths 1-10 repeatedly"
            href="/learning-center/techniques/counting-breath"
          />
          <BreathingTechniqueCard
            title="Diaphragmatic Breathing"
            description="Vranich & Olsson's technique"
            difficulty="Beginner"
            benefits="Builds breathing intelligence and presence"
            pattern="Full belly and rib expansion"
            href="/learning-center/techniques/diaphragmatic"
            variant="outline"
          />
        </div>
      </div>

      {/* Advanced Tools */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">
          Advanced Tools & Concepts
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <BreathingTechniqueCard
            title="Control Pause Test"
            description="McKeown's assessment tool"
            difficulty="Advanced"
            benefits="Measures CO₂ tolerance and breathing efficiency"
            pattern="Breath-hold after exhale"
            href="/learning-center/techniques/control-pause"
          />
          <BreathingTechniqueCard
            title="CO₂ Tolerance Training"
            description="Coomer & McKeown's protocol"
            difficulty="Advanced"
            benefits="Increases stress resilience and physical performance"
            pattern="Structured breath-hold techniques"
            href="/learning-center/techniques/co2-tolerance"
            variant="outline"
          />
        </div>
      </div>
    </div>
  );
}
