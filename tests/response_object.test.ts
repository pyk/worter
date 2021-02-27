import { Worter } from "../index";
import { expect } from "chai";
import { HTTPResponse } from "../index";

// Response built-in properties are defined in here:
// https://developers.cloudflare.com/workers/reference/apis/response/

describe("response.body", () => {
    it("should exists", () => {
        const app = new Worter();
        const response = new HTTPResponse(app);
        expect(response).to.have.property("body");
    });
});

describe("response.bodyUsed", () => {
    it("should exists", () => {
        const app = new Worter();
        const response = new HTTPResponse(app);
        expect(response).to.have.property("bodyUsed");
    });
});

describe("response.headers", () => {
    it("should exists", () => {
        const app = new Worter();
        const response = new HTTPResponse(app);
        expect(response).to.have.property("headers");
    });
});

describe("response.ok", () => {
    it("should exists", () => {
        const app = new Worter();
        const response = new HTTPResponse(app);
        expect(response).to.have.property("ok");
    });
});

describe("response.redirected", () => {
    it("should exists", () => {
        const app = new Worter();
        const response = new HTTPResponse(app);
        expect(response).to.have.property("redirected");
    });
});

describe("response.status", () => {
    it("should exists", () => {
        const app = new Worter();
        const response = new HTTPResponse(app);
        expect(response).to.have.property("status");
    });
});

describe("response.url", () => {
    it("should exists", () => {
        const app = new Worter();
        const response = new HTTPResponse(app);
        expect(response).to.have.property("url");
    });
});

describe("response.webSocket", () => {
    it("should exists", () => {
        const app = new Worter();
        const response = new HTTPResponse(app);
        expect(response).to.have.property("webSocket");
    });
});

describe("response.app", () => {
    it("should exists", () => {
        const app = new Worter();
        const response = new HTTPResponse(app);
        expect(response).to.have.property("app");
    });
});

describe("response.clone()", () => {
    it("should exists", () => {
        const app = new Worter();
        const response = new HTTPResponse(app);
        expect(response).to.respondTo("clone");
    });
});

describe("response.arrayBuffer()", () => {
    it("should exists", () => {
        const app = new Worter();
        const response = new HTTPResponse(app);
        expect(response).to.respondTo("arrayBuffer");
    });
});

describe("response.formData()", () => {
    it("should exists", () => {
        const app = new Worter();
        const response = new HTTPResponse(app);
        expect(response).to.respondTo("formData");
    });
});

describe("response.json()", () => {
    it("should exists", () => {
        const app = new Worter();
        const response = new HTTPResponse(app);
        expect(response).to.respondTo("json");
    });
});

describe("response.text()", () => {
    it("should exists", () => {
        const app = new Worter();
        const response = new HTTPResponse(app);
        expect(response).to.respondTo("text");
    });
});

// Built-in static methods
describe("HTTPResponse.redirect(url, status)", () => {
    it("should exists", () => {
        expect(HTTPResponse).itself.to.respondTo("redirect");
    });
});

describe("response.header(key, value)", () => {
    it("should set the response headers properly", () => {
        const app = new Worter();

        // If header is not exists, then the value should be created
        const response1 = new HTTPResponse(app);
        response1.header("Content-Type", "text/plain");
        expect(response1.headers.get("Content-Type")).to.equal("text/plain");

        // If the header is already exists, then the value should be updated
        const response2 = new HTTPResponse(app);
        response2.header("X-Header", "value");
        response2.header("X-Header", "new value");
        expect(response2.headers.get("X-Header")).to.equal("new value");

        // Set multiple headers at once
        const response3 = new HTTPResponse(app);
        response3.header({
            "X-Header-1": "1",
            "X-Header-2": "2",
        });
        expect(response3.headers.get("X-Header-1")).to.equal("1");
        expect(response3.headers.get("X-Header-2")).to.equal("2");

        // Existing headers should be replaced
        const response4 = new HTTPResponse(app, null, {
            headers: {
                "X-Header-1": "1",
                "X-Header-2": "2",
                "X-Header-3": "3",
            },
        });
        response4.header({
            "X-Header-1": "New 1",
            "X-Header-2": "New 2",
        });
        expect(response4.headers.get("X-Header-1")).to.equal("New 1");
        expect(response4.headers.get("X-Header-2")).to.equal("New 2");
        expect(response4.headers.get("X-Header-3")).to.equal("3");
    });
});

describe("response.code(number)", () => {
    it("should set the response status code properly", () => {
        const app = new Worter();
        const response = new HTTPResponse(app);
        expect(response.status).to.equal(200);
        expect(response.code(400).status).to.equal(400);
    });
});

describe("response.html(body)", () => {
    it("should returns new response with specified body & Content-Type header as HTML", async () => {
        const app = new Worter();
        const response = new HTTPResponse(app);
        const body = "<html><head></head></html>";
        const htmlResponse = response.html(body);

        // It should returns the copy; not modify the existing response object
        expect(await response.text()).not.to.equal(body);
        expect(response.headers.get("Content-Type")).not.to.equal(
            "text/html; charset=UTF-8"
        );

        // It should set the response body correctly
        expect(await htmlResponse.text()).to.equal(body);

        // It should set the content type header correctly
        expect(htmlResponse.headers.get("Content-Type")).to.equal(
            "text/html; charset=UTF-8"
        );
    });
});

describe("response.json(body)", () => {
    it("should returns new response with specified body & Content-Type header as JSON", async () => {
        const app = new Worter();
        const response = new HTTPResponse(app);
        const jsonResponse = response.json({ message: "Hello" });
        const body = '{"message":"Hello"}';

        // It should returns the copy; not modify the existing response object
        expect(await response.text()).not.to.equal(body);
        expect(response.headers.get("Content-Type")).not.to.equal(
            "application/json"
        );

        // It should set the response body correctly and existing built-in
        // method should works
        expect(await jsonResponse.json()).to.eql({ message: "Hello" });

        // It should set the content type header correctly
        expect(jsonResponse.headers.get("Content-Type")).to.equal(
            "application/json"
        );
    });
});

describe("response.send(body)", () => {
    it("should returns new response with specified body", async () => {
        const app = new Worter();
        const response = new HTTPResponse(app);
        const body = "data";
        const newResponse = response.send(body);

        // It should returns the copy; not modify the existing response object
        expect(await response.text()).not.to.equal(body);

        // It should set the response body correctly and existing built-in
        // method should works
        expect(await newResponse.text()).to.eql(body);
    });
});
