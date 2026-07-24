    /* BEGINNING */
    const b = document.getElementById("startGame");
    let started = false;

    function begin() {

      if (!started) {
      let container1 = document.getElementById("container1");
      let starting = document.getElementById("startingScreen");

      printInfos();
      if (pname.length <= 0) rerollName();
      startMain();
      save();

      b.remove();
      starting.remove();

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
      buttons.forEach(b => {
        b.disabled = true;
      });
      b.disabled = false;
      buttons[buttons.length - 2].disabled = true;

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
      if (pname.length === 0) {
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
