/** INTELLIGENCE VARIABLES */
let intel_point = Number(localStorage.getItem("intelligencePoint") || 0);
let extra_intel = Number(localStorage.getItem("extraIntelligencePoint") || 0);

let purging = false;
let pl = localStorage.getItem("plang") || "None";

const prIntelligence = document.getElementById("intelligencePrinter");
const intel_titles = [
  "1st Grader", // 0
  "Enthusiast", // 20, did i even spell this right
  "Leaner", // 50
  "Scholar", // 75
  "Writer", // 100
  "Genious", // >50 extra
  "Scientist" // >100 extra
];
let current_title;

/** INTELLIGENCE INTERVAL(S) (more might be added in the future who knows?) */
let iChecking;

/** INTELLIGENCE FUNCTIONS */
function assignTitle() {
  if (intel_point <= 0) current_title = "Beginner";
  if (intel_point >= 20) current_title = "Enthusiast";
  if (intel_point >= 50) current_title = "Learner";
  if (intel_point >= 75) current_title = "Scholar";
  if (intel_point >= 100) current_title = "Writer";
  if (extra_intel >= 50) current_title = "Genious";
  if (extra_intel >= 100) current_title = "Scientist";

  save();
  printInfos();
}

function removeIntel() {
  while (intel_point > 100) {
    intel_point--;
    extra_intel++;
  }
}

function intelligenceIntervalChecking() {
  if (iChecking) clearInterval(iChecking);

  iChecking = setInterval(() => {
    assignTitle();

    if (intel_point > 100 && !purging) {
      removeIntel();
      purging = true;
    };

    if (intel_point <= 100) {
      purging = false;
    }

    if (intel_point < 0) cheated = true;

    save();
    printInfos();
  }, 1000)
}

function doIntelActions() {
  const action = document.getElementById("intelActions").value;

  if (action === "study") {

    alert("You studied and maybe, probably, perchance, perhaps, might have, learned something useful.");
    intel_point += Math.floor(Math.random() * 5) + 1;

  } else if (action === "read-a-book") {

    if (intel_point < 20) {
      alert("Ik this is pretty straightforward but, you aren't smart enough.");
      return;
    } else {
      alert(`You read a book with ${Math.floor(Math.random() * (500 - 30 + 1) + 30)} pages`);
      intel_point += Math.floor(Math.random() * (10 - 5 + 1) + 5);
    }

  } else if (action === "do-excercises") {

    if (intel_point < 50) {
      alert("read more books");
      return;
    } else {
      alert(`You did ${Math.floor(Math.random() * (25 - 5 + 1) + 5)} ${Math.random < .5 ? "long" : "short"} excercises!`)
      intel_point += Math.floor(Math.random() * (15 - 10 + 1) + 10);
    }

  } else if (action === "learn-programming") {

    if (intel_point < 75) {
      alert("you should do more excercises, and go read a book or smth, or maybe study");
      return;
    }

    if (!pl) {
      let ask_pl = prompt("What Programming Language do you wanna learn? (pernmanent so be wise)");
      pl = ask_pl.split(" ").join("-");
    }

    alert(`You learnt some ${Math.random < .5 ? "basic" : "complex"} concepts of ${pl}!`);
    intel_point += Math.floor(Math.random() * (25 - 15 + 1) + 25);
  }
}
