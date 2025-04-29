(function () {
  const wheel = document.querySelector(".wheel");
  const startButton = document.querySelector(".button");
  const disableButton = document.querySelector(".disableBtn");
  const display = document.querySelector(".display");

  const yourPrize = localStorage.getItem("yourPrize");
  if (yourPrize !== null) {
    display.innerHTML = yourPrize;
  }

  const isSpun = localStorage.getItem("isSpun");
  startButton.hidden = isSpun === "true";
  disableButton.hidden = isSpun !== "true";

  const spinSound = new Audio("/sounds/spin.mp3");
  const finishSound = new Audio("/sounds/finish.mp3");

  let deg = 0;
  let zoneSize = 60;

  const symbolSegments = {
    1: "Shimenawa",
    2: "Gối Nhật Bản",
    3: "Cờ gỗ",
    4: "Rèm Noren",
    5: "Ema Daruma ",
    6: "Ema ngẫu nhiên",
  };

  const handleWin = (actualDeg) => {
    const offsetDeg = actualDeg % 360;
    const winningSymbolNr = Math.ceil(offsetDeg / zoneSize);

    const prize = symbolSegments[winningSymbolNr];
    display.innerHTML = prize;
    localStorage.setItem("yourPrize", prize);
  };

  startButton.addEventListener("click", () => {
    localStorage.setItem("isSpun", "true");
    spinSound.currentTime = 0;
    spinSound.play();
    display.innerHTML = "";
    startButton.style.pointerEvents = "none";
    deg = Math.floor(5000 + Math.random() * 5000);
    wheel.style.transition = "all 5s ease-out";
    wheel.style.transform = `rotate(${deg}deg)`;
    //wheel.classList.add("blur");
  });

  wheel.addEventListener("transitionend", () => {
    wheel.classList.remove("blur");
    startButton.style.pointerEvents = "auto";
    wheel.style.transition = "none";
    const actualDeg = deg % 360;
    wheel.style.transform = `rotate(${actualDeg}deg)`;
    handleWin(actualDeg);
    spinSound.pause();
    spinSound.currentTime = 0;
    finishSound.currentTime = 0;
    finishSound.play();
    startButton.hidden = true;
    disableButton.hidden = false;
  });
})();
