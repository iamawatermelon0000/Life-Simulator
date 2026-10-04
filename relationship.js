let cm = Number(localStorage.getItem("comp") || "None");
let in_relationship = localStorage.getItem("inRelationship") == "true";

const prComp = document.getElementById("compatability");
const prGain = document.getElementById("gainings");

let r_status;
let r_value;

function checkCompat() {
    if (in_relationship) {
      if (cm <= 15) {
        r_value = 2;
        happiness -= r_value;
        r_status = "VERY BAD";

      } else if (cm <= 25) {
        r_value = 1;
        happiness -= r_value;
        r_status = "Bad"

      } else if (cm >= 90) {
        r_value = 2;
        happiness += r_value;
        r_status = "Very Well";
      } else if (cm >= 50) {
        r_value = 1;
        happiness += r_value;
        r_status = "Fine";

      }
  } else {
        cm = "+/-";
        r_value = 0;
        r_status = "You aren't in a relationship.";
      }


  save();
  printInfos();
}

function findSoulmate() {

  if (in_relationship) {

    alert("You're already in a relationship!");
    const conf_change = confirm("Do you wanna break-up? Breaking up will reduce your happiness by 50 to 150 as a penalty.");

    if (conf_change) {

      happiness -= Math.floor(Math.random() * (999 - 150 + 1) + 150);
      energy -= 5 // cherry on top
      in_relationship = false;

      return;

    } else return;

  }

  if (Math.random() < 0.1) {

    alert("You found your perfect soulmate!");

    cm = Math.floor(Math.random() * (100 - 1) + 1);
    in_relationship = true;

    checkCompat();

  } else {
    alert("You didn't find anyone :(");
  };

  energy -= 10;
  happiness -= 5;
  hunger += 5;

  save();
  printInfos();
}
