const { BOT_ACCESS_TOKEN } = require("./secrets");

function getUserName(nickname, userId) {
  const response = UrlFetchApp.fetch(
    `https://slack.com/api/users.info?token=${BOT_ACCESS_TOKEN}&user=${userId}`
  );

  const content = JSON.parse(response.getContentText());

  if (content.ok) {
    return content.user.real_name;
  }

  return nickname;
}

module.exports = {
  getUserName: getUserName,
};

exports._test = {
  getUserName: getUserName,
};
