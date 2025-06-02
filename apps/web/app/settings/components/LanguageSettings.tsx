import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setPreference } from "@/store/preferencesSlice";
import { i18n } from "@/i18n/i18n";
import { t } from "@lingui/core/macro";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@workspace/ui/components/select";

export function LanguageSettings() {
  const dispatch = useDispatch();
  const { language } = useSelector((state: RootState) => state.preferences);

  const switchLang = (newLang: string) => {
    i18n.activate(newLang);
    dispatch(setPreference({ key: "language", value: newLang }));
  };

  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{t`Language`}</h2>
        <Select value={language} onValueChange={switchLang}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="ru">Русский</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
