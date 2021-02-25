import { HappyCat } from "../index";
import { expect } from "chai";

describe("application with default settings", () => {
    it("should initialize router with correct default values", () => {
        const app = new HappyCat();
        expect(app.router.options?.sensitive).to.equal(false);
        expect(app.router.options?.strict).to.equal(false);
    });
})

describe("application with caseSensitiveRouting=true", () => {
    it("should set router.options.sensitive to true", () => {
        const app = new HappyCat({
            caseSensitiveRouting: true,
        });
        expect(app.router.options?.sensitive).to.equal(true);
        expect(app.router.options?.strict).to.equal(false);
    });
})

describe("application with strictRouting=true", () => {
    it("should set router.options.strict to true", () => {
        const app = new HappyCat({
            strictRouting: true,
        });
        expect(app.router.options?.sensitive).to.equal(false);
        expect(app.router.options?.strict).to.equal(true);
    });
})
