const core = require('@actions/core');
const github = require("@actions/github");
const context = github.context;

async function run() {
  const name = github.context.eventName;

  const body = JSON.stringify(github.context.payload, undefined, 2) /*.head_commit.message */;

  core.setOutput("comment", name + "\n" + body);

}

run().catch(err => {
  console.error(err);
  core.setFailed("Unexpected error");
});
