///***** written as an instance since running more than 1 p5 sketch *****///


let sparkSketch1 = (p) => {
  p.data = new Array(40).fill(0); // starting with blank data
  p.targetData = new Array(40).fill(0); 
  p.selectedRound = 0;
  p.fadeSpeed = 0.2; // <-- how fast to fade (0 = no fade, 1 = instant)
  
  p.setup = function() {
    let canvas = p.createCanvas(300, 200); // Made a little wider for labels
    canvas.parent('spark1-holder'); // assign to div in HTML 
    p.textFont('Oswald');
  };

  p.draw = function() {

    p.background('#DFE6F2');

    // Smoothly update current data toward targetData
    for (let i = 0; i < p.data.length; i++) {
      p.data[i] = p.lerp(p.data[i], p.targetData[i], p.fadeSpeed);
    }


  // SPARK LINE
    p.stroke('#073763');
    p.strokeWeight(3);
    p.noFill();
    
    // DRAW LINE
    let minVal = p.min(p.data);
    let maxVal = p.max(p.data);

    for (let i = 0; i < p.data.length - 1; i++) {
      let x1 = p.map(i, 0, p.data.length - 1, 60, p.width - 60);
      let y1 = p.map(p.data[i], 0, maxVal, p.height - 40, 40);
      let x2 = p.map(i + 1, 0, p.data.length - 1, 60, p.width - 60);
      let y2 = p.map(p.data[i + 1], 0, maxVal, p.height - 40, 40);
      p.line(x1, y1, x2, y2);
    }

    // START AND END LABEL
    p.fill('#073763');
    p.noStroke();
    p.textSize(12);
    
    // 1ST POINT (MAR 22)
    let xFirst = p.map(0, 0, p.data.length - 1, 60, p.width - 60);
    let yFirst = p.map(p.data[0], 0, maxVal, p.height - 40, 40);
    p.textAlign(p.RIGHT, p.CENTER);
    p.text('MID', xFirst - 10, yFirst - 24); 
    p.text('MAR 22', xFirst - 10, yFirst - 8); 
    p.text((p.data[0] / 1000).toLocaleString(undefined, {maximumFractionDigits: 0}) + "K", xFirst - 10, yFirst + 8);

    // LAST POINT (FEB 25)
    let xLast = p.map(p.data.length - 1, 0, p.data.length - 1, 60, p.width - 60);
    let yLast = p.map(p.data[p.data.length - 1], 0, maxVal, p.height - 40, 40);
    p.textAlign(LEFT, CENTER);
    p.text('FEB 25', xLast + 10, yLast - 8);
    p.text((p.data[p.data.length - 1] / 1000).toLocaleString(undefined, {maximumFractionDigits: 0}) + "K", xLast + 10, yLast + 8);

    // HIGHLIGHT SELECTED ROUND
    if (selectedRound > 0) {
      let xSelected = p.map(selectedRound - 1, 0, p.data.length - 1, 60, p.width - 60);

      let yMax = p.map(minVal, 0, maxVal, p.height - 40, 40); // lower value = near bottom
      let yMin = p.map(maxVal, 0, maxVal, p.height - 40, 40); // higher value = near top

  
      // DASHED VERTICAL LINE
      p.stroke('#6681EA');
      p.strokeWeight(1);
      p.drawingContext.setLineDash([2,2])
      p.line(xSelected, yMin, xSelected, yMax); 

      // MAIN SPARK LINE
      p.drawingContext.setLineDash([])
      p.noStroke();
      p.fill('#6681EA');
      p.textSize(14);
      p.textAlign(p.CENTER, p.TOP);

      // LABEL ABOVE VERTICAL LINE
      let label = (p.data[selectedRound - 1] / 1000).toLocaleString(undefined, {maximumFractionDigits: 0}) + "K";
      p.text(label, xSelected, yMin - 20); // 20px above the dot    
    }

  }
;
  // UPDATE DATA BASED ON SELECTED ROUND
  p.updateData = function(newData, newRound, isTotalView = false) {
    console.log("📈 updateData called:");
    console.log("   newData sample:", newData ? newData.slice(0, 5) : "None");
    console.log("   newRound:", newRound);
    console.log("   isTotalView:", isTotalView);
    console.log("   (inside updateData) selectedOblast:", selectedOblast);
    
    if (newData && newData.length) {
      let isAllZero = newData.every(val => val === 0);
  
      if (isAllZero || isTotalView) {
        p.data = [...newData];
        p.targetData = [...newData];
        p.selectedOblast = "Total"; 
        p.isFiltered = false; 
      } else {
        p.targetData = [...newData];
        p.isFiltered = true;
      }
  
      p.selectedRound = newRound;
    }
  };  
}
  