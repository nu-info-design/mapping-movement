const activeColors = [
    "rgb(85, 85, 215)",   // .one
    "#008080",            // .two
    "#2e8b57",            // .three
    "#ffa500",            // .four
    "rgb(242, 176, 176)", // .five
    "#b263f2",             // .six
    "lightblue"                 // .seven
  ];

  
  // Load Data
  const parseDate = d3.timeParse("%-m/%-d/%y");  // For dates like 4/4/23 

  let dataset =
    d3.csv("../data/daily_timeline.csv", d3.autoType)  // autoType = smart parse numbers/dates
      .then(data => {
        data.forEach(d => {
          d.day = parseDate(d.day);
          d.day.setHours(0, 0, 0, 0);  // strip time
        });

        dataset = data;  // Store for global access
        console.log("Loaded data:", dataset);
  
        init();  // Now that data is loaded, call your main function
      });
  
  function init() {
    // Set dates based on first and last date in the dataset
    // const startDate = new Date("2023-06-01");
    // const endDate = new Date("2024-06-01");
    const startDate = new Date(dataset[0].day);
    const endDate = new Date(dataset[dataset.length-1].day);
    d3.select('#current-date')
      .text(d3.timeFormat("%b %d, %Y")(startDate));

    // Dummy Data
    const data = d3.range(8000).map(() => ({
      finish: new Date(+startDate + Math.random() * (endDate - startDate))
    }));

    const widthHover = 800, heightHover = 800;
    const margin = { top: 50, right: 30, bottom: 50, left: 30 };
  
    const container = d3.select("#timeline-container");
  
    const svg = container.append("svg")
      .attr("width", widthHover)
      .attr("height", heightHover);
  
    const xScale = d3.scaleTime()
      .domain([startDate, endDate])
      .range([margin.left, widthHover - margin.right]);
  
    const xAxis = d3.axisBottom(xScale)
      .ticks(d3.timeMonth.every(1))
      .tickFormat(d3.timeFormat("%b"));
  
    svg.append("g")
      .attr("transform", `translate(0, ${margin.top + 5})`)
      .call(xAxis)
      .selectAll("text")
      .attr("transform", "rotate(0)")
      .style("text-anchor", "middle");
  
    const squareSize = 3;
    const spacing = 7;
    let isClustered = false;
  
    // Sphere layout generator
    function generateSphereLayout(points, centerX, centerY) {
      let gridCount = Math.ceil(Math.sqrt(points));
      let layout = [];
  
      while (layout.length < points) {
        layout = [];
        const totalSize = spacing * (gridCount - 1);
        for (let row = 0; row < gridCount; row++) {
          for (let col = 0; col < gridCount; col++) {
            const cx = col * spacing - totalSize / 2;
            const cy = row * spacing - totalSize / 2;
            const distance = Math.sqrt(cx * cx + cy * cy);
            if (distance < totalSize / 2) {
              layout.push({
                x: centerX + cx - squareSize / 2,
                y: centerY + cy - squareSize / 2
              });
              if (layout.length >= points) break;
            }
          }
          if (layout.length >= points) break;
        }
        gridCount++;
      }
      return layout;
    }
  
    // Initial single sphere layout
    let positionedData = data.map((d, i) => ({
      ...d,
      ...generateSphereLayout(data.length, 0, 0)[i]
    }));
  
    // Compute ringIndex for each dot based on distance
    const maxDistance = d3.max(positionedData, d => Math.sqrt(d.x * d.x + d.y * d.y));
  
    positionedData.forEach(d => {
      const distance = Math.sqrt(d.x * d.x + d.y * d.y);
      d.ringIndex = Math.floor((distance / maxDistance) * activeColors.length);
    });
  
    const entriesSphere = svg.append("g")
      .attr("transform", `translate(350, 450)`);
  
    const entries = entriesSphere.selectAll("rect")
      .data(positionedData)
      .enter()
      .append("rect")
      .attr("x", d => d.x)
      .attr("y", d => d.y)
      .attr("width", squareSize)
      .attr("height", squareSize)
      .attr("fill", "grey");
  
    // Toggle clustered layout (unchanged from yours)
    d3.select("#toggle-layout").on("click", () => {
      isClustered = !isClustered;
      let newLayout = [];
  
      if (isClustered) {
        const groups = {};
        let uncolored = [];
  
        positionedData.forEach(d => {
          if (d.color) {
            if (!groups[d.color]) groups[d.color] = [];
            groups[d.color].push(d);
          } else {
            uncolored.push(d);
          }
        });
  
        const clusterColors = Object.keys(groups);
        const centerOffsets = [];
  
        clusterColors.forEach((_, i) => {
          const col = i % 3;
          const row = Math.floor(i / 3);
          const clusterSpacingX = 250;
          const clusterSpacingY = 200;
  
          centerOffsets.push({
            x: col * clusterSpacingX - clusterSpacingX,
            y: row * clusterSpacingY - clusterSpacingY
          });
        });
  
        clusterColors.forEach((color, i) => {
          const group = groups[color];
          const center = centerOffsets[i];
          const clusterLayout = generateSphereLayout(group.length, 0, 0);
  
          clusterLayout.forEach((pos, j) => {
            newLayout.push({
              x: pos.x + center.x,
              y: pos.y + center.y
            });
            group[j].__newLayout = newLayout[newLayout.length - 1];
          });
        });
  
        if (uncolored.length > 0) {
          const unclusterLayout = generateSphereLayout(uncolored.length, 0, 0);
          unclusterLayout.forEach((pos, j) => {
            newLayout.push({
              x: pos.x,
              y: pos.y + 200
            });
            uncolored[j].__newLayout = newLayout[newLayout.length - 1];
          });
        }
      } else {
        const layout = generateSphereLayout(data.length, 0, 0);
        layout.forEach((pos, i) => {
          positionedData[i].__newLayout = { x: pos.x, y: pos.y };
        });
      }
  
      positionedData.forEach((d, i) => {
        d.x = d.__newLayout.x;
        d.y = d.__newLayout.y;
      });
  
      entries.transition()
        .duration(800)
        .attr("x", d => d.x)
        .attr("y", d => d.y);
    });
  
    // Hover indicator triangle
    const triangle = svg.append("path")
      .attr("fill", "white")
      .style("pointer-events", "none");
  
    let lastHoveredX = xScale(startDate);
    let lastHoveredDate = startDate;
  
    function drawTriangleAt(x) {
      const triY = margin.top + 20;
      const size = 8;
      const pathD = `M${x},${triY}
                     L${x - size},${triY + size}
                     L${x + size},${triY + size}Z`;
      triangle.attr("d", pathD);
    }
  
    drawTriangleAt(lastHoveredX);
    updateDots(lastHoveredDate);
  
    // HOVER CONTROL HERE
    svg.append("rect")
      .attr("x", margin.left)
      .attr("y", margin.top - 20)
      .attr("width", widthHover - margin.left - margin.right)
      .attr("height", 40)
      .attr("fill", "transparent")
      .on("mousemove", function (event) {
        const [mouseX] = d3.pointer(event);
        const clampedX = Math.max(margin.left, Math.min(mouseX, widthHover - margin.right));
        const currentDate = xScale.invert(clampedX);
  
        lastHoveredX = clampedX;
        lastHoveredDate = currentDate;
  
        drawTriangleAt(clampedX); // Move icon hover to mouse
        updateDots(currentDate);  // Update sphere based on hover date
        updateSideBar(currentDate); // Update sidebar based on hover date
      });
  
    // Update the industries sidebar with percent and actual entries
    function updateSideBar(currentDate) {
      const hovered = new Date(currentDate); // copy
      hovered.setHours(0, 0, 0, 0); // strip time to midnight
      const match = dataset.find(d => d.day.getTime() === hovered.getTime());

      // Update Current Date
      d3.select('#current-date')
      .text(d3.timeFormat("%b %Y")(match.day));

      // Update Accepted and Denied Stats
      d3.select('#accepted-percent')
        .text(match.approved_percent.toFixed(0) + '%');

      d3.select('#accepted-entries')
        .text(`(${match.approved.toLocaleString()} entries)`);

      d3.select('#denied-percent')
        .text(match.denied_percent.toFixed(0) + '%');

      d3.select('#denied-entries')
        .text(`(${match.denied.toLocaleString()} entries)`);


      // Update Text Fields
      const fields = [
        { id: "#stem-entries", key: "STEM", percentKey: "STEM_percent" },
        { id: "#socscilaw-entries", key: "SocSciLaw", percentKey: "SocSciLaw_percent" },
        { id: "#meded-entries", key: "MedEd", percentKey: "MedEd_percent" },
        { id: "#arts-entries", key: "Arts", percentKey: "Arts_percent" },
        { id: "#business-entries", key: "Business", percentKey: "Business_percent" },
        { id: "#religion-entries", key: "Religion", percentKey: "Religion_percent" },
        { id: "#misc-entries", key: "Misc", percentKey: "Misc_percent" },
      ];
      
      fields.forEach(({ id, key, percentKey }) => {
        d3.select(id).text(`${match[key].toLocaleString()} (${match[percentKey].toFixed(2)}%)`);
      }
    )};
  
    // New: updateDots based on ringIndex and hover progress
    function updateDots(currentDate) {
      entries.attr("fill", d => {
        if (d.finish <= currentDate) {
          return activeColors[d.ringIndex]; // Still use ring color
        } else {
          return "grey";
        }
      });
    }
  }