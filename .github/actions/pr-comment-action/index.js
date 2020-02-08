const core = require('@actions/core');
//const context = require("@actions/github");
import * as github from '@actions/github'

async function run() {
  const name = github.context.eventName;

  const body = "(no body)"; //context.payload.head_commit.message;

  core.setOutput("comment", name + "\n" + body);

}

run().catch(err => {
  console.error(err);
  core.setFailed("Unexpected error");
});
