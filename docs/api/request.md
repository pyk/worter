# Request object

#### Table of content

-   [Overview](#overview)
-   [Request properties](#request-properties)
    -   [request.app](#requestapp)
    -   [request.query](#requestquery)
-   [Request methods](#request-methods)
    -   [request.formData](#requestformdata)
-   [Credits](#credits)

## Overview

The `request` object represents the HTTP request that Worter app receives.

For example:

```typescript
app.get("/user/:id", (request, response) => {
    const userId = request.params.id;
    return response.json({ user_id: userId });
});
```

The `request` object is an enhanced version of Cloudflare Workers request object
and supports all
[built-in fields and methods](https://developers.cloudflare.com/workers/reference/apis/request/).

[🠕 Go to table of content](#request-object)

## Request properties

### request.app

This property holds a reference to the instance of the Worter application that
is using the middleware. It is very useful for accessing the app configuration
inside the middleware function.

For example:

```typescript
// index.ts
import { logEnv } from "./middlewares";

// ..

app.register("/", logEnv);
```

```typescript
// middlewares.ts

// Print the environment name on every request
export function logEnv(
    request: HTTPRequest,
    response: HTTPResponse
): HTTPResponse {
    console.log(`Environment name: ${request.app.env}`);
    return response;
}
```

[🠕 Go to table of content](#request-object)

### request.query

This property is an
[URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)
object containing a property for each query string parameter in the route.

```typescript
// GET /search?q=beautiful+cat
request.query.has("q"); // => true
request.query.get("q"); // => "beautiful cat"
request.query.getAll("q"); // => ["beautiful cat"]
request.query.get("notexists"); // => null
request.query.toString(); // => "q=beautiful+cat"
```

You can also modify the query to be passed on the next handler:

```typescript
// GET /search?q=beautiful+cat
request.query.append("orderBy", "playfulness");
request.query.toString(); // => "q=beautiful+cat&orderBy=playfulness"

request.query.set("orderBy", "activity level");
request.query.toString(); // => "q=beautiful+cat&orderBy=activity+level"

request.query.delete("orderBy");
request.query.toString(); // => "q=beautiful+cat"
```

[🠕 Go to table of content](#request-object)

## Request methods

### request.formData

`request` object implements
[Body](https://developer.mozilla.org/en-US/docs/Web/API/Body) and has the
following method `Body.formData()`. It returns a promise that resolves with a
[FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData)
representation of the request body.

Example:

```typescript
app.post("/login", async (request, response) => {
    // Get submitted form data
    const formData = await request.formData();
    const username = formData.get("username");
    const password = formData.get("password");

    // validate, and do something
});
```

## Related APIs

-   [Response object](./response.md)

## Credits

The API design is highly-inspired by
[express.js](https://expressjs.com/en/5x/api.html#req).

[🠕 Go to table of content](#request-object)
