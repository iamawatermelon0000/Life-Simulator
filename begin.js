    /* BEGINNING */
    const btn = document.getElementById("startGame");
    const rebirth_btn = document.getElementById("rebirthBTN");
    let started = false;
    let changing = false;

    function begin() {

      if (!started) {
      let container1 = document.getElementById("container1");
      let starting = document.getElementById("startingScreen");

      try {
      printInfos();
      if (pname.length <= 0) rerollName();
      startMain();
      updateTime();
      save();
      } catch (err) {
        throw new Error(err, err.message);
      } finally {
        console.log("%cCode ran, no errors were found.", "font-size:35px;color:red;border:2px solid red;font-weight:bold; font-style:italic;");
      }

      btn.remove();

      if (!cheated) {
      buttons.forEach(b => {
        b.disabled = false;
      });

      selects.forEach(s => {
        s.disabled = fasle;
      })
    };

    started = true;
  }
    };

    document.addEventListener("DOMContentLoaded", () => {
      console.log("begin.js performed: disable_buttons")
      buttons.forEach(b => {
        b.disabled = true;
        console.log(b.disabled);
      });
      btn.disabled = false;
      rebirth_btn.disabled = true;

      selects.forEach(s => {
        s.disabled = true;
      });

    if (cheated) {
      location.replace("second_window.html");
    }

    });

/* NAME */
/* NAME VARIABLES */
    const l_names = [
      "John",
      "Nolan",
      "Betty",
      "watermelon.?",
      "Emily",
      "Lisa",
      "Marcus",
      "Explode"
    ];
    const f_names = [...l_names];
    f_names.push("Bike", "Motor", "JohnSON", "SONion");
    // i got Explode watermelon once

/* REROLL NAME */
    function rerollName() {
      if (pname.length === 0  || changing) {
        pname = [];
        pname.push(f_names[Math.floor(Math.random() * f_names.length)]);
        pname.push(l_names[Math.floor(Math.random() * l_names.length)]);
        pname = pname.join(" ");
        prName.textContent = `Name: ${pname}`;
      } else {
        prName.textContent = `Name: ${pname}`;
      }

      save();
      printInfos();
    }
