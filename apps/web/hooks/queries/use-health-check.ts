import { useQuery } from "@tanstack/react-query";
import { getHealthV1Options } from "@/api/@tanstack/react-query.gen";
import { useAuth } from "@/providers/AuthProvider";

const hardcoded = `eyJhbGciOiJSUzI1NiIsImtpZCI6ImJhYTY0ZWZjMTNlZjIzNmJlOTIxZjkyMmUzYTY3Y2M5OTQxNWRiOWIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIzMjU1NTk0MDU1OS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImF1ZCI6IjMyNTU1OTQwNTU5LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTExOTExNzE5MzIwODUwODY3NDk4IiwiZW1haWwiOiJhbmFzdGFzMzk5M0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6Ii1EM3AtNjdHQ0h5dnJBSEZYZm5Oa3ciLCJpYXQiOjE3NDg2MTAwNjYsImV4cCI6MTc0ODYxMzY2Nn0.TmNOFyMrOSaOhkKJNOK0h52gpDWDmGJKtOkv9xCVtReiBVYBvEMTuK7lDvX9rnRBFukUp_m3qbsQOYMI9gTW2s0NZI8d0N3747wKV0G9j88x_XGowckSHBvPqjBWQNIT21C08f5AJ6vz4_4ZfGBzZIso01oezpsXYyGe0BZzyVgvyr8dzxFbcRDa-ker0FlcMnedxqfwYs99FdqQFEwgGPZ80j5kV9wdBAOIvq0r3fHpDSaGIAYiWFcUN3SjG_EsoYenLDHfKy28yGlIyBOmhVuXLnb0K8Da_CNa8NCGuq3HxQchpsu5EuxzTPhA7mO6tHMnp-ew8QFivcAkQs2dWA`;

export function useHealthCheck() {
  const { user, accessToken } = useAuth();

  const polling = false;

  const { data, isLoading, refetch } = useQuery({
    ...getHealthV1Options({
      headers: {
        // Authorization: `Bearer ${accessToken}`,
        // "X-Firebase-Auth": "AIzaSyCJTSf_aQY1DFrlKO4HjPz5svShJ8Vjtok",
      },
      method: "GET",
    }),
    enabled: Boolean(accessToken),
  });

  console.log("data", data);
  return {
    data,
    isLoading,
    refetch,
  };
}
