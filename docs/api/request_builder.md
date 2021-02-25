# RequestBuilder class

List of utilities function to create Cloudflare Workers
[Request](https://developers.cloudflare.com/workers/reference/apis/request/)
easily.

We use these static methods exclusively for testing.

## Static methods

These are list of available methods.

-   [GET](#GET)

### GET

Usage:

```typescript
RequestBuilder.GET(path, [, options]);
```

-   `path`: A relative request URL (for example: "/").
-   `options` (optional): An options object that contains custom settings to
    apply to the request. Valid options are:
    -   `base`: The base URL to use. If not specified, it defaults to
        'https://workers.dev'.
    -   `headers`: The request headers to use.

Example:

```typescript
const request = RequestBuilder.GET("/");

const request = RequestBuilder.GET("/private", {
    headers: {
        "Authorization": "Basic user:password",
    },
});
```
