const pointer = document.getElementById("pointer");
const home = document.getElementById("home");
const community = document.getElementById("community");
const checkin = document.getElementById("check-in");

const user = document.getElementById("name");
user.innerHTML = localStorage.getItem("username");

const nav = document.querySelector("nav");
const navItems = nav.querySelectorAll("ul li");

navItems.forEach((item) => {
  item.addEventListener("mouseover", () => {
    const itemRect = item.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();

    const translateX = itemRect.left - 3.31 * navRect.left;
    pointer.style.transform = `translateX(${translateX}px)`;
    pointer.style.transition = "0.5s";
  });

  item.addEventListener("mouseout", () => {
    pointer.style.transform = "translateX(0)";
    pointer.style.transition = "0.5s";
  });
});

const container1 = document.getElementById("container1");
const container2 = document.getElementById("container2");
const container3 = document.getElementById("container3");
const container4 = document.getElementById("container4");
const container5 = document.getElementById("container5");

let click1 = false;
let click2 = false;
let click3 = false;
let click4 = false;
let click5 = false;

container1.addEventListener("click", () => {
  const ques1 = document.getElementById("ques1");
  const ans1 = document.getElementById("ans1");
  if (!click1) {
    ques1.style.fontWeight = "500";
    // container1.style.height = "13.8em";
    container1.style.animation = "expand1 0.12s ease-in forwards";
    ans1.style.marginTop = "1.2em";
    click1 = true;
  } else {
    ques1.style.fontWeight = "400";
    // container1.style.height = "5.8em";
    container1.style.animation = "collapse1 0.12s ease-in forwards";
    ans1.style.marginTop = "1.5em";
    click1 = false;
  }
});

container2.addEventListener("click", () => {
  const ques2 = document.getElementById("ques2");
  const ans2 = document.getElementById("ans2");
  if (!click2) {
    ques2.style.fontWeight = "500";
    // container2.style.height = "12.2em";
    container2.style.animation = "expand 0.1s ease-in forwards";
    ans2.style.marginTop = "1.2em";
    click2 = true;
  } else {
    ques2.style.fontWeight = "400";
    // container2.style.height = "5.8em";
    container2.style.animation = "collapse 0.1s ease-in forwards";
    ans2.style.marginTop = "1.5em";
    click2 = false;
  }
});

container3.addEventListener("click", () => {
  const ques3 = document.getElementById("ques3");
  const ans3 = document.getElementById("ans3");
  if (!click3) {
    ques3.style.fontWeight = "500";
    // container3.style.height = "12.2em";
    container3.style.animation = "expand 0.1s ease-in forwards";
    ans3.style.marginTop = "1.2em";
    click3 = true;
  } else {
    ques3.style.fontWeight = "400";
    // container3.style.height = "5.8em";
    container3.style.animation = "collapse 0.1s ease-in forwards";
    ans3.style.marginTop = "1.5em";
    click3 = false;
  }
});

container4.addEventListener("click", () => {
  const ques4 = document.getElementById("ques4");
  const ans4 = document.getElementById("ans4");
  if (!click4) {
    ques4.style.fontWeight = "500";
    // container4.style.height = "12.2em";
    container4.style.animation = "expand 0.1s ease-in forwards";
    ans4.style.marginTop = "1.2em";
    click4 = true;
  } else {
    ques4.style.fontWeight = "400";
    // container4.style.height = "5.8em";
    container4.style.animation = "collapse 0.1s ease-in forwards";
    ans4.style.marginTop = "1.5em";
    click4 = false;
  }
});

container5.addEventListener("click", () => {
  const ques5 = document.getElementById("ques5");
  const ans5 = document.getElementById("ans5");
  if (!click5) {
    ques5.style.fontWeight = "500";
    // container5.style.height = "8.5em";
    container5.style.animation = "expand5 0.08s ease-in forwards";
    ans5.style.marginTop = "1.2em";
    click5 = true;
  } else {
    ques5.style.fontWeight = "400";
    // container5.style.height = "5.8em";
    ans5.style.marginTop = "1.5em";
    container5.style.animation = "collapse5 0.08s ease-in forwards";
    click5 = false;
  }
});

const data = localStorage.getItem("newSleepData")
  ? localStorage.getItem("newSleepData")
  : localStorage.getItem("sleepData");
const parsedData = JSON.parse(data);

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const day = today.getDate();

const cond = parsedData.find((e) => {
  if (e.date != `${month}/${day}/${year}`) {
    checkin.innerHTML = `<a href="checkin.html">CHECK IN</a>`;
  } else {
    checkin.innerHTML = `<a href="dashboard.html">CHECK IN</a>`;
  }
});
