// js/scene-intro/drawCircle.js

import {
  cx, cy,
  LAUNCH_RADIUS,
  RANGE_CIRCLE_STROKE
} from "../config.js";

// 返回 Promise 以支持等待动画完成
function drawCircle(delay = 0) {
  return new Promise(resolve => {
    d3.select("#viz").select("svg")
      .append("circle")
      .attr("cx", cx)
      .attr("cy", cy)
      .attr("r", LAUNCH_RADIUS)
      .attr("fill", "none")
      .attr("stroke", "rgba(255,255,255,0.18)")
      .attr("stroke-width", RANGE_CIRCLE_STROKE)
      .attr("stroke-dasharray", "8 8")
      .attr("opacity", 0) // 起始透明
      .transition()
      .delay(delay)        // 延迟开始
      .duration(1200)      // 淡入持续时间
      .ease(d3.easeCubicInOut)
      .attr("opacity", 1)
      .on("end", () => {
        console.log("Circle appeared");
        resolve(); // 动画完成后再 resolve
      });
  });
}

export { drawCircle };
