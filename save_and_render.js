    /* SAVING */
    function save() {
      localStorage.setItem("age", age);
      localStorage.setItem("pname", JSON.stringify(pname));
      localStorage.setItem("money", money);
      localStorage.setItem("multiplier", multiplier);

      localStorage.setItem("job", curr_job);
      localStorage.setItem("income", income);
      localStorage.setItem("salary", salary);
      localStorage.setItem("working_events_log", JSON.stringify(working_events_log));
      localStorage.setItem("eventPity", event_pity);

      localStorage.setItem("energy", energy);
      localStorage.setItem("hunger", hunger);
      localStorage.setItem("happiness", happiness);

      localStorage.setItem("maxEnergy", max_energy);
      localStorage.setItem("maxHappiness", max_happiness);
      localStorage.setItem("minHunger", min_hunger);

      localStorage.setItem("bought", JSON.stringify(bought_logging_list));
      localStorage.setItem("jobPrice", job_price);
      localStorage.setItem("agePrice", age_price);
      localStorage.setItem("agePriceValue", age_price_value);

      localStorage.setItem("ageVal", age_value);
      localStorage.setItem("hungerVal", hunger_value);
      localStorage.setItem("happinessVal", happiness_value);
      localStorage.setItem("energyVal", energy_value);

      localStorage.setItem("unpaidRent", unpaid_rent);

      localStorage.setItem("ticketNum", ticket_num);

      localStorage.setItem("debugging", debugging);
      localStorage.setItem("cheated", cheated);
    };

    /* PRINT INFOS */
    function printInfos() {
      prName.textContent = `Name: ${pname}`;
      prAge.textContent = `Age: ${age}`;
      prMoney.textContent = `Money: $${money}`;

      prJob.textContent = `Job: ${curr_job}`;
      prInc.textContent = `Income: $${income}/ ${salary}s`;

      prEnergy.textContent = `Energy: ${energy}`;
      prHunger.textContent = `Hunger: ${hunger}`;
      prHappy.textContent = `Happiness: ${happiness}`;

      pgEn.value = energy;
      pgHg.value = hunger;
      pgHp.value = happiness;

      prUpgrades.innerHTML = `After Upgrades:<br>[+1 Age/ ${age_value}s], [+ 1 Hunger/ ${hunger_value}s], [- 1 Happiness/ ${happiness_value}s], [- 1 Energy/ ${energy_value}s]<br>[Max Energy: ${max_energy}], [Max Happiness: ${max_happiness}], [Min hunger: ${min_hunger}]`;

      prRent.textContent = `Current rent: ${rent}`;
      prUnpaid.textContent = `Total Unpaid Rent: ${unpaid_rent}`

      prAllItem.textContent = `Every items that you've bought: ${bought_logging_list.join(', ') || "None"}`;

      prTicket_Num.textContent = `Your number of tickets: ${ticket_num || 0}`;
    }

