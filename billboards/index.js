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
  cleanClass("dragging");
  cleanClass("new-added");
});

function cleanClass(className) {
  const elements = document.querySelectorAll(`.${className}`);
  for (let elem of elements) {
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
    // 被移动到column时，位置在dragging前面最近的元素
    const frontSib = getClosestFrontSibling(droppable, e.clientY);

    // dragging 在DOM树中前面的DOM节点
    const preSibling = dragging.previousElementSibling;
    if (frontSib) {
      if (
        frontSib.nextElementSibling === cloned ||
        frontSib === cloned ||
        frontSib === preSibling
      ) {
        return;
      }

      cloned.classList.add("new-added");
      frontSib.insertAdjacentElement("afterend", cloned);
      handleDragEnd();
    } else {
      if (
        droppable.firstChild === cloned ||
        droppable.firstChild === dragging
      ) {
        return;
      }
      if (dragging.parentNode === droppable && !preSibling) {
        return;
      }
      cloned.classList.add("new-added");
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
