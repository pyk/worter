# Application object

#### Table of content

-   [Overview](#overview)
-   [Application settings](#application-settings)
-   [Application properties](#application-properties)
-   [Application methods](#application-methods)
    -   [app.get](#appget)
    -   [app.post](#apppost)
-   [Examples](#examples)
    -   [Path examples](#path-examples)
    -   [Handler function examples](#handler-function-examples)
-   [Credits](#credits)

## Overview

The `app` object conventionally represents the Worter application.

Create it by using the following constructor `new Worter()`:

```typescript
import { Worter } from "worter";

const app = new Worter();

app.get("/", (request, response) => {
    return response.json({ message: "hi there!" });
});
```

The `app` object has methods for:

1. Routing HTTP requests; see for example, [app.get](#appget).
2. Configuring middleware; see app.route.

It also has settings that affect how the Worter application behaves; for more
information, see [Application settings](#application-settings) below.

[🠕 Go to table of content](#application-object)

## Application settings

#### Usage

```typescript
const app = new Worter({
    name: value,
});
```

#### Settings

The following table lists the available settings.

<table>
    <thead>
        <tr>
            <th align="left">Name</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
            <th align="left">Default</th>
        </tr>
    </thead>
    <tbody align="top">
        <tr>
            <td>caseSensitiveRouting</td>
            <td>boolean</td>
<td>

Enable case sensitivity. If `true`, then `/Cat` and `/cat` are different routes.
Otherwise, `/Cat` and `/cat` are treated the same.

</td>
            <td>false</td>
        </tr>
        <tr>
            <td>strictRouting</td>
            <td>boolean</td>
<td>

Enable strict routing. If `true`, then the app router treats `/cat` and `/cat/`
as different. Otherwise, the app router treats `/cat` and `/cat/` as the same.

</td>
            <td>false</td>
        </tr>
    </tbody>
</table>

#### Example

```typescript
const app = new Worter({
    caseSensitiveRouting: true,
});
```

[🠕 Go to table of content](#application-object)

## Application properties

TODO: add properties here

## Application methods

### app.get

Routes HTTP GET requests to the specified path with the specified handler
functions.

#### Usage

```typescript
app.get(path, handler [, handler ...])
```

#### Arguments

<table>
    <thead>
        <tr>
            <th align="left">Argument</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody align="top">
        <tr>
            <td>path</td>
<td>

The path for which the handler function is invoked; can be any of:

-   A string or array of string representing a path(s).
-   A wildcard `"*"` to match all paths.
-   A regular expression pattern to match paths.

For examples, see [Path examples](#path-examples).

</td>
        </tr>
        <tr>
            <td>handler</td>
<td>

Handler functions; can be:

-   A single handler function.
-   A series of middlewares (separated by commas).
-   An array of middlewares.

Since middeware implement the handler function interface, you can use them as
you would any other handler function.

For examples, see [Handler function examples](#handler-function-examples).

</td>
        </tr>
    </tbody>

</table>

#### Example

```typescript
app.get("/", (request, response) => {
    response.json({ message: "Hi!" });
});
```

[🠕 Go to table of content](#application-object)

### app.post

Routes HTTP POST requests to the specified path with the specified handler
functions.

#### Usage

```typescript
app.post(path, handler [, handler ...])
```

#### Arguments

<table>
    <thead>
        <tr>
            <th align="left">Argument</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody align="top">
        <tr>
            <td>path</td>
<td>

The path for which the handler function is invoked; can be any of:

-   A string or array of string representing a path(s).
-   A wildcard `"*"` to match all paths.
-   A regular expression pattern to match paths.

For examples, see [Path examples](#path-examples).

</td>
        </tr>
        <tr>
            <td>handler</td>
<td>

Handler functions; can be:

-   A single handler function.
-   A series of middlewares (separated by commas).
-   An array of middlewares.

Since middeware implement the handler function interface, you can use them as
you would any other handler function.

For examples, see [Handler function examples](#handler-function-examples).

</td>
        </tr>
    </tbody>

</table>

#### Example

```typescript
app.post("/login", (request, response) => {
    response.json({ message: "This is POST request" });
});
```

[🠕 Go to table of content](#application-object)

## Examples

### Path examples

The following table provides some examples of valid path values.

<table>
    <thead>
        <tr>
            <th align="left">Type</th>
            <th align="left">Examples</th>
        </tr>
    </thead>
    <tbody align="top">
        <tr>
            <td>Path string</td>
<td>

This will match path `/cat`:

```typescript
app.get("/cat", (request, response) => {
    return response.json({ message: "This is a Cat 🐈" });
});
```

This will match paths `/cat/123`, `/cat/456` and so on:

```typescript
app.get("/cat/:id", (request, response) => {
    return response.json({ message: `This is a Cat 🐈 #${request.params.id}` });
});
```

This will match paths `/cat/123`, `/kitten/456` and so on:

```typescript
app.get(["/cat/:id", "/kitten/:id"], (request, response) => {
    return response.json({ message: `This is a Cat 🐈 #${request.params.id}` });
});
```

</td>
        </tr>
        <tr>
            <td>Path wildcard</td>
<td>

This will match paths `/cat`, `/kitten`, `/cat/adopt` and so on:

```typescript
app.get("*", (request, response) => {
    return response.json({ message: "This is a Cat 🐈" });
});
```

</td>
        </tr>
        <tr>
            <td>Regular expression</td>
<td>

This will match paths `/cat` and `/kitten`:

```typescript
app.get(/\/cat|\/kitten/, (request, response) => {
    return response.json({ message: "This is a Cat 🐈" });
});
```

</td>
        </tr>
    </tbody>
</table>

Worter uses [path-to-regexp](https://github.com/pillarjs/path-to-regexp) under
the hood.

[🠕 Go to table of content](#application-object)

### Handler function examples

The following table provides some examples of handler functions that can be used
as the argument to [app.get](#app-get).

<table>
    <thead>
        <tr>
            <th align="left">Usage</th>
            <th align="left">Examples</th>
        </tr>
    </thead>
    <tbody align="top">
        <tr>
            <td>Single handler function</td>
<td>
You can define path and mount a single handler function.

```typescript
async function HomePage(
    request: HTTPRequest,
    response: HTTPResponse
): Promise<HTTPResponse> {
    return response.json({ message: "Welcome!" });
}

app.get("/", HomePage);
```

See the [HTTPRequest](/request.md) and [HTTPResponse](./reponse.md) for
available properties & methods.

A middleware is also valid handler function:

```typescript
async function logRequest(
    request: HTTPRequest,
    response: HTTPResponse
): Promise<HTTPRequestResponse> {
    console.log(request);
    return { request, response };
}

app.all("*", logRequest);
```

</td>
        </tr>
        <tr>
            <td>Series of middlewares</td>
<td>

You can specify more than one middlewares and handler function at the same path.

```typescript
// Middleware 1
async function addResponseHeader(
    request: HTTPRequest,
    response: HTTPResponse
): Promise<HTTPRequestResponse> {
    response.headers.set("X-Header", "value");
    return { request, response };
}

// Middleware 2
async function logRequest(
    request: HTTPRequest,
    response: HTTPResponse
): Promise<HTTPRequestResponse> {
    console.log(request);
    return { request, response };
}

app.get("/", addResponseHeader, logRequest, (request, response) => {
    return response.json({ message: "This is a Cat 🐈" });
});
```

</td>
        </tr>
        <tr>
            <td>An array of middlewares</td>
<td>

You can use an array of middleware and handler function in the same path.

```typescript
// Middleware 1
async function addResponseHeader(
    request: HTTPRequest,
    response: HTTPResponse
): Promise<HTTPRequestResponse> {
    response.headers.set("X-Header", "value");
    return { request, response };
}

// Middleware 2
async function logRequest(
    request: HTTPRequest,
    response: HTTPResponse
): Promise<HTTPRequestResponse> {
    console.log(request);
    return { request, response };
}

// Handler
async function homePage(
    request: HTTPRequest,
    response: HTTPResponse
): Promise<HTTPResponse> {
    return response.json({ message: "This is a Cat 🐈" });
}

app.get("/", [addResponse, logRequest, homePage]);
```

</td>
        </tr>
    </tbody>
</table>

[🠕 Go to table of content](#application-object)

## Credits

The API design is highly-inspired by
[express.js](https://expressjs.com/en/5x/api.html#app.get.method).

[🠕 Go to table of content](#application-object)
