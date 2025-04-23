// FIRST GLOBE CONFIG (Orthographic)
const width = 1200;
const height = 1200;
const margin = { top: 20, right: 20, bottom: 20, left: 20 };
const initialRotation = [40, 0, 0];

// SECOND GLOBE CONFIG (Azimuthal Equal Area)
const width2 = 1600;
const height2 = 1600;
const margin2 = { top: 20, right: 20, bottom: 20, left: 20 };
const initialRotation2 = [-20, 0, 0];

// Create both projections
const projection = d3.geoOrthographic()
    .scale(450)
    .translate([width / 2, height / 2])
    .rotate(initialRotation)
    .clipAngle(90)
    .precision(0.1);

const projection2 = d3.geoAzimuthalEqualArea()
    .scale(350)
    .translate([width2 / 2, height2 / 2])
    .rotate(initialRotation2)
    .precision(0.1);

// Create path generators for both globes
const path = d3.geoPath().projection(projection);
const path2 = d3.geoPath().projection(projection2);

// Create SVG elements for both globes
const svg = d3.select("#globe-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto;");

const svg2 = d3.select("#map2")
    .append("svg")
    .attr("width", width2)
    .attr("height", height2)
    .attr("viewBox", [0, 0, width2, height2])
    .attr("style", "max-width: 100%; height: auto;");

// Add earth background circles for both globes
svg.append("circle")
    .attr("cx", width / 2)
    .attr("cy", height / 2)
    .attr("r", projection.scale())
    .attr("fill", "#111")
    .attr("stroke", "#000");


// Create groups for map elements on both globes
const g = svg.append("g");
const g2 = svg2.append("g");

// Create groups for migration flows on both globes
const flowsGroup = svg.append("g").attr("class", "migration-flows");
const flowsGroup2 = svg2.append("g").attr("class", "migration-flows");

// Create tooltips for both globes
const tooltip = d3.select("body").append("div")
    .attr("class", "tooltip");

const tooltip2 = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0)
    .style("z-index", 1000);

// Add global outlines to both globes
svg.append("path")
    .datum({type: "Sphere"})
    .attr("class", "sphere")
    .attr("d", path)
    .attr("fill", "none")
    .attr("stroke", "#444")
    .attr("stroke-width", 1.5);

svg2.append("path")
    .datum({type: "Sphere"})
    .attr("class", "sphere")
    .attr("d", path2)
    .attr("fill", "none")
    .attr("stroke", "#444")
    .attr("stroke-width", 1.5);

// Global variables
let migrationData = [];
let availableYears = [];
let currentYear = "all";
let countryPositions = {};
let iso3ToNumericMap = {};
let numericToIso3Map = {};
let draggingEnabled = false;

let rotationTimer = null;
let isAutoRotating = true;

// Auto-rotation functions
function startAutoRotation() {
    // Clear any existing rotation timer
    if (rotationTimer) {
        clearInterval(rotationTimer);
    }
    
    // Set flag
    isAutoRotating = true;
    
    // Start new rotation timer
    rotationTimer = setInterval(() => {
        // Get current rotation
        const [x, y, z] = projection.rotate();
        
        // Increment x rotation (longitude) by small amount
        projection.rotate([x + 0.2, y, z]);
        
        // Update all paths
        g.selectAll("path").attr("d", path);
        
        // Update migration flow paths if enabled
        if (draggingEnabled) {
            updateFlowPaths();
        }
    }, 30); // Rotate every 30ms for smooth animation
}

function stopAutoRotation() {
    if (rotationTimer) {
        clearInterval(rotationTimer);
        rotationTimer = null;
    }
    isAutoRotating = false;
}

// Migration path functions for both globes
function migrationPath(source, target) {
    if (!source || !target) return null;
    
    // Check if coordinates are valid
    if (source.length !== 2 || target.length !== 2 || 
        isNaN(source[0]) || isNaN(source[1]) || 
        isNaN(target[0]) || isNaN(target[1])) {
        return null;
    }
    
    try {
        // Calculate great circle arc midpoint
        const interpolator = d3.geoInterpolate(source, target);
        const midpoint = interpolator(0.5);
        
        // Check if visible from current view
        const sourceVisible = d3.geoDistance(source, projection.invert([width/2, height/2])) < Math.PI / 2;
        const targetVisible = d3.geoDistance(target, projection.invert([width/2, height/2])) < Math.PI / 2;
        
        // If both source and target are not visible, return null
        if (!sourceVisible && !targetVisible) return null;
        
        // Create path
        const path = d3.geoPath()
            .projection(projection)
            .pointRadius(1);
        
        // Create great circle arc
        const route = {
            type: "LineString",
            coordinates: [source, midpoint, target]
        };
        
        return path(route);
    } catch (e) {
        return null;
    }
}

function migrationPath2(source, target) {
    if (!source || !target) return null;
    
    // Check if coordinates are valid
    if (source.length !== 2 || target.length !== 2 || 
        isNaN(source[0]) || isNaN(source[1]) || 
        isNaN(target[0]) || isNaN(target[1])) {
        return null;
    }
    
    try {
        // Calculate great circle arc midpoint
        const interpolator = d3.geoInterpolate(source, target);
        const midpoint = interpolator(0.5);
        
        // Create path with second projection
        const path = d3.geoPath()
            .projection(projection2)
            .pointRadius(1);
        
        // Create great circle arc
        const route = {
            type: "LineString",
            coordinates: [source, midpoint, target]
        };
        
        return path(route);
    } catch (e) {
        return null;
    }
}

// Update migration flow paths for first globe
function updateFlowPaths() {
    if (flowsGroup.selectAll("path.migration-flow").size() === 0) return;
    
    flowsGroup.selectAll("path.migration-flow").each(function(d) {
        const source = countryPositions[d.iso3codefrom];
        const target = countryPositions[d.iso3codeto];
        const newPath = migrationPath(source, target);
        
        if (newPath) {
            d3.select(this)
                .attr("d", newPath)
                .style("visibility", "visible");
        } else {
            d3.select(this)
                .style("visibility", "hidden");
        }
    });
}

// Dragging behavior for first globe
function dragBehavior(projection) {
    let v0, q0, r0;
    
    function dragstarted(event) {
        stopAutoRotation(); 
        const [x, y] = d3.pointer(event, this);
        v0 = versor.cartesian(projection.invert([x, y]));
        q0 = versor(r0 = projection.rotate());
    }
    
    function dragged(event) {
        const [x, y] = d3.pointer(event, this);
        const v1 = versor.cartesian(projection.rotate(r0).invert([x, y]));
        const delta = versor.delta(v0, v1);
        const q1 = versor.multiply(q0, delta);
        
        projection.rotate(versor.rotation(q1));
        g.selectAll("path").attr("d", path);
        
        if (draggingEnabled) {
            updateFlowPaths();
        }
        d3.select("#reset-button").text("Reset View");
    }
    
    return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged);
}

// Apply dragging behavior to first globe
svg.call(dragBehavior(projection));

// Reset globe function
function resetGlobe() {
    const currentRotation = projection.rotate();
    
    d3.transition()
        .duration(750)
        .tween("rotate", function() {
            const r = d3.interpolate(currentRotation, initialRotation);
            return function(t) {
                projection.rotate(r(t));
                g.selectAll("path").attr("d", path);
                
                if (draggingEnabled) {
                    updateFlowPaths();
                }
            };
        })
        .on("end", function() {
            // Restart auto-rotation after reset animation completes
            startAutoRotation();
        });
}

// Create a dispatcher
const dispatcher = d3.dispatch("resetView", "yearChanged");

// Handle year changes
dispatcher.on("yearChanged", function(yearValue) {
  updateBothGlobesByYear(yearValue);
});

// Register reset view event handler
dispatcher.on("resetView", resetGlobe);

// Attach reset event to button
d3.select("#reset-button").on("click", function() {
  dispatcher.call("resetView");
});

// Calculate flow width based on migration count
function getFlowWidth(migration) {
    return Math.max(0.5, Math.min(3, 0.5 + (migration.n_migrations / 500)));
}

// Get country incoming migration data
function getCountryIncomingMigrations(countryIso3, year) {
    // Always filter by year (no "all" option)
    const incomingMigrations = migrationData
        .filter(d => d.year === year && d.iso3codeto === countryIso3);
    // Sort by migration count in descending order
    return incomingMigrations.sort((a, b) => b.n_migrations - a.n_migrations);
}

// Get country outgoing migration data
function getCountryOutgoingMigrations(countryIso3, year) {
    // Always filter by year (no "all" option)
    const outgoingMigrations = migrationData
        .filter(d => d.year === year && d.iso3codefrom === countryIso3);
    // Sort by migration count in descending order
    return outgoingMigrations.sort((a, b) => b.n_migrations - a.n_migrations);
}

// Create bar chart for incoming migrations
function createInBarChart(incomingMigrations, countryName) {
    // Clear previous chart
    d3.select("#chart-left svg").remove();
    
    // Use only top 10 countries
    const topCountries = incomingMigrations
      .slice(0, 10)
      .sort((a, b) => (+b.n_migrations || 0) - (+a.n_migrations || 0));
    
    d3.select("#chart-left").style("padding-top","20vh");
    // Set chart dimensions and margins
    const margin = {top: 20, right: 30, bottom: 10, left: 100};
    const width = d3.select("#chart-left").node().getBoundingClientRect().width - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;
    
    // Create SVG
    const svg = d3.select("#chart-left")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
    
    // Set title with country name
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", -5)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .style("fill", "#e0e0e0")
      .text(`Top Origins for ${countryName}`);
    
    // X scale (for values)
    const x = d3.scaleLinear()
      .domain([0, d3.max(topCountries, d => +d.n_migrations || 0)])
      .range([0, width]);
    
    // Y scale (for country names) with increased padding
    const y = d3.scaleBand()
      .domain(topCountries.map(d => d.countrynamefrom))
      .range([0, height])
      .padding(0.8);
    
    // Draw Y axis
    svg.append("g")
      .call(d3.axisLeft(y))
      .selectAll("text")
      .style("fill", "#aaa")
      .style("font-size", "12px");
    
    // Draw bars
    svg.selectAll(".bar")
      .data(topCountries)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("y", d => y(d.countrynamefrom) + y.bandwidth() * 0.5)
      .attr("height", y.bandwidth() * 0.5)
      .attr("x", 0)
      .attr("width", 0) // Initial width for animation
      .attr("fill", "#8d10c7")
      .transition()
      .duration(300)
      .attr("width", d => x(+d.n_migrations || 0));
    
    // Add value labels
    svg.selectAll(".label")
      .data(topCountries)
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("y", d => y(d.countrynamefrom) + y.bandwidth() / 2)
      .attr("x", d => x(+d.n_migrations || 0) + 5)
      .attr("dy", ".35em")
      .style("fill", "#e0e0e0")
      .style("font-size", "12px")
      .text(d => d3.format(",")(+d.n_migrations || 0));
}

// Create bar chart for outgoing migrations
function createOutBarChart(outgoingMigrations, countryName) {
    // Clear previous chart
    d3.select("#chart-right svg").remove();
    
    // Use only top 10 countries
    const topCountries = outgoingMigrations
      .slice(0, 10)
      .sort((a, b) => (+b.n_migrations || 0) - (+a.n_migrations || 0));
    
    d3.select("#chart-right").style("padding-top", "20vh");
    // Set chart dimensions and margins
    const margin = {top: 20, right: 100, bottom: 10, left: 30};
    const width = d3.select("#chart-right").node().getBoundingClientRect().width - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;
    
    // Create SVG
    const svg = d3.select("#chart-right")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
    
    // Set title with country name
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", -5)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .style("fill", "#e0e0e0")
      .text(`Top Destinations for ${countryName}`);
    
    // X scale (for values) - reversed for right alignment
    const x = d3.scaleLinear()
      .domain([0, d3.max(topCountries, d => +d.n_migrations || 0)])
      .range([width, 0]);
    
    // Y scale (for country names)
    const y = d3.scaleBand()
      .domain(topCountries.map(d => d.countrynameto))
      .range([0, height])
      .padding(0.8);
    
    // Draw Y axis on right side
    svg.append("g")
      .attr("transform", `translate(${width},0)`)
      .call(d3.axisRight(y))
      .selectAll("text")
      .style("fill", "#aaa")
      .style("font-size", "12px");
    
    // Draw bars from right to left
    svg.selectAll(".bar")
      .data(topCountries)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("y", d => y(d.countrynameto) + y.bandwidth() * 0.5)
      .attr("height", y.bandwidth() * 0.5)
      .attr("x", width)
      .attr("width", 0)
      .attr("fill", "#209e00")
      .transition()
      .duration(300)
      .attr("x", d => x(+d.n_migrations || 0))
      .attr("width", d => width - x(+d.n_migrations || 0));
    
    // Add value labels on left side of bars
    svg.selectAll(".label")
      .data(topCountries)
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("y", d => y(d.countrynameto) + y.bandwidth() / 2)
      .attr("x", d => x(+d.n_migrations || 0) - 5)
      .attr("text-anchor", "end")
      .attr("dy", ".35em")
      .style("fill", "#e0e0e0")
      .style("font-size", "12px")
      .text(d => d3.format(",")(+d.n_migrations || 0));
}

// Load map for first globe
function loadMap() {
    return d3.json("https://unpkg.com/world-atlas@2/countries-110m.json").then(data => {
        const countries = topojson.feature(data, data.objects.countries);
        
        // Draw countries
        g.selectAll("path.country")
            .data(countries.features)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("class", "country")
            .attr("fill", "#2a2a2a")
            .attr("stroke", "#555")
            .attr("stroke-width", 0.5);
        
        // Draw country borders
        g.append("path")
            .datum(topojson.mesh(data, data.objects.countries, (a, b) => a !== b))
            .attr("d", path)
            .attr("class", "country-border")
            .attr("fill", "none")
            .attr("stroke", "#555")
            .attr("stroke-width", 0.5);
        
        // Add hover events
        g.selectAll("path.country")
            .on("mouseover", function(event, d) {
                // Get ISO code
                let iso3 = null;
                
                if (d.id && numericToIso3Map[d.id]) {
                    iso3 = numericToIso3Map[d.id];
                }
                    
                // Highlight current country
                d3.select(this)
                    .attr("fill", "#444")  
                    .attr("stroke", "#fff")
                    .attr("stroke-width", 1.5);
                
                // Find country migrations
                const incomingMigrations = getCountryIncomingMigrations(iso3, currentYear);
                const outgoingMigrations = getCountryOutgoingMigrations(iso3, currentYear);
                               
                // Create tooltip element
                const countryTooltip = d3.select("#globe-container")
                    .selectAll(".country-tooltip")
                    .data([0])
                    .join("div")
                    .attr("class", "country-tooltip tooltip");
                
                // Build tooltip HTML content
                let html = `<strong>${d.properties.name || "Unknown"}</strong> <br/>`;
                
                // Add total incoming migration
                const totalIncoming = incomingMigrations.reduce((sum, m) => sum + (+m.n_migrations || 0), 0);
                html += `Incoming: ${d3.format(",")(totalIncoming)}<br/>`;
                
                // Add total outgoing migration
                const totalOutgoing = outgoingMigrations.reduce((sum, m) => sum + (+m.n_migrations || 0), 0);
                html += `Outgoing: ${d3.format(",")(totalOutgoing)}<br/>`;
                
                // Add net migration value
                const netMigration = totalIncoming - totalOutgoing;
                const netMigrationColor = netMigration >= 0 ? "#8d10c7" : "#209e00";
                html += `<strong>Net migration:</strong> <span style="color:${netMigrationColor}">${d3.format("+,")(netMigration)}</span><br/>`;
                
                // Add year
                html += `<strong>Year:</strong> ${currentYear}<br/>`;
                
                // Display tooltip
                countryTooltip
                    .html(html)
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 28) + "px")
                    .transition()
                    .duration(300)
                    .style("opacity", 0.9)
                    .style("z-index",1000);

                const countryName = d.properties.name || "Unknown";
                // Create bar charts
                createInBarChart(incomingMigrations,countryName);
                createOutBarChart(outgoingMigrations,countryName);
                
                // Highlight flow lines related to this country
                flowsGroup.selectAll("path.migration-flow")
                    .style("stroke-opacity", function(flow) {
                        if (flow.iso3codefrom === iso3 || flow.iso3codeto === iso3) {
                            return 0.9;
                        } else {
                            return 0.1;
                        }
                    })
                    .style("stroke-width", function(flow) {
                        if (flow.iso3codefrom === iso3 || flow.iso3codeto === iso3) {
                            return getFlowWidth(flow) * 1.5;
                        } else {
                            return getFlowWidth(flow) * 0.5;
                        }
                    })
                    .style("stroke", function(flow) {
                        if (flow.iso3codefrom === iso3) {
                            return "#209e00"; // out-green
                        } else if(flow.iso3codeto === iso3) {
                            return "#8d10c7"; // in-purple
                        }
                        return "#777";
                    });
            })
            .on("mouseout", function(event, d) {
                // Reset country styling
                d3.select(this)
                    .attr("fill", "#2a2a2a")
                    .attr("stroke", "#555")
                    .attr("stroke-width", 0.5);
                
                // Hide tooltip
                d3.select(".country-tooltip")
                    .transition()
                    .duration(300)
                    .style("opacity", 0);
                
                // Reset flow line styles
                flowsGroup.selectAll("path.migration-flow")
                    .style("stroke-opacity", 0.6)
                    .style("stroke-width", d => getFlowWidth(d))
                    .style("stroke", "#777");

                // Remove bar charts
                d3.select("#chart-left svg").remove();
                d3.select("#chart-right svg").remove();
            });
            
        return data;
    }).catch(() => {});
}

// Load map for second globe
function loadMap2() {
    return d3.json("https://unpkg.com/world-atlas@2/countries-110m.json").then(data => {
        const countries = topojson.feature(data, data.objects.countries);
        
        // Draw countries on second globe
        g2.selectAll("path.country")
            .data(countries.features)
            .enter()
            .append("path")
            .attr("d", path2)
            .attr("class", "country")
            .attr("fill", "#2a2a2a")
            .attr("stroke", "#555")
            .attr("stroke-width", 0.5);
        
        // Draw country borders on second globe
        g2.append("path")
            .datum(topojson.mesh(data, data.objects.countries, (a, b) => a !== b))
            .attr("d", path2)
            .attr("class", "country-border")
            .attr("fill", "none")
            .attr("stroke", "#555")
            .attr("stroke-width", 0.5);
            
        // Add hover events to second globe
        g2.selectAll("path.country")
            .on("mouseover", function(event, d) {
                // Get ISO code
                let iso3 = null;
                
                if (d.id && numericToIso3Map[d.id]) {
                    iso3 = numericToIso3Map[d.id];
                }
                    
                // Highlight current country
                d3.select(this)
                    .attr("fill", "#444")  
                    .attr("stroke", "#fff")
                    .attr("stroke-width", 1.5);
                
                // Find migrations for this country
                const incomingMigrations = getCountryIncomingMigrations(iso3, currentYear);
                const outgoingMigrations = getCountryOutgoingMigrations(iso3, currentYear);
                
                // Build tooltip content
                let html = `<strong>${d.properties.name || "Unknown"}</strong><br/>`;
                
                // Add total incoming migrations
                const totalIncoming = incomingMigrations.reduce((sum, m) => sum + (+m.n_migrations || 0), 0);
                html += `Incoming: ${d3.format(",")(totalIncoming)}<br/>`;
                
                // Add total outgoing migrations
                const totalOutgoing = outgoingMigrations.reduce((sum, m) => sum + (+m.n_migrations || 0), 0);
                html += `Outgoing: ${d3.format(",")(totalOutgoing)}<br/>`;
                
                // Add net migration value
                const netMigration = totalIncoming - totalOutgoing;
                const netMigrationColor = netMigration >= 0 ? "#8d10c7" : "#209e00";
                html += `<strong>Net migration:</strong> <span style="color:${netMigrationColor}">${d3.format("+,")(netMigration)}</span><br/>`;
                
                // Add year
                html += `<strong>Year:</strong> ${currentYear}<br/>`;
                
                // Display tooltip
                tooltip2
                    .html(html)
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 28) + "px")
                    .transition()
                    .duration(300)
                    .style("opacity", 0.9);
                    
                // Highlight flow lines related to this country
                flowsGroup2.selectAll("path.migration-flow")
                    .style("stroke-opacity", function(flow) {
                        if (flow.iso3codefrom === iso3 || flow.iso3codeto === iso3) {
                            return 0.9;
                        } else {
                            return 0.1;
                        }
                    })
                    .style("stroke-width", function(flow) {
                        if (flow.iso3codefrom === iso3 || flow.iso3codeto === iso3) {
                            return getFlowWidth(flow) * 1.5;
                        } else {
                            return getFlowWidth(flow) * 0.5;
                        }
                    })
                    .style("stroke", function(flow) {
                        if (flow.iso3codefrom === iso3) {
                            return "#209e00"; // out-green
                        } else if (flow.iso3codeto === iso3) {
                            return "#8d10c7"; // in-purple
                        }
                        return "#777";
                    });
            })
            .on("mouseout", function(event, d) {
                // Reset country styling
                d3.select(this)
                    .attr("fill", "#2a2a2a")
                    .attr("stroke", "#555")
                    .attr("stroke-width", 0.5);
                
                // Hide tooltip
                tooltip2
                    .transition()
                    .duration(300)
                    .style("opacity", 0);
                    
                // Reset flow line styles
                flowsGroup2.selectAll("path.migration-flow")
                    .style("stroke-opacity", 0.3)
                    .style("stroke-width", d => getFlowWidth(d) * 0.5)
                    .style("stroke", "#777");
            });
            
        return data;
    }).catch(() => {});
}

// Load country coordinates
function loadCountryCoordinates() {
    return d3.csv("data/dfcountries.csv").then(data => {
        data.forEach(country => {
            if (country.iso3code && country.longitude && country.latitude) {
                const longitude = +country.longitude;
                const latitude = +country.latitude;
                
                if (!isNaN(longitude) && !isNaN(latitude)) {
                    countryPositions[country.iso3code] = [longitude, latitude];
                }
            }
        });
    }).catch(() => {});
}

// Load ISO code mapping
function loadISOCodeMapping() {
    return d3.csv("data/countries.csv").then(data => {
        // Create mappings
        iso3ToNumericMap = {}; // alpha-3 to numeric
        numericToIso3Map = {}; // numeric to alpha-3
        
        data.forEach(country => {
            if (country.cca3 && country.ccn3) {
                iso3ToNumericMap[country.cca3] = country.ccn3;
                numericToIso3Map[country.ccn3] = country.cca3;
            }
        });
        
        return { iso3ToNumericMap, numericToIso3Map };
    }).catch(() => {});
}

// Load migration data
function loadMigrationData() {
    return d3.csv("data/real.csv").then(data => {
        migrationData = data.map(d => {
            return {
                ...d,
                n_migrations: +d.n_migrations,
                year: String(parseInt(d.year))
            };
        });
        
        // Filter out migrations without valid coordinates
        migrationData = migrationData.filter(d => 
            countryPositions[d.iso3codefrom] && countryPositions[d.iso3codeto]
        );
        
        // Extract available years
        availableYears = [...new Set(migrationData.map(d => d.year))].sort();
        
        initializeTimeline(availableYears);
        updateBothGlobesByYear(availableYears[0]);

        draggingEnabled = true;
    }).catch(() => {});
}

// Update migrations for first globe
function updateMigrationsByYear(year) {
    currentYear = year;
    d3.select("#year-label").text(year);
    
    d3.selectAll(".tick")
        .classed("active", d => d === year);
    
    let filteredData = migrationData.filter(d => d.year === year);
    filteredData = filteredData.sort((a, b) => b.n_migrations - a.n_migrations).slice(0, 1000);

    // Draw migration flows with transition effects
    const flows = flowsGroup.selectAll("path.migration-flow")
        .data(filteredData, d => `${d.iso3codefrom}-${d.iso3codeto}`);
    
    // Remove flows that no longer exist
    flows.exit()
        .transition()
        .duration(300)
        .attr("stroke-opacity", 0)
        .attr("stroke-width", 0)
        .remove();
    
    // Add new flows
    const newFlows = flows.enter()
        .append("path")
        .attr("class", "migration-flow")
        .attr("d", d => {
            const source = countryPositions[d.iso3codefrom];
            const target = countryPositions[d.iso3codeto];
            return migrationPath(source, target);
        })
        .attr("stroke", "#777")
        .attr("stroke-width", 0)
        .attr("stroke-opacity", 0)
        .attr("fill", "none");
    
    // Add transition effect to new flows
    newFlows.transition()
        .duration(300)
        .attr("stroke-width", d => getFlowWidth(d))
        .attr("stroke-opacity", 0.6);
    
    // Update existing flows
    flows.transition()
        .duration(300)
        .attr("stroke", "#777")
        .attr("stroke-width", d => getFlowWidth(d))
        .attr("stroke-opacity", 0.6);
    
    // Add mouse interactions
    newFlows
        .on("mouseover", function(event, d) {
            d3.select(this)
                .attr("stroke-width", getFlowWidth(d) * 2)
                .attr("stroke-opacity", 1);
            
            tooltip.transition()
                .duration(200)
                .style("opacity", 0.9);
            
            tooltip.html(`
                <strong>From:</strong> ${d.countrynamefrom} (${d.regionfrom})<br/>
                <strong>To:</strong> ${d.countrynameto} (${d.regionto})<br/>
                <strong>Migrations:</strong> ${d3.format(",")(d.n_migrations)}<br/>
                <strong>Year:</strong> ${d.year}
            `)
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", function(event, d) {
            d3.select(this)
                .attr("stroke-width", getFlowWidth(d))
                .attr("stroke-opacity", 0.6);
            
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });
    
    // Update event handlers for existing flows
    flows
        .on("mouseover", function(event, d) {
            d3.select(this)
                .attr("stroke-width", getFlowWidth(d) * 2)
                .attr("stroke-opacity", 1);
            
            tooltip.transition()
                .duration(200)
                .style("opacity", 0.9);
            
            tooltip.html(`
                <strong>From:</strong> ${d.countrynamefrom} (${d.regionfrom})<br/>
                <strong>To:</strong> ${d.countrynameto} (${d.regionto})<br/>
                <strong>Migrations:</strong> ${d3.format(",")(d.n_migrations)}<br/>
                <strong>Year:</strong> ${year === "all" ? "All Time" : d.year}
            `)
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", function(event, d) {
            d3.select(this)
                .attr("stroke-width", getFlowWidth(d))
                .attr("stroke-opacity", 0.6);
            
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });
}

// Update migrations for second globe
function updateMigrationsByYear2(year) {
    let filteredData = migrationData.filter(d => d.year === year);
    filteredData = filteredData.sort((a, b) => b.n_migrations - a.n_migrations).slice(0, 1000);

    // Draw migration flows for second globe
    const flows = flowsGroup2.selectAll("path.migration-flow")
        .data(filteredData, d => `${d.iso3codefrom}-${d.iso3codeto}`);
    
    // Remove flows that no longer exist
    flows.exit().remove();
    
    // Add new flows
    flows.enter()
        .append("path")
        .attr("class", "migration-flow")
        .attr("d", d => {
            const source = countryPositions[d.iso3codefrom];
            const target = countryPositions[d.iso3codeto];
            return migrationPath2(source, target);
        })
        .attr("stroke", "#777")
        .attr("stroke-width", d => getFlowWidth(d) * 0.5)
        .attr("stroke-opacity", 0.3)
        .attr("fill", "none");
}

// Update both globes together
function updateBothGlobesByYear(year) {
    updateMigrationsByYear(year);
    updateMigrationsByYear2(year);
}

// Initialize timeline
function initializeTimeline(years) {
    // Set slider properties
    const slider = d3.select("#year-slider");
    slider.attr("min", 0)
          .attr("max", years.length - 1)
          .attr("value", 0);
    
    // Add ticks
    const tickContainer = d3.select(".timeline-ticks");
    tickContainer.selectAll("div")
        .data(years)
        .enter()
        .append("div")
        .attr("class", (d, i) => i === 0 ? "tick active" : "tick")
        .text(d => d);
    
    // Add slider event
    slider.on("input", function() {
        const yearIndex = parseInt(this.value);
        dispatcher.call("yearChanged", null, years[yearIndex]);
    });
}

// Load all data in correct sequence
async function loadAllData() {
    try {
        // First load ISO code mapping and country coordinates (in parallel)
        await Promise.all([
            loadISOCodeMapping(),
            loadCountryCoordinates()
        ]);

        // Then load both maps (in parallel)
        await Promise.all([
            loadMap(),
            loadMap2()
        ]);
        
        // Finally load migration data (depends on coordinates)
        await loadMigrationData();
        startAutoRotation(); // Start auto rotation
    } catch (error) {
        console.error("Error loading data:", error);
    }
}

// Start loading all data when document is ready
document.addEventListener('DOMContentLoaded', function() {
    loadAllData();
});