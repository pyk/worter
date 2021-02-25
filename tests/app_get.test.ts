import { HappyCat } from "../index";
import { expect } from "chai";

describe('app.get("/", handler)', () => {
    const app = new HappyCat();

    app.get("/", (request, response) => {
        return response.json({ message: "Hello" });
    });

    describe("serve GET / request", () => {
        it("should returns 200 OK", async () => {
            // Set up GET request on the correct path
            const request = new Request("https://workers.dev/", {
                method: "GET",
            });
            const response = await app.serve(request);

            // It should returns 200OK with the specified body and header
            expect(response.status).to.equal(200);
            const jsonString = JSON.stringify(await response.json());
            expect(jsonString).to.equal(JSON.stringify({ message: "Hello" }));
            expect(response.headers.get("Content-Type")).to.equal(
                "application/json",
            );
        });
    });

    describe("serve GET /notexists request", () => {
        it("should returns 404 Not Found", async () => {
            // Set up get request on the path that does not exists
            const request = new Request("https://workers.dev/notexists", {
                method: "GET",
            });
            const response = await app.serve(request);
            // It should returns 404 Not found
            expect(response.status).to.equal(404);
            expect(await response.text()).to.equal("404 Not Found");
        });
    });

    describe("serve POST / request", () => {
        it("should returns 404 Not Found", async () => {
            // Set up get request on the path that does not exists
            const request = new Request("https://workers.dev/", {
                method: "POST",
            });
            const response = await app.serve(request);
            // It should returns 404 Not found
            expect(response.status).to.equal(404);
            expect(await response.text()).to.equal("404 Not Found");
        });
    });
});

describe('app.get("/search", handler)', () => {
    const app = new HappyCat();

    app.get("/search", (request, response) => {
        let q = request.query.get("q");
        return response.json({ query: q });
    });

    describe("serve GET /search?q=cat request", () => {
        it("should returns 200 OK", async () => {
            // Set up GET request on the correct path
            const request = new Request("https://workers.dev/search?q=cat", {
                method: "GET",
            });
            const response = await app.serve(request);

            // It should returns 200OK with the specified body and header
            expect(response.status).to.equal(200);
            const jsonString = JSON.stringify(await response.json());
            expect(jsonString).to.equal(JSON.stringify({ query: "cat" }));
            expect(response.headers.get("Content-Type")).to.equal(
                "application/json",
            );
        });
    });
});

// Path string include parameters
describe('app.get("/cat/:id", handler)', () => {
    const app = new HappyCat();

    app.get("/cat/:id", (request, response) => {
        return response.json({ message: `Meow ${request.params.id}` });
    });

    describe("serve GET /cat/123 request", () => {
        it("should returns 200 OK", async () => {
            // Set up GET request on the correct path
            const request = new Request("https://workers.dev/cat/123", {
                method: "GET",
            });
            const response = await app.serve(request);

            // It should returns 200OK with the specified body and header
            expect(response.status).to.equal(200);
            const jsonString = JSON.stringify(await response.json());
            expect(jsonString).to.equal(
                JSON.stringify({ message: "Meow 123" }),
            );
            expect(response.headers.get("Content-Type")).to.equal(
                "application/json",
            );
        });
    });

    describe("serve GET / request", () => {
        it("should returns 404 Not Found", async () => {
            // Set up get request on the path that does not exists
            const request = new Request("https://workers.dev/", {
                method: "GET",
            });
            const response = await app.serve(request);
            // It should returns 404 Not found
            expect(response.status).to.equal(404);
            expect(await response.text()).to.equal("404 Not Found");
        });
    });

    describe("serve GET /notexists request", () => {
        it("should returns 404 Not Found", async () => {
            // Set up get request on the path that does not exists
            const request = new Request("https://workers.dev/notexists", {
                method: "GET",
            });
            const response = await app.serve(request);
            // It should returns 404 Not found
            expect(response.status).to.equal(404);
            expect(await response.text()).to.equal("404 Not Found");
        });
    });
});

// An array of path string
describe('app.get(["/cat/:id", "/kitten/:id"], handler)', () => {
    const app = new HappyCat();

    app.get(["/cat/:id", "/kitten/:id"], (request, response) => {
        return response.json({ message: `Meow ${request.params.id}` });
    });

    describe("serve GET /cat/123 request", () => {
        it("should returns 200 OK", async () => {
            // Set up GET request on the correct path
            const request = new Request("https://workers.dev/cat/123", {
                method: "GET",
            });
            const response = await app.serve(request);

            // It should returns 200OK with the specified body and header
            expect(response.status).to.equal(200);
            const jsonString = JSON.stringify(await response.json());
            expect(jsonString).to.equal(
                JSON.stringify({ message: "Meow 123" }),
            );
            expect(response.headers.get("Content-Type")).to.equal(
                "application/json",
            );
        });
    });

    describe("serve GET /kitten/123 request", () => {
        it("should returns 200 OK", async () => {
            // Set up GET request on the correct path
            const request = new Request("https://workers.dev/kitten/123", {
                method: "GET",
            });
            const response = await app.serve(request);

            // It should returns 200OK with the specified body and header
            expect(response.status).to.equal(200);
            const jsonString = JSON.stringify(await response.json());
            expect(jsonString).to.equal(
                JSON.stringify({ message: "Meow 123" }),
            );
            expect(response.headers.get("Content-Type")).to.equal(
                "application/json",
            );
        });
    });

    describe("serve GET / request", () => {
        it("should returns 404 Not Found", async () => {
            // Set up get request on the path that does not exists
            const request = new Request("https://workers.dev/", {
                method: "GET",
            });
            const response = await app.serve(request);
            // It should returns 404 Not found
            expect(response.status).to.equal(404);
            expect(await response.text()).to.equal("404 Not Found");
        });
    });

    describe("serve GET /notexists request", () => {
        it("should returns 404 Not Found", async () => {
            // Set up get request on the path that does not exists
            const request = new Request("https://workers.dev/notexists", {
                method: "GET",
            });
            const response = await app.serve(request);
            // It should returns 404 Not found
            expect(response.status).to.equal(404);
            expect(await response.text()).to.equal("404 Not Found");
        });
    });
});

// Wildcard as path
describe('app.get("*", handler)', () => {
    const app = new HappyCat();

    app.get("*", (request, response) => {
        return response.json({ message: "Hello" });
    });

    describe("serve GET / request", () => {
        it("should returns 200 OK", async () => {
            // Set up GET request on the correct path
            const request = new Request("https://workers.dev/", {
                method: "GET",
            });
            const response = await app.serve(request);

            // It should returns 200OK with the specified body and header
            expect(response.status).to.equal(200);
            const jsonString = JSON.stringify(await response.json());
            expect(jsonString).to.equal(JSON.stringify({ message: "Hello" }));
            expect(response.headers.get("Content-Type")).to.equal(
                "application/json",
            );
        });
    });

    describe("serve GET /cat request", () => {
        it("should returns 200 OK", async () => {
            // Set up GET request on the correct path
            const request = new Request("https://workers.dev/cat", {
                method: "GET",
            });
            const response = await app.serve(request);

            // It should returns 200OK with the specified body and header
            expect(response.status).to.equal(200);
            const jsonString = JSON.stringify(await response.json());
            expect(jsonString).to.equal(JSON.stringify({ message: "Hello" }));
            expect(response.headers.get("Content-Type")).to.equal(
                "application/json",
            );
        });
    });

    describe("serve GET /cat/adopt request", () => {
        it("should returns 200 OK", async () => {
            // Set up GET request on the correct path
            const request = new Request("https://workers.dev/cat/adopt", {
                method: "GET",
            });
            const response = await app.serve(request);

            // It should returns 200OK with the specified body and header
            expect(response.status).to.equal(200);
            const jsonString = JSON.stringify(await response.json());
            expect(jsonString).to.equal(JSON.stringify({ message: "Hello" }));
            expect(response.headers.get("Content-Type")).to.equal(
                "application/json",
            );
        });
    });

    describe("serve POST / request", () => {
        it("should returns 404 Not Found", async () => {
            // Set up get request on the path that does not exists
            const request = new Request("https://workers.dev/", {
                method: "POST",
            });
            const response = await app.serve(request);
            // It should returns 404 Not found
            expect(response.status).to.equal(404);
            expect(await response.text()).to.equal("404 Not Found");
        });
    });
});

// Regular expression as path
describe("app.get(regex, handler)", () => {
    const app = new HappyCat();

    app.get(/\/cat|\/kitten/, (request, response) => {
        return response.json({ message: "Hello" });
    });

    describe("serve GET /cat request", () => {
        it("should returns 200 OK", async () => {
            // Set up GET request on the correct path
            const request = new Request("https://workers.dev/cat", {
                method: "GET",
            });
            const response = await app.serve(request);

            // It should returns 200OK with the specified body and header
            expect(response.status).to.equal(200);
            const jsonString = JSON.stringify(await response.json());
            expect(jsonString).to.equal(JSON.stringify({ message: "Hello" }));
            expect(response.headers.get("Content-Type")).to.equal(
                "application/json",
            );
        });
    });

    describe("serve GET /kitten request", () => {
        it("should returns 200 OK", async () => {
            // Set up GET request on the correct path
            const request = new Request("https://workers.dev/kitten", {
                method: "GET",
            });
            const response = await app.serve(request);

            // It should returns 200OK with the specified body and header
            expect(response.status).to.equal(200);
            const jsonString = JSON.stringify(await response.json());
            expect(jsonString).to.equal(JSON.stringify({ message: "Hello" }));
            expect(response.headers.get("Content-Type")).to.equal(
                "application/json",
            );
        });
    });

    describe("serve GET /ct request", () => {
        it("should returns 404 Not Found", async () => {
            // Set up get request on the path that does not exists
            const request = new Request("https://workers.dev/ct", {
                method: "GET",
            });
            const response = await app.serve(request);
            // It should returns 404 Not found
            expect(response.status).to.equal(404);
            expect(await response.text()).to.equal("404 Not Found");
        });
    });

    describe("serve POST /cat request", () => {
        it("should returns 404 Not Found", async () => {
            // Set up get request on the path that does not exists
            const request = new Request("https://workers.dev/", {
                method: "POST",
            });
            const response = await app.serve(request);
            // It should returns 404 Not found
            expect(response.status).to.equal(404);
            expect(await response.text()).to.equal("404 Not Found");
        });
    });
});
