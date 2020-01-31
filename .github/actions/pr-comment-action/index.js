const core = require('@actions/core');
const { context, GitHub } = require("@actions/github");

async function run() {
  const trigger = core.getInput("trigger");
  if (!trigger) {
      core.setFailed("No `trigger` input given, aborting.");
      return;
  }

  if (
      context.eventName === "issue_comment" &&
      !context.payload.issue.pull_request
  ) {
      // not a pull-request comment, aborting
      core.setOutput("comment", "error: not a pull-request comment");
      return;
  }

  const { owner, repo } = context.repo;

  const body =
      context.eventName === "issue_comment"
          ? context.payload.comment.body
          : context.payload.pull_request.body;

  core.setOutput("comment", body);

}

run().catch(err => {
  console.error(err);
  core.setFailed("Unexpected error");
});
