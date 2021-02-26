import { Worter } from "../index";
import { expect } from "chai";

// Path string include parameters
describe("request.params", () => {
    const app = new Worter();

    app.get("/cat/:id", (request, response) => {
        return response.json({ message: `Meow ${request.params.id}` });
    });

    app.get("/assets/*", (request, response) => {
        return response.json({ message: `${request.params[0]}` });
    });

    app.get("/books/*/apply/*", (request, response) => {
        return response.json({
            message: `${request.params[0]} ${request.params[1]}`,
        });
    });

    describe("serve GET /cat/123 request", () => {
        it("should set request.params.id=123", async () => {
            // Set up GET request on the correct path
            const request = new Request("https://workers.dev/cat/123", {
                method: "GET",
            });
            const response = await app.serve(request);
            const jsonString = JSON.stringify(await response.json());
            expect(jsonString).to.equal(
                JSON.stringify({ message: "Meow 123" })
            );
        });
    });

    describe("serve GET /cat/hello%20there request", () => {
        it('should set request.params.id="hello there"', async () => {
            // Set up GET request on the correct path
            const request = new Request(
                "https://workers.dev/cat/hello%20there",
                {
                    method: "GET",
                }
            );
            const response = await app.serve(request);
            const jsonString = JSON.stringify(await response.json());
            expect(jsonString).to.equal(
                JSON.stringify({ message: "Meow hello there" })
            );
        });
    });

    describe("serve GET /assets/file/image.png request", () => {
        it('should set request.params[0]="file/image.png"', async () => {
            // Set up GET request on the correct path
            const request = new Request(
                "https://workers.dev/assets/files/image.png",
                {
                    method: "GET",
                }
            );
            const response = await app.serve(request);

            // It should returns 200OK with the specified body and header
            const jsonString = JSON.stringify(await response.json());
            expect(jsonString).to.equal(
                JSON.stringify({ message: "files/image.png" })
            );
        });
    });

    describe("serve GET /books/1/apply/buy request", () => {
        it('should set request.params[0]="1" request.params[2]="buy"', async () => {
            // Set up GET request on the correct path
            const request = new Request(
                "https://workers.dev/books/1/apply/buy",
                {
                    method: "GET",
                }
            );
            const response = await app.serve(request);

            // It should returns 200OK with the specified body and header
            const jsonString = JSON.stringify(await response.json());
            expect(jsonString).to.equal(JSON.stringify({ message: "1 buy" }));
        });
    });
});
