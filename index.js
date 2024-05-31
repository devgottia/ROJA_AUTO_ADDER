chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "data") {
    const data = message.data;

    if (data) {
      localStorage.clear();
      localStorage.setItem("startFn", "true");
      localStorage.setItem("data", JSON.stringify(data));
    }
  }
  return true; // Keep the messaging channel open for sendResponse
});

$(document).ready(function () {
  let leftIndex = parseInt(localStorage.getItem("leftIndex") || 0);
  const data = JSON.parse(localStorage.getItem("data"));

  // Redirect to ?q=node/1 if current URL is '/'
  if (
    window.location.search !== "?q=node/1" &&
    data &&
    leftIndex < data.linksLimit
  ) {
    window.location.href = "?q=node/1";
  }

  if (
    window.location.search === "?q=node/1" &&
    localStorage.getItem("startFn") === "true"
  ) {
    if (data && leftIndex >= data.linksLimit) {
      console.log("Completed");
    } else if (data) {
      // Fill the form fields with the received data
      $("#edit-submitted-channel-name").val(data.channel_name);
      $("#edit-submitted-url").val(
        `https://cr7streams.movieon.online/${data.channelId}/rj-${encodeURI(
          data.sport.toLowerCase()
        )}-${encodeURI(
          data.opponent1.replaceAll(" ", "-").toLowerCase()
        )}-${encodeURI(data.opponent2.replaceAll(" ", "-").toLowerCase())}-${
          leftIndex + 1
        }.html`
      );
      $("#edit-submitted-platform").val(data.platform);
      $("#edit-submitted-bitrate").val(data.bitrate);
      $("#edit-submitted-event1-date-1-month").val(
        parseInt(data.monthIndex) + 1
      );
      $("#edit-submitted-event1-date-1-day").val(
        parseInt(data.dayIndex) + 1
      );
      $("#edit-submitted-event1-date-1-year").val(
        parseInt(data.yearIndex) + 1
      );
      $("#edit-submitted-event1-starttime-1").val(data.startTime);
      $("#edit-submitted-event1-discipline-1").val(data.sport);
      $("#edit-submitted-event1-competition-1").val(data.league);
      $("#edit-submitted-event1-rivala-1").val(data.opponent1);
      $("#edit-submitted-event1-rivalb-1").val(data.opponent2);
      $("#edit-submitted-event1-language1").val("en");
      $("#edit-submitted-disclaimer-1").prop("checked", true);

      $(".form-submit").trigger("click");

      localStorage.setItem("leftIndex", leftIndex + 1);
    }
  }
});
