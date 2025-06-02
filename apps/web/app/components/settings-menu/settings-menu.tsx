"use client";

import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { Switch } from "@workspace/ui/components/switch";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  toggleSocketEnabled,
  setAudioSetting,
} from "@/store/audioSettingsSlice";

export function SettingsMenu() {
  const dispatch = useAppDispatch();
  const {
    socketEnabled,
    socketStatus,
    echoCancellation,
    noiseSuppression,
    autoGainControl,
    recordEnabled,
  } = useAppSelector((s) => s.audioSettings);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <Cog6ToothIcon className="w-6 h-6" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64">
        <DropdownMenuLabel>Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <div className="p-2 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">AI Assistance</span>
              <Switch
                checked={socketEnabled}
                onCheckedChange={() => dispatch(toggleSocketEnabled())}
              />
            </div>

            <div className="text-sm text-gray-500 flex justify-between">
              <span>Socket status:</span>
              <span className="font-bold">{socketStatus}</span>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium mb-2">Audio Settings</h3>

              {(
                [
                  ["Echo Cancellation", "echoCancellation", echoCancellation],
                  ["Noise Suppression", "noiseSuppression", noiseSuppression],
                  ["Auto Gain Control", "autoGainControl", autoGainControl],
                  ["Record session", "recordEnabled", recordEnabled],
                ] as const
              ).map(([label, key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-sm">{label}</span>
                  <Switch
                    checked={value}
                    onCheckedChange={(checked) =>
                      dispatch(
                        setAudioSetting({
                          key,
                          value: checked,
                        }),
                      )
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
