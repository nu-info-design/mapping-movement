// js/scene-intro/drawCross.js

import {
  cx, cy,
  CROSS_LINE_LENGTH,
  CROSS_LINE_OPACITY,
  CROSS_LINE_STROKE
} from "../config.js";

// 绘制中心黄色十字（带淡入动画）
function drawCross() {
  const svg = d3.select("#viz").select("svg");

  const crossGroup = svg.append("g")
    .attr("id", "yellow-cross")
    .attr("transform", `translate(${cx}, ${cy}) scale(0)`) // 初始缩放为 0
    .attr("opacity", 0);

  // 横线
  crossGroup.append("line")
    .attr("x1", -CROSS_LINE_LENGTH)
    .attr("y1", 0)
    .attr("x2", CROSS_LINE_LENGTH)
    .attr("y2", 0)
    .attr("stroke", "#FBC900")
    .attr("stroke-width", CROSS_LINE_STROKE);

  // 纵线
  crossGroup.append("line")
    .attr("x1", 0)
    .attr("y1", -CROSS_LINE_LENGTH)
    .attr("x2", 0)
    .attr("y2", CROSS_LINE_LENGTH)
    .attr("stroke", "#FBC900")
    .attr("stroke-width", CROSS_LINE_STROKE);

  // 添加过渡动画
  crossGroup.transition()
    .delay(500)            // 适当延迟开始缩放
    .duration(1000)        // 动画时长
    .attr("transform", `translate(${cx}, ${cy}) scale(1)`)
    .attr("opacity", CROSS_LINE_OPACITY);

  // 添加透明圆形用于 hover 检测
  const tooltip = d3.select("#tooltip");

  crossGroup.append("circle")
    .attr("r", CROSS_LINE_LENGTH + 10)
    .attr("fill", "transparent")
    .style("cursor", "pointer")
    .on("mousemove", (event) => {
      tooltip
        .html("Lampedusa")
        .style("left", `${event.pageX + 10}px`)
        .style("top", `${event.pageY - 20}px`)
        .style("opacity", 1);
    })
    .on("mouseleave", () => {
      tooltip.style("opacity", 0);
    });
}

export { drawCross };
