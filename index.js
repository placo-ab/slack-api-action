const core = require('@actions/core');
const github = require('@actions/github');
const { WebClient } = require('@slack/web-api');

(async () => {
  try {
    const slack = new WebClient(core.getInput('token'));

    const result = await slack.chat.postMessage({
      text: core.getInput('message'),
      channel: core.getInput('channel'),
    });

    console.log(`Successfully sent message ${result.ts} in channel ${result.channel}`);
    console.log(`This running on ${github.context.repo}`)

    core.setOutput('ts', result.ts);
    core.setOutput('channel', result.channel);
  } catch (error) {
    core.setFailed(error.message);
  }
})();
