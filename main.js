const participate = require("./participate");

function doPost(e) {
  if (typeof e === "undefined") {
    return;
  }

  let textOutput;

  if (e.parameter.command === "/dabei") {
    textOutput = participate(e);
  }

  return ContentService.createTextOutput(textOutput);
}

exports._test = {
  doPost: doPost,
};
