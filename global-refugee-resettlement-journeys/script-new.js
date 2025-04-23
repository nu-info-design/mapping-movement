const w = visualViewport.width,
      h = visualViewport.height;

      const rootRom = d3.select("#plot");
      const svg = rootRom.append("svg")
        .attr("width", w)
        .attr("height", h);
      
      // 👇 Add this block right after the SVG is created
      const defs = svg.append("defs");
      const filter = defs.append("filter").attr("id", "text-halo");
      
      filter.append("feMorphology")
          .attr("in", "SourceAlpha")
          .attr("operator", "dilate")
          .attr("radius", 4)
          .attr("result", "expanded");
      
      filter.append("feFlood")
          .attr("flood-color", "white")
          .attr("result", "white-fill");
      
      filter.append("feComposite")
          .attr("in", "white-fill")
          .attr("in2", "expanded")
          .attr("operator", "in")
          .attr("result", "halo");
      
      const merge = filter.append("feMerge");
      merge.append("feMergeNode").attr("in", "halo");
      merge.append("feMergeNode").attr("in", "SourceGraphic");      

const g = svg.append("g")
  .attr("transform", `translate(${w / 3}, 310)`);

// captions for each country of origin 
const captions = {
  "Afghanistan": "Refugees have fled Afghanistan due to ongoing armed conflict, the Taliban's control, and economic collapse. The most significant increase in displacement occurred after the Taliban’s 2021 takeover, with many fearing persecution based on political beliefs, ethnicity, and gender. (Source: United Nations High Commissioner for Refugees (UNHCR), Human Rights Watch (HRW), BBC)",
    "Burundi": "Refugees have fled Burundi as a result of political violence, human rights violations, and ethnic tension after the 2015 presidential election, which led to the repression of opposition groups and widespread insecurity. (Source: United Nations High Commissioner for Refugees (UNHCR), Amnesty International, Human Rights Watch (HRW))",
    "Central African Republic": "Refugees have fled the Central African Republic due to the ongoing civil war, which has raged since 2013 between armed groups with religious and ethnic motivations, leading to widespread violence, displacement, and humanitarian crises. (Source: United Nations High Commissioner for Refugees (UNHCR), BBC, Human Rights Watch (HRW))",
    "DR Congo": "Refugees have fled the Democratic Republic of the Congo due to armed conflict, political instability, and widespread violence by armed groups, particularly in the eastern provinces, where ethnic-based violence and resource-related conflicts have caused significant suffering. (Source: United Nations High Commissioner for Refugees (UNHCR), Human Rights Watch (HRW))",
    "Colombia": "Refugees have fled Colombia due to decades-long internal armed conflict between the Colombian government, guerrilla groups, and paramilitaries, with mass displacement caused by violence, drug trafficking, and attacks on rural populations. Although peace agreements were signed, displacement persists due to residual violence. (Source: United Nations High Commissioner for Refugees (UNHCR), Human Rights Watch (HRW))",
    "Cuba": "Refugees have fled Cuba due to political repression, economic hardship, and the lack of political freedoms. Continued economic struggles and political restrictions have prompted many to seek refuge abroad in recent years. (Source: United Nations High Commissioner for Refugees (UNHCR), Human Rights Watch (HRW))",
    "Eritrea": "Refugees have fled Eritrea due to ongoing human rights abuses, mandatory military conscription, forced labor, and political repression. This has led to a significant refugee outflow since the 1990s, and the situation remains a current issue. (Source: United Nations High Commissioner for Refugees (UNHCR), Amnesty International, Human Rights Watch (HRW))",
    "Ethiopia": "Refugees have fled Ethiopia due to armed conflicts, particularly the Tigray conflict since 2020, along with ethnic violence and political repression, resulting in significant refugee movements. (Source: United Nations High Commissioner for Refugees (UNHCR), BBC, Human Rights Watch (HRW))",
    "Palestinian": "Refugees have fled the Palestinian Territories due to the ongoing Israeli-Palestinian conflict and displacement caused by Israeli restrictions. Many Palestinian refugees have been displaced multiple times over the decades, starting in 1948. (Source: United Nations High Commissioner for Refugees (UNHCR), Human Rights Watch (HRW))",
    "Guatemala": "Refugees have fled Guatemala due to violence from organized crime, political instability, and economic hardship, particularly because of drug cartels and gang-related violence in recent years. (Source: United Nations High Commissioner for Refugees (UNHCR), Human Rights Watch (HRW))",
    "Haiti": "Refugees have fled Haiti due to political instability, economic hardship, natural disasters (such as the 2010 earthquake), and escalating gang violence in the country. (Source: United Nations High Commissioner for Refugees (UNHCR), Human Rights Watch (HRW))",
    "Honduras": "Refugees have fled Honduras due to drug cartel violence, gang violence, political instability, and widespread poverty, especially since the mid-2000s. (Source: United Nations High Commissioner for Refugees (UNHCR), Human Rights Watch (HRW))",
    "Iran": "Refugees have fled Iran due to political repression, religious persecution, and human rights abuses, particularly after the 1979 revolution and the subsequent suppression of political dissent. (Source: United Nations High Commissioner for Refugees (UNHCR), Human Rights Watch (HRW))",
    "Iraq": "Refugees have fled Iraq due to the 2003 U.S.-led invasion, the rise of ISIS, and ongoing political instability and sectarian violence. (Source: United Nations High Commissioner for Refugees (UNHCR), Human Rights Watch (HRW))",
    "Myanmar": "Refugees have fled Myanmar due to political oppression, ethnic violence (particularly against the Rohingya), and military crackdowns, with the 2021 military coup intensifying the crisis. (Source: United Nations High Commissioner for Refugees (UNHCR), Amnesty International, Human Rights Watch (HRW))",
    "Nicaragua": "Refugees have fled Nicaragua due to political unrest, the repression of dissent, and violent government crackdowns, particularly since 2018. (Source: United Nations High Commissioner for Refugees (UNHCR), Human Rights Watch (HRW))",
    "Nigeria": "Refugees have fled Nigeria due to armed conflict with Boko Haram, internal ethnic violence, and communal conflicts in the north and central regions, causing widespread displacement. (Source: United Nations High Commissioner for Refugees (UNHCR), Human Rights Watch (HRW))",
    "Pakistan": "Refugees have fled Pakistan due to the conflict with the Taliban, especially in the northwest tribal areas, and the subsequent military operations. (Source: United Nations High Commissioner for Refugees (UNHCR), Human Rights Watch (HRW))",
    "Rwanda": "Refugees have fled Rwanda following the 1994 genocide and its aftermath, as well as political repression and instability in the country. (Source: United Nations High Commissioner for Refugees (UNHCR), BBC, Human Rights Watch (HRW))",
    "El Salvador": "Refugees have fled El Salvador due to violence from organized crime, including drug cartels and gang violence, as well as political instability. (Source: United Nations High Commissioner for Refugees (UNHCR), Human Rights Watch (HRW))",
    "Somalia": "Refugees have fled Somalia due to political instability, armed conflict, terrorist violence, and recurring famine and drought. (Source: United Nations High Commissioner for Refugees (UNHCR), Human Rights Watch (HRW))",
    "Vietnam": "Refugees have fled Vietnam due to political repression, economic hardships, and limited freedoms, especially affecting ethnic minorities and dissidents. (Source: United Nations High Commissioner for Refugees (UNHCR), Human Rights Watch (HRW))",
    "South Sudan": "Refugees have fled South Sudan due to armed conflict, ethnic violence, and the lack of political stability since the country’s independence in 2011. (Source: United Nations High Commissioner for Refugees (UNHCR), BBC, Human Rights Watch (HRW))",
    "Sudan": "Refugees have fled Sudan due to ongoing conflict in Darfur, political instability, and recent civil conflict in South Kordofan and Blue Nile. (Source: United Nations High Commissioner for Refugees (UNHCR), Human Rights Watch (HRW))",
    "Syria": "Refugees have fled Syria due to the 2011 civil war, involving multiple foreign powers, the rise of extremist groups, and a large-scale humanitarian crisis. (Source: United Nations High Commissioner for Refugees (UNHCR), BBC, Human Rights Watch (HRW))",
    "Venezuela": "Refugees have fled Venezuela due to economic collapse, political instability, and a deteriorating humanitarian situation, with the crisis worsening in recent years. (Source: United Nations High Commissioner for Refugees (UNHCR), Human Rights Watch (HRW))",
    "Yemen": "Refugees have fled Yemen due to the ongoing civil war since 2015, compounded by airstrikes, famine, and widespread humanitarian suffering. (Source: United Nations High Commissioner for Refugees (UNHCR), BBC, Human Rights Watch (HRW))"
};

Promise.all([
  d3.csv("data/circles_scaled_df.csv"),
  d3.csv("data/resettlement_df.csv")
]).then(([circlesScaled, resettlementData]) => {

  // trim whitespace
  resettlementData.forEach(d => {
    d.origin = d.origin.trim();
    d.dest_a = d.dest_a.trim();
    d.dest_b = d.dest_b.trim();
  });
  circlesScaled.forEach(d => d.country = d.country.trim());

  // dropdown
  const origins = Array.from(new Set(resettlementData.map(d => d.origin)));
  const dropdown = d3.select("#countrySelect");

  // updateVisualization(resettlementData, circlesScaled, "Afghanistan")

  dropdown.append("option")
    .attr("value", "")
    .attr("selected", true)
    .text("Select a country");

  dropdown.selectAll("option.country-option")
    .data(origins)
    .enter().append("option")
      .attr("class", "country-option")
      .attr("value", d => d)
      .text(d => d);

  dropdown.on("change", function () {
    const selectedCountry = this.value;
    updateVisualization(resettlementData, circlesScaled, selectedCountry);

    const captionText = captions[selectedCountry] || "No caption available.";
    d3.select("#caption").text(captionText);
  });
});


function updateVisualization(resettlementData, circlesScaled, selectedCountry) {
  g.selectAll("*").remove();

  const countryData = resettlementData.filter(d => d.origin === selectedCountry);
  const countryTree = getResettlement(countryData);

  const countryPositions = Object.keys(countryTree).map(key => {
    const d = countryTree[key];
    const pt = getRadialPos(d.col, d.row);
    const c = circlesScaled.find(x => x.country === key);
    return {
      country: key,
      col: d.col,
      row: d.row,
      x: pt.x,
      y: pt.y,
      area_scaled: c?.area_scaled || 0,
      total_movement: c?.total_movement || 0
    };
  });

  drawLines(g, countryData, countryPositions);

  // circles
  g.selectAll(`.country-${selectedCountry}`)
    .data(countryPositions)
    .join("circle")
      .attr("class", `country-${selectedCountry}`)
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("r", d => Math.sqrt(d.area_scaled) * 0.6)
      .attr("fill", d => d.col === 0 ? "#8DB1AB" : d.col === 1 ? "#8DB1AB" : "#987197")
      .attr("stroke", d => d.col === 0 ? "#8DB1AB" : "#987197")
      .attr("stroke-width", 1.5)
      .on("mouseover", function(event, d) {
        d3.selectAll(".link-line")
          .filter(function() {
            const s = d3.select(this).attr("data-source"),
                  t = d3.select(this).attr("data-target");
            return s === d.country || t === d.country;
          })
          .transition().duration(150).style("opacity", 1);

        d3.selectAll(".line-group")
          .filter(function() {
            const grp = d3.select(this),
                  s = grp.attr("data-source"),
                  t = grp.attr("data-target");
            return s === d.country || t === d.country;
          })
          .selectAll(".flow-label, .flow-label-bg")
          .transition().duration(150).style("opacity", 1);
      })
      .on("mouseout", function() {
        d3.selectAll(".link-line")
          .transition().duration(150).style("opacity", 0.1);

        d3.selectAll(".flow-label, .flow-label-bg")
          .transition().duration(150).style("opacity", 0);
      });

  // labels
  g.selectAll(`.countryLbl-${selectedCountry}`)
    .data(countryPositions)
    .join("text")
      .attr("class", `countryLbl-${selectedCountry}`)
      .attr("x", d => d.x)
      .attr("y", d => d.y + 22)
      .text(d => d.country)
      .style("font-size", "12px")
      .attr("text-anchor", "middle");
}


// functions

// build col/row positions
function getResettlement(data) {
  const level0 = data[0].origin;
  const level1 = [...new Set(data.map(d => d.dest_a))].sort();
  const level2 = [...new Set(data.map(d => d.dest_b))].sort();

  const pos = { [level0]: { col:0, row:0 } };
  level1.forEach((n,i)=> pos[n] = { col:1, row:i });
  level2.forEach((n,i)=> pos[n] = { col:2, row:i });
  return pos;
}

// polar coords
function getRadialPos(col, row, radiusStep=200, angleStep=12, startAngle=-45) {
  const r = col * radiusStep;
  const θ = (Math.PI/180)*(startAngle + row*angleStep);
  return { x: r*Math.cos(θ), y: r*Math.sin(θ) };
}

// lines
function getStrokeWidth(flow) {
  const bins = [1,5,21,98,450,2074,9551,Infinity];
  const widths = [0.5,1.1,1.8,2.6,3.7,5];
  for(let i=0;i<widths.length;i++){
    if(flow>=bins[i]&&flow< bins[i+1]) return widths[i];
  }
  return 2;
}

function getControlPoint(start, end, invert=false, offsetFactor=0.2) {
  const mid = { x:(start.x+end.x)/2, y:(start.y+end.y)/2 };
  const dx = end.x - start.x, dy = end.y - start.y;
  const dist = Math.hypot(dx,dy), offset=dist*offsetFactor;
  let perp = { x:-dy, y:dx };
  const len = Math.hypot(perp.x, perp.y);
  if(len){ perp.x/=len; perp.y/=len; }
  return {
    x: mid.x + (invert?-perp.x:perp.x)*offset,
    y: mid.y + (invert?-perp.y:perp.y)*offset
  };
}

function getQuadraticBezierMidPoint(start, control, end) {
  return {
    x:0.25*start.x + 0.5*control.x + 0.25*end.x,
    y:0.25*start.y + 0.5*control.y + 0.25*end.y
  };
}

function drawCurvedLine(g, start, end, color, strokeWidth, invert=false, source="", target="") {
  const control = getControlPoint(start,end,invert);
  const pathData = `M${start.x},${start.y} Q${control.x},${control.y} ${end.x},${end.y}`;
  return g.append("path")
    .attr("d", pathData)
    .attr("fill","none")
    .attr("stroke",color)
    .attr("stroke-width",strokeWidth)
    .attr("data-source",source)
    .attr("data-target",target)
    .classed("link-line",true)
    .style("opacity",0.1);
}

function drawLines(g, data, positions) {
  const padding = 2;
  data.forEach(row => {
    const origin = positions.find(d => d.country === row.origin);
    const destA  = positions.find(d => d.country === row.dest_a);
    const destB  = positions.find(d => d.country === row.dest_b);

    const ptO = getRadialPos(origin.col, origin.row),
          ptA = getRadialPos(destA.col,   destA.row),
          ptB = getRadialPos(destB.col,   destB.row);

    const wA = getStrokeWidth(row.flow_a),
          wB = getStrokeWidth(row.flow_b);

    // A‑group
    const grpA = g.append("g")
      .attr("class","line-group")
      .attr("data-source",row.origin)
      .attr("data-target",row.dest_a);

    const pathA    = drawCurvedLine(grpA, ptO, ptA, '#8DB1AB', wA, true, row.origin, row.dest_a);
    const controlA = getControlPoint(ptO,ptA,true);
    const midA     = getQuadraticBezierMidPoint(ptO,controlA,ptA);

    grpA.append("text")
      .attr("class","flow-label")
      .attr("x", midA.x).attr("y", midA.y)
      .attr("text-anchor","middle")
      .attr("font-size", 12)
      .attr("filter", "url(#text-halo)") 
      .text(row.flow_a)
      .style("opacity",0);

    grpA.on("mouseover", () => {
        pathA.transition().duration(150).style("opacity",1);
        grpA.selectAll(".flow-label")
            .transition().duration(150).style("opacity",1);
      })
      .on("mouseout", () => {
        pathA.transition().duration(150).style("opacity",0.1);
        grpA.selectAll(".flow-label")
            .transition().duration(150).style("opacity",0);
      });

    // B‑group
    const grpB = g.append("g")
      .attr("class","line-group")
      .attr("data-source",row.dest_a)
      .attr("data-target",row.dest_b);

    const pathB    = drawCurvedLine(grpB, ptA, ptB, '#987197', wB, false, row.dest_a, row.dest_b);
    const controlB = getControlPoint(ptA,ptB,false);
    const midB     = getQuadraticBezierMidPoint(ptA,controlB,ptB);

    grpB.append("text")
      .attr("class","flow-label")
      .attr("x", midB.x).attr("y", midB.y)
      .attr("text-anchor","middle")
      .attr("font-size", 12)
      .attr("filter", "url(#text-halo)")
      .text(row.flow_b)
      .style("opacity",0);

    grpB.on("mouseover", () => {
        pathB.transition().duration(150).style("opacity",1);
        grpB.selectAll(".flow-label")
            .transition().duration(150).style("opacity",1);
      })
      .on("mouseout", () => {
        pathB.transition().duration(150).style("opacity",0.1);
        grpB.selectAll(".flow-label")
            .transition().duration(150).style("opacity",0);
      });
  });
}
