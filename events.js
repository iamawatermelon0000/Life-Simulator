    /* NORMAL EVENTS */

    /* EVENTS VARIABLES */
    const events = [
      "Overslept",
      "Overate",
      "Overplayed",
      "Loud Cry",
      "Thirsty",
      "Rewards",
      "Lucky Customer",
      "Buffet"
    ];
    let event;
    let event_index;

    /* EVENTS FUNCTION */
    function rollEvents() {

      event_index = Math.floor(Math.random() * events.length);
      event = events[event_index];

      if (event === "Overslept") {
        alert("You overslept...");
        energy += 20;

        hunger += 10;
        happiness -= 10;

      } else if (event === "Overate") {
        alert("You overate...");
        hunger -= 25;

        energy -= 25;

      } else if (event === "Overplayed") {
        alert("You had too much fun...");
        happiness += 25;

        energy -= 15;
        hunger += 10;

      } else if (event === "Loud Cry") {
        alert("you randomly cried too loud");
        alert("you got $100 because everyone thought that you were having a bad time");
        money += (100 * multiplier);

        energy -= 20;
        hunger += 5;

      } else if (event === "Thirsty") {
        alert("water....");
        hunger += 20;
        energy -= 20;
        happiness -= 15;

        money += (250 * multiplier);

      } else if (event === "Rewards" && curr_job !== "None") {
        alert("you worked hard!");
        money += (Math.floor(Math.random() * (1500 - 500 + 1) + 500) * multiplier);

        hunger += 15;
        energy -= 25;

      } else if (event === "Lucky Customer") {
        alert("you were the uhhh idkTH customer of a random store!");
        alert("you got a cup of coffee, a free meal and some cash for no reason!");

        energy += 20;
        hunger -= 25;
        money += (50 * multiplier);

      } else if (event === "Buffet") {
        alert("you were invited to a buffet restaurant by your friends");
        alert("FOR FREE!!11!!11111!!111!!!!!!111");

        hunger -= 100;
        energy -= 35;
      };

      printInfos();
      save();
    };

/* WORKING EVENTS */

/* WORKING EVENTS VARIABLES */
    const events_while_working = [ // 1/5 while clicking "work"
      "Extra work", // +$100, -25en, 1/5
      "Tips", // +$50, 1/15
      "Hangout", // -25hun, +50happ, -30en, 1/30
      "Customer's Special", // +$1000, -15en, -30hun, 1/50
      "Dealt with 100 customer", // +$250->999, -20hun, +30happ, pity 1/200
      "Employee of the month", // +$50 on salary, 1/65
      "Employee of the year", // +$100 on salary, only if: happiness > 50, hunger < 50, energy > 50, age > 1, 1/75
      "Senior Employee", // frequent bonus: 100->199, 1/200
      "Promoted" // +$199-599 on salary, frequent bonus: 199-399, 1/200
    ];
    let working_events = [...events_while_working]; // splice
    const working_events_log = JSON.parse(localStorage.getItem("working_events_log")) || [];
    let working;
    let event_pity = Number(localStorage.getItem("eventPity") || 200);

    /* WORKING EVENT FUNCTION */
        function rerollWorkingEvent() {

      if (working_events.length <= 0) working_events = [...events_while_working];

      const index = Math.floor(Math.random() * working_events.length);
      working = working_events[index];
      working_events.splice(index, 1);

      event_pity--;
      if (event_pity <= 0) {
        working = "Dealt with 100 customer"

        while (event_pity <= 200) {
          event_pity++;
        }
      }

      if (working === "Extra work" && Math.random() < 0.2) {
        prJobStat.textContent = `You got extra work...`
        en -= 25;
        money += (100 * multiplier);

      } else if (working === "Tips" && Math.random() < 0.06) {
        prJobStat.textContent = "You got a tip!"
        money += (Math.floor(income * ((income / 0.5).toFixed(0))) * multiplier);

      } else if (working === "Hangout" && Math.random() < 0.03) {
        prJobStat.textContent = "Your team decided to hang out together, and you all went to a buffet restaurant!";

        hunger -= 25;
        energy -= 30;
        happiness += 50;

      } else if (working === "Customer's Special" && Math.random() < 0.02) {
        prJobStat.textContent = "A rich customer was satisfied by your service, and decided to give you a huge bonus!";

        money += (1000 * multiplier);
        hunger += 30;
        energy -= 15;

      } else if (working === "Dealt with 100 customer" && Math.random() < 1 / event_pity) {
        prJobStat.textContent = "You've served your 100th customer and got a bonus!";

        money += (Math.floor(Math.random() * (2999 - 1999 + 1) + 1999) * multiplier);
        hunger += 20;
        happiness += 30;

      } else if (working === "Employee of the month" && Math.random() < 0.015) {
        prJobStat.textContent = "You were the employee of the month, so the boss decided to raise your salary!";
        salary += 50;

      } else if (working === "Employee of the year" && happiness > 50 && hunger < 50 && energy > 50 && age > 1 && Math.random() < 0.013) {
        prJobStat.textContent = "You were the most elite employee during that year, so you got a huge raise!";
        salary += 250;

      } else if (working === "Senior Employee" && Math.random() < 0.005) {
        prJobStat.textContent = "You became a senior employee!";

        while (salary < 1500) {
          salary += 1;
        }

      } else if (working === "Promoted" && Math.random() < 0.005) {
        prJobStat.textContent = "You were promoted!";
        (salary += (Math.floor(Math.random() * (999 - 199 + 1) + 199)));

      } else {
        prJobStat.textContent = "You thought that something would happen today at work, but nothing ended up happening.";
      };

      working_events_log.push(working);
      save();
      printInfos();
    }
