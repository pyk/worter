import { HappyCat, HTTPRequest } from "../index";
import { expect } from "chai";

// Request built-in properties are defined in here:
// https://developers.cloudflare.com/workers/reference/apis/request/

describe("request.body", () => {
    it("should exists", () => {
        const app = new HappyCat();
        const request = new HTTPRequest("https://workers.dev/", { app: app });
        expect(request).to.have.property("body");
    });
});

describe("request.bodyUsed", () => {
    it("should exists", () => {
        const app = new HappyCat();
        const request = new HTTPRequest("https://workers.dev/", { app: app });
        expect(request).to.have.property("bodyUsed");
    });
});

describe("request.cf", () => {
    it("should exists", () => {
        const app = new HappyCat();
        const request = new HTTPRequest("https://workers.dev/", { app: app });
        expect(request).to.have.property("cf");
    });
});

describe("request.headers", () => {
    it("should exists", () => {
        const app = new HappyCat();
        const request = new HTTPRequest("https://workers.dev/", { app: app });
        expect(request).to.have.property("headers");
    });
});

describe("request.method", () => {
    it("should exists", () => {
        const app = new HappyCat();
        const request = new HTTPRequest("https://workers.dev/", { app: app });
        expect(request).to.have.property("method");
    });
});

describe("request.redirect", () => {
    it("should exists", () => {
        const app = new HappyCat();
        const request = new HTTPRequest("https://workers.dev/", { app: app });
        expect(request).to.have.property("redirect");
    });
});

describe("request.url", () => {
    it("should exists", () => {
        const app = new HappyCat();
        const request = new HTTPRequest("https://workers.dev/", { app: app });
        expect(request).to.have.property("url");
    });
});

describe("request.app", () => {
    it("should exists", () => {
        const app = new HappyCat();
        const request = new HTTPRequest("https://workers.dev/", { app: app });
        expect(request).to.have.property("app");
    });
});

describe("request.query", () => {
    it("should exists", () => {
        const app = new HappyCat();
        const request = new HTTPRequest("https://workers.dev/", { app: app });
        expect(request).to.have.property("query");
    });

    it("should be instance of URLSearchParams", () => {
        const app = new HappyCat();
        const request = new HTTPRequest(
            "https://workers.dev/search?q=cute+cat",
            { app: app },
        );
        expect(request.query).to.be.an.instanceOf(URLSearchParams);
        expect(request.query.has("q")).to.equal(true);
        expect(request.query.get("q")).to.equal("cute cat");
        expect(request.query.getAll("q")).to.eql(["cute cat"]);
        expect(request.query.get("notexists")).to.equal(null);
        expect(request.query.toString()).to.equal("q=cute+cat");
        request.query.append("orderBy", "playfulness");
        expect(request.query.toString()).to.equal(
            "q=cute+cat&orderBy=playfulness",
        );
        request.query.set("orderBy", "activity level");
        expect(request.query.toString()).to.equal(
            "q=cute+cat&orderBy=activity+level",
        );
        request.query.delete("orderBy");
        expect(request.query.toString()).to.equal("q=cute+cat");
    });
});

describe("request.clone()", () => {
    it("should exists", () => {
        const app = new HappyCat();
        const request = new HTTPRequest("https://workers.dev/", { app: app });
        expect(request).to.respondTo("clone");
    });
});

describe("request.arrayBuffer()", () => {
    it("should exists", () => {
        const app = new HappyCat();
        const request = new HTTPRequest("https://workers.dev/", { app: app });
        expect(request).to.respondTo("arrayBuffer");
    });
});

describe("request.formData()", () => {
    it("should exists", () => {
        const app = new HappyCat();
        const request = new HTTPRequest("https://workers.dev/", { app: app });
        expect(request).to.respondTo("formData");
    });
});

describe("request.json()", () => {
    it("should exists", () => {
        const app = new HappyCat();
        const request = new HTTPRequest("https://workers.dev/", { app: app });
        expect(request).to.respondTo("json");
    });
});

describe("request.text()", () => {
    it("should exists", () => {
        const app = new HappyCat();
        const request = new HTTPRequest("https://workers.dev/", { app: app });
        expect(request).to.respondTo("text");
    });
});
