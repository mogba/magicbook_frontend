import { useCallback } from "react";

const WEBCLIENT_URL = process.env.NEXT_PUBLIC_WEBCLIENT_URL || "";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

type FetchWrapperOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  body?: Record<string, unknown>;
  params?: Record<string, string | number>;
};

type FetchWrapperResponse<T> =
  | {
      error: false;
      data: T;
    }
  | {
      error: true;
      message: string;
    };

const defaultHeaders: Record<string, string> = {
  "Content-Type": "application/json",
};

function buildQueryParams(params: Record<string, unknown>): string {
  return new URLSearchParams(params as Record<string, string>).toString();
}

export function useMagicFetch() {
  const getToken = useCallback(async () => {
    // TODO: Retrieve token from app's session
    return "<token>";
  }, []);

  const magicFetch = useCallback(
    async function <T = unknown>(
      url: string,
      options: FetchWrapperOptions = {}
    ): Promise<FetchWrapperResponse<T>> {
      let baseUrl = `${
        API_URL?.endsWith("/")
          ? API_URL.substring(0, API_URL.length - 1)
          : API_URL
      }/${url}`;

      const baseHeaders: Record<string, string> = {
        ...defaultHeaders,
        ...options.headers,
        Origin: WEBCLIENT_URL,
        Authorization: `JWT ${await getToken()}`,
      };

      if (options.params) {
        const queryString = buildQueryParams(options.params);
        baseUrl = `${
          baseUrl.endsWith("/")
            ? baseUrl.substring(0, baseUrl.length - 1)
            : baseUrl
        }/${queryString}`;
      }

      const config: RequestInit = {
        ...options,
        credentials: "include",
        headers: baseHeaders,
        method: options.method || "GET",
        body: options.body ? JSON.stringify(options.body) : undefined,
      };

      try {
        const response = await fetch(baseUrl, config);
        const data = await response.json();

        if (!response.ok) {
          return { error: true, message: data.error };
        }

        return { error: false, data };
      } catch (err) {
        return { error: true, message: (err as Error).message };
      }
    },
    [getToken]
  );

  return { magicFetch };
}
