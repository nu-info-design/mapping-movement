// js/scene-intro/drawCanvas.js

import { FRAME_WIDTH, FRAME_HEIGHT } from "../config.js";

let intro_svg, intro_defs, intro_layer;  // 先声明变量，以便 export 后被其他模块使用

// 创建主 SVG 画布和图层结构
// Create main SVG canvas and base layers
function drawCanvas() {
    intro_svg = d3.select("#viz")
        .append("svg")
        .attr("width", FRAME_WIDTH)
        .attr("height", FRAME_HEIGHT)
        .style("background", "transparent");

    intro_defs = intro_svg.append("defs"); // 用于定义渐变
    intro_layer = intro_svg.append("g");   // 主图层

    console.log("Canvas initialized.");
}

export { drawCanvas, intro_svg, intro_defs, intro_layer };