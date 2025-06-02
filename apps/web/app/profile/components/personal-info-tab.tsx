import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Info } from "lucide-react";

interface PersonalInfo {
  height: string;
  weight: string;
  dateOfBirth: string;
  sexAssignedAtBirth: string;
}

interface PersonalInfoTabProps {
  personalInfo: PersonalInfo;
}

const breathFactors = {
  "Lung Condition": [
    "Asthma",
    "Pulmonary Fibrosis",
    "Cystic Fibrosis",
    "COPD",
    "Bronchitis (Chronic or Recurrent)",
    "Pneumonia (Past or Recent)",
    "Emphysema",
    "Interstitial Lung Disease",
    "Tuberculosis (Past or Active)",
    "Pulmonary Hypertension",
    "Bronchiectasis",
    "Pleural Effusion (Fluid around lungs)",
    "Collapsed Lung (Pneumothorax)",
    "COVID-related Lung Complications",
  ],
  "Nasal or Airway Issue": [
    "Chronic Sinusitis",
    "Long-term Mouth Breather",
    "Nose/sinus surgery",
    "Deviated Septum",
    "Allergies",
    "Blocked nose",
    "Tonsils/Adenoids",
  ],
  "Mind & Emotions": [
    "Anxiety",
    "Stress",
    "Trauma/PTSD",
    "Breath Holding Habit",
  ],
  "Lifestyle & Environment": [
    "Smoking or vaping (current or past)",
    "Poor Air Quality",
    "Sedentary Lifestyle",
    "Obesity",
    "High Altitude Living",
  ],
  "Breath Practice or Voice Use": [
    "Meditation",
    "Yoga",
    "Singer / Performer",
    "Cold Exposure / Ice Baths",
    "Wind Instrument Player",
    "Freediving/Underwater Sports",
    "Voice-Heavy Profession",
  ],
  "Sleep & Breathing Disorders": [
    "Snoring",
    "Sleep Apnea",
    "Restless Sleep",
    "Insomnia",
    "Nighttime Breath-Holding",
    "Waking Up Gasping",
    "Poor Sleep Quality (breath-related)",
  ],
};

export function PersonalInfoTab({ personalInfo }: PersonalInfoTabProps) {
  const [selectedBreathFactors, setSelectedBreathFactors] = useState<string[]>(
    [],
  );

  return (
    <Card>
      <CardHeader className="px-4 py-3">
        <CardTitle className="text-base">Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b text-sm">
              <span>Height</span>
              <span className="text-muted-foreground">
                {personalInfo.height}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b text-sm">
              <span>Weight</span>
              <span className="text-muted-foreground">
                {personalInfo.weight}
              </span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b text-sm">
              <span>Date of birth</span>
              <span className="text-muted-foreground">
                {personalInfo.dateOfBirth}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b text-sm">
              <span>Sex assigned at birth</span>
              <span className="text-muted-foreground">
                {personalInfo.sexAssignedAtBirth}
              </span>
            </div>
          </div>
        </div>
        {/* Breath Factors Section */}
        <div className="mt-6">
          <div className="font-medium mb-2">Things affecting my breath</div>
          {Object.entries(breathFactors).map(([category, options]) => (
            <div key={category} className="mb-4">
              <div className="font-semibold text-sm mb-1">{category}</div>
              <div className="flex flex-wrap gap-3">
                {options.map((option) => (
                  <label
                    key={option}
                    className="flex items-center gap-2 text-xs"
                  >
                    <input
                      type="checkbox"
                      checked={selectedBreathFactors.includes(option)}
                      onChange={() => {
                        setSelectedBreathFactors((prev) =>
                          prev.includes(option)
                            ? prev.filter((o) => o !== option)
                            : [...prev, option],
                        );
                      }}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 mt-3">
          <Info className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground cursor-pointer hover:underline">
            Why do we need this information?
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
