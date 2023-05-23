let controllerIndex = null;
let inputArray = []
let correctArray = [14, 13, 14, 13]
let completed = 0
let failed = 0
document.querySelector('.completed').innerText = completed
document.querySelector('.failed').innerText = failed

const buttonState = {}; // Store the state of each button

window.addEventListener("gamepadconnected", (event) => {
  const gamepad = event.gamepad;
  controllerIndex = gamepad.index;
  console.log("connected");
});

window.addEventListener("gamepaddisconnected", (event) => {
  controllerIndex = null;
  console.log("disconnected");
});

function handleButtons(buttons) {
  for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];
    const buttonElement = document.getElementById(`controller-b${i}`);
    const selectedButtonClass = "selected-button";

    if (buttonElement) {
      if (button.value > 0) {
        if (!buttonState[i]) { // Check if the button is not already pressed
          buttonState[i] = true;
          buttonElement.classList.add(selectedButtonClass);
          buttonElement.style.filter = `contrast(${button.value * 150}%)`;
          // button pressed info
          inputArray.push(i)
        }
      } else {
        buttonState[i] = false; // Update the button state when released
        buttonElement.classList.remove(selectedButtonClass);
        buttonElement.style.filter = `contrast(100%)`;
      }
    }
  }
}

function checkInput() {
    if (inputArray.length === correctArray.length) {
      if (inputArray.every((element, index) => element === correctArray[index])) {
          completed += 1;
          console.log(completed)
      } else {
          failed += 1;
          console.log(failed)
      }
      inputArray = [];
    } else if (inputArray.includes(7)) {
      inputArray = [];
    } else {
      // possible other conditions if needed
    }
  }
  

function completeSession() {
    if (completed + failed === 30) {
      submitResults(completed, failed);
    }
}

function submitResults(completed, failed) {
    
}
  

function updateStick(elementId, leftRightAxis, upDownAxis) {
  const multiplier = 25;
  const stickLeftRight = leftRightAxis * multiplier;
  const stickUpDown = upDownAxis * multiplier;

  const stick = document.getElementById(elementId);
  const x = Number(stick.dataset.originalXPosition);
  const y = Number(stick.dataset.originalYPosition);

  stick.setAttribute("cx", x + stickLeftRight);
  stick.setAttribute("cy", y + stickUpDown);
}

function handleSticks(axes) {
  updateStick("controller-b10", axes[0], axes[1]);
  updateStick("controller-b11", axes[2], axes[3]);
}

function gameLoop() {
  if (controllerIndex !== null) {
    const gamepad = navigator.getGamepads()[controllerIndex];
    handleButtons(gamepad.buttons);
    handleSticks(gamepad.axes);
    checkInput()
    completeSession()
  }
  requestAnimationFrame(gameLoop);
}

gameLoop();
