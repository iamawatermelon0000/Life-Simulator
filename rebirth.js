    let multiplier = Number(localStorage.getItem("multiplier.KEEP") || 1);
    let rebirth_token = Number(localStorage.getItem("rebirthToken.KEEP") || 0);
    let rebirthable_age = Number(localStorage.getItem("rebirthableAge.KEEP") || 100);
    let time_rebirth = Number(localStorage.getItem("timeRebirth.KEEP") || 0);

    let purchased__ = localStorage.getItem("purchased__") == "true";
    let purchased_ = localStorage.getItem("purchased_") == "true";
    let purchased___ = localStorage.getItem("purchased___") == "true";

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

    /** REBIRTH SHOP (i decided to use JSDOC comments now since its automated by vscode for some reason) */
    function buyRebirthItem() {
      const rebirth_item = (document.getElementById("rebirthShop").value);
      console.log(rebirth_item, rebirth_token)

      if (rebirth_item === "mm:2t" && rebirth_token >= 2) {
        rebirth_token -= 2;
        multiplier += 0.25;
      }

      if (rebirth_item === "irt:2t" && rebirth_token >= 2 && !purchased_) {
        rebirth_token -= 2;
        rentTime = 60;
        const algorithym = "this algorithym will track your rent paying time and then decide if the rent should be lowered or not";

        purchased_ = true;
      }

      if (rebirth_item === "dra:4t" && rebirth_token >= 4 && !purchased__) {
        rebirth_token -= 4;
        rebirthable_age -= 10;

        purchased__ = true;
      }

      if (rebirth_item === "ims:5t" && rebirth_token >= 5 && !purchased___) { // holy typo
        rebirth_token -= 5;

        max_energy += 10;
        max_happiness += 10;
        min_hunger += 10;

        purchased___ = true;
      }

      save();
      printInfos();
    }
