document.addEventListener("DOMContentLoaded", () => {

    //create out own AdafruitIO object
    const IO = new AdafruitIO("Nichola2266","pssword");

  const grid = document.getElementById("grid");
  const rows = 8;
  const cols = 8;

  // Generate cells with labels
  const letters = "ABCDEFGH"; // 8 columns → A to I

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


// Deselect All Button
  const deselectButton = document.getElementById("deselect");               
  deselectButton.addEventListener("click", () => {              // something wrong with this line of code
    grid.querySelectorAll(".cell").forEach((cell)=>{
        cell.dataset.state = "off"
        

    });

  });


  // Reset Button
  const reset = document.getElementById("clear");
  reset.addEventListener("click", () => {
    grid.querySelectorAll(".cell").forEach((cell) => { 
      cell.dataset.state = "off";
    });
  });

  // Save Button 
  const save = document.getElementById("save");
  save.addEventListener("click", () => {
    const states = [];
    grid.querySelectorAll(".cell").forEach((cell) => {
    states.push(cell.dataset.state);
    console.log(states);
    });
    


  });


    const senddesign = document.getElementById("senddesign");
   sendesign.addEventListener("click", () => {
    const states = [];
    grid.querySelectorAll(".cell").forEach((cell) => {
    states.push(cell.dataset.state);
    console.log("Sending design to Adafruit IO,"payload);
    });
    
    const payload = JSON.stringify(states);
    
     IO.postData("Grid_state", payload);
       });
    





  const feedName ="Grid_state";


 
});

