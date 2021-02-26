# Contributing to Worter :carrot:

Before you begin:

-   Have you read the [code of conduct](./CODE_OF_CONDUCT.md)?
-   Check out the existing [issues](https://github.com/pyk/worter/issues) & see
    if I [accept contributions](#types-of-contributions-memo) for your type of
    issue.

Learn more about contributing:

-   [Types of contributions :memo:](#types-of-contributions-memo)
    -   [:mega: Discussions](#mega-discussions)
    -   [:beetle: Issues](#beetle-issues)
    -   [:hammer_and_wrench: Pull requests](#hammer_and_wrench-pull-requests)
    -   [:question: Support Questions](#question-support-questions)
-   [Starting with an issue](#starting-with-an-issue)
    -   [Labels](#labels)
-   [Opening a pull request](#opening-a-pull-request)
-   [Reviewing](#reviewing)
    -   [Self review](#self-review)
    -   [Pull request template](#pull-request-template)
    -   [Suggested changes](#suggested-changes)
-   [Setup local development :computer:](#setup-local-development-computer)
    -   [Run the tests](#run-the-tests)

## Types of contributions :memo:

You can contribute to the Worter package & Worter documentations in several
ways. This repo is a place to discuss and collaborate on Worter! To preserve my
bandwidth, off topic conversations will be closed.

### :mega: Discussions

Discussions are where we have conversations.

If you'd like help troubleshooting a docs PR you're working on, have a great new
idea, or want to share something amazing you've created using Worter, join us in
[discussions](https://github.com/pyk/worter/discussions).

### :beetle: Issues

Issuesare used to track tasks that contributors can help with. If an issue has a
triage label, I haven't reviewed it yet and you shouldn't begin work on it.

If you've found bug or something in the Worker docs that should be updated,
search open issues to see if someone else has reported the same thing. If it's
something new, open an issue using a
[template](https://github.com/pyk/worter/issues/new/choose). We'll use the issue
to have a conversation about the problem you want to fix.

### :hammer_and_wrench: Pull requests

A pull request is a way to suggest changes in our repository.

When I merge those changes, for the package they should be included in the next
release, for the documentation thry should deployed to the live site within 24
hours. :earth_africa: To learn more about opening a pull request in this repo,
see [Opening a pull request](#opening-a-pull-request) below.

### :question: Support Questions

I'm just a solo-developer working hard to keep up with the documentation demands
of a continuously changing the package. Unfortunately, I just can't help with
support questions in this repository.

Get help from the community by posting a question in
[discussions](https://github.com/pyk/worter/discussions).

## Starting with an issue

You can browse existing issues to find something that needs help!

### Labels

Labels can help you find an issue you'd like to help with.

-   The
    [`good first issue` label](https://github.com/pyk/worter/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)
    is for problems or updates I think are ideal for beginners.
-   The
    [`documentation` label](https://github.com/pyk/worter/issues?q=is%3Aissue+is%3Aopen+label%3Adocumentation)
    is for problems or updates in the content on docs.github.com. These will
    usually require some knowledge of Markdown.
-   The
    [`bug` label](https://github.com/pyk/worter/issues?q=is%3Aissue+is%3Aopen+label%3Abug)
    is for problems or updates in the Worter package. These will usually require
    some knowledge of TypeScript/Webpack/Service Worker to fix.

## Opening a pull request

You can use the GitHub user interface :pencil2: for some small changes, like
fixing a typo or updating a docs. You can also fork the repo and then clone it
locally, to view changes and run your tests on your machine.

### Pull request template

When you open a pull request, you must fill out the "Ready for review" template
before we can review your PR. This template helps reviewers understand your
changes and the purpose of your pull request.

### Suggested changes

We may ask for changes to be made before a PR can be merged, either using
[suggested changes](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/incorporating-feedback-in-your-pull-request)
or pull request comments. You can apply suggested changes directly through the
UI. You can make any other changes in your fork, then commit them to your
branch.

As you update your PR and apply changes, mark each conversation as
[resolved](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/commenting-on-a-pull-request#resolving-conversations).

## Reviewing

I will review every single PR. The purpose of reviews is to keep Worter codebase
simple and easy to understand.

:yellow_heart: Reviews are always respectful, acknowledging that everyone did
the best possible job with the knowledge they had at the time.

:yellow_heart: Reviews discuss content, not the person who created it.

:yellow_heart: Reviews are constructive and start conversation around feedback.

### Self review

You should always review your own PR first.

Make sure that you:

-   [ ] Confirm that the changes address the issue (if there are differences,
        explain them).
-   [ ] Review the content for technical accuracy.
-   [ ] If there are any failing checks in your PR, troubleshoot them until
        they're all passing.

## Setup local development :computer:

You need to install the following:

-   Node v14.15.0
-   npm 6.14.8
-   [Prettier VSCode Extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
    (Optional)

Clone the repository:

    git clone git@github.com:pyk/worter.git

Install the dependencies:

    cd worter/
    npm install

### Testing

You need to rename `wrangler.toml.example` to `wrangler.toml`.

Edit the Cloudflare `account_id` and Cloudflare `zone_id`. Learn more
[here](https://developers.cloudflare.com/workers/cli-wrangler/configuration).

Run the test:

    npm run test

The command will publish a new worker that receive request and run the test.

Access the endpoint to see the test results.

How it works:

```
$ npm run test

+---------+   +---------+   +------------------+   +--------------------+   +--------------+
| test.ts +-->+ Webpack +-->+ worker/script.js +-->+ Cloudflare Workers +-->+ Test results |
+---------+   +---------+   +------------------+   +--------------------+   +--------------+
```

We use [Mocha.js](https://mochajs.org/) to run the tests.
