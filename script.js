document.addEventListener("DOMContentLoaded", () => {

let currentPickerColor = "#e7e1d0ff";

    //create out own AdafruitIO object
  const IO = new AdafruitIO("Nichola2266", "api_key");
  const feedName ="data-color";

  const grid = document.getElementById("grid");
  const rows = 1;
  const cols = 1;

  // Generate cells with labels
  const letters = "ABCDEFGH"; // 8 columns → A to I

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const label = `${letters[c]}${r + 1}`;
      grid.innerHTML += `
        <div id="cell-${label}" data-state="0" data-color="${currentPickerColor}" class="cell" style="background-color:${currentPickerColor}">${label}</div>
      `;
    }
  }


  // Toggle on click
  grid.addEventListener("click", (e) => {                                   
    const selectedCell = e.target;
    // we modify bg color of the clicked cell
    selectedCell.style.backgroundColor = currentPickerColor;
    // we want to store the data-color
    selectedCell.dataset.color = currentPickerColor;
    });



  // Reset Button
  const reset = document.getElementById("clear");
  reset.addEventListener("click", () => {
    grid.querySelectorAll(".cell").forEach((cell) => { 
      cell.style.backgroundColor = "#e7e1d0ff"; 
      cell.dataset.color = "#e7e1d0ff";         
      cell.dataset.state = "0";
    });
      console.log("Grid is cleared!");
  });



  // Save Button 
  const save = document.getElementById("save");
  save.addEventListener("click", () => {
    const colors = Array.from(grid.querySelectorAll(".cell")).map(cell => cell.dataset.color);
    // const payload = JSON.stringify(colors);
    let v = colors[0].split('').filter((d,i)=>i>0)
    let wgrb = `0x00${v[2]}${v[3]}${v[0]}${v[1]}${v[4]}${v[5]}` 
    // let long = parseInt(`0x${colors[0].split('').filter((d,i)=>i>0).join('')}`, 16)
    let long = parseInt(wgrb, 16)
    const payload = JSON.stringify(long)
    console.log("!!Successfully Saved Design!!",payload);
    IO.postData("data-color", payload);
  });
  

  //Send Design button
  const senddesign = document.getElementById("senddesign");
  senddesign.addEventListener("click", () => {
   const colors = Array.from(grid.querySelectorAll(".cell")).map(cell => cell.dataset.color);
   const payload = JSON.stringify(colors);
    // const payload = JSON.stringify(`[${colors.filter((d,i) => i < 8).join(',')}]`)

    console.log("Sending design to Adafruit IO:", payload);
    IO.postData("data-color", payload);
  });
  
  

     // ###################### Color Picker ######################
    //color picker
    const colorPicker = new Alwan("#color-picker", {
        theme: "light",
        toggle: false,
        popover: false,
        color: "#e7e1d0ff",
        format: "hex",
        margin: 5,
        inputs: {
        rgb: false,
        hex: true,
        hsl: false,
        },
        opacity: false,

    });


    // when interacting with alwan color picker
    colorPicker.on('change', function(event) { 
        currentPickerColor = event.hex
        console.log(`👋🏻 - you changed color to: ${currentPickerColor}`);
    });


  });


