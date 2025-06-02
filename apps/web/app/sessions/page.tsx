"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { resetSessions } from "@/store/sessionsSlice";
import { t } from "@lingui/core/macro";
import { SessionAnalyticsDialog } from "@/components/session-analytics/session-analytics-dialog";
import { buildAnalyticsFromSession } from "@/lib/analytics";

export default function SessionsPage() {
  const sessions = useSelector((state: RootState) => state.sessions.sessions);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const dispatch = useDispatch();

  const selected = sessions.find((s) => s.id === activeSessionId);
  const analytics = selected ? buildAnalyticsFromSession(selected) : null;
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{t`Saved Sessions`}</h1>

      <button
        onClick={() => dispatch(resetSessions())}
        className="text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
      >
        {t`Delete all`}
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {sessions.map((session) => (
          <button
            key={session.id}
            onClick={() => {
              setActiveSessionId(session.id);
              setShowAnalytics(true);
            }}
            className="border rounded-xl p-4 text-left shadow hover:bg-gray-50 transition"
          >
            <p className="text-lg font-semibold">
              {t`Session`} {new Date(session.createdAt).toLocaleString()}
            </p>
            <p className="text-sm text-gray-500">
              {session.events.length} {t`events`}
            </p>
          </button>
        ))}
      </div>

      <SessionAnalyticsDialog
        session={selected || null}
        analytics={analytics}
        open={showAnalytics}
        onOpenChange={setShowAnalytics}
      />
    </div>
  );
}
