// ***SET-UP*** //
// ***SET-UP*** //
// ***SET-UP*** //

let polygons = []; // parepare for polygons
let allDots = []; // prepare for dots
let dotCounts = [];
let table; // prepare for table & oblast names (below) for data match

let spark1; // declare first spark graph
let spark2; // declare second spark graph

let selectedRound = "1"; // set landing round to 1
let oblastNames = [ // for mapping polygons CRUCIAL -- MUST MATCH ORDER OF POLYGONS AS THEY ARE CREATED FOR LOOP FUNCTION WHICH CONNECTS DATA
  "Volynska", "Lvivska", "Ivano-Frankivska", "Zakarpatska", "Chernivetska",
  "Ternopilska", "Khmelnytska", "Zhytomyrska", "Rivnenska", "Vinnytska",
  "Odeska", "Kyivska", "Mykolaivska", "Cherkaska", "Kirovohradska", "Poltavska",
  "Sumska", "Chernihivska", "Khersonska", "Dnipropetrovska", "Zaporizka",
  "Kharkivska", "Donetska","Crimskaya", "Luhanskaya"
];

let selectedOblast = "Total";
let oblastData = {};

let hoveredIndex = -1; // for tooltip / hover feature
let clickedIndex = -1; // for clicking on oblasts


// ***LOAD DATA*** // 
// ***LOAD DATA*** // 
// ***LOAD DATA*** // 

function preload() {
  table = loadTable("rounds_1_40_p5_data.csv", "csv", "header");
}


// ***SET-UP FUNCTION*** //
// ***SET-UP FUNCTION*** //
// ***SET-UP FUNCTION*** //

function setup() {
  // SET UP CANVAS FOR MAP & ASSIGN POLYGON MAP // 
  let canvas = createCanvas(940, 600);
  canvas.parent("p5-polygon-background-map");
  
    // DEFINE POLYGONS (24 OBLASTS) BY COORDINATES //
    polygons = [
      //Volynska
      [
        { x: 151, y: 36 },
        { x: 159, y: 109 },
        { x: 130, y: 134 },
        { x: 92, y: 115 },
        { x: 76, y: 57 }
      ],
      // Lvivska
      [
        { x: 87, y: 127 },
        { x: 125, y: 147 },
        { x: 133, y: 164 },
        { x: 66, y: 237 },
        { x: 41, y: 223 },
        { x: 33, y: 193 }
      ],
      //Ivano-Frankivska
      [
        { x: 116, y: 205 },
        { x: 138, y: 244 },
        { x: 159, y: 253 },
        { x: 126, y: 310 },
        { x: 75, y: 247 }
      ],
      //Zakarpatska
      [
        { x: 36, y: 238 },
        { x: 61, y: 252 },
        { x: 96, y: 296 },
        { x: 35, y: 296 }, 
        { x: 10, y: 267 }
       
      ],
      //Chernivetska
      [
        { x: 171, y: 260 },
        { x: 192, y: 269 },
        { x: 239, y: 264 },
        { x: 237, y: 275 },
        { x: 138, y: 317 }
      ],
      //Ternopilska
      [
        { x: 148, y: 171 },
        { x: 179, y: 162 },
        { x: 184, y: 250 },
        { x: 145, y: 233 },
        { x: 125, y: 196 },
      ],
      //Khmelnytska
      [
        { x: 225, y: 126 },
        { x: 249, y: 182 },
        { x: 241, y: 253 },
        { x: 196, y: 254 },
        { x: 192, y: 157 }
      ],
      //Zhytomyrska
      [
        { x: 258, y: 64 },
        { x: 323, y: 74 },
        { x: 326, y: 182 },
        { x: 306, y: 165 },
        { x: 260, y: 170 },
        { x: 236, y: 114 }
      ],
      //Rivnenska
      [
        { x: 166, y: 40 },
        { x: 242, y: 64 },
        { x: 220, y: 113 },
        { x: 187, y: 144 },
        { x: 153, y: 156 },
        { x: 145, y: 138 },
        { x: 175, y: 113 }
      ],
      //Vinnytska
      [
        { x: 264, y: 185 },
        { x: 304, y: 181 },
        { x: 360, y: 227 },
        { x: 359, y: 257 },
        { x: 347, y: 274 },
        { x: 317, y: 290 },
        { x: 257, y: 258 }
      ],
      //Odeska
      [
        { x: 322, y: 303 },
        { x: 349, y: 290 },
        { x: 397, y: 378 },
        { x: 362, y: 424 },
        { x: 308, y: 455 },
        { x: 290, y: 443 },
        { x: 321, y: 385 },
        { x: 362, y: 390 }
      ],
      //Kyivska
      [
        { x: 337, y: 78 },
        { x: 379, y: 86 },
        { x: 435, y: 140 },
        { x: 364, y: 212 },
        { x: 338, y: 189 }
      ],
      //Mykolaivska
      [
        { x: 360, y: 286 },
        { x: 482, y: 317 },
        { x: 430, y: 397 },
        { x: 409, y: 373 }
      ],
      //Cherkaska
      [
        { x: 447, y: 147 },
        { x: 376, y: 219 },
        { x: 376, y: 255 },
        { x: 481, y: 217 }
      ],
      //Kirovohradska
      [
        { x: 488, y: 228 },
        { x: 523, y: 243 },
        { x: 491, y: 305 },
        { x: 368, y: 276 },
        { x: 375, y: 266 }
      ],
      //Poltavska
      [
        { x: 459, y: 145 },
        { x: 543, y: 134 },
        { x: 576, y: 156 },
        { x: 575, y: 210 },
        { x: 531, y: 231 },
        { x: 492, y: 215 }
      ],
      //Sumska
      [
        { x: 516, y: 7 },
        { x: 594, y: 85 },
        { x: 599, y: 123 },
        { x: 581, y: 141 },
        { x: 549, y: 119 },
        { x: 498, y: 127 }
      ],
      //Chernihivska
      [
        { x: 408, y: 26 },
        { x: 500, y: 9 },
        { x: 482, y: 129 },
        { x: 449, y: 131 },
        { x: 393, y: 77 }
      ],
      //Khersonska
      [
        { x: 497, y: 320 },
        { x: 541, y: 327 },
        { x: 575, y: 399 },
        { x: 443, y: 400 }
      ],
      //Dnipropetrovska
      [
        { x: 579, y: 219 },
        { x: 642, y: 250 },
        { x: 637, y: 295 },
        { x: 572, y: 280 },
        { x: 571, y: 317 },
        { x: 502, y: 307 },
        { x: 536, y: 240 }
      ],
      //Zaporizka 
      [
        { x: 583, y: 296 },
        { x: 641, y: 308 },
        { x: 671, y: 364 },
        { x: 592, y: 399 },
        { x: 557, y: 328 },
        { x: 583, y: 331 }
      ],
      //Kharkivska
      [
        { x: 604, y: 138 },
        { x: 676, y: 137 },
        { x: 700, y: 165 },
        { x: 693, y: 208 },
        { x: 650, y: 238 },
        { x: 586, y: 208 },
        { x: 588, y: 153 }
      ],
      //Donetska
      [
        { x: 701, y: 221 },
        { x: 657, y: 251 },
        { x: 652, y: 297 },
        { x: 681, y: 357 },
        { x: 746, y: 297 }
      ],
      //Crimskaya
      [
        { x: 463, y: 450 },
        { x: 511, y: 404 },
        { x: 621, y: 455 },
        { x: 512, y: 501 },
      ],
      //Luhanskaya
      [
        { x: 717, y: 167 },
        { x: 710, y: 210 },
        { x: 755, y: 286 },
        { x: 781, y: 286 },
        { x: 793, y: 190 }
      ]
    ];

  // RESIZE POLYGON MAP // started too small.. but could be good for future responsive model?
  let oldCenterX = 400; 
  let oldCenterY = 255;
  let newCenterX = 940 / 2;
  let newCenterY = 600 / 2;
  let dx = newCenterX - oldCenterX;
  let dy = newCenterY - oldCenterY;

  for (let i = 0; i < polygons.length; i++) {
    // Shift polygons to new center
    polygons[i] = polygons[i].map(v => ({
      x: v.x + dx,
      y: v.y + dy
    }));
  
    // Scale *from* the new center
    polygons[i] = scalePolygonFromPoint(polygons[i], 1.15, newCenterX, newCenterY);
  }

  // TIMELINE ARROWS (PREV & NEXT ROUND) // 
  select("#prev-round").mousePressed(() => {
    if (Number(selectedRound) > 1) {
      changeRound(String(Number(selectedRound) - 1));
      updateArrowButtons();
    }
  });
  select("#next-round").mousePressed(() => {
    if (Number(selectedRound) < 40) {
      changeRound(String(Number(selectedRound) + 1));
      updateArrowButtons();
    }
  });

  // CALL FUNCTIONS // 
  createTimeline();

  // MAP DOTS TO OBLAST & ROUND IN CSV //
  dotCounts = oblastNames.map(oblast => {
    for (let i = 0; i < table.getRowCount(); i++) {
      let r = table.getRow(i); 
      let round = Number(r.getString("Round").trim());
      let name = r.getString("Oblast").trim()
      
      if (round == selectedRound && name === oblast) {
        let raw = Number(r.getString("Recorded IDPs").replace(/,/g, ''));
        return raw > 0 ? Math.max(1, Math.round(raw / 5000)) : 0;
      }
    }
  console.warn("no match for", oblast);
  return 0;
});

  // CALL MORE FUNCTIONS // 
  regenerateDots(); // do this after initial view created ^ 

  updateTimelineTicks();
  updateArrowButtons(); 
  document.getElementById("round-summary").innerText = roundDescriptions[selectedRound] || "";

  createOblastData(); 

  spark1 = new p5(sparkSketch1); 
  spark2 = new p5(sparkSketch2); 
  
  spark1.updateData(oblastData[selectedOblast].idp, selectedRound, true);
  spark2.updateData(oblastData[selectedOblast].delta, selectedRound, true);

  updateSparkTitle("Total");

// ***BRING IN DATA*** //
// ***BRING IN DATA*** //
// ***BRING IN DATA*** //

  

  // LOOP GENERATE DOTS FOR EACH POLYGON // 
  for (let p = 0; p < polygons.length; p++) {
    let poly = polygons[p];
    let dots = [];

    while (dots.length < dotCounts[p]) {
      let pt = { x: random(width), y: random(height) };
      if (insidePolygon(pt, poly)) {
        dots.push({
          pos: pt,
          vel: { x: random(-.5, .5), y: random(-.5, .5) },
          alpha: random(100, 255),
          fadingIn: random([true, false]),
          fadeSpeed: random(0.5, 1.5)
        });
      }
    }

    allDots.push(dots);
  }
}


// ***DRAWING PARTICLES*** //
// ***DRAWING PARTICLES*** //
// ***DRAWING PARTICLES*** //

function draw() {
  background('#DFE6F2'); // 1. clear background

  let currentData = oblastData[selectedOblast]; // 2. grab data

  hoveredIndex = -1; 

  for (let p = 0; p < polygons.length; p++) {
    let poly = polygons[p];
    let dots = allDots[p];

    // for hover function - check if mouse is inside this polygon
    let isHovering = insidePolygon({ x: mouseX, y: mouseY }, poly);
    if (isHovering) {hoveredIndex = p;}

    // DRAW & STYLE POLYGONS //
    if (p === clickedIndex) {
      fill('#F8FF7F'); // clicked oblast stays highlighted
    } else if (p === hoveredIndex) {
      fill('#F8FF7F'); // lighter color on hover
    } else {
      fill('#DFE6F2'); // normal background
    }
    stroke('#FFFFFF');
    strokeWeight('4');
    beginShape();
    for (let v of poly) {
      vertex(v.x, v.y);
    }
    endShape(CLOSE);

    // DRAW & STYLE DOTS IN POLYGON //
    fill('#6681EA');
    noStroke();
    for (let dot of dots) {
      // Fading efffect
      if (dot.fadingIn) {
        dot.alpha += dot.fadeSpeed;
        if (dot.alpha >= 255) {
          dot.alpha = 255;
          dot.fadingIn = false;
        }
      } else {
        dot.alpha -= dot.fadeSpeed;
        if (dot.alpha <= 100) {
          dot.alpha = 100;
          dot.fadingIn = true;
        }
      }

      let next = {
        x: dot.pos.x + dot.vel.x,
        y: dot.pos.y + dot.vel.y
      };
      // Formula which tests if dot is inside or outside polygon, then applies values if IN
      if (insidePolygon(next, poly))  {
        dot.pos = next;
      } else {
        let tryX = { x: dot.pos.x - dot.vel.x, y: dot.pos.y + dot.vel.y };
        let tryY = { x: dot.pos.x + dot.vel.x, y: dot.pos.y - dot.vel.y };
        let tryBoth = { x: dot.pos.x - dot.vel.x, y: dot.pos.y - dot.vel.y };

        if (insidePolygon(tryX, poly)) {
          dot.vel.x *= -1;
          dot.pos = tryX;
        } else if (insidePolygon(tryY, poly)) {
          dot.vel.y *= -1;
          dot.pos = tryY;
        } else if (insidePolygon(tryBoth, poly)) {
          dot.vel.x *= -1;
          dot.vel.y *= -1;
          dot.pos = tryBoth;
        } else {
          dot.vel.x = random(-2, 2);
          dot.vel.y = random(-2, 2);
        }
      }
  
      fill(102, 129, 234, dot.alpha); 
      circle(dot.pos.x, dot.pos.y, 6);
    }
  }
}


// ***FUNCTIONS*** //
// ***FUNCTIONS*** //
// ***FUNCTIONS*** //

// Ray-casting algorithm to check if point is inside polygon
function insidePolygon(pt, vs) {
  let x = pt.x, y = pt.y;
  let inside = false;
  for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
    let xi = vs[i].x, yi = vs[i].y;
    let xj = vs[j].x, yj = vs[j].y;

    let intersect = ((yi > y) !== (yj > y)) &&
                    (x < (xj - xi) * (y - yi) / (yj - yi + 0.00001) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

// Change size of polygon while preserving shapes & relations to each other
function scalePolygonFromPoint(poly, scaleFactor, originX, originY) {
  return poly.map(v => {
    return {
      x: originX + (v.x - originX) * scaleFactor,
      y: originY + (v.y - originY) * scaleFactor
    };
  });
}

// Create & design timeline
function createTimeline() {
  let container = select("#timeline");

  for (let i = 1; i <= 40; i++) {
    let tick = createDiv().addClass("timeline-tick");
    let line = createDiv().addClass("tick-line");
    let labelText = roundLabels[i] || "";
    let label = createSpan(labelText).addClass("tick-label");

    tick.child(line);
    tick.child(label);
    tick.attribute("data-round", i);
    tick.mousePressed(() => changeRound(String(i)));
    tick.parent(container);
  }
}

// Change timeline tick formatting when selected
function updateTimelineTicks() {
  let ticks = selectAll(".timeline-tick");
  ticks.forEach(t => {
    if (t.attribute("data-round") === selectedRound) {
      t.addClass("selected");
    } else {
      t.removeClass("selected");
    }
  });
  updateArrowButtons();
}

// Regenerate dots when new round selected
function regenerateDots() {
  dotCounts = oblastNames.map(oblast => {
    for (let i = 0; i < table.getRowCount(); i++) {
      let r = table.getRow(i);
      let round = r.getString("Round").trim();
      let name = r.getString("Oblast").trim();

      if (round === selectedRound && name === oblast) {
        let raw = Number(r.getString("Recorded IDPs").replace(/,/g, ''));
        return raw > 0 ? Math.max(1, Math.round(raw / 5000)) : 0;
      }
    }
    return 0;
  });

  allDots = []; // reset all dots

  for (let p = 0; p < polygons.length; p++) {
    let poly = polygons[p];
    let dots = [];

    while (dots.length < dotCounts[p]) {
      let pt = { x: random(width), y: random(height) };
      if (insidePolygon(pt, poly)) {
        dots.push({
          pos: pt,
          vel: { x: random(-0.3, 0.3), y: random(-0.3, 0.3) },
          alpha: random(100,255),
          fadingIn: random([true, false]),
          fadeSpeed: random(0.5, 1.5)
        });
      }
    }

    allDots.push(dots);
  }
}

// Change round upon user clicking button
function changeRound(newRound) {
  selectedRound = newRound;
  console.log("🕒 Round changed to:", selectedRound);
  regenerateDots();

  // update spark graph based on current selectedOblast
  if (spark1) {
    if (selectedOblast === "Total" && oblastData["Total"]) {
      // 👉 If you're in TOTAL view, explicitly pass isTotalView = true
      spark1.updateData(oblastData["Total"].idp, selectedRound, true);
    } else if (oblastData[selectedOblast]) {
      // 👉 Else use oblast-specific data
      spark1.updateData(oblastData[selectedOblast].idp, selectedRound);
    }
  }

  if (spark2) {
    if (selectedOblast === "Total" && oblastData["Total"]) {
      // 👉 If you're in TOTAL view, explicitly pass isTotalView = true
      spark2.updateData(oblastData["Total"].delta, selectedRound, true);
    } else if (oblastData[selectedOblast]) {
      // 👉 Else use oblast-specific data
      spark2.updateData(oblastData[selectedOblast].delta, selectedRound);
    }
  }

  // highlight selected tick
  let ticks = selectAll(".timeline-tick");
  ticks.forEach(t => {
    if (t.attribute("data-round") === newRound) {
      t.addClass("selected");
    } else {
      t.removeClass("selected");
    }
  });

  updateArrowButtons();

  //load round descriptions with geo-specific data
  document.getElementById("round-summary").innerText = roundDescriptions[newRound] || "";

}

// Arrow button to switch between current and previous/next rounds 
function updateArrowButtons() {
  select("#prev-round").elt.disabled = Number(selectedRound) <= 1;
  select("#next-round").elt.disabled = Number(selectedRound) >= 40;
}


// Create oblast data functions to connect to spark graphs
// Also pass data from csv into sparkgraphs
// raw1 = spark graph 1, raw2 = spark graph 2

function createOblastData() {
  oblastNames.forEach(oblast => {

    // oblast-specific
    let idpRounds = new Array(40).fill(0); // stoe IDP data round over round
    let deltaRounds = new Array(40).fill(0); // store change in IDP round over round 
  

    for (let i = 0; i < table.getRowCount(); i++) {
      let r = table.getRow(i);
      let round = Number(r.getString("Round").trim());
      let name = r.getString("Oblast").trim();

      if (name === oblast) {
        let raw1 = Number(r.getString("Recorded IDPs").replace(/,/g, ''));
        idpRounds[round - 1] = raw1; 
 
        let raw2 = r.getString("% change from last round").trim();
        if (raw2){
          let percentage = parseFloat(raw2.replace('%','')) / 100;
          deltaRounds[round - 1] = percentage;
        }
      }
    }

    oblastData[oblast] = {
      idp: idpRounds,
      delta: deltaRounds
    };
  });

  // Total
  let totalIDPRounds = new Array(40).fill(0); // store IDP data for total
  let totalDeltaRounds = new Array(40).fill(0); // store change in IDP delta data for total

  for (let i = 0; i < table.getRowCount(); i++) {
    let r = table.getRow(i);
    let round = Number(r.getString("Round").trim());
    let name = r.getString("Oblast").trim();
    let raw1 = Number(r.getString("Recorded IDPs").replace(/,/g, ''));
    let raw2 = r.getString("% change from last round").trim();


    if (round >= 1 && round <= 40 && name === "Total") {
      totalIDPRounds[round - 1] = raw1;

      if (raw2) {
        let percentage = parseFloat(raw2.replace('%',''))/100;
        totalDeltaRounds[round - 1] = percentage
      }
    }
  }

  oblastData["Total"] = {
    idp: totalIDPRounds,
    delta: totalDeltaRounds
  };
}


// wrap mousePressed() inside function so update only happens on click vs. every frame
function mousePressed() {
  let clickedOblast = -1;

  // Check if the user clicked inside any oblast
  for (let p = 0; p < polygons.length; p++) {
    if (insidePolygon({ x: mouseX, y: mouseY }, polygons[p])) {
      clickedOblast = p;
      break;
    }
  }

  if (clickedOblast !== -1) {
    let clickedOblastName = oblastNames[clickedOblast];

    updateSparkTitle(clickedOblastName);

    if (clickedOblast === clickedIndex) {
      // ✨ Clicked same oblast again → unselect
      console.log("🛠️ Unclicking oblast:", clickedOblastName);
      selectedOblast = "Total";
      clickedIndex = -1;
      if (spark1) {
        spark1.updateData(oblastData["Total"].idp, selectedRound, true);
      }
      if (spark2) {
        spark2.updateData(oblastData["Total"].delta, selectedRound, true);
      }
      updateSparkTitle("Total");

    } else {
      // ✨ Clicked a new oblast
      console.log("🛠️ New oblast selected:", clickedOblastName);
      selectedOblast = clickedOblastName;
      clickedIndex = clickedOblast;
      if (spark1) {
        spark1.updateData(oblastData[selectedOblast].idp, selectedRound, false);
      }
      if (spark2) {
        spark2.updateData(oblastData[selectedOblast].delta, selectedRound, false);
      }
    }
  }
}

// Function to update title for first spark graph
function updateSparkTitle(oblastName) {
  if (oblastName === "Total") {
    document.getElementById('spark-master-text').innerHTML = "Showing All Tracked Oblasts";
  } else{
  document.getElementById('spark-master-text').innerHTML = `Selected: ${oblastName} Oblast`;
  }
}

// Custom labels for timeline
const roundLabels = { // come back to make dynamic
  1: 'MID MAR 2022',
  2: 'END MAR 2022',
  3: 'MID APR 2022',
  4: 'END MAY 2022',
  5: 'MID JUN 2022',
  6: 'LATE JUN 2022',
  7: 'MID JUL 2022',
  8: 'LATE JUL 2022',
  9: 'EARLY AUG 2022',
  10: 'MID AUG 2022',
  11: 'END AUG 2022',
  12: 'MID SEP 2022',
  13: 'END SEP 2022',
  14: 'MID OCT 2022',
  15: 'LATE OCT 2022',
  16: 'MID NOV 2022',
  17: 'LATE NOV 2022',
  18: 'MID DEC 2022',
  19: 'LATE DEC 2022',
  20: 'END JAN 2023',
  21: 'END FEB 2024',
  22: 'END MAR 2023',
  23: 'END APR 2023',
  24: 'END MAY 2023',
  25: 'END JUN 2023',
  26: 'END JUL 2023',
  27: 'END AUG 2023',
  28: 'END SEP 2023',
  29: 'END OCT 2023',
  30: 'END NOV 2023',
  31: 'END DEC 2023',
  32: 'END JAN 2024',
  33: 'END FEB 2024',
  34: 'END MAR 2024',
  35: 'END APR 2024',
  36: 'END JUN 2024',
  37: 'END AUG 2024',
  38: 'END OCT 2024',
  39: 'END DEC 2024',
  40: 'END FEB 2025' // make this max round dynamically push into other areas of code
}

// Custom geographic data
const roundDescriptions = { // come back to make dynamic
1: 'IDPs tracked in: 1 Oblast | 6 Raions | 15 Hromadas',
2: 'IDPs tracked in: 2 Oblasts (1 new) | 12 Raions (6 new) | 42 Hromadas (27 new)',
3: 'IDPs tracked in: 8 Oblasts (6 new) | 39 Raions (27 new) | 310 Hromadas (268 new)',
4: 'IDPs tracked in: 9 Oblasts (1 new) | 43 Raions (4 new) | 521 Hromadas (211 new)',
5: 'IDPs tracked in: 13 Oblasts (4 new) | 63 Raions (20 new) | 728 Hromadas (207 new)',
6: 'IDPs tracked in: 18 Oblasts (5 new) | 89 Raions (26 new) | 888 Hromadas (160 new)',
7: 'IDPs tracked in: 19 Oblasts (1 new) | 94 Raions (5 new) | 879 Hromadas (9 fewer)',
8: 'IDPs tracked in: 19 Oblasts (even) | 94 Raions (even) | 836 Hromadas (43 fewer)',
9: 'IDPs tracked in: 19 Oblasts (even) | 94 Raions (even) | 914 Hromadas (78 new)',
10: 'IDPs tracked in: 21 Oblasts (2 new) | 106 Raions (12 new) | 954 Hromadas (40 new)',
11: 'IDPs tracked in: 21 Oblasts (even) | 106 Raions (even) | 946 Hromadas (8 fewer)',
12: 'IDPs tracked in: 21 Oblasts (even) | 106 Raions (even) | 994 Hromadas (48 new)',
13: 'IDPs tracked in: 21 Oblasts (even) | 106 Raions (even) | 993 Hromadas (1 fewer)',
14: 'IDPs tracked in: 21 Oblasts (even) | 106 Raions (even) | 979 Hromadas (14 fewer)',
15: 'IDPs tracked in: 21 Oblasts (even) | 106 Raions (even) | 998 Hromadas (19 new)',
16: 'IDPs tracked in: 21 Oblasts (even) | 106 Raions (even) | 982 Hromadas (16 fewer)',
17: 'IDPs tracked in: 21 Oblasts (even) | 106 Raions (even) | 931 Hromadas (51 fewer)',
18: 'IDPs tracked in: 22 Oblasts (1 new) | 109 Raions (3 new) | 948 Hromadas (17 new)',
19: 'IDPs tracked in: 22 Oblasts (even) | 111 Raions (2 new) | 940 Hromadas (8 fewer)',
20: 'IDPs tracked in: 23 Oblasts (1 new) | 107 Raions (4 fewer) | 967 Hromadas (27 new)',
21: 'IDPs tracked in: 23 Oblasts (even) | 109 Raions (2 new) | 999 Hromadas (32 new)',
22: 'IDPs tracked in: 23 Oblasts (even) | 109 Raions (even) | 933 Hromadas (66 fewer)',
23: 'IDPs tracked in: 23 Oblasts (even) | 108 Raions (1 fewer) | 984 Hromadas (51 new)',
24: 'IDPs tracked in: 23 Oblasts (even) | 108 Raions (even) | 1039 Hromadas (55 new)',
25: 'IDPs tracked in: 23 Oblasts (even) | 108 Raions (even) | 1039 Hromadas (even)',
26: 'IDPs tracked in: 23 Oblasts (even) | 108 Raions (even) | 1039 Hromadas (even)',
27: 'IDPs tracked in: 23 Oblasts (even) | 108 Raions (even) | 1039 Hromadas (even)',
28: 'IDPs tracked in: 23 Oblasts (even) | 108 Raions (even) | 1039 Hromadas (even)',
29: 'IDPs tracked in: 23 Oblasts (even) | 108 Raions (even) | 1039 Hromadas (even)',
30: 'IDPs tracked in: 23 Oblasts (even) | 108 Raions (even) | 1039 Hromadas (even)',
31: 'IDPs tracked in: 23 Oblasts (even) | 108 Raions (even) | 1039 Hromadas (even)',
32: 'IDPs tracked in: 23 Oblasts (even) | 108 Raions (even) | 1098 Hromadas (59 new)',
33: 'IDPs tracked in: 23 Oblasts (even) | 108 Raions (even) | 1098 Hromadas (even)',
34: 'IDPs tracked in: 23 Oblasts (even) | 108 Raions (even) | 1098 Hromadas (even)',
35: 'IDPs tracked in: 23 Oblasts (even) | 108 Raions (even) | 1098 Hromadas (even)',
36: 'IDPs tracked in: 23 Oblasts (even) | 108 Raions (even) | 1098 Hromadas (even)',
37: 'IDPs tracked in: 23 Oblasts (even) | 108 Raions (even) | 1098 Hromadas (even)',
38: 'IDPs tracked in: 23 Oblasts (even) | 108 Raions (even) | 1098 Hromadas (even)',
39: 'IDPs tracked in: 23 Oblasts (even) | 108 Raions (even) | 1098 Hromadas (even)',
40: 'IDPs tracked in: 23 Oblasts (even) | 108 Raions (even) | 1098 Hromadas (even)',
}




