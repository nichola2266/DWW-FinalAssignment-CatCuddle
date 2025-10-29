document.addEventListener("DOMContentLoaded", () => {

  const grid = document.getElementById("grid");
  const rows = 9;
  const cols = 9;

  // Generate cells with labels
  const letters = "ABCDEFGHI"; // 9 columns → A to I

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const label = `${letters[c]}${r + 1}`;
      grid.innerHTML += `
        <div id="cell-${label}" data-state="off" class="cell">${label}</div>
      `;
    }
  }


  
  // Toggle on click
  grid.addEventListener("click", (e) => {
    const selectedCell = e.target;
    if (!selectedCell.classList.contains("cell")) return;
    selectedCell.dataset.state =
      selectedCell.dataset.state === "off" ? "on" : "off";
  });

  // Reset
  const reset = document.getElementById("clear");
  reset.addEventListener("click", () => {
    grid.querySelectorAll(".cell").forEach((cell) => {
      cell.dataset.state = "off";
    });
  });

  // Save
  const save = document.getElementById("save");
  save.addEventListener("click", () => {
    const states = [];
    grid.querySelectorAll(".cell").forEach((cell) => {
      states.push(cell.dataset.state);
    });
    console.log(states);
  });
});