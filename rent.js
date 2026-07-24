/* RENT */

/* RENT VARIABLES */
    let unpaid_rent = Number(localStorage.getItem("unpaidRent") || 0);
    let rent = 0;
    let prRent = document.getElementById("currentRent");
    let prUnpaid = document.getElementById("unpaidRent");

/* PAY RENT */
    function payRent() {

      if (money < unpaid_rent && money > rent) {
        alert("You paid your current rent!")
        money -= rent;
        unpaid_rent -= rent;

        rent = 0;

      } else if (money < unpaid_rent && money < rent) {
        alert("You don't have enough money, get a J*B");
        alert("Also, you lost $25 for gas");

        money -= 25;

      } else if (money >= unpaid_rent) {
        alert("You paid all of your rent!")
        money -= unpaid_rent;

        unpaid_rent = 0;
        rent = 0;
      };

      if (money < 0) {
        alert("Dude, ur in DEBT");
      }

      printInfos();
      save();
    }
