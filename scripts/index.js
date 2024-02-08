const ELEMENT_STATE_ATTRIBUTE_NAME = "data-selected";

const STATE = {
  ON: "ON",
  OFF: "OFF",
};

function createBoxElement(parent, containerToBeCreated) {
  for (let i = 0; i < containerToBeCreated; i++) {
    let boxElement = document.createElement("div");
    boxElement.classList.add("box");
    boxElement.setAttribute("data-test", "" + i);
    parent.appendChild(boxElement);
  }
}

function handleContainerClick(event) {
  const targetElement = event.target;
  toggleElementState(targetElement);
  logElementState(targetElement);
}

function toggleElementState(element) {
  const currentState = element.getAttribute(ELEMENT_STATE_ATTRIBUTE_NAME);
  if (currentState == STATE.OFF || !currentState) {
    element.setAttribute(ELEMENT_STATE_ATTRIBUTE_NAME, STATE.ON);
  } else {
    element.setAttribute(ELEMENT_STATE_ATTRIBUTE_NAME, STATE.OFF);
  }
}

function logElementState(element) {
  const currentState = element.getAttribute(ELEMENT_STATE_ATTRIBUTE_NAME);
  const childIndex =
    Array.from(element.parentNode.children).indexOf(element) + 1;
  console.log(`Turning ${currentState} ${childIndex}`);
}

document.addEventListener("DOMContentLoaded", function () {
  initializeDocument();
});

function initializeDocument() {
  const containerToBeCreated = prompt("Enter number of boxes to be created");
  const container = document.getElementById("container");
  createBoxElement(container, containerToBeCreated);
  container.addEventListener("click", handleContainerClick);
}
