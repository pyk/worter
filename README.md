# 😺 Worter

Build production-ready [Cloudflare Workers](https://workers.cloudflare.com/)
apps.

-   👌 TypeScript by default.
-   📦 Simple & lightweight. Only ~7kb in production build.
-   🤞 A great list of middlewares to help you to build your application faster
    without reinventing the wheel.
-   🚀 All features are tested in Production Cloudflare environments.

You can build fast and scalable API server or web apps that runs on Cloudflare
Workers with Worter in no time 🔥.

TODO: Build site with link to this markdown, the site should be deployed on
cloudflare workers.

## Features

-   ✅ **Advanced routing**. Worter offers an advanced and efficient routing
    mechanism that you can use to handle highly dynamic URLs.
-   ✅ **Middleware as first-class citizen**. Worter application is essentially
    a series of middleware function calls. With such an architecture, it becomes
    easy for you to add, remove, or modify various features to and from the
    application, giving high scalability to the application.
-   ✅(WIP) **Template engines support**. Worter supports all template engines
    that allows your Cloudflare Workers apps to have dynamic content by
    constructing HTML templates on the server side, replacing dynamic content
    with their proper values, and then sending these to the client side for
    rendering.
-   ✅(WIP) **Easy to test**. Worter provides set of tools that you can use to
    test your application in Production Cloudflare environments. Yes, it's okay
    to deploy on a Friday at 5pm 😉.

## 💃 Getting started

Assuming you’ve already installed
[Wrangler CLI](https://developers.cloudflare.com/workers/quickstart), then run
the following command to start new Worter project:

    $ wrangler generate my-app https://github.com/pyk/worter-template
    $ cd my-app/
    $ npm install

Start the development server using the following command:

    $ wrangler dev

And you are ready to go! 🚀

Continue read the guide below to learn more about the Worter.

### 🌎 Hello world example

```typescript
import { Worter } from "worter";

const app = new Worter();

app.get("/", (request, response) => {
    return response.json({ message: "Hello from Worter 😺!" });
});

addEventListener("fetch", (event) => {
    event.respondWith(app.serve(event.request));
});
```

Run the app on your local machine with the following command:

    $ wrangler dev

The `wrangler` starts a server and listens on port 8787 for connections. The app
responds with the following JSON formatted string:

```json
{
    "message": "Hello from Worter 😺!"
}
```

for requests to the root URL (/) or route. For every other path, it will respond
with a 404 Not Found.

Next, let's talk about the basic routing mechanism in Worter apps.

### 🎛️ Basic routing

Routing refers to determining how an application responds to a request to a
particular endpoint, which is a URI (or path) and a specific HTTP request method
(GET, POST, and so on).

Each route can have one handler function, which are executed when the route is
matched.

In Worter, route definition takes the following structure:

    app.METHOD(PATH, HANDLER)

Where:

-   `app` is an instance of Worter.
-   `METHOD` is an HTTP request method, in lowercase. For example `app.get`,
    `app.post` and so on.
-   `PATH` is a specified path to handle.
-   `HANDLER` is the function executed when the route is matched.

It is highly-inpired by [express.js](https://expressjs.com/).

The following examples illustrate defining simple routes.

Respond with `Hi!` on the homepage:

```typescript
app.get("/", (request, response) => {
    return response.text("Hi!");
});
```

Respond to `POST` request on the root route (`/`), the application’s home page:

```typescript
app.post("/", (request, response) => {
    return response.text("POST request accepted");
});
```

Respond to a `PUT` request to the `/product` route:

```typescript
app.put("/product", (request, response) => {
    return response.text("PUT request accepted");
});
```

Respond to a `DELETE` request to the `/product` route:

```typescript
app.delete("/product", (request, response) => {
    return response.text("DELETE request accepted");
});
```

For more details about routing, see the [routing guide](./guide/routing.md).
