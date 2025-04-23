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
  d3.csv("data/daily_timeline.csv", d3.autoType)  // autoType = smart parse numbers/dates
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
  const startDate = new Date(dataset[0].day);
  const endDate = new Date(dataset[dataset.length - 1].day);
  d3.select('#current-date')
    .text(d3.timeFormat("%b %d, %Y")(startDate));

  // Replace Dummy Data
  const INDUSTRIES = [
    { key: "STEM", colorIndex: 0 },
    { key: "SocSciLaw", colorIndex: 1 },
    { key: "MedEd", colorIndex: 2 },
    { key: "Arts", colorIndex: 3 },
    { key: "Business", colorIndex: 4 },
    { key: "Religion", colorIndex: 5 },
    { key: "Misc", colorIndex: 6 },
  ];

  const ENTRIES_PER_DOT = 1500;  // One dot per 5,000 entries

  const data = [];
  dataset.forEach(d => {
    INDUSTRIES.forEach(({ key, colorIndex }) => {
      const count = Math.floor(d[key] / ENTRIES_PER_DOT);
      for (let i = 0; i < count; i++) {
        data.push({
          finish: d.day,
          industry: key,
          colorIndex: colorIndex
        });
      }
    });
  });



  const widthHover = 800, heightHover = 800;
  const margin = { top: 50, right: 30, bottom: 50, left: 100 };

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

  // Clusters
  function generateClusterSpheres(data, perRow = 3, clusterSpacing = 300) {
    const layout = [];
    const groups = d3.group(data, d => d.industry);
    const industryKeys = Array.from(groups.keys());

    let i = 0;
    industryKeys.forEach((industry, index) => {
      const cluster = groups.get(industry);
      const clusterColor = cluster[0].colorIndex;  // force consistent color

      const clusterLayout = generateSphereLayout(cluster.length, 0, 0);
      const col = index % perRow;
      const row = Math.floor(index / perRow);

      const offsetX = col * clusterSpacing;
      const offsetY = row * clusterSpacing;

      clusterLayout.forEach((pos, j) => {
        const dot = cluster[j];
        dot.__newLayout = {
          x: pos.x + offsetX - 200,
          y: pos.y + offsetY - 100,
        };
        dot.colorIndex = clusterColor;
        layout.push(dot);
      });
    });

    return layout;
  }



  // Beeswarm layout generator (horizontal rows by industry)
  function generateBeeswarmLayout(data, rowSpacing = 30, dotSpacing = 6) {
    const layout = [];
    const groups = d3.group(data, d => d.industry);
    const industryOrder = Array.from(groups.keys());
    const yScale = d3.scaleBand()
      .domain(industryOrder)
      .range([0, industryOrder.length * rowSpacing])
      .padding(0.2);

    groups.forEach((group, industry) => {
      // Sort is optional; keep if you want chronological fill
      group.sort((a, b) => a.finish - b.finish);

      const y = yScale(industry);
      group.forEach((d, i) => {
        layout.push({
          x: i * dotSpacing,
          y: y,
          industry: industry,
          colorIndex: d.colorIndex  // preserve original color
        });
      });
    });
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

  // Toggle clustered layout (beeswarm or sphere)
  d3.select("#toggle-layout").on("click", () => {
    isClustered = !isClustered;

    if (isClustered) {
      const beeswarmLayout = generateBeeswarmLayout(positionedData);
      beeswarmLayout.forEach((pos, i) => {
        positionedData[i].__newLayout = {
          x: pos.x - 200,
          y: pos.y - 100,
          colorIndex: pos.colorIndex
        };
      });
    } else {
      const layout = generateSphereLayout(positionedData.length, 0, 0);
      layout.forEach((pos, i) => {
        positionedData[i].__newLayout = {
          x: pos.x,
          y: pos.y
        };
      });
    }

    // Apply the new layout
    positionedData.forEach(d => {
      d.x = d.__newLayout.x;
      d.y = d.__newLayout.y;
    });

    entries.transition()
      .duration(800)
      .attr("x", d => d.x)
      .attr("y", d => d.y);

    // Remove any old labels
    svg.selectAll(".industry-label").remove();

    // Add industry row labels only in beeswarm mode
    if (isClustered) {
      const industryOrder = Array.from(new Set(positionedData.map(d => d.industry)));
      const yScale = d3.scaleBand()
        .domain(industryOrder)
        .range([0, industryOrder.length * 30])
        .padding(0.2);

      svg.selectAll(".industry-label")
        .data(industryOrder)
        .enter()
        .append("text")
        .attr("class", "industry-label")
        .attr("x", 20)
        .attr("y", d => yScale(d) + 450) // match group transform
        .attr("dy", "0.35em")
        .attr("text-anchor", "start")
        .style("font-size", "12px")
        .style("fill", "#aaa")
        .text(d => d);
    }
  });


  // Toggle layout into mini spheres per industry
  let isClusterSpheres = false;

  d3.select("#toggle-cluster").on("click", () => {
    isClusterSpheres = !isClusterSpheres;

    const clusterLayout = generateClusterSpheres(positionedData);

    clusterLayout.forEach((pos, i) => {
      positionedData[i].__newLayout = {
        x: pos.x - 200,  // adjust centering if needed
        y: pos.y - 100
      };
    });

    positionedData.forEach((d, i) => {
      d.x = d.__newLayout.x;
      d.y = d.__newLayout.y;
    });

    entries.transition()
      .duration(800)
      .attr("x", d => d.x)
      .attr("y", d => d.y);

    // Remove any beeswarm labels
    svg.selectAll(".industry-label").remove();

    positionedData.forEach((d, i) => {
      d.x = d.__newLayout.x;
      d.y = d.__newLayout.y;
    });

    entries.transition()
      .duration(800)
      .attr("x", d => d.x)
      .attr("y", d => d.y);

    // Remove any old labels
    svg.selectAll(".industry-label").remove();

    // Add industry row labels
    const industryOrder = Array.from(new Set(positionedData.map(d => d.industry)));
    const yScale = d3.scaleBand()
      .domain(industryOrder)
      .range([0, industryOrder.length * 30])
      .padding(0.2);

    svg.selectAll(".industry-label")
      .data(industryOrder)
      .enter()
      .append("text")
      .attr("class", "industry-label")
      .attr("x", 20)
      .attr("y", d => yScale(d) + 450) // adjust `450` to match translate offset
      .attr("dy", "0.35em")
      .attr("text-anchor", "start")
      .style("font-size", "12px")
      .style("fill", "#aaa")
      .text(d => d);

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
    if (!match) return;

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
    });
  }

  // New: updateDots based on ringIndex and hover progress
  function updateDots(currentDate) {
    entries.attr("fill", d => {
      return d.finish <= currentDate
        ? activeColors[d.colorIndex]
        : "grey";
    });
  }

}

