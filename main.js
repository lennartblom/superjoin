const PARTICIPATE_COMMAND = "/dabei";

function doPost(e) {
  if (typeof e === "undefined") {
    return;
  }

  let textOutput;

  let command = e.parameter.command;

  switch (command) {
    case PARTICIPATE_COMMAND: {
      textOutput = handleParticipate(e);
    }
  }

  return ContentService.createTextOutput(textOutput);
}

function handleParticipate(e) {
  let textOutput;
  if (typeof require === "undefined") {
    textOutput = participate(e);
  }

  const participate = require("./participate");
  textOutput = participate(e);

  return textOutput
}

exports._test = {
  doPost: doPost,
};
