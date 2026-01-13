const draggables = document.querySelectorAll(".draggable");
const slots = document.querySelectorAll(".drop-slot");
const startContainer = document.getElementById("text-container");

draggables.forEach(item => 
{
  item.addEventListener("dragstart", e => 
  {
    e.dataTransfer.setData("text/plain", item.id);
  });
});

// Allow returning to starting area
startContainer.addEventListener("dragover", e => 
{
  e.preventDefault();
  startContainer.classList.add("drag-over");
});

startContainer.addEventListener("dragleave", () => 
{
  startContainer.classList.remove("drag-over");
});

startContainer.addEventListener("drop", e => 
{
  e.preventDefault();
  startContainer.classList.remove("drag-over");
  const id = e.dataTransfer.getData("text/plain");
  const draggedElement = document.getElementById(id);
  startContainer.appendChild(draggedElement);
});

// Handle dropping into slots
slots.forEach(slot => {
  slot.addEventListener("dragover", e => 
  {
    e.preventDefault();
    slot.classList.add("drag-over");
  });

  slot.addEventListener("dragleave", () => 
  {
    slot.classList.remove("drag-over");
  });

  slot.addEventListener("drop", e => 
  {
    e.preventDefault();
    slot.classList.remove("drag-over");

    const id = e.dataTransfer.getData("text/plain");
    const draggedItem = document.getElementById(id);

    // If the slot already has a child, send it back to start
    if (slot.hasChildNodes()) 
    {
      const existingItem = slot.firstElementChild;
      startContainer.appendChild(existingItem);
    }

    slot.innerHTML = ""; // Clear the slot (just in case)
    slot.appendChild(draggedItem);
  });
});
document.getElementById("reset-btn").addEventListener("click", () => 
{
  const container = document.getElementById("text-container");
  draggables.forEach(item => container.appendChild(item));
});

document.getElementById("submit-btn").addEventListener("click", () => 
{
  document.querySelectorAll(".draggable").forEach(el => 
    {
    el.setAttribute("draggable", false);
  });


  
html2canvas(document.body, 
  {
  useCORS: true,
  allowTaint: false,
  logging: true
}).then(canvas => 
  {
    const link = document.createElement("a");
    link.download = "superliga-screenshot.png";
    link.href = canvas.toDataURL();
    link.click();
  });
});






