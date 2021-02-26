/**
 * Cloudflare Worker test harness script
 *
 * This script is the entrypoint of our test files. We wrote this script to run
 * the test procedures programmatically.
 *
 * To run the test, use the following command:
 *
 * $ wrangler preview -e test
 *
 * Kindly reminder that your Cloudflare Wokers are running on Google
 * Chrome V8, not a node.js server.
 *
 * This expectation will help you to debug and solve the error if any.
 */

/**
 * Mocha.js reporter writes the test report to the console.log. In Cloudflare
 * Workers, we cannot access the log. So this is a workaround to get the
 * test results.
 */
let mochaLogOutput: string;
console.log = (message: string, ...messages: Array<string>) => {
    if (message) {
        // check wether the first message is format or not
        if (message.includes("%s") || message.includes("%d")) {
            // Add leading space to align the output
            let line = "";
            try {
                line = vsprintf(message, messages) + "\n";
            } catch (err) {
                line = `message=${message} messages=${messages} error=${err}`;
            }
            mochaLogOutput += line;
        }
    }
};

// Import mocha globally
import "mocha";
// Setup mocha instance
mocha.setup({ ui: "bdd", reporter: "list" });
// We need to define global.location to make mocha works.
// @ts-ignore
global.location = { search: "" };

// We use this package to simulate the console.log output for
// formatted string
import { vsprintf } from "sprintf-js";

/**
 * Import our test
 */
import "./tests/request_object.test";
import "./tests/request_params.test";
import "./tests/response_object.test";
import "./tests/application_object.test";
import "./tests/app_get.test";
import "./tests/app_post.test";

/**
 * Run the mocha test suites.
 *
 * We need to wrap the runner in promise to wait the completion.
 */
async function runMocha() {
    return new Promise((accept, reject) => {
        mocha.run(() => {
            // testResults = runner.testResults;
            accept({});
        });
    });
}

/**
 * This function will be executed if the worker receives request.
 */
async function execute(): Promise<Response> {
    try {
        // Only run the test if there is no previous results
        if (!mochaLogOutput) {
            // Add new line first
            mochaLogOutput = "\n";
            // Run the tests
            await runMocha();
        }
    } catch (err) {
        // If there is something wrong, then response with the stacktrace.
        return new Response(err.stack || err);
    }
    return new Response(mochaLogOutput);
}

/**
 * Main entry point
 *
 * Docs:
 * https://developers.cloudflare.com/workers/reference/apis/fetch-event/
 */
addEventListener("fetch", (event: FetchEvent) => {
    event.respondWith(execute());
});
