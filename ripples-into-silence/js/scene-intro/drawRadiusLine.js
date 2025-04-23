// js/scene-intro/drawRadiusLine.js

import { cx, cy, LAUNCH_RADIUS } from "../config.js";

export function drawRadiusLine() {
    const svg = d3.select("#viz").select("svg");

    // 定义线段起点（圆右半径中点）
    const centerX = cx + LAUNCH_RADIUS / 2;
    const centerY = cy;

    // 添加线条（初始为 0 长度 + 完全透明）
    const line = svg.append("line")
        .attr("x1", centerX)
        .attr("y1", centerY)
        .attr("x2", centerX)
        .attr("y2", centerY)
        .attr("stroke", "white")
        .attr("stroke-width", 1.5)
        .attr("opacity", 0)
        .lower();

    // 添加文字（初始透明）
    const label = svg.append("text")
        .attr("x", centerX)
        .attr("y", centerY - 10)
        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .attr("font-size", 11)
        .attr("font-family", "monospace")
        .attr("opacity", 0)
        .text("0 km")
        .lower();

    // 淡入动画（同时进行）
    line.transition()
        .duration(400)
        .attr("opacity", 0.85);

    label.transition()
        .duration(400)
        .attr("opacity", 0.85);

    // 从中心向两侧扩展
    const duration = 1600;
    const startTime = performance.now();

    function animate(now) {
        const elapsed = now - startTime;
        const t = Math.min(elapsed / duration, 1);
        const halfLength = (LAUNCH_RADIUS / 2) * t;

        line
            .attr("x1", centerX - halfLength)
            .attr("x2", centerX + halfLength);

        const km = Math.round(50 * t);
        label.text(`${km} km`);

        if (t < 1) {
            requestAnimationFrame(animate);
        } else {
            label.text("50 km");

            // 动画完成后延迟一段时间再淡出
            setTimeout(() => {
                line.transition()
                    .duration(1000)
                    .attr("opacity", 0)
                    .remove();

                label.transition()
                    .duration(1000)
                    .attr("opacity", 0)
                    .remove();
            }, 1500);
        }
    }

    requestAnimationFrame(animate);
}
