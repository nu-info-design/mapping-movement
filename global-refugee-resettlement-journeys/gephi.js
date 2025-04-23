const width = window.innerWidth;
const height = window.innerHeight;

const scaleFactor = 0.7; // Adjust this scale factor to zoom in or out

// Set up the SVG container
const graphSvg = d3.select("#graph").select("svg").empty()
  ? d3.select("#graph").append("svg")
  : d3.select("#graph svg")
      .attr("width", width)
      .attr("height", height)
      .style("background-color", "transparent");

// Group for the graph
const graphGroup = graphSvg.append("g")
  .attr("transform", `scale(${scaleFactor}) translate(${(1 - scaleFactor) * width / 2}, ${(1 - scaleFactor) * height / 2})`);

// Force simulation
const simulation = d3.forceSimulation()
  .force("link", d3.forceLink().id(d => d.id).distance(200))
  .force("charge", d3.forceManyBody().strength(-250))
  .force("center", d3.forceCenter(width / 2, height / 2));

Promise.all([
  d3.csv("data/nodes.csv"),
  d3.csv("data/edges.csv"),
]).then(([nodesRaw, linksRaw]) => {
  const nodes = nodesRaw
    .filter(d => d.Id)
    .map(d => ({ 
      ...d, 
      id: d.Id.toString(),
      size: parseInt(d.Size) 
    }));

  const links = linksRaw
    .filter(d => d.Source && d.Target)
    .map(d => ({
      source: d.Source.toString(),
      target: d.Target.toString(),
      movement: d.movement,
      weight: parseFloat(d.Weight) // Parse weight for link thickness
    }));

  // Find min and max weight to scale the stroke width
  const weightScale = d3.scaleLinear()
    .domain([d3.min(links, d => d.weight), d3.max(links, d => d.weight)])  // Use the min and max weight
    .range([1, 10]);  // Adjust the range for stroke width (min and max thickness)

  const link = graphGroup.append("g")
    .selectAll(".link")
    .data(links)
    .enter().append("path")
    .attr("class", "link")
    .attr("fill", "none")
    .attr("stroke", d => {
      return d.movement === "Origin to Asylum" ? "#8DB1AB" : 
             d.movement === "Asylum to Resettlement" ? "#987197" : "#999";
    })
    .attr("stroke-width", d => weightScale(d.weight)) // Set the stroke width based on the scaled weight
    .attr("opacity", 0.6); // Initial opacity for links

  // Radial positioning based on country size
  const maxSize = d3.max(nodes, d => d.size);
  const baseRadius = Math.min(width, height) / 3;
  const separationFactor = 1.5;

  nodes.forEach((d, i) => {
    const movementSide = d.movement === "Origin to Asylum" ? -1 : 1;
    const angle = (i / nodes.length) * (2 * Math.PI);
    const adjustedRadius = baseRadius + (d.size / maxSize) * baseRadius;
    const movementRadius = movementSide === -1 ? adjustedRadius : adjustedRadius * separationFactor;

    d.x = width / 2 + movementSide * movementRadius * Math.cos(angle);
    d.y = height / 2 + movementRadius * Math.sin(angle);
  });

  // Create nodes
  const node = graphGroup.append("g")
    .selectAll(".node")
    .data(nodes)
    .enter().append("circle")
    .attr("class", "node")
    .attr("r", 10)
    .attr("fill", "white")
    .attr("stroke", "grey")
    .on("mouseover", function(event, d) {
      d3.select(this).attr("fill", "grey").attr("stroke", "grey");
      highlightConnections(d);
    })
    .on("mouseout", function(event, d) {
      d3.select(this).attr("fill", "white").attr("stroke", "grey");
      resetConnections();
    })
    .call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended));

  // Create labels for nodes
  graphGroup.append("g")
    .selectAll(".label")
    .data(nodes)
    .enter().append("text")
    .attr("class", "label")
    .attr("dx", 12)
    .attr("dy", ".35em")
    .text(d => d.Label)
    .style("pointer-events", "none"); 

  simulation
    .nodes(nodes)
    .on("tick", ticked);

  simulation.force("link").links(links);

  // Function to update positions on each simulation tick
  function ticked() {
    link
      .attr("d", d => {
        const source = d.source;
        const target = d.target;
        const midpointX = (source.x + target.x) / 2;
        const midpointY = (source.y + target.y) / 2;
        const curvature = 0.1;
        const controlX = midpointX + (target.y - source.y) * curvature;
        const controlY = midpointY + (source.x - target.x) * curvature;

        return `M${source.x},${source.y} C${controlX},${controlY} ${controlX},${controlY} ${target.x},${target.y}`;
      });

    node
      .attr("cx", d => d.x)
      .attr("cy", d => d.y);

    graphGroup.selectAll(".label")
      .attr("x", d => d.x)
      .attr("y", d => d.y);
  }

  // Updated highlightConnections function
function highlightConnections(d) {
  // Update link opacity: if the hovered node is either source or target, highlight link; otherwise, dim it.
  link.style("opacity", l =>
    (l.source.id === d.id || l.target.id === d.id) ? 1 : 0.1
  );

  // Update node opacity: highlight the hovered node and any node directly connected to it 
  // by checking through the links array.
  node.style("opacity", n =>
    (n.id === d.id || links.some(l =>
      (l.source.id === d.id && l.target.id === n.id) ||
      (l.target.id === d.id && l.source.id === n.id)
    )) ? 1 : 0.1
  );

  // Now call the new function to highlight the connected (destination) nodes
  highlightDestNodes(d);
}

// New function to highlight destination nodes
function highlightDestNodes(d) {
  // For every node n, check if there is at least one link connecting the hovered node to n.
  // This works for both cases: hovered node is source (and n is target) or vice versa.
  node.filter(n =>
    links.some(l =>
      (l.source.id === d.id && l.target.id === n.id) ||
      (l.target.id === d.id && l.source.id === n.id)
    )
  )
  .attr("fill", "white")
  .attr("stroke", "grey");
}

// Reset function remains the same so that on mouseout every node and link returns to its normal style.
function resetConnections() {
  link.style("opacity", 0.6);
  node.style("opacity", 1)
    .attr("fill", "white")
    .attr("stroke", "grey");
}


  // Drag functions for nodes


function dragstarted(event, d) {
  if (!event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(event, d) {
  // pin it exactly to the mouse
  d.fx = event.x;
  d.fy = event.y;
  // force an immediate re‐draw so the circle never falls behind the cursor
  ticked();
}

function dragended(event, d) {
  if (!event.active) simulation.alphaTarget(0);
  // release back to simulation
  d.fx = null;
  d.fy = null;
}

});
