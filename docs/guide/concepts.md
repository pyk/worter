# Concepts

-   **Application**: One Worter application
-   **Router**: List of routes
-   **Route**: Tuple of path, HTTP method and handler function(s)

Application can only have one router.

```
app.get("/", handler)
```

Register `handler` function to handle HTTP request on `GET` and path `/`.
