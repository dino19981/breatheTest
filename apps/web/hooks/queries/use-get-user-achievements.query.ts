import { useQuery } from "@tanstack/react-query";
import { secs } from "@/lib/utils/time";
import { getUserAchievementsOptions } from "@/api/@tanstack/react-query.gen";
import { useAuth } from "@/providers/AuthProvider";
import { FIREBASE_AUTH_TOKEN } from "@/lib/constants";

export function useGetUserAchievementsQuery() {
  const { user, accessToken: fbToken } = useAuth();
  const userId = user?.uid;

  const polling = false;

  const accessToken = `eyJhbGciOiJSUzI1NiIsImtpZCI6ImJhYTY0ZWZjMTNlZjIzNmJlOTIxZjkyMmUzYTY3Y2M5OTQxNWRiOWIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIzMjU1NTk0MDU1OS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImF1ZCI6IjMyNTU1OTQwNTU5LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTExOTExNzE5MzIwODUwODY3NDk4IiwiZW1haWwiOiJhbmFzdGFzMzk5M0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IjVhYmtOaEFfT2g4X2FBWlRyRlZtZ0EiLCJpYXQiOjE3NDg2ODIwMzYsImV4cCI6MTc0ODY4NTYzNn0.fx_l39FjxNRHZzYskNciSnEChtGaO8NfvRiYs31RRAznXg6OyyoFk30tcBYrhX2fSwDb4BxmS0z-8yWp63Tp0-YG_04LlB3POEBkWATUMJo-U6Lp7k3-rKaSHXlBSscgc4g8JRFl9olyWBy2Ss3erwXp0Gd8FerpCQCssl3IzGT4n405oktahNQWOH5ODUSrAyXjWeYj_4abXQN_A9bvJxkUjkQSjxO0vwgAC2hVA5YpxrNngzz6E1uOlBSjCH6MUjyg2Hqry69GLQnLpLKv3eFCSrDL9n5Evzjyf8aenWdRtCIg-5Xtyl-pdF8DtzRZIsU6PmFuRRPn6iwWnz_DwA`;

  const { data, isLoading, refetch } = useQuery({
    ...getUserAchievementsOptions({
      path: {
        userId: userId!,
      },
      headers: {
        // Authorization: `Bearer ${accessToken}`,
        "X-Firebase-Auth": fbToken,
      },
      method: "GET",
    }),
    enabled: Boolean(userId && accessToken),
    refetchInterval: polling ? secs(5).toMs() : undefined,
  });

  console.log("data", data);
  return {
    data,
    isLoading,
    refetch,
  };
}
