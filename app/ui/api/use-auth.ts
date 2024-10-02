import { useMagicFetch } from "./use-magic-fetch";

export function useAuth() {
  const { magicFetch } = useMagicFetch();

  async function signUp(params: {
    email: string;
    username: string;
    password: string;
  }) {
    const response = await magicFetch<{
      email: string;
      id: number;
      username: string;
    }>("auth/users/", {
      method: "POST",
      body: params,
    });

    return response;
  }

  async function signIn(params: { username: string; password: string }) {
    const response = await magicFetch<{ access: string; refresh: string }>(
      "auth/jwt/create/",
      {
        method: "POST",
        body: params,
      }
    );

    return response;
  }

  return {
    signUp,
    signIn,
  };
}
