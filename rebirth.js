    let multiplier = Number(localStorage.getItem("multiplier.KEEP") || 1);
    let rebirth_token = Number(localStorage.getItem("rebirthToken.KEEP") || 0);
    let rebirthable_age = Number(localStorage.getItem("rebirthableAge.KEEP") || 100);
    let time_rebirth = Number(localStorage.getItem("timeRebirth.KEEP") || 0);

    const prRebirthable = document.getElementById("RebirthableAge");
    const prRebirthToken = document.getElementById("rebirthToken");
    const prMultiplier = document.getElementById("currentMultiplier");
    const prTimeRebirthed = document.getElementById("timesRebirthed");

    function rebirth() {
      if (age < rebirthable_age) { cheated = true; return; }

      multiplier = Math.min(multiplier + 0.5, 10);
      rebirth_token += 1;
      time_rebirth += 1;

      updateRebirthable();
      wipeData();
    }

    function updateRebirthable() {

      if (age <= 0 || age < 100) return;

      rebirthable_age = (age * (1.75 * age) + (age * 2));
      if (rebirthable_age < 100) updateRebirthable();
    }

    function wipeData() {

      for (let i = localStorage.length - 1; i >= 0; i--) {
        const storageKey = localStorage.key(i);
        if (storageKey && !storageKey.endsWith(".KEEP")) localStorage.removeItem(storageKey);
      }

      location.reload();
    }
