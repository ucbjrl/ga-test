const core = require('@actions/core');
const context = require("@actions/github");

async function run() {
  if (
      context.eventName !== "pull_request" ||
      !context.payload.pull_request
  ) {
      // not a pull-request comment, aborting
      core.setOutput("comment", "error: not a pull-request");
      return;
  }

  const { owner, repo } = context.repo;

  const body =
      context.event.head_commit.message;

  core.setOutput("comment", body);

}

run().catch(err => {
  console.error(err);
  core.setFailed("Unexpected error");
});
