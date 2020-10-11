const assert = require("assert")
const notifyChannelAboutNewParticipant = require("../src/channelNotifications")


const EXPECTED_POST_DATA = {
  method: 'post', payload: {text: "max.mustermann hat sich zum nächsten Training angemeldet! :heavy_plus_sign:"}
};
describe("channelNotifications component", function () {
  it("should return 404 when no webhook URL is defined", function () {
    global.UrlFetchApp = {
      fetch: function (url, options) {
        assert.fail("UrlFetchApp must not be called")
      }
    }
    let result = notifyChannelAboutNewParticipant("test", "max.mustermann");

    assert.equal(result, 404);
  });
  it("should post about new participant with tuesday channel URL", function () {
    global.UrlFetchApp = {
      fetch: function (url, options) {
        console.log(url, options);
        assert.equal(url, "https://hooks.slack.com/services/asdasdas/asdasdasd/TUESDAY");
        assert.deepEqual(options, EXPECTED_POST_DATA);
      }

    }
    let result = notifyChannelAboutNewParticipant("C012C7UEX9C", "max.mustermann");
    assert.equal(result, 200);
  });
  it("should post about new participant with tuesday channel URL", function () {
    global.UrlFetchApp = {
      fetch: function (url, options) {
        console.log(url, options);
        assert.equal(url, "https://hooks.slack.com/services/asdasdas/asdasdasd/THURSDAY");
        assert.deepEqual(options, EXPECTED_POST_DATA);
      }

    }
    let result = notifyChannelAboutNewParticipant("C012K00AJFL", "max.mustermann");
    assert.equal(result, 200);
  });
  it("should post about new participant with tuesday channel URL", function () {
    global.UrlFetchApp = {
      fetch: function (url, options) {
        console.log(url, options);
        assert.equal(url, "https://hooks.slack.com/services/asdasdas/asdasdasd/SATURDAY");
        assert.deepEqual(options, EXPECTED_POST_DATA);
      }

    }
    let result = notifyChannelAboutNewParticipant("C012C7UQPSS", "max.mustermann");
    assert.equal(result, 200);
  });
});


