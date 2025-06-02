import { useQuery } from "@tanstack/react-query";
import { secs } from "@/lib/utils/time";
import {
  getAchievementsOptions,
  getUserAchievementsOptions,
} from "@/api/@tanstack/react-query.gen";
import { useAuth } from "@/providers/AuthProvider";
import { FIREBASE_AUTH_TOKEN } from "@/lib/constants";

export function useGetAchievementsQuery() {
  const { user, accessToken: fbToken } = useAuth();
  const userId = user?.uid;

  const polling = false;

  const { data, isLoading, refetch } = useQuery({
    ...getAchievementsOptions({
      headers: {
        // Authorization: `Bearer ${accessToken}`,
        "X-Firebase-Auth": fbToken,
      },
      method: "GET",
    }),
    enabled: Boolean(userId && fbToken),
    refetchInterval: polling ? secs(5).toMs() : undefined,
  });

  console.log("data", data);
  return {
    data,
    isLoading,
    refetch,
  };
}
