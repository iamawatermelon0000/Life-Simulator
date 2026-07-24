/* UPGRADES */

/* VARIABLES */
    let age_value = Number(localStorage.getItem("ageVal") || 120);
    let hunger_value = Number(localStorage.getItem("hungerVal") || 15);
    let happiness_value = Number(localStorage.getItem("happinessVal") || 10);
    let energy_value = Number(localStorage.getItem("energyVal") || 5);

    let max_energy = Number(localStorage.getItem("maxEnergy") || 100);
    let min_hunger = Number(localStorage.getItem("minHunger") || 0);
    let max_happiness = Number(localStorage.getItem("maxHappiness") || 100);

    let prUpgrades = document.getElementById("totalUpgrades");

/* FUNCTION */
    function buyUpgrades() {

      let upg = document.getElementById("upgrades").value;

      if (upg === "en") {

        if (money < 75000) { alert("brokie"); return; }

        energy_value += 5;
        iEnergy = 0;

        money -= 75000;

        if (iAll) clearInterval(iAll);
        startMain();
      }

      if (upg === "hp") {

        if (money < 50000) { alert("ur too broke"); return; }

        happiness_value += 5;
        iHappy = 0;

        money -= 50000;

        if (iAll) clearInterval(iAll);
        startMain();
      }

      if (upg === "age") {

        if (money < 100000) { alert("get a J*B to pay for this"); return; }

        age_value -= 20;
        iAge = 0;

        money -= 100000;

        if (iAll) clearInterval(iAll);
        startMain();
      }

      if (upg === "hg") {

        if (money < 40000) { alert("when ur getting ur first job, its FREE"); return; }

        hunger_value += 5;
        iHunger = 0;

        money -= 40000;

        if (iAll) clearInterval(iAll);
        startMain();
      }
//  ----
      if (upg === "me") {
        if (money < 150000) { alert("ik its expensive, so get a JOB to pay for it"); return; };
        max_energy += 5;
      }

      if (upg === "mh") {
        if (money < 145000) { alert("its still expensive but get a JOB"); return; }
        max_happiness += 5;
      }

      if (upg === "mhun") {
        if (money < 165000) { alert("this is too expensive... maybe uh itll be rebalanced soon"); return; }
        min_hunger += 5;
      }

      if (energy_value <= 0) energy_value = 0;
      if (happiness_value <= 0) happiness_value = 0;
      if (age_value <= 60) age_value = 60;
      if (hunger_value <= 0) hunger_value = 0;

      if (max_energy >= 150) max_energy = 150;
      if (max_happiness >= 150) max_happiness = 150;
      if (min_hunger >= 50) min_hunger = 50;

      save();
      printInfos();
    }

/* SHOPPING */

/* SHOPPING VARIABLES */
    const item_list = document.getElementById("item");
    const prAllItem = document.getElementById("allBoughtItems");

    let bought_logging_list = JSON.parse(localStorage.getItem("bought") || "[]");
    let bought_item;

    let job_price = Number(localStorage.getItem("jobPrice") || 1000);
    let change_active;

    let age_price = Number(localStorage.getItem("agePrice") || 2500);
    let age_price_value = Number(localStorage.getItem("agePriceValue") || 1.25);

/* SHOPPING FUNCTION */
    function buyItem() {

      let item = item_list.value;

      if (item === "None" || !item) return;
      (document.getElementById("boughtItem").textContent = `You bought: ${item}`);

      if (item === "gb") {

        if (money < 10000) {
          alert(`This item requires atleast $10.000, your current balance is: ${money}.`);
          return;
        }

        if (Math.random() < 0.5) {
          hunger -= 100;
        } else {
          hunger += 25; // for pity
        }

        money -= 10000;
        bought_item = "Ghost Burger";

      } else if (item === "mc") {

        if (money < 6900) {
          alert(`This item requires atleast $6.900, your current balance is: ${money}.`);
          return;
        }

        let selected_item = allStats[Math.floor(Math.random() * allStats.length)];

        if (selected_item === "energy") energy += 25;
        if (selected_item === "hunger") hunger -= 25;
        if (selected_item === "happiness") happiness += 25;

        money -= 6900;
        bought_item = "Mysterious Cola";

      } else if (item === "gl") {

        if (money < 15000) {
          alert(`This item requires atleast $15.000, your current balance is: ${money}.`);
          return;
        }

        money -= 15000;
        happiness += 50;
        bought_item = "Gaming Laptop";

      } else if (item === "cj") {

        if (money < job_price) {
          alert(`This item requires atleast $${job_price}, your current balance is: ${money}.`);
          return;
        }

        money -= job_price;
        job_price += 1000;

        if (job_price >= 500000) {
          job_price = job_price * 1.2;
        }

        change_active = true;
        job();

        setTimeout(() => {
          change_active = false;
        }, 32);

        bought_item = "Change Job";

      } else if (item === "c") {

        age_price = ((2500 * (age * 75)) / 100);
        if (age === 0) age_price = (((2500 * ((age_price_value += 0.15) * 75)) / 100) * 1.2).toFixed(0);
        if (money < age_price) {
          alert(`This item requires atleast $${age_price}, while your current balance is: ${money}.`);
          return;
        }

        age += 1;
        money -= age_price;
        bought_item = "Clock";
      };

      bought_logging_list.push(bought_item);

      save();
      printInfos();
    }
