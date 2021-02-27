/**
 * 😺 Worter
 * An easy-way to build Cloudflare Workers.
 *
 * Logo:
 * https://emojipedia.org/grinning-cat/
 */

/**
 * I use this package in order to map specified path to the handler function.
 */
import {
    Path,
    pathToRegexp,
    TokensToRegexpOptions,
    ParseOptions,
    Key,
} from "path-to-regexp";

/**
 * HTTP methods enums
 *
 * References:
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
 */
export enum HTTPMethod {
    ALL = "ALL",
    CONNECT = "CONNECT",
    DELETE = "DELETE",
    GET = "GET",
    HEAD = "HEAD",
    OPTIONS = "OPTIONS",
    PATCH = "PATCH",
    POST = "POST",
    PUT = "PUT",
    TRACE = "TRACE",
}

/**
 * HTTPRequest options
 */
export interface HTTPRequestOptions {
    app: Worter;
    params?: Record<string, string>;
    query?: URLSearchParams;
}

/**
 * Request object.
 */
export class HTTPRequest extends Request {
    public readonly app: Worter;
    public query: URLSearchParams;
    public params: Record<string, string | undefined>;

    constructor(
        input: RequestInfo,
        options: HTTPRequestOptions,
        init?: RequestInit
    ) {
        super(input, init);

        this.app = options.app;

        // Request query
        if (options.query) {
            this.query = options.query;
        } else {
            // Set query based on the request URL
            if (typeof input == "string") {
                const { searchParams } = new URL(input);
                this.query = searchParams;
            } else {
                const { searchParams } = new URL(input.url);
                this.query = searchParams;
            }
        }

        // Request params
        if (options.params) {
            this.params = options.params;
        } else {
            // Set params as empty object
            this.params = {};
        }
    }
}

/**
 * Response object.
 */
export class HTTPResponse extends Response {
    public readonly app: Worter;

    constructor(
        app: Worter,
        body?:
            | string
            | Blob
            | ArrayBufferView
            | ArrayBuffer
            | FormData
            | URLSearchParams
            | ReadableStream<Uint8Array>
            | null,
        init?: ResponseInit
    ) {
        super(body, init);
        this.app = app;
    }

    // Sets the response’s HTTP header `key` to `value`
    public header(key: string, value: string): HTTPResponse;
    // Sets the multiple response's HTTP header `key`s
    public header(headers: Record<string, string>): HTTPResponse;
    public header(
        input: string | Record<string, string>,
        value?: string
    ): HTTPResponse {
        // If value is exists and input is string, then set the key to value
        if (typeof input == "string" && value) {
            this.headers.set(input, value);
        }

        // If the input is Record, then set the key one by one
        if (typeof input == "object") {
            for (const key in input) {
                const value = input[key];
                this.headers.set(key, value);
            }
        }

        return this;
    }

    // Sets the HTTP status for the response.
    // We cannot override the Response.status property to a function.
    // Read more: https://stackoverflow.com/a/38860482
    public code(status: number): HTTPResponse {
        // Because body property is read only, we need to create new response
        const response = new HTTPResponse(this.app, this.body, {
            status: status,
            statusText: this.statusText,
            headers: this.headers,
        });
        return response;
    }

    // Returns HTML response.
    // Please note that this method returns the copy
    // of existing response object with the specified response body and add
    // content type header as HTML, it doesn't modify the existing response
    // object.
    public html(body: string): HTTPResponse {
        // Because body property is read only, we need to create new response
        const response = new HTTPResponse(this.app, body, {
            status: this.status,
            statusText: this.statusText,
            headers: this.headers,
        });

        // then set the Content-Type header
        response.header("Content-Type", "text/html; charset=UTF-8");

        return response;
    }

    public json(): Promise<any>; // This is built-in response.json method
    public json(body: object | null): HTTPResponse; // This is our implementation that return JSON response
    public json(body?: object | null): Promise<any> | HTTPResponse {
        // If body is provided, then return new HTTPResponse
        if (body) {
            // Convert the object to string
            const jsonString = JSON.stringify(body);
            // Create copy with specified body
            const response = new HTTPResponse(this.app, jsonString, {
                status: this.status,
                statusText: this.statusText,
                headers: this.headers,
            });

            // then set the Content-Type header
            response.header("Content-Type", "application/json");
            return response;
        }
        // If there is no body provided, then return Response.json()
        return super.json();
    }

    // Sets the body for the response.
    // We cannot override the Response.body property to a function.
    // Read more: https://stackoverflow.com/a/38860482
    //
    // Please note that this method returns the copy
    // of existing response object with the specified response body,
    // it doesn't modify the existing response object.
    public send(
        body:
            | string
            | Blob
            | ArrayBufferView
            | ArrayBuffer
            | FormData
            | URLSearchParams
            | ReadableStream<Uint8Array>
            | null
    ): HTTPResponse {
        const response = new HTTPResponse(this.app, body, {
            status: this.status,
            statusText: this.statusText,
            headers: this.headers,
        });
        return response;
    }
}

// HTTPRequestResponse is an interface that returned by RouteHandlerFn that act
// as signal to call the next RouteHandlerFn in the stack.
export interface HTTPRequestResponse {
    request: HTTPRequest;
    response: HTTPResponse;
}

/**
 * RouteHandlerFn is a function that process incoming HTTPRequest
 * and returns HTTPResponse, promise of HTTPResponse, HTTPRequestResponse or
 * promise of HTTPRequestResponse.
 */
export type RouteHandlerFn = (
    request: HTTPRequest,
    response: HTTPResponse
) =>
    | HTTPResponse
    | Promise<HTTPResponse>
    | HTTPRequestResponse
    | Promise<HTTPRequestResponse>;

/**
 * The path for which the handler function is invoked; can be any of:
 *  - A string representing a path.
 *  - A regular expression pattern to match paths.
 */
export type RoutePath = Path;

/**
 * Route options
 */
export type RouteOptions = TokensToRegexpOptions & ParseOptions;

/**
 * Extracted route parameters
 */
export interface ExtractedRouteParams {
    [key: string]: string;
}

/**
 * A route object is a map of path to the specified handler function(s).
 */
class Route {
    method: HTTPMethod;
    path: RoutePath;
    handlers: Array<RouteHandlerFn>;
    regexp: RegExp;
    keys: Array<Key>;
    matches?: RegExpExecArray;
    params?: ExtractedRouteParams;

    /**
     * Construct new route object.
     *
     * @param method HTTP Method.
     * @param path Route path.
     * @param handler Handler function.
     * @param options Route options.
     * @param regexp Generated regexp from path.
     * @param keys List of key found in the path.
     */
    constructor(
        method: HTTPMethod,
        path: RoutePath,
        handlers: Array<RouteHandlerFn>,
        regexp: RegExp,
        keys: Array<Key>,
        matches?: RegExpExecArray,
        params?: ExtractedRouteParams
    ) {
        this.method = method;
        this.path = path;
        this.handlers = handlers;
        this.regexp = regexp;
        this.keys = keys;
        this.matches = matches;
        this.params = params;
    }
}

/**
 * A router object is responsible for routing handler functions.
 */
export class Router {
    // List of available routes
    private routes: Array<Route> = [];

    // This options is for pathToRegexp library.
    // https://github.com/pillarjs/path-to-regexp#usage
    public readonly options?: RouteOptions;

    constructor(options?: RouteOptions) {
        // Set options if any
        this.options = options;
    }

    /**
     * Register new route object to the router.
     *
     * @param method HTTP method.
     * @param path Path.
     * @param handlers An array of Handler functions.
     */
    registerRoute(
        method: HTTPMethod,
        path: RoutePath,
        handlers: Array<RouteHandlerFn>
    ) {
        // Convert wildcard to regexp
        if (typeof path === "string") {
            path = path.replace(/\*/g, "(.*)");
        }
        if (Array.isArray(path)) {
            path = path.map((pathValue) => {
                if (typeof pathValue == "string") {
                    return pathValue.replace(/\*/g, "(.*)");
                }
                return pathValue;
            });
        }

        // Convert path to regexp
        let keys: Array<Key> = [];
        let regexp;
        if (this.options) {
            regexp = pathToRegexp(path, keys, this.options);
        } else {
            regexp = pathToRegexp(path, keys);
        }

        // Add route
        this.routes.push(new Route(method, path, handlers, regexp, keys));
        return this;
    }

    /**
     * Extract parameters from matched route.
     * The extracted value is autmatically decoded using decodeURIComponent.
     *
     * @param matches List of match regexp.
     * @param keys List of key in the path.
     */
    private extractParameters(
        matches: RegExpExecArray,
        keys: Array<Key>
    ): ExtractedRouteParams {
        const params: ExtractedRouteParams = {};
        for (let i = 1; i < matches.length; i++) {
            const key = keys[i - 1];
            const prop = key.name;
            const val = matches[i];
            if (val !== undefined) {
                params[prop] = decodeURIComponent(val);
            }
        }
        return params;
    }

    /**
     * Find route that match method & path.
     *
     * @param method HTTP method.
     * @param path Route path.
     */
    findRoute(method: HTTPMethod, path: RoutePath): Route | null {
        // Check for each route
        for (const route of this.routes) {
            // Skip immediately if method doesn't match
            if (route.method !== method && route.method !== HTTPMethod.ALL)
                continue;

            // Speed optimizations for catch all wildcard routes
            if (route.path === "(.*)") {
                route.params = { "0": route.path };
                return route;
            }

            // If method matches try to match path regexp
            const matches = route.regexp.exec(path as string);

            // If there is no matched, then skip
            if (!matches || !matches.length) continue;

            // If there is match, then return route with extracted parameters
            route.matches = matches;
            route.params = this.extractParameters(matches, route.keys);
            return route;
        }

        // If there is no route that match with HTTP method and route path,
        // then returns null
        return null;
    }

    /**
     * Routes HTTP GET requests to the specified path with the specified handler functions.
     *
     * @param path The route path.
     * @param handlers Handler function(s).
     */
    public get(path: RoutePath, ...handlers: RouteHandlerFn[]) {
        this.registerRoute(HTTPMethod.GET, path, handlers);
    }

    /**
     * Routes HTTP POST requests to the specified path with the specified handler functions.
     *
     * @param path The route path.
     * @param handlers Handler function(s).
     */
    public post(path: RoutePath, ...handlers: RouteHandlerFn[]) {
        this.registerRoute(HTTPMethod.POST, path, handlers);
    }
}

export interface ApplicationSettings {
    caseSensitiveRouting?: boolean;
    strictRouting?: boolean;
}

export class Worter {
    public router: Router;

    constructor(settings?: ApplicationSettings) {
        // Default settings
        let caseSensitiveRouting = false;
        let strictRouting = false;

        // Override the default settings
        if (settings?.caseSensitiveRouting) {
            caseSensitiveRouting = settings.caseSensitiveRouting;
        }
        if (settings?.strictRouting) {
            strictRouting = settings.strictRouting;
        }

        // Initialize the built-in router with the settings
        this.router = new Router({
            sensitive: caseSensitiveRouting,
            strict: strictRouting,
        });
    }

    /**
     * Routes HTTP GET requests to the specified path with the specified handler functions.
     *
     * @param path The route path.
     * @param handler Handler function.
     */
    public get(path: RoutePath, ...handlers: RouteHandlerFn[]) {
        this.router.get(path, ...handlers);
    }

    /**
     * Routes HTTP POST requests to the specified path with the specified handler functions.
     *
     * @param path The route path.
     * @param handler Handler function.
     */
    public post(path: RoutePath, ...handlers: RouteHandlerFn[]) {
        this.router.post(path, ...handlers);
    }

    // Check wether the result from route handler is HTTPRequestResponse or not
    private isRequestResponse(result: any): result is HTTPRequestResponse {
        return "request" in result && "response" in result;
    }

    /**
     * Serve the request.
     *
     * @param request HTTP [Request](https://developers.cloudflare.com/workers/reference/apis/request/)
     */
    public async serve(request: Request): Promise<Response> {
        const { pathname, searchParams } = new URL(request.url);

        const route = this.router.findRoute(
            request.method as HTTPMethod,
            pathname
        );
        // If there is route that match, then execute the handler functions on
        // the stack one-by-one.
        if (route) {
            // Convert Request to HTTPRequest & Initialize new HTTPResponse
            let requestParams = {};
            if (route.params) {
                requestParams = route.params;
            }
            let incomingRequest = new HTTPRequest(request, {
                app: this,
                params: requestParams,
                query: searchParams,
            });
            let response = new HTTPResponse(this);

            // Execute the handler on the stack one by one
            // TODO(pyk): Handle case where there is no response returned from the handlers
            for (const handler of route.handlers) {
                const result = await handler(incomingRequest, response);
                // If the handler function returns a response; then returns the
                // response immediately
                if (result instanceof HTTPResponse) {
                    return result;
                }
                if (this.isRequestResponse(result)) {
                    // Otherwise call the next handler function in the stack
                    // with modified request and response
                    incomingRequest = result.request;
                    response = result.response;
                }
            }
        }

        // If there is no route found, then return 404 not found
        return new Response("404 Not Found", {
            status: 404,
        });
    }
}
