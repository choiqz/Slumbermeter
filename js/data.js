const sleepLog = [
  {
    date: `11/20/2024`,
    hoursSlept: 9,
    sleepQuality: 10,
    preBedActivities: {
      caffeine: false,
      exercise: false,
      phone: false,
      nap: true,
      meal: false,
    },
    sleepScore: 95,
  },
  {
    date: `11/23/2024`,
    hoursSlept: 5,
    sleepQuality: 1,
    preBedActivities: {
      caffeine: false,
      exercise: false,
      phone: false,
      nap: true,
      meal: false,
    },
    sleepScore: 55,
  },
  {
    date: `11/24/2024`,
    hoursSlept: 2,
    sleepQuality: 1,
    preBedActivities: {
      caffeine: true,
      exercise: false,
      phone: false,
      nap: false,
      meal: false,
    },
    sleepScore: 25,
  },
  {
    date: `11/25/2024`,
    hoursSlept: 5,
    sleepQuality: 1,
    preBedActivities: {
      caffeine: false,
      exercise: false,
      phone: false,
      nap: false,
      meal: true,
    },
    sleepScore: 45,
  },
  {
    date: `11/26/2024`,
    hoursSlept: 8,
    sleepQuality: 5,
    preBedActivities: {
      caffeine: false,
      exercise: true,
      phone: false,
      nap: false,
      meal: false,
    },
    sleepScore: 90,
  },
  {
    date: `11/27/2024`,
    hoursSlept: 5,
    sleepQuality: 3,
    preBedActivities: {
      caffeine: false,
      exercise: true,
      phone: false,
      nap: false,
      meal: false,
    },
    sleepScore: 63,
  },
  {
    date: `11/28/2024`,
    hoursSlept: 9,
    sleepQuality: 7,
    preBedActivities: {
      caffeine: false,
      exercise: true,
      phone: false,
      nap: true,
      meal: true,
    },
    sleepScore: 80,
  },
  {
    date: `11/29/2024`,
    hoursSlept: 8,
    sleepQuality: 9,
    preBedActivities: {
      caffeine: false,
      exercise: true,
      phone: true,
      nap: false,
      meal: false,
    },
    sleepScore: 70,
  },
];

localStorage.setItem("sleepData", JSON.stringify(sleepLog));

const suggestedData = [
  {
    name: "Oliver Carter",
    points: "985057",
  },
  {
    name: "Liam Anderson",
    points: "212974",
  },
  {
    name: "Sophia Bennett",
    points: "498628",
  },
  {
    name: "Ethan Rodriguez",
    points: "41468",
  },
  {
    name: "Mia Thompson",
    points: "897",
  },
  {
    name: "Noah Martinez",
    points: "178389",
  },
  {
    name: "Ava Collins",
    points: "23",
  },
  {
    name: "Lucas Harris",
    points: "65107",
  },
  {
    name: "Isabella Clark",
    points: "53775",
  },
  {
    name: "Benjamin White",
    points: "528",
  },
  {
    name: "Charlotte King",
    points: "178389",
  },
  {
    name: "Henry Walker",
    points: "7723",
  },
  {
    name: "Emily Scott",
    points: "655107",
  },
  {
    name: "Jackson Adams",
    points: "9775",
  },
  {
    name: "Amelia Johnson",
    points: "45928",
  },
  {
    name: "Grace Cooper",
    points: "61383",
  },
  {
    name: "Elijah Moore",
    points: "53484",
  },
  {
    name: "Mason Rivera",
    points: "807547",
  },
  {
    name: "Harper Brooks",
    points: "903626",
  },
  {
    name: "Alexander Murphy",
    points: "1824",
  },
];

const myScore = JSON.parse(localStorage.getItem("totalScore"));

const friendData = [
  {
    name: "Ella Peterson",
    points: "831775",
    minus: true,
  },
  {
    name: "James Foster",
    points: "538224",
    minus: true,
  },
  {
    name: "Logan Ramirez",
    points: "7954",
    minus: true,
  },
  {
    name: "Chloe Diaz",
    points: "283",
    minus: true,
  },
  {
    name: "Avery Simmons",
    points: "32978",
    minus: true,
  },
  {
    name: "You",
    points: myScore,
    minus: false,
  },
];

localStorage.setItem("suggestedFriends", JSON.stringify(suggestedData));
localStorage.setItem("friends", JSON.stringify(friendData));
