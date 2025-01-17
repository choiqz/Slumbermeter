const pointer = document.getElementById("pointer");
const home = document.getElementById("home");
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

    const translateX = itemRect.left - 1.75 * navRect.left;
    pointer.style.transform = `translateX(${translateX}px)`;
    pointer.style.transition = "0.5s";
  });

  item.addEventListener("mouseout", () => {
    pointer.style.transform = "translateX(0)";
    pointer.style.transition = "0.5s";
  });
});

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const day = today.getDate();

const todayDate = document.getElementById("today-date");
todayDate.textContent = `${month}/${day}/${year}`;

function calculateSleepScore(hoursSlept, sleepQuality, preBedActivities) {
  const hoursScore = Math.min(Math.max((hoursSlept / 8) * 100, 0), 100);

  const qualityScore = sleepQuality * 10;

  const activitiesPenalty =
    Object.values(preBedActivities).filter((activity) => activity === true)
      .length * 10;

  const sleepScore = Math.max(
    Math.min(hoursScore * qualityScore / 85 - activitiesPenalty, 100),
    0
  );

  return Math.round(sleepScore);
}

document.getElementById("sleep-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const hoursSlept = document.getElementById("hours-slept").value;

  const selectedQuality = document.querySelector(
    'input[name="quality"]:checked'
  );
  const sleepQuality = selectedQuality ? selectedQuality.value : null;

  const preBedActivities = {
    caffeine:
      document.querySelector('input[name="caffeine"]:checked').value === "true",
    exercise:
      document.querySelector('input[name="exercise"]:checked').value === "true",
    phone:
      document.querySelector('input[name="phone"]:checked').value === "true",
    nap: document.querySelector('input[name="nap"]:checked').value === "true",
    meal: document.querySelector('input[name="meal"]:checked').value === "true",
  };

  const sleepData = {
    date: todayDate.innerHTML,
    hoursSlept: Number(hoursSlept),
    sleepQuality: sleepQuality ? Number(sleepQuality) : null,
    preBedActivities,
    sleepScore: calculateSleepScore(hoursSlept, sleepQuality, preBedActivities),
  };
  saveData(sleepData);
  window.location.href = "../html/dashboard.html";
});

let dataStore = [];

const exData = JSON.parse(
  localStorage.getItem("newSleepData") || localStorage.getItem("sleepData")
);

for (let e of exData) {
  dataStore.push(e);
}

function saveData(data) {
  dataStore.push(data);
  console.log("Stored Data:", dataStore);
  localStorage.setItem("newSleepData", JSON.stringify(dataStore));
}

console.log(dataStore);
