import { useQuery } from "@tanstack/react-query";
import { secs } from "@/lib/utils/time";
import { getUserPersonalBestResultsOptions } from "@/api/@tanstack/react-query.gen";
import { useAuth } from "@/providers/AuthProvider";

export function useGetUserBestResultsQuery(
  userId: string | undefined,
  authQueryKey: string | undefined,
  polling = false,
) {
  const { user } = useAuth();
  console.log("user", user);
  const { data, isLoading, refetch } = useQuery({
    queryKey: [useGetUserBestResultsQuery.name, userId, authQueryKey],
    queryFn: async () => {
      if (!userId) throw new Error("userId is not provided");
      if (!authQueryKey) throw new Error("auth required");

      const response = await getUserPersonalBestResultsOptions({
        path: {
          userId,
        },
        headers: {
          Authorization: `Bearer ${authQueryKey}`,
        },
      });

      if (!response) {
        throw new Error(`Failed to fetch user best results: ${response}`);
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
