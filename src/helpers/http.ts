import { API_BASE_URL } from "@/constants";


export interface HttpResponse<T> extends Response {
  parsedBody?: T;
}

type PostPathGenerator = (basePath: string) => string;

export type HttpClient = <T>(req: RequestInfo) => Promise<HttpResponse<T>>;

export type ClientGet = <T>(
  path: string | PostPathGenerator,
  filters?: Record<string, any>,
  isBase?: boolean,
  headers?: Headers
) => Promise<HttpResponse<T>>;

export type ClientPost = <T, E>(
  path: string | PostPathGenerator,
  body?: E | undefined,
  isBase?: boolean,
  headers?: Headers
) => Promise<HttpResponse<T>>;

export type ClientPatch = <T, E>(
  path: string | PostPathGenerator,
  body?: E | undefined,
  isBase?: boolean,
  headers?: Headers
) => Promise<HttpResponse<T>>;

/**
 * This is the base method for API calls in the project.
 * It has 2 derivatives, `get` and `post`
 *
 * @param request  - an instance of `RequestInfo` or a string url
 * @returns A promisified instance of `HttpResponse`
 */
export async function http<T>(
  request: RequestInfo
): Promise<HttpResponse<T>> {
  const response: HttpResponse<T> = await fetch(request);
  //@ts-ignore
  response.parsedBody = await response.json();

  if (!response.ok) {
    console.error(response.parsedBody);
    throw response.parsedBody;
  }

  return response;
}

/**
 * This is the `get` derivative of the `http` method.
 * It is used to make GET requests to internal or external endpoints across the project
 *
 * @param path - the path which GET requests are routed to.
 * @param shouldIncludeBaseUrl - To determine if the path is an internal or external path and would require prepending the BASE_PATH
 * @param filters - A set of filters to be applied to the request
 * @param headers - A set of headers to be applied to the request
 * @returns A promisified instance of `HttpResponse`
 */
export async function get<T>(
  path: string | PostPathGenerator,
  filters: Record<string, any> = {},
  shouldIncludeBaseUrl: boolean = true,
  headers: Headers = new Headers({})
): Promise<HttpResponse<T>> {
  const args: RequestInit = {
    method: "GET",
    headers: {
      ...(headers && headers),
    },
  };

  const url = new URL(
    typeof path === "string" ? path : path(API_BASE_URL),
    shouldIncludeBaseUrl ? API_BASE_URL : undefined
  );
  for (const key in filters) {
    if (Object.prototype.hasOwnProperty.call(filters, key) && filters[key]) {
      url.searchParams.append(key, filters[key]);
    }
  }

  return await http<T>(new Request(url.toString(), args));
}

/**
 * This is the `post` derivative of the `http` method.
 * It is used to make POST requests to internal or external endpoints across the project
 *
 * @param path - the path which GET requests are routed to.
 * @param shouldIncludeBaseUrl - To determine if the path is an internal or external path and would require prepending the BASE_PATH
 * @param filters - A set of filters to be applied to the request
 * @param headers - A set of headers to be applied to the request
 * @returns A promisified instance of `HttpResponse`
 */
export async function post<T, E>(
  path: string | PostPathGenerator,
  body?: E | undefined,
  shouldIncludeBaseUrl: boolean = true,
  headers: Headers = new Headers({})
): Promise<HttpResponse<T>> {
  const args: RequestInit = {
    ...(body && { body: JSON.stringify(body) }),
    method: "POST",
    headers: {
      Accept: "application/json",
      ...(body && { "Content-Type": "application/json" }),
      ...(headers && headers),
    },
  };

  const url = new URL(
    typeof path === "string" ? path : path(API_BASE_URL),
    shouldIncludeBaseUrl ? API_BASE_URL : undefined
  );

  return await http<T>(new Request(url.toString(), args));
}

/**
 * This is the `patch` derivative of the `http` method.
 * It is used to make PATCH requests to internal or external endpoints across the project
 *
 * @param path - the path which PATCH requests are routed to.
 * @param shouldIncludeBaseUrl - To determine if the path is an internal or external path and would require prepending the BASE_PATH
 * @param filters - A set of filters to be applied to the request
 * @param headers - A set of headers to be applied to the request
 * @returns  A promisified instance of `HttpResponse`
 */
export async function patch<T, E>(
  path: string | PostPathGenerator,
  body?: E,
  shouldIncludeBaseUrl: boolean = true,
  headers: Headers = new Headers({})
): Promise<HttpResponse<T>> {
  const args: RequestInit = {
    ...(body && { body: JSON.stringify(body) }),
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(headers && headers),
    },
  };
  const url = new URL(
    typeof path === "string" ? path : path(API_BASE_URL),
    shouldIncludeBaseUrl ? API_BASE_URL : undefined
  );
  return await http<T>(new Request(url.toString(), args));
}
