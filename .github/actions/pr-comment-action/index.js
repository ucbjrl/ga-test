const core = require('@actions/core');
const github = require("@actions/github");
const context = github.context;

async function run() {
  const name = github.context.eventName;

  let body;
  switch(name) {
    case 'push':
      const payload = github.context.payload;
      body = payload.body
      break;
    case 'pull_request':
      body = github.context.payload.pull_request.body;
      break;
    default:
      body = '';
      break;
  }

  core.setOutput("comment", name + "\n" + body);

}

run().catch(err => {
  console.error(err);
  core.setFailed("Unexpected error");
});
