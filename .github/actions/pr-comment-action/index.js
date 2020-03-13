const core = require('@actions/core');
const github = require("@actions/github");
const context = github.context;

async function run() {
  const name = github.context.eventName;

  let body, keys;
  switch(name) {
    case 'push':
      const payload = github.context.payload;
      body = payload
      keys = Object.keys(payload)
      break;
    case 'pull_request':
      body = github.context.payload.pull_request.body;
      keys = Object.keys(github.context.payload.pull_request)
      break;
    default:
      body = '';
      keys = '';
      break;
  }

  core.setOutput("comment", JSON.stringify(body));
  core.setOutput("name", JSON.stringify(name));
  core.setOutput("keys", JSON.stringify(keys));

}

run().catch(err => {
  console.error(err);
  core.setFailed("Unexpected error");
});
