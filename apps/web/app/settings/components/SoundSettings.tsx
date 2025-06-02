import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setPreference } from "@/store/preferencesSlice";
import { Label } from "@workspace/ui/components/label";
import { t } from "@lingui/core/macro";

export function SoundSettings() {
  const dispatch = useDispatch();
  const { voiceVolume, musicVolume } = useSelector(
    (state: RootState) => state.preferences,
  );

  return (
    <div className="rounded-lg border p-4">
      <h2 className="text-xl font-semibold mb-4">{t`Sounds`}</h2>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Label>{t`Voice`}</Label>
          <input
            type="range"
            min={0}
            max={100}
            value={voiceVolume}
            onChange={(e) =>
              dispatch(
                setPreference({
                  key: "voiceVolume",
                  value: Number(e.target.value),
                }),
              )
            }
            className="w-2/3 accent-black"
          />
        </div>

        <div className="flex items-center justify-between">
          <Label>{t`Music`}</Label>
          <input
            type="range"
            min={0}
            max={100}
            value={musicVolume}
            onChange={(e) =>
              dispatch(
                setPreference({
                  key: "musicVolume",
                  value: Number(e.target.value),
                }),
              )
            }
            className="w-2/3 accent-black"
          />
        </div>
      </div>
    </div>
  );
}
