import { useQuery } from "@tanstack/react-query";
import { secs } from "@/lib/utils/time";
import { getSessions } from "@/api";

export function useGetUserSessionsQuery(
  userId: string | undefined,
  authQueryKey: string | undefined,
  polling = false,
) {
  const { data, isLoading, refetch } = useQuery({
    queryKey: [useGetUserSessionsQuery.name, userId, authQueryKey],
    queryFn: async () => {
      if (!userId) throw new Error("userId is not provided");
      if (!authQueryKey) throw new Error("auth required");

      const response = await getSessions({
        path: {
          userId,
        },
      });

      if (!response) {
        throw new Error(`Failed to fetch user sessions: ${response}`);
      }

      return response;
    },
    enabled: Boolean(userId && authQueryKey),
    refetchInterval: polling ? secs(5).toMs() : undefined,
  });

  return {
    data,
    isLoading,
    refetch,
  };
}
