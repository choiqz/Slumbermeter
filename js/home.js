const pointer = document.getElementById("pointer");
const checkin = document.getElementById("check-in");
const community = document.getElementById("community");
const help = document.getElementById("help");

const user = document.getElementById("name");
user.innerHTML = localStorage.getItem("username");

const nav = document.querySelector("nav");
const navItems = nav.querySelectorAll("ul li");

navItems.forEach((item) => {
  item.addEventListener("mouseover", () => {
    const itemRect = item.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();

    const translateX = itemRect.left - navRect.left;
    pointer.style.transform = `translateX(${translateX}px)`;
    pointer.style.transition = "0.5s";
  });

  item.addEventListener("mouseout", () => {
    pointer.style.transform = "translateX(0)";
    pointer.style.transition = "0.5s";
  });
});

const data = localStorage.getItem("newSleepData")
  ? localStorage.getItem("newSleepData")
  : localStorage.getItem("sleepData");
const parsedData = JSON.parse(data);
console.log(parsedData);

const scoreNumEl = document.getElementById("total-score");
let totalScore = 0;
const getTotalScore = parsedData.find((e) => {
  totalScore += Number(e.sleepScore);
  localStorage.setItem("totalScore", totalScore);
});

scoreNumEl.innerHTML = JSON.parse(localStorage.getItem("totalScore"));

// calendar update
const monthYearElement = document.getElementById("monthYear");
const datesElement = document.getElementById("dates");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentDate = new Date();

const updateCalendar = () => {
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const firstDay = new Date(currentYear, currentMonth, 0);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const totalDays = lastDay.getDate();
  const firstDayIndex = firstDay.getDay();
  const lastDayIndex = lastDay.getDay();

  const monthYearString = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });
  monthYearElement.textContent = monthYearString;

  let datesHTML = "";
  // const sleepData = getSleepData();

  for (let i = firstDayIndex; i > 0; i--) {
    const prevDate = new Date(currentYear, currentMonth, 0 - i + 1);
    datesHTML += `<div class="date inactive">${prevDate.getDate()}</div>`;
  }
  // showing colors for each day in calendar based on score
  for (let i = 1; i <= totalDays; i++) {
    const dateString = `${currentMonth + 1}/${i}/${currentYear}`;
    const sleepEntry = parsedData.find((e) => e.date === dateString);

    let colorClass = "";
    if (sleepEntry) {
      if (sleepEntry.sleepScore >= 80) {
        colorClass = "dateHigh";
      } else if (sleepEntry.sleepScore >= 50) {
        colorClass = "dateMedium";
      } else {
        colorClass = "dateLow";
      }
    }

    const activeClass =
      new Date().toDateString() ===
      new Date(currentYear, currentMonth, i).toDateString()
        ? "active"
        : "";

    datesHTML += `<div class="date ${colorClass} ${activeClass}">${i}</div>`;
  }

  for (let i = 1; i <= 7 - lastDayIndex; i++) {
    const nextDate = new Date(currentYear, currentMonth + 1, i);
    datesHTML += `<div class="date inactive">${nextDate.getDate()}</div>`;
  }

  datesElement.innerHTML = datesHTML;

};

prevBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  updateCalendar();
});

nextBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  updateCalendar();
});

updateCalendar();

const todayScore = document.querySelector("#today-score");

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const day = today.getDate();

// const newParsedData = JSON.parse(localStorage.getItem('newSleepData'));
const styleSheet = document.styleSheets[0];
const cond = parsedData.find((e) => {
  if (e.date != `${month}/${day}/${year}`) {
    todayScore.innerHTML = `
      <p id="info">
        There's no data for today :(
      </p>
      <p id="input-button">
        Go input today's sleep quality
      </p>
    `;
    checkin.innerHTML = `<a href="checkin.html">CHECK IN</a>`;
  } else {
    todayScore.innerHTML = `
      <p id="num">
        ${e.sleepScore}
      </p>
      <p id="label">
        today's sleep score
      </p>
      <div id="meter-container">
        <div id="meter"></div>
      </div>
     `;
    const meter = document.querySelector("#meter");
    meter.style.width = `${e.sleepScore}%`;
    checkin.innerHTML = `<a href="dashboard.html">CHECK IN</a>`;

    const meterAnimation = `
      @keyframes increase-meter {
        from {width: 0%;}
        to {width: ${e.sleepScore}%;}
      }`;

    styleSheet.insertRule(meterAnimation, styleSheet.cssRules.length);
    meter.style.animation = `increase-meter 3s ease-in-out forwards`;
  }
});

const inputBtn = document.getElementById("input-button");
inputBtn.addEventListener("click", () => {
  window.location.href = "../html/checkin.html";
});
