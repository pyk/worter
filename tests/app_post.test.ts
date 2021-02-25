import { HappyCat } from "../index";
import { expect } from "chai";

describe('app.post("/", handler)', () => {
    const app = new HappyCat();

    app.post("/", (request, response) => {
        return response.json({ message: "Hello" });
    });

    describe("serve POST / request", () => {
        it("should returns 200 OK", async () => {
            // Set up POST request on the correct path
            const request = new Request("https://workers.dev/", {
                method: "POST",
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

    describe("serve POST /notexists request", () => {
        it("should returns 404 Not Found", async () => {
            // Set up get request on the path that does not exists
            const request = new Request("https://workers.dev/notexists", {
                method: "POST",
            });
            const response = await app.serve(request);
            // It should returns 404 Not found
            expect(response.status).to.equal(404);
            expect(await response.text()).to.equal("404 Not Found");
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
});

describe('app.post("/login", handler)', () => {
    const app = new HappyCat();

    app.post("/login", async (request, response) => {
        const formData = await request.formData();
        const username = formData.get("username");
        const password = formData.get("password");
        return response.json({ username: username, password: password });
    });

    describe("serve POST /login request with valid data", () => {
        it("should returns 200 OK", async () => {
            // Set up POST request on the correct path
            const headers = new Headers();
            headers.set("Content-Type", "application/x-www-form-urlencoded");

            const request = new Request("https://workers.dev/login", {
                method: "POST",
                headers: headers,
                body: "username=bayu&password=test",
            });
            const response = await app.serve(request);

            // It should returns 200OK with the specified body and header
            expect(response.status).to.equal(200);
            const jsonString = JSON.stringify(await response.json());
            expect(jsonString).to.equal(
                JSON.stringify({ username: "bayu", password: "test" }),
            );
            expect(response.headers.get("Content-Type")).to.equal(
                "application/json",
            );
        });
    });

    describe("serve POST /login request with invalid data", () => {
        it("should returns 200 OK", async () => {
            const headers = new Headers();
            headers.set("Content-Type", "application/x-www-form-urlencoded");
            const request = new Request("https://workers.dev/login", {
                method: "POST",
                headers: headers,
                body: "",
            });
            const response = await app.serve(request);

            // It should returns 200OK with the specified body and header
            expect(response.status).to.equal(200);
            const jsonString = JSON.stringify(await response.json());
            expect(jsonString).to.equal(
                JSON.stringify({ username: null, password: null }),
            );
            expect(response.headers.get("Content-Type")).to.equal(
                "application/json",
            );
        });
    });
});

// Path string include parameters
describe('app.post("/cat/:id", handler)', () => {
    const app = new HappyCat();

    app.post("/cat/:id", (request, response) => {
        return response.json({ message: `Meow ${request.params.id}` });
    });

    describe("serve POST /cat/123 request", () => {
        it("should returns 200 OK", async () => {
            // Set up POST request on the correct path
            const request = new Request("https://workers.dev/cat/123", {
                method: "POST",
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

    describe("serve POST /notexists request", () => {
        it("should returns 404 Not Found", async () => {
            // Set up get request on the path that does not exists
            const request = new Request("https://workers.dev/notexists", {
                method: "POST",
            });
            const response = await app.serve(request);
            // It should returns 404 Not found
            expect(response.status).to.equal(404);
            expect(await response.text()).to.equal("404 Not Found");
        });
    });
});

// An array of path string
describe('app.post(["/cat/:id", "/kitten/:id"], handler)', () => {
    const app = new HappyCat();

    app.post(["/cat/:id", "/kitten/:id"], (request, response) => {
        return response.json({ message: `Meow ${request.params.id}` });
    });

    describe("serve POST /cat/123 request", () => {
        it("should returns 200 OK", async () => {
            // Set up POST request on the correct path
            const request = new Request("https://workers.dev/cat/123", {
                method: "POST",
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

    describe("serve POST /kitten/123 request", () => {
        it("should returns 200 OK", async () => {
            // Set up GET request on the correct path
            const request = new Request("https://workers.dev/kitten/123", {
                method: "POST",
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

    describe("serve POST / request", () => {
        it("should returns 404 Not Found", async () => {
            // Set up POST request on the path that does not exists
            const request = new Request("https://workers.dev/", {
                method: "POST",
            });
            const response = await app.serve(request);
            // It should returns 404 Not found
            expect(response.status).to.equal(404);
            expect(await response.text()).to.equal("404 Not Found");
        });
    });

    describe("serve POST /notexists request", () => {
        it("should returns 404 Not Found", async () => {
            // Set up POST request on the path that does not exists
            const request = new Request("https://workers.dev/notexists", {
                method: "POST",
            });
            const response = await app.serve(request);
            // It should returns 404 Not found
            expect(response.status).to.equal(404);
            expect(await response.text()).to.equal("404 Not Found");
        });
    });
});

// Wildcard as path
describe('app.post("*", handler)', () => {
    const app = new HappyCat();

    app.post("*", (request, response) => {
        return response.json({ message: "Hello" });
    });

    describe("serve POST / request", () => {
        it("should returns 200 OK", async () => {
            // Set up POST request on the correct path
            const request = new Request("https://workers.dev/", {
                method: "POST",
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

    describe("serve POST /cat request", () => {
        it("should returns 200 OK", async () => {
            // Set up POST request on the correct path
            const request = new Request("https://workers.dev/cat", {
                method: "POST",
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

    describe("serve POST /cat/adopt request", () => {
        it("should returns 200 OK", async () => {
            // Set up POST request on the correct path
            const request = new Request("https://workers.dev/cat/adopt", {
                method: "POST",
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
});

// Regular expression as path
describe("app.post(regex, handler)", () => {
    const app = new HappyCat();

    app.post(/\/cat|\/kitten/, (request, response) => {
        return response.json({ message: "Hello" });
    });

    describe("serve POST /cat request", () => {
        it("should returns 200 OK", async () => {
            // Set up POST request on the correct path
            const request = new Request("https://workers.dev/cat", {
                method: "POST",
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

    describe("serve POST /kitten request", () => {
        it("should returns 200 OK", async () => {
            // Set up POST request on the correct path
            const request = new Request("https://workers.dev/kitten", {
                method: "POST",
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

    describe("serve POST /ct request", () => {
        it("should returns 404 Not Found", async () => {
            // Set up POST request on the path that does not exists
            const request = new Request("https://workers.dev/ct", {
                method: "POST",
            });
            const response = await app.serve(request);
            // It should returns 404 Not found
            expect(response.status).to.equal(404);
            expect(await response.text()).to.equal("404 Not Found");
        });
    });

    describe("serve GET /cat request", () => {
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
});
