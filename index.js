const core = require('@actions/core');
const github = require('@actions/github');
const { WebClient } = require('@slack/web-api');

(async () => {
  try {
    const slack = new WebClient(core.getInput('token'));

    const result = await slack.chat.postMessage({
      channel: core.getInput('channel'),
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: core.getInput('message')
          }
        },
        {
          type: 'context',
          elements: [
            {
              type: 'mrkdwn',
              text: ':hourglass_flowing_sand: Setting up Node.js...'
            }
          ]
        }
      ]
  });

    console.log(`Successfully sent message ${result.ts} in channel ${result.channel}`);
    console.log(`github.context:`);
    console.log(github.context);

    core.setOutput('message_id', `${result.channel},${result.ts}`);
  } catch (error) {
    core.setFailed(error.message);
  }
})();
