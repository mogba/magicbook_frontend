import { useCallback } from "react";

const WEBCLIENT_URL = process.env.NEXT_PUBLIC_WEBCLIENT_URL || "";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

type FetchWrapperOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  body?: any;
  params?: Record<string, string | number>;
};

type FetchWrapperResponse<T> = {
  error: boolean;
  status?: number;
  data?: T;
  message?: string;
};

const defaultHeaders: Record<string, string> = {
  "Content-Type": "application/json",
};

function buildQueryParams(params: Record<string, string | number>): string {
  return new URLSearchParams(params as any).toString();
}

export function useMagicFetch() {
  const magicFetch = useCallback(
    async function <T = any>(
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
        Authorization: `Bearer ${await getToken()}`,
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
        const data = (await response.json()) as T;

        if (!response.ok) {
          return { error: true, status: response.status, data };
        }

        return { error: false, status: response.status, data };
      } catch (err) {
        return { error: true, message: (err as Error).message };
      }
    },
    [getToken]
  );

  return { magicFetch };
}
