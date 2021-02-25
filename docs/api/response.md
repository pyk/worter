# Response object

#### Table of content

-   [Overview](#overview)
-   [Response properties](#response-properties)
    -   [response.app](#responseapp)
-   [Response methods](#response-methods)
    -   [response.code](#responsecode)
    -   [response.header](#responseheader)
    -   [response.html](#responsehtml)
    -   [response.json](#responsejson)
-   [Examples](#examples)
    -   [Path examples](#path-examples)
    -   [Handler function examples](#handler-function-examples)
-   [Credits](#credits)

## Overview

The `response` object represents the HTTP response that an Worter app sends when
it gets an HTTP request.

For example:

```typescript
app.get("/user/:id", (request, response) => {
    return response.json({ user_id: request.params.id });
});
```

The `response` object is an enhanced version of Cloudflare Workers response
object and supports all
[built-in fields and methods](https://developers.cloudflare.com/workers/reference/apis/response/).

[🠕 Go to table of content](#table-of-content)

## Response properties

### response.app

This property holds a reference to the instance of the Worter application that
is using the middleware.

`response.app` is identical to the `request.app` property in the request object.

The `app` is read-only property.

[🠕 Go to table of content](#table-of-content)

## Response methods

### response.code

This method returns a copy of response object with specified status code.

```typescript
response.code(200).json({ message: "OK" });
response.json({ message: "Not Found" }).code(404);
```

We [cannot override](https://stackoverflow.com/a/38860482) the `Response.status`
property to a function, hence we use `code` as the method name.

[🠕 Go to table of content](#table-of-content)

### response.header

Sets the response’s HTTP header field to value. To set multiple fields at once,
pass an object as the parameter.

```typescript
response.header("Content-Type", "text/plain");

response.header({
    "Content-Type": "text/plain",
    "Content-Length": "123",
    ETag: "12345",
});
```

[🠕 Go to table of content](#table-of-content)

### response.html

This method returns a copy of response object with specified body and the
`Content-Type` header set to `text/html; charset=UTF-8`.

```typescript
const body = `
<html>
    <head>
        <title>Worter</title>
    </head>

    <body>
        <p>Hello there</p>
    </body>
</html>
`;
reponse.html(body);
```

[🠕 Go to table of content](#table-of-content)

### response.json

This method returns a copy of response object with specified body and the
`Content-Type` header set to `application/json`.

The parameter is converted to a JSON string using `JSON.stringify()`.

The parameter can be any JSON type, including object, array, string, Boolean,
number, or null.

```typescript
response.json(null);

response.json({ message: "This is a Cat 🐈" });
```

[🠕 Go to table of content](#table-of-content)

## Credits

The API design is heavily influenced by
[express.js](https://expressjs.com/en/5x/api.html#res).

[🠕 Go to table of content](#request-object)
