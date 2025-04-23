const width = window.innerWidth;
const height = window.innerHeight;

const svg_scrolly = d3.select("#vis")
  .attr("width", width)
  .attr("height", height);


function handleStep(step) {
    if (step === 1) {
        const squareCount = 400;
        const squareSize = 5;
        const squareColor = "steelblue";

        svg_scrolly.selectAll("rect").interrupt().remove();

        const squaresData = d3.range(squareCount).map(() => ({
            x: Math.random() * (width - squareSize),
            y: Math.random() * (height - squareSize)
        }));

        svg_scrolly.selectAll("rect")
            .data(squaresData)
            .enter()
            .append("rect")
            .attr("x", d => d.x)
            .attr("y", d => d.y)
            .attr("width", squareSize)
            .attr("height", squareSize)
            .attr("fill", squareColor)
            .attr("opacity", 0)
            .transition()
            .duration(600)
            .delay((d, i) => i * 20)
            .attr("opacity", 1);
    }

    if (step === 2) {
        const totalSquares = 8000; // 🎯 Exact number of squares to render
        const squareSize = 5;
        const spacing = 10;
        const gridCount = Math.ceil(Math.sqrt(totalSquares));
        const totalSize = spacing * (gridCount - 1);
    
        const centerX = width / 2;
        const centerY = height / 2;
    
        // === Build capped circular grid layout ===
        const targetLayout = [];
        let placed = 0;
    
        for (let row = 0; row < gridCount; row++) {
            for (let col = 0; col < gridCount; col++) {
                if (placed >= totalSquares) break;
    
                const cx = col * spacing - totalSize / 2;
                const cy = row * spacing - totalSize / 2;
                const distance = Math.sqrt(cx * cx + cy * cy);
    
                if (distance < totalSize / 2) {
                    targetLayout.push({
                        x: centerX + cx - squareSize / 2,
                        y: centerY + cy - squareSize / 2
                    });
                    placed++;
                }
            }
            if (placed >= totalSquares) break;
        }
    
        // === Fade out old shapes while floating them toward the sphere ===
        svg_scrolly.selectAll("rect:not(.sphere-square)")
            .transition()
            .duration(800)
            .attr("x", (d, i) => {
                const t = targetLayout[i % targetLayout.length];
                return t ? t.x : centerX;
            })
            .attr("y", (d, i) => {
                const t = targetLayout[i % targetLayout.length];
                return t ? t.y : centerY;
            })
            .attr("opacity", 0)
            .remove();
    
        // === Build new sphere ===
        svg_scrolly.selectAll(".sphere-square").remove(); // clear previous ones
    
        svg_scrolly.selectAll(".sphere-square")
            .data(targetLayout)
            .enter()
            .append("rect")
            .attr("class", "sphere-square")
            .attr("x", d => d.x)
            .attr("y", d => d.y)
            .attr("width", squareSize)
            .attr("height", squareSize)
            .attr("fill", "steelblue")
            .attr("opacity", 0)
            .transition()
            .duration(600)
            // .delay((d, i) => i * 2)
            .attr("opacity", 1);
    }
    if (step === 3) {
        const nRedSquares = 200; // 🔴 Number of red squares to highlight
        const squareSize = 5;    // Match what you used when creating the shapes
        const centerX = width / 2;
        const centerY = height / 2;
    
        // Get all squares and sort them by distance to center
        const squares = svg_scrolly.selectAll("rect").nodes();
    
        const sorted = squares
            .map(el => {
                const x = +el.getAttribute("x") + squareSize / 2;
                const y = +el.getAttribute("y") + squareSize / 2;
                const dist = Math.hypot(x - centerX, y - centerY);
                return { el, dist };
            })
            .sort((a, b) => a.dist - b.dist);
    
        // Apply fill via transition
        sorted.forEach((d, i) => {
            d3.select(d.el)
                .transition()
                .duration(500)
                .attr("fill", i < nRedSquares ? "orange" : "grey");
        });
    }
     else if (step === 4) {
        // svg_scrolly.selectAll("rect")
        //     .transition()
        //     .duration(1000)
        //     .attr("y", () => Math.random() * (height - 40)); // keep inside bounds
    }
}

const scroller = scrollama();

scroller
    .setup({
        step: ".step",
        offset: 0.8,
        debug: false
    })
    .onStepEnter(response => {
        const step = +response.element.dataset.step;
        handleStep(step);
    });
