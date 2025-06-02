import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setPreference } from "@/store/preferencesSlice";
import { Button } from "@workspace/ui/components/button";
import { Label } from "@workspace/ui/components/label";
import { t } from "@lingui/core/macro";

export function GeneralSettings() {
  const dispatch = useDispatch();
  const { units, weekStart } = useSelector(
    (state: RootState) => state.preferences,
  );

  return (
    <div className="rounded-lg border p-4">
      <h2 className="text-xl font-semibold mb-4">{t`General`}</h2>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Label>{t`Units`}</Label>
          <div className="flex gap-2">
            <Button
              variant={units === "metric" ? "default" : "outline"}
              onClick={() =>
                dispatch(setPreference({ key: "units", value: "metric" }))
              }
            >
              {t`Metric`}
            </Button>
            <Button
              variant={units === "imperial" ? "default" : "outline"}
              onClick={() =>
                dispatch(setPreference({ key: "units", value: "imperial" }))
              }
            >
              {t`Imperial`}
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Label>{t`Week starts on`}</Label>
          <div className="flex gap-2">
            <Button
              variant={weekStart === "monday" ? "default" : "outline"}
              onClick={() =>
                dispatch(setPreference({ key: "weekStart", value: "monday" }))
              }
            >
              {t`Monday`}
            </Button>
            <Button
              variant={weekStart === "sunday" ? "default" : "outline"}
              onClick={() =>
                dispatch(setPreference({ key: "weekStart", value: "sunday" }))
              }
            >
              {t`Sunday`}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
