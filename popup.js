// Function to get the number of days in a month
function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

// Array of month names
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Get current date details
const date = new Date();
const fullYear = date.getFullYear();
const monthIndex = date.getMonth(); // Get the index of the current month
const day = date.getDate();

// Populate the select dropdown for months
$("#monthIndex").append(`
  <option value="${monthIndex}">${months[monthIndex]}</option>
  <option value="${monthIndex + 1}">${months[(monthIndex + 1) % 12]}</option>
`);

// Populate the select dropdown for days based on the number of days in the current month
if (daysInMonth(fullYear, monthIndex + 1) === 31) {
  if (day === 31) {
    $("#dayIndex").append(`
      <option value="${day}">${day}</option>
      <option value="${1}">${1}</option>
    `);
  } else {
    $("#dayIndex").append(`
      <option value="${day}">${day}</option>
      <option value="${day + 1}">${day + 1}</option>
    `);
  }
} else if (daysInMonth(fullYear, monthIndex + 1) === 30) {
  if (day === 30) {
    $("#dayIndex").append(`
      <option value="${day}">${day}</option>
      <option value="${1}">${1}</option>
    `);
  } else {
    $("#dayIndex").append(`
      <option value="${day}">${day}</option>
      <option value="${day + 1}">${day + 1}</option>
    `);
  }
} else { // If the month has 28 or 29 days (February)
  if (day === 28 || day === 29) {
    $("#dayIndex").append(`
      <option value="${day}">${day}</option>
      <option value="${1}">${1}</option>
    `);
  } else {
    $("#dayIndex").append(`
      <option value="${day}">${day}</option>
      <option value="${day + 1}">${day + 1}</option>
    `);
  }
}


$("#yearIndex").append(`

<option value="${fullYear}"> ${fullYear} </option>
<option value="${fullYear + 1}"> ${fullYear + 1} </option>

`);

const fields = [
  "channel_name",
  "platform",
  "bitrate",
  "monthIndex",
  "dayIndex",
  "yearIndex",
  "startTime",
  "sport",
  "league",
  "opponent1",
  "channelId",
  "opponent2",
  "linksLimit",
];

fields.forEach((field) => {
  const elem = $(`#${field}`);
  elem.val(localStorage.getItem(field));
});

document.getElementById("startBtn").addEventListener("click", () => {
  const data = {};
  fields.forEach((field) => {
    const elem = $(`#${field}`);
    data[field] = elem.val();
    localStorage.setItem(field, elem.val()); // Update localStorage
  });

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { type: "data", data });
  });
});
