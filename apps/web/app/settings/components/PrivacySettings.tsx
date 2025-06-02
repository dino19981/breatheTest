import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setPreference } from "@/store/preferencesSlice";
import { Label } from "@workspace/ui/components/label";
import { Switch } from "@workspace/ui/components/switch";
import { t } from "@lingui/core/macro";

export function PrivacySettings() {
  const dispatch = useDispatch();
  const { analyticsEnabled } = useSelector(
    (state: RootState) => state.preferences,
  );

  return (
    <div className="rounded-lg border p-4">
      <h2 className="text-xl font-semibold mb-4">{t`Privacy`}</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label>{t`Analytics`}</Label>
            <p className="text-sm text-muted-foreground">
              {t`Help us improve by sharing anonymous usage data`}
            </p>
          </div>
          <Switch
            checked={analyticsEnabled}
            onCheckedChange={(v) =>
              dispatch(setPreference({ key: "analyticsEnabled", value: v }))
            }
          />
        </div>
      </div>
    </div>
  );
}
