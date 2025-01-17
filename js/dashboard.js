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

const hoursNum = document.getElementById("hours-num");
const qualityNum = document.querySelector("#quality-num");
const scoreNum = document.querySelector("#score-num");
const meterScore = document.getElementById("meter-score");

const recommendationLabel = document.getElementById("recommendation-label");
const recommendationList = document.querySelector(
  ".recommendation-container ul"
);

const data = localStorage.getItem("newSleepData");
console.log(data);
const parsedData = JSON.parse(data);
console.log(parsedData);

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const day = today.getDate();

const todayData = parsedData.find((e) => e.date == `${month}/${day}/${year}`);
console.log(todayData);

const styleSheet = document.styleSheets[0];

if (todayData) {
  hoursNum.innerHTML = todayData.hoursSlept;
  qualityNum.innerHTML = todayData.sleepQuality;
  scoreNum.innerHTML = todayData.sleepScore;

  const angle = (Number(scoreNum.innerHTML) / 100) * 180;
  meterScore.style.transform = `rotate( ${-(180 - angle)}deg`;
  const meterAnimation = `
    @keyframes increase-circle-meter {
      from {transform: rotate(-180deg);}
      to {transform: rotate( ${-(180 - angle)}deg;}
    }
  `;
  styleSheet.insertRule(meterAnimation, styleSheet.cssRules.length);
  meterScore.style.animation =
    "increase-circle-meter 2.5s ease-in-out forwards";

  const caffeine = todayData.preBedActivities.caffeine;
  const exercise = todayData.preBedActivities.exercise;
  const phone = todayData.preBedActivities.phone;
  const nap = todayData.preBedActivities.nap;
  const meal = todayData.preBedActivities.meal;

  let count = 0;

  if (caffeine) {
    count += 1;
    recommendationList.innerHTML += `<li>Avoid caffeine in the evening to improve sleep quality</li>`;
  }
  if (phone) {
    count += 1;
    recommendationList.innerHTML += `<li>Reduce screen time before bed to help your mind relax</li>`;
  }
  if (exercise) {
    count += 1;
    recommendationList.innerHTML += `<li>Try to complete intense exercise earlier in the day</li>`;
  }
  if (meal) {
    count += 1;
    recommendationList.innerHTML += `<li>Eat lighter meals closer to bedtime</li>`;
  }
  if (nap) {
    count += 1;
    recommendationList.innerHTML += `<li>Limit daytime naps to improve nighttime sleep</li>`;
  }
  if (count === 0) {
    recommendationList.innerHTML = `<li>No recommendations :)</li>`;
    recommendationLabel.innerHTML = "Recommendation";
  } else if (count === 1) {
    recommendationLabel.innerHTML = "Recommendation";
  } else {
    recommendationLabel.innerHTML = "Recommendations";
  }
}
