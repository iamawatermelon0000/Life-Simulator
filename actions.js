/* main ation function */
    let on_cd = false;

    function doActions() {

      if (!on_cd) {

        const action = document.getElementById("chooseAction").value;

        if (!action) {
          alert("How did you even do this");
          return;
        }

        if (action === "Cry") cry();
        if (action === "Sleep") sleep();
        if (action === "Eat") eat();
        if (action === "Play") play();
        if (action === "Spend time") spendTime();
        if (action === "Beg for money") beg();
        if (action === "Iron your clothes") iron();

        on_cd = true;

      } else {
        alert("slow down bud");
      }

      setTimeout(() => {
        on_cd = false;
      }, 1500);
    }

    const all_func = [
      cry,
      sleep,
      eat,
      play,
      spendTime,
      "robbed",
      "found a lost wallet",
      "free food"
    ];


/* action functions */
    function cry() {
      alert("you cried");

      if (Math.random() < 0.01) {
        alert("you gained $25 in order to stop crying");
        money += 25;
      } else {
        alert("nothing happened, except that you lost 5 energy");
        energy -= 5;
      }

      printInfos();
      save();
    }

    function sleep() {

      if (energy >= 75) {
        alert("You're not tired!");
        return;
      }

      if (!(energy <= 25)) {

        alert("You took a nap!");
        energy += 25;
        hunger += 10

      } else {

        alert("u went to sleep and gained 50 energy");
        energy += 50;
        hunger += 25;

      }

      printInfos();
      save();
    }

    function eat() {

      if (hunger > 75) {
      alert("you ate a full meal!");
      hunger -= 50;
      energy -= 20;

      } else if (hunger > 50) {
        alert("You ate a small meal!");
        hunger -= 35;
        energy -= 10;

      } else if (hunger > 25) {
        alert("You ate a snack!");
        hunger -= 15;
        energy -= 5;

      } else {
        alert("You're full, you can't eat right now.");
      }

      printInfos();
      save();
    }

    function play() {

      alert("you went outside and play");
      alert("you're a little bit tired now");

      if (happiness <= 25) {
        while (happiness < 25) {
          money--;
          happiness++;
        }

      } else if (Math.random() < 0.03) {
        happiness += 20;
        energy += 20;

      } else {
      happiness += 25;
      energy -= 15;
      }

      printInfos();
      save();
    }

    function spendTime() {
      alert("You spent time doing something (list of 'something' will soon be added)!");

      energy -= 15;
      happiness += 35;

      if (Math.random() < 0.5) {
        alert("You got lucky because 'something' was helpful!");

        hunger -= 25;
        money += 50;

      }  else {
        alert("'Something' seems like a waste of time...");

        hunger += 25;
        money -= 50;
      }
    }

    function beg() {

      alert("You went out and begged everyone for money");

      if (Math.random() < 0.5) {

        if (Math.random() < 0.25) {

          alert("Today the streets are VERYYYYYY crowded...");

          const time_gain = Math.floor(Math.random() * (5 - 2.5 + 1) + 2.5);
          const money_per_sec = Math.floor(Math.random() * (9999 - 100 + 1) + 100);

          const starting_time = performance.now();

          for (let i = 0; i <= time_gain; i += 0.5) {
            money += money_per_sec;
          }
          const ending_time = performance.now();
          const time_took = ending_time - starting_time;
          console.warn(`Time took: ${time_took}ms or ${time_took / 1000}s`);

        } else {
          alert("Today, the streets are not as crowded as yesterday.");
          money += Math.floor(Math.random() * (999 - 10 + 1) + 10);
        }

      } else {
        alert("Today the streets are not crowded...");
        money += 10;
      }

      save();
      printInfos();
    }

    function iron() {

      if (Math.random() < 0.25) {
        alert("You found some money while ironing your clothes!");
        money += Math.floor(Math.random() * (999 - 100 + 1) + 100);

      } else if (Math.random() < 0.05) {
        alert("You found some... collectables in your clothes while ironing it??? finders keerps right");
        money += Math.floor(Math.random() * (9999 - 100 + 1) + 100);

      } else {
        alert("You ironed your clothes!");
        energy -= 10;
        hunger += 15;
      }
      save();
      printInfos();
    }

    /* LOTTERY */
    let ticket_num = Number(localStorage.getItem("ticketNum") || 0);
    let prTicket_Num = document.getElementById("numOfTickets");

    let lottery_number = [];
    let winning_number = [];

    /* BUY TICKET */
    function buyLottery() {

      const lott_conf = confirm("Are you sure? Buying a lottery ticket costs $25.");

      if (lott_conf) {
        if (money < 25) { alert("ur too broke to play the lottery"); return; };
        money -= 25;
        ticket_num++;
    } else return;

    save();
    printInfos();
  }

  /* PLAY LOTTERY */
  function playLottery() {

    if (ticket_num <= 0) {
      alert("You don't have anything to play!");

      let conf_buy = confirm("Buy a ticket?");

      if (conf_buy) {
        buyLottery();
        return;

      } else {
        return;
      }
    }
    reroll();
    ticket_num--;
    const num_1 = lottery_number.join(' ');
    const num_2 = winning_number.join(' ');

    document.getElementById("ticketNumber").textContent = `Your ticket number: ${num_1}`;

    setTimeout(() => {
        for (let i = 0; i < 6; i++) {
          let correct_num = [];
          let winning_price = 0;

          if (lottery_number[i] === winning_number[i]) correct_num.push(`N1: ${lottery_number[i]}, N2: ${winning_number[i]}`);

          correct_num.forEach(num => {

            const each_num_price = Math.floor(Math.random() * (999 - 100 + 1) + 100);
            money += each_num_price;

            console.warn(`ON_FOREACH: ${num}`);
            console.warn(`WINNING_PRICE_FOREACH: ${each_num_price}`);
          });

          if (i === 6) {
            if (correct_num.length <= 0) {
              alert("You lost...");
              if (Math.random() < 0.5) {
                alert("Someone felt bad and gave you $10!");
                money += 10;
              }
            }
          }
        }
    }, 1200);

    winning_number = [];
    lottery_number = [];

    save();
    printInfos();
  }

  /* REROLL NUMBER */
  function reroll() {

    for (let i = 0; i <= 6; i++) {

      lottery_number.push(Math.floor(Math.random() * 99) + 1);

      if (lottery_number.length > 6) {
        while (lottery_number.length > 6) {
          lottery_number.pop();
        }
      }

    }

  }

    for (let i = 0; i <= 6; i++) {

      winning_number.push(Math.floor(Math.random() * 99) + 1);

      if (winning_number.length > 6) {
        while (winning_number.length > 6) {
          winning_number.pop();
        }
      }

    }
