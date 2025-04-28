///***** written as an instance since running more than 1 p5 sketch *****///


let sparkSketch2 = (p) => {
  p.data = new Array(40).fill(0); // starting with blank data
  p.targetData = new Array(40).fill(0); 
  p.selectedRound = 0;
  p.fadeSpeed = 0.2; // <-- how fast to fade (0 = no fade, 1 = instant)
  
  p.setup = function() {
    let canvas = p.createCanvas(300, 200); // Made a little wider for labels
    canvas.parent('spark2-holder'); // assign in HTML 
    p.textFont('Oswald');
  };

  p.draw = function() {
    p.background('#DFE6F2');
  
    // Smoothly update current data toward targetData
    for (let i = 0; i < p.data.length; i++) {
      p.data[i] = p.lerp(p.data[i], p.targetData[i], p.fadeSpeed);
    }
    
    // BARS
    let minVal = Math.min(...p.data);
    let maxVal = Math.max(...p.data);

    // Set the padding for the bar's height (so bars don't get squeezed to the edges)
    const padding = 20;

    // Calculate dynamic "center" (y = 0 axis) based on data values
    let range = maxVal - minVal;
    let yCenter = p.map(0, minVal, maxVal, p.height - padding, padding); // Map 0 axis to center between min and max values

    // Calculate bar height dynamically based on value range
    let barHeightFactor = (p.height - padding * 2) / range;  // Factor to scale the bars

    // Draw bars 
    for (let i = 0; i < p.data.length; i++) {  
      let barWidth = p.width / ((p.data.length)*1.5);
      
      let barHeight = p.data[i] * barHeightFactor; // Calculate height based on the value and scale factor

      let x = p.map(i, 0, p.data.length, 60, p.width - 60);
       
    // If the value is positive, the bar goes upwards
    if (p.data[i] >= 0) {
      p.fill('#073763'); 
      p.rect(x, yCenter - barHeight, barWidth, barHeight); // Positive bars go upwards from yCenter
    }
    // If the value is negative, the bar goes downwards
    else {
      p.fill('#F8FF7F'); 
      p.rect(x, yCenter, barWidth, Math.abs(barHeight)); // Negative bars go downwards from yCenter
    }
  }

    // START AND END LABEL
    p.fill('#073763');
    p.noStroke();
    p.textSize(12);
    
    // 1ST POINT (MAR 22)
    let xFirst = p.map(0, 0, p.data.length, 60, p.width - 60);
    let yFirst = p.map(p.data[0], minVal, maxVal, yCenter - padding, yCenter + padding); 
    p.textAlign(p.RIGHT, p.CENTER);
    p.text('MID', xFirst - 10, yFirst - 24); 
    p.text('MAR 22', xFirst - 10, yFirst - 8); 
    p.text((p.data[0] * 100).toLocaleString(undefined, {maximumFractionDigits: 0}) + "%", xFirst - 10, yFirst + 8);

    // LAST POINT (FEB 25)
    let xLast = p.map(p.data.length-1, 0, p.data.length-1, 60, p.width - 60);
    let yLast = p.map(p.data[p.data.length-1], minVal, maxVal, yCenter - padding, yCenter + padding);
    p.textAlign(LEFT, CENTER);
    p.text('FEB 25', xLast + 10, yLast - 8);
    p.text((p.data[p.data.length-1] * 100).toLocaleString(undefined, {maximumFractionDigits: 0}) + "%", xLast + 10, yLast + 8);

    // HIGHLIGHT SELECTED ROUND
    if (selectedRound > 0) {
      let xSelected = p.map(selectedRound - 1, 0, p.data.length, 60, p.width - 60);

      let yMax = p.map(maxVal, minVal, maxVal, p.height - padding, padding); // Map max value to top
      let yMin = p.map(minVal, minVal, maxVal, p.height - padding, padding); // Map min value to bottom    

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
      let label = (p.data[selectedRound - 1] * 100).toLocaleString(undefined, {maximumFractionDigits: 0}) + "%";
      p.text(label, xSelected, yMax - 20); // Adjust this value for desired spacing above the dashed line
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