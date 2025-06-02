import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setPreference } from "@/store/preferencesSlice";
import { useTheme } from "next-themes";
import { Button } from "@workspace/ui/components/button";
import { Label } from "@workspace/ui/components/label";
import { Switch } from "@workspace/ui/components/switch";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@workspace/ui/components/select";
import { t } from "@lingui/core/macro";

export function AppPreferences() {
  const dispatch = useDispatch();
  const { setTheme } = useTheme();
  const { theme, backgroundMusic, voiceGuides } = useSelector(
    (state: RootState) => state.preferences,
  );

  return (
    <div className="rounded-lg border p-4">
      <h2 className="text-xl font-semibold mb-4">{t`App Preferences`}</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label>{t`Colour Scheme`}</Label>
            <p className="text-sm text-muted-foreground">
              {t`Choose your preferred color scheme`}
            </p>
          </div>
          <Select
            value={theme}
            onValueChange={(v) => {
              setTheme(v);
              dispatch(setPreference({ key: "theme", value: v }));
            }}
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="system">System</SelectItem>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label>{t`App Icon`}</Label>
            <p className="text-sm text-muted-foreground">
              {t`Customize your app icon`}
            </p>
          </div>
          <Button variant="outline" onClick={() => {}}>
            {t`Change`}
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label>{t`Background`}</Label>
            <p className="text-sm text-muted-foreground">
              {t`Customize your app background`}
            </p>
          </div>
          <Button variant="outline" onClick={() => {}}>
            {t`Change`}
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label>{t`Background Music`}</Label>
            <p className="text-sm text-muted-foreground">
              {t`Play calming background music during sessions`}
            </p>
          </div>
          <Switch
            checked={backgroundMusic}
            onCheckedChange={(v) =>
              dispatch(setPreference({ key: "backgroundMusic", value: v }))
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label>{t`Voice Guides`}</Label>
            <p className="text-sm text-muted-foreground">
              {t`Enable voice guidance during breathing exercises`}
            </p>
          </div>
          <Switch
            checked={voiceGuides}
            onCheckedChange={(v) =>
              dispatch(setPreference({ key: "voiceGuides", value: v }))
            }
          />
        </div>
      </div>
    </div>
  );
}
