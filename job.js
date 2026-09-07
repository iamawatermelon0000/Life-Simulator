/* JOBS */

/* JOB VARIABLES */
    const jobs = [
      "Yard Cleaner",
      "Window Wiper",
      "Lawn Mowing",
      "Leaf BLowing",
      "Waiter",
      "Office Worker",
      "9-5",
      "Intern Mechanic",
      "Technician",
      "Chef",
      "IT",
      "Nurse",
      "Doctor",
      "Police Officier",
      "Boxer",
      "watermeloner"
    ];
    let all_jobs = [...jobs];
    let index;
    let curr_job = localStorage.getItem("job") || "None";
    let income = Number(localStorage.getItem("income") || 0); // per 30-60 seconds
    let salary = Number(localStorage.getItem("salary") || 1);

    let prJob = document.getElementById("job");
    let prInc = document.getElementById("income");
    let prJobStat = document.getElementById("jobStatus");

/* JOB FUNCTION */
    function job() {
      if (age < 16) { prJobStat.textContent = "You're too young!"; return; }

      if (curr_job !== "None" && age < 16 && !debugging) { cheated = true; save(); location.reload(); }
      if (curr_job !== "None" && !change_active) {
        alert("You already have a job!");
        let cf_2 = confirm("Do you wanna change to another job?");
        if (cf_2) {
        alert("Since finding jobs are so difficult..");

        let cf = confirm(`So switching jobs will cost you x2 your income. Which means if you wanna change jobs right now, it's going to cost you $${income * 2}. Are you sure?`);
        if (!cf) return;
        if (money < (income * 2)) { alert("brokie, keep working"); return; }

        } else {

          let work_hour = prompt(`How much hour do you wanna work? You'll gain ${income * 1.75} (total: income*1.75*multiplier) every hour and loses 10% of your energy every hour. (Please note that you'll get your salary)`);

          if (work_hour === null || work_hour > energy || work_hour < 0) {
            alert("What are you trying to do?");
            energy -= (((energy * 10) / 100)).toFixed(0);
            return;
          }

          for (let i = 0; i < work_hour; i++) {

            energy = (energy * 10 / 100);

            if (energy < 0) {
              alert("You got too tired and fell asleep while working...");
              alert("You got punished for your actions");

              money -= 1000;
              break;
              return;
            }
            money += ((income * 1.75) * multiplier);

            if (Math.random() < 0.2) {
              rerollWorkingEvent();
            }
          }

          return;
        }

        save();
        printInfos();
      }

      let conf = confirm("Do you sure want to get a j*b? The income is *FIXED* and cannot be changed unless you get a new job.");
      if (!conf) return;
      if (!change_active) money -= income * 2;

      index = Math.floor(Math.random() * all_jobs.length);
      curr_job = all_jobs[index];

      all_jobs.splice(index, 1);
      if (all_jobs.length === 0) all_jobs = [...jobs];

      income = Math.floor(Math.random() * (2000 - 50 + 1) + 50);
      salary = Math.floor(Math.random() * (60 - 30 + 1) + 30);

      if (iSal) clearInterval(iSal);
      iSal = setInterval(() => {
        money += (income * multiplier);
        prJobStat.textContent = `Received ${income}!`

        save();
        printInfos();
      }, salary * 1000);

      setTimeout(() => {
        prJobStat.textContent = "";
      }, 1500)
    };

    /** HUSTLES */
    /** HUSTLES VARIABLES */
    let result;
    const hustles = [
        "dumbster diving",
        "thrifting",
        "freelancing for a friend",
        "doing homework",
        "learning something"
      ];

    function doHustle() {
      const hust_inc = Math.floor(Math.random() * (9999 - 1 + 1) + 1);

      if (Math.random() < .5) {
        const convert = -hust_inc;
        if (convert === -hust_inc) result = "lost";
        alert(`Hustle: ${hustles[Math.floor(Math.random() * hustles.length)]}, you ${result} ${convert}`);
        money += (hust_inc * multiplier);

      } else {
        result = "gained";
        alert(`Hustle: ${hustles[Math.floor(Math.random() * hustles.length)]}, you ${result} ${hust_inc}`);
        money += (hust_inc * multiplier);
      }

      save();
      printInfos();
    }
