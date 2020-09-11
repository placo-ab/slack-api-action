const core = require('@actions/core');
const { WebClient } = require('@slack/web-api');

(async () => {
  try {
    const slack = new WebClient(core.getInput('token'));

    let blocks = [];

    if (core.getInput('message')) {
      blocks.push({
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: core.getInput('message')
        }
      });
    }

    if (core.getInput('context')) {
      blocks.push({
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: `:hourglass_flowing_sand: ${core.getInput('context')}`
          }
        ]
      })
    }

    if (core.getInput('message_id')) {
      const result = await slack.chat.update({
        channel: core.getInput('message_id').split(',')[0],
        ts: core.getInput('message_id').split(',')[1],
        blocks
      });
      core.setOutput('message_id', `${result.channel},${result.ts}`);
    } else if (core.getInput('channel')) {
      const result = await slack.chat.postMessage({
        channel: core.getInput('channel'),
        blocks
      });
      core.setOutput('message_id', `${result.channel},${result.ts}`);
    } else {
      core.setFailed('You need to provide either a channel or a message_id!');
    }
  } catch (error) {
    core.setFailed(error.message);
  }
})();
