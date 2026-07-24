
    const fasle = false;
    const bob = "bob";
    const very_important_variable = "nothings here";
    const existing_variable = "exsiting";

    let debugging = localStorage.getItem("debugging") == "true";
    let cheated = localStorage.getItem("cheated") == "true";
    //                                                                                                    //

    /* SELECTS, BUTTONS */
    const selects = document.querySelectorAll("select");
    const buttons = document.querySelectorAll("button");

    /* STATS */
    let age = Number(localStorage.getItem("age") || 0);
    let prAge = document.getElementById("age");

    let pname = JSON.parse(localStorage.getItem("pname") || "[]");
    let prName = document.getElementById("name");

    let money = Number(localStorage.getItem("money") || 0);
    let multiplier = Number(localStorage.getItem("multiplier") || 1);
    let prMoney = document.getElementById("money");

    /* STATUSES */
    let energy = Number(localStorage.getItem("energy") || 100);
    let pgEn = document.getElementById("enProg")
    let prEnergy = document.getElementById("energy");

    let hunger = Number(localStorage.getItem("hunger") || 1);
    let pgHg = document.getElementById("hgProg");
    let prHunger = document.getElementById("hunger");

    let happiness = Number(localStorage.getItem("happiness") || 100);
    let pgHp = document.getElementById("hpProg");
    let prHappy = document.getElementById("happy");

    const allStats = ["energy", "hunger", "happiness"];

    /* INTERVALS */
    let iAge = 0;
    let iHunger = 0;
    let iHappy = 0;
    let iEnergy = 0;
    let iEvent = 0;
    let iRent = 0;
    let iSystem = 0;

    let iIdle = 0;
    let idle_value;

    let iAll;
    let iSal;

    /* MAIN */
    let punished = false;

    function startMain() {
      if (!started) {
        alert("Setting up...");
        console.warn("started");

        started = true;
      } else {
        console.warn("function recalled");
      }

      if (iAll) clearInterval(iAll); // double checking

      iAll = setInterval(() => {

        iAge++;
        iHunger++;
        iHappy++;
        iEnergy++;
        iEvent++;
        iRent++;
        iSystem++;
        iIdle++;

        idle_value = Math.floor(Math.random() * (20 - 15 + 1)) + 5;
        if (iIdle === idle_value) {
          if (Math.random() < 0.5) {
            const random_func = all_func[Math.floor(Math.random() * all_func.length)];

            if (typeof random_func === "string") {

              if (random_func === "robbed") {
                alert("you got pickpocketed...");
                money -= (Math.floor(Math.random() * (999 - 5 + 1) + 5) * multiplier);

              } else if (random_func === "found a lost wallet") {
                alert("you found a lost wallet, and the owner gave you some change for finding it!");
                money += (Math.floor(Math.random() * (999 - 100 + 1) + 100) * multiplier);

              } else if (random_func === "free food") {
                alert("you got free food!")
                hunger -= hunger;
              }

            } else if (typeof random_func === "function") {
              random_func();
            }
          }

          iIdle = 0;

        } else if (iIdle > 5) {
          iIdle = 0;
        }

        if (money < 0 && !punished) {
          age_value = (age_value * 1.75).toFixed(2);
          hunger_value = (hunger_value / 2).toFixed(2);
          happiness_value = (happiness_value / 2).toFixed(2);
          energy_value = (energy_value / 2).toFixed(2);

          money += (Math.floor(Math.random() * (50 - 10 + 1) + 1) * multiplier); // as a cherry on top!
          punished = true;
        }

        if (money > 0 && punished) {
          age_value = (age_value / 1.75).toFixed(2);
          hunger_value = (hunger_value * 2).toFixed(2);
          happiness_value = (happiness_value * 2).toFixed(2);
          energy_value = (energy_value * 2).toFixed(2);

          punished = false;
        }

        if (unpaid_rent >= 1000) {
          money -= 5;
        }

        if (iAge >= age_value) {
          age++;
          iAge = 0;
        }
        if (iHunger >= hunger_value) {
          hunger++;
          iHunger = 0;
        }
        if (iHappy >= happiness_value) {
          happiness--;
          iHappy = 0;
        }

        if (iEnergy >= energy_value) {
          energy--;
          iEnergy = 0;
        }

        if (iSystem >= 15) {
          iSystem = 0;
          save();
          printInfos();
        } // incase the 1s print and save missed something, and to make ur pc laggier

        if (iEvent >= 15) {
          if (Math.random() < 0.5) {
            alert("Event incoming!!!");
            rollEvents();
          }

          iEvent = 0;
        }

        if (iRent >= 30 && age >= 16 && curr_job !== "None") {
          rent = Math.floor(Math.random() * (1000 - 100 + 1) + 100);
          unpaid_rent += rent;

          alert("It's time to pay rent!");
          iRent = 0;
        }

        if (cheated) {
          location.replace("second_window.html");
        }

        // if (age >= 100) clearInterval(iAll);
        /// const conf_rebirth = confirm("You've reached age 100, rebirth?")
        // if (conf_rebirth) {wipeData(); localStorage.clear(); localtion.reload();} else return;

        energy = Number(energy.toFixed(0));
        hunger = Number(hunger.toFixed(0));
        happiness = Number(happiness.toFixed(0));

        if (energy <= 0) energy = 0;
        if (happiness <= 0) happiness = 0;
        if (hunger < -min_hunger) hunger = 0;

        if (energy >= max_energy) energy = 100;
        if (happiness >= max_happiness) happiness = 100;
        if (hunger >= 100) hunger = 100;

        save();
        printInfos();
        checkHealthy();
        checkValid();

      }, 1900);

      save();
    };

    /* CHECKING */
    function checkHealthy() {

      if (energy > 0 && happiness > 0 && hunger < 100) {

          buttons.forEach(b => {
            b.disabled = false;
          });

          document.body.style.opacity = 1;
          document.body.style.background = "#E8E6E6";
        }

        if (energy <= 0 || happiness <= 0) {
          document.body.style.opacity = "0.25";

        } else if (hunger >= 50 || happiness < 25) {
          document.body.style.opacity = "0.5";

        } else {
          document.body.style.opacity = "1";
        }

        if (happiness <= 50 || hunger >= 75 || energy <= 25) {
          document.body.style.background = "gray";
        }

        if (happiness <= 0 || hunger >= 100 || energy <= 0) {
          document.body.style.background = "black";
        }
    }

    function wipeData() {
        age=0
        happiness=100
        energy=100
        hunger=0
        money = 0

        age_value=60
        hunger_value =60
        happiness_value=60
        energy_value=60

        max_energy = 100
        max_happiness = 100
        min_hunger = 0

        save();
    }
    function devOnly(){debugging=true;save();printInfos();};

    document.addEventListener("DOMContentLoaded", () => {

      buttons.forEach(b => {
        b.disabled = true;
      });
      buttons[7].disabled = false;

      selects.forEach(s => {
        s.disabled = true;
      });
    });

    const upcoming_plans_no_see_for_dev_only = [
      "rebirth, upgrades will cost rebirth tokens, player can only rebirth at the age of 100, increasing every rebirth by 5, gains more money multiplier (max: 10x = ~20 rebirths), base mult: 1, +0.5 every rebirth", // potential
      "intelligence, allowing more jobs with higher incomes, actions that can increases intelligence: code, read a book, study,...", // easy, new thing, coming soonest
      "more items", // coming soonest
      "relationships, increase or decrease happiness/ stats depending on how you treat them",
      "ECONOMY REWORK", // balancing prices, money gaining
    ];
    // ^ Roadmap
