const droppables = document.querySelectorAll(".droppable");
const draggables = document.querySelectorAll(".draggable");
const transitionTime = 500;
let dragging;
let cloned;
document.body.style.setProperty("--transitionTime", transitionTime + "ms");
// drag start
document.addEventListener("dragstart", (e) => {
  if (e.target.classList.contains("draggable")) {
    dragging = e.target;
    dragging.classList.add("dragging");
    cloned = dragging.cloneNode(true);
  }
});
// drag end
document.addEventListener("dragend", (e) => {
  if (e.target.classList.contains("draggable")) {
    e.target.classList.remove("dragging");
  }
});

function cleanClass(className) {
  const elems = document.querySelectorAll(`.${className}`);
  for (let elem of elems) {
    elem.classList.remove(className);
  }
}

function handleDragEnd() {
  if (!dragging) return;
  dragging.classList.add("will-remove");
  setTimeout(() => {
    dragging.remove();
    cleanClass("dragging");
  }, transitionTime);
}

droppables.forEach((droppable) => {
  droppable.addEventListener("dragover", (e) => {
    e.preventDefault();
    const frontSib = getClosestFrontSibling(droppable, e.clientY);
    const preSibling = dragging.previousElementSibling;
    if (frontSib) {
      if (
        frontSib.nextElementSibling === cloned ||
        frontSib === cloned ||
        frontSib === preSibling
      ) {
        return;
      }
      cloned.classList.add("new-insert");
      frontSib.insertAdjacentElement("afterend", cloned);
      handleDragEnd();
    } else {
      if (droppable.firstChild === cloned) return;
      droppable.prepend(cloned);
      handleDragEnd();
    }
  });
});

function getClosestFrontSibling(droppable, draggingY) {
  const siblings = droppable.querySelectorAll(".draggable:not(.dragging)");
  let result = null;

  for (let sibling of siblings) {
    const box = sibling.getBoundingClientRect();

    const boxCenterY = box.y + box.height / 2;
    if (draggingY >= boxCenterY) {
      result = sibling;
    }
  }
  return result;
}
