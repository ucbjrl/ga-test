const core = require('@actions/core');
const context = require("@actions/github");

async function run() {
  const name = context.eventName;

  const body = context.payload.head_commit.message;

  core.setOutput("comment", name + "\n" + body);

}

run().catch(err => {
  console.error(err);
  core.setFailed("Unexpected error");
});
