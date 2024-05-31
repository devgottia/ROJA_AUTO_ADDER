function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const date = new Date();
const fullYear = date.getFullYear();
const month = date.getMonth();
const day = date.getDate();

$("#monthIndex").append(`

<option value="${month}"> ${months[month]} </option>
<option value="${month + 1}"> ${months[month + 1]} </option>

`);

if (daysInMonth(fullYear, month) === 31) {
  if (day === 31) {
    $("#dayIndex").append(`

<option value="${day}"> ${day} </option>
<option value="${1}"> ${1} </option>

`);
  }
} else {
  if (day === 30) {
    $("#dayIndex").append(`

<option value="${day}"> ${day} </option>
<option value="${1}"> ${1} </option>

`);
  } else {
    $("#dayIndex").append(`

    <option value="${day}"> ${day} </option>
    <option value="${day + 1}"> ${day + 1} </option>
    
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
