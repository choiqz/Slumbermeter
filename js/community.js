const pointer = document.getElementById("pointer");
const home = document.getElementById("home");
const checkin = document.getElementById("check-in");
const help = document.getElementById("help");

const user = document.getElementById("name");
user.innerHTML = localStorage.getItem("username");

const nav = document.querySelector("nav");
const navItems = nav.querySelectorAll("ul li");

navItems.forEach((item) => {
  item.addEventListener("mouseover", () => {
    const itemRect = item.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();

    const translateX = itemRect.left - 2.53 * navRect.left;
    pointer.style.transform = `translateX(${translateX}px)`;
    pointer.style.transition = "0.5s";
  });

  item.addEventListener("mouseout", () => {
    pointer.style.transform = "translateX(0)";
    pointer.style.transition = "0.5s";
  });
});

const sdata = [];
let fdata = [];

const friendRequest = document.querySelector(".friend-request ul");
const leaderboard = document.querySelector(".leaderboard ul");

let suggestedFriends = localStorage.getItem("newSuggestedFriends")
  ? JSON.parse(localStorage.getItem("newSuggestedFriends"))
  : JSON.parse(localStorage.getItem("suggestedFriends"));
let friends = localStorage.getItem("newFriends")
  ? JSON.parse(localStorage.getItem("newFriends"))
  : JSON.parse(localStorage.getItem("friends"));

for (let sfriends of suggestedFriends) {
  sdata.push(sfriends);
}

for (let f of friends) {
  fdata.push(f);
}

function generateSuggestedData() {
  for (let i in sdata) {
    friendRequest.innerHTML += `
            <li>
              <div class="user">
                <p class="name">
                  ${sdata[i].name}
                </p>
                <p class="score">
                  ${sdata[i].points}
                </p>
                <button onclick=addFriend(${i})>
                  +
                </button>
              </div>
            </li>
    `;
  }
  localStorage.setItem("newSuggestedFriends", JSON.stringify(sdata));
  localStorage.setItem("newFriends", JSON.stringify(fdata));
}

function generateLeaderboard() {
  let lead = 1;

  fdata.find((e) => {
    if (e.name == "You") {
      const score = JSON.parse(localStorage.getItem("totalScore"));
      e.points = score;
    }
  });

  const sortedData = [...fdata].sort((a, b) => {
    const pointsA = parseInt(a.points);
    const pointsB = parseInt(b.points);
    return pointsB - pointsA;
  });

  fdata = [];
  for (let data of sortedData) {
    fdata.push(data);
  }

  for (let i in fdata) {
    if (fdata[i].minus == true) {
      leaderboard.innerHTML += `
            <li>
              <div class="user">
                <p class="num">
                  ${lead++}
                </p>
                <p class="name">
                  ${fdata[i].name}
                </p>
                <p class="score">
                  ${fdata[i].points}
                </p>
                <button onclick=removeFriend(${i})>
                  -
                </button>
              </div>
            </li>
    `;
    } else {
      leaderboard.innerHTML += `
            <li>
              <div class="user">
                <p class="num">
                  ${lead++}
                </p>
                <p class="name">
                  ${fdata[i].name}
                </p>
                <p class="score">
                  ${fdata[i].points}
                </p>
                <button disabled>

                </button>
              </div>
            </li>
    `;
    }
  }
  localStorage.setItem("newSuggestedFriends", JSON.stringify(sdata));
  localStorage.setItem("newFriends", JSON.stringify(fdata));
}

function addFriend(i) {
  let add = sdata.splice(i, 1);
  console.log(sdata);
  friendRequest.innerHTML = "";
  generateSuggestedData();

  const f = { name: add[0].name, points: add[0].points, minus: true };
  fdata.push(f);
  leaderboard.innerHTML = "";
  generateLeaderboard();

  localStorage.setItem("newSuggestedFriends", JSON.stringify(sdata));
  localStorage.setItem("newFriends", JSON.stringify(fdata));
}

function removeFriend(i) {
  console.log(i);
  let remove = fdata.splice(i, 1);
  leaderboard.innerHTML = "";
  console.log(remove);
  generateLeaderboard();

  const f = { name: remove[0].name, points: remove[0].points };
  sdata.push(f);
  friendRequest.innerHTML = "";
  generateSuggestedData();

  localStorage.setItem("newSuggestedFriends", JSON.stringify(sdata));
  localStorage.setItem("newFriends", JSON.stringify(fdata));
}

function searchFilter() {
  let input = document.getElementById("friend-search");
  let filterValue = input.value.toLowerCase();
  let li = document.querySelectorAll(".request-list li");

  for (let i = 0; i < li.length; i++) {
    let a = li[i].getElementsByClassName("name")[0];
    console.log("a:", a);
    if (a.innerHTML.toLowerCase().indexOf(filterValue) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

generateLeaderboard();
generateSuggestedData();


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