const round_1_total = 2000;
const round_2_total = 2000;

const widthST = 720;
const heightST = 200;
const marginST = { top: 20, right: 20, bottom: 30, left: 50 };

const containerST = d3.select("#simple-timeline");

const svgST = containerST.append("svg")
    .attr("width", widthST)
    .attr("height", heightST);

// Time and number formatters
const parseDatex = d3.timeParse("%Y-%m");

// Load CSV
d3.csv("data/daily_timeline.csv").then(data => {
    // Parse and clean the data
    data.forEach(d => {
        const monthPadded = String(d.month).padStart(2, "0");
        d.date = parseDatex(`${d.year}-${monthPadded}`);
        d.approved = +d.approved;
        d.denied = +d.denied;
        d.total = +d.total;
    });

    // Scales
    const x = d3.scaleTime()
        .domain(d3.extent(data, d => d.date))
        .range([marginST.left, widthST - marginST.right]);

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.total)]).nice()
        .range([heightST - marginST.bottom, marginST.top]);

    // Axes
    svgST.append("g")
        .attr("transform", `translate(0,${heightST - marginST.bottom})`)
        .call(d3.axisBottom(x).ticks(5));

    svgST.append("g")
        .attr("transform", `translate(${marginST.left},0)`)
        .call(d3.axisLeft(y));

    // Line generator
    const lineApproved = d3.line()
        .x(d => x(d.date))
        .y(d => y(d.approved));

    const lineDenied = d3.line()
        .x(d => x(d.date))
        .y(d => y(d.denied));

    // Draw the approved and denied lines
    svgST.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "orange")
        .attr("stroke-widthST", 2)
        .attr("d", lineApproved);

    svgST.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "red")
        .attr("stroke-widthST", 2)
        .attr("d", lineDenied);

});
