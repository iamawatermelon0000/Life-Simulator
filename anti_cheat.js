function checkValid() {
      if (
            (!Number.isFinite(money) ||
            !Number.isFinite(hunger) ||
            !Number.isFinite(energy) ||
            !Number.isFinite(happiness) ||
            money > 1e9 || energy > 1e9 || hunger < -1e9 || happiness > 1e9)
            && !debugging) {
          cheated = true;
        }
}

function liftBan() {
  const codes = [
    "O0P6w8S9S!x4F8Z0R#O4W\\",
    "g6W?o!V8z3T7H4h/a9",
    "s!i8r2N@i3J!n0L9x7g5",
    "h6U0A/G6s!k7y0d\\J4",
    "m5N9y!f/j#r4t3x8R5",
    "O6n@n4f\\J3z2U/d!x1Q1"
  ]
  const pr = prompt("Enter code:");

  if (codes.includes(pr)) {
    cheated = false;
  } else return;

  localStorage.setItem("cheated", cheated);
  location.replace("index.html");
}
