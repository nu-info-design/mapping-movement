// js/scene-intro/renderPath.js

import {
  cx, cy,
  LAUNCH_RADIUS, LAUNCHING_SPEED,
  RIPPLE_INNER_STROKE, RIPPLE_TRANS_DURATION,
  RIPPLE_OUTER_OPA_ORG, RIPPLE_SHOWING,
  RIPPLE_OUTER_FADING_DURATION, RIPPLE_OUTER_ENLARGE
} from "../config.js";

export function renderPath({ d, gradId, defs, layer, showLabel = false, speed = 1, onEnd }) {
  const fullR = LAUNCH_RADIUS;
  const visibleR = fullR * d.disappearRatio;

  const xStart = cx + Math.cos(d.angle) * fullR;
  const yStart = cy + Math.sin(d.angle) * fullR;
  const xEnd = cx + Math.cos(d.angle) * visibleR;
  const yEnd = cy + Math.sin(d.angle) * visibleR;

  const grad = defs.append("linearGradient")
    .attr("id", gradId)
    .attr("gradientUnits", "userSpaceOnUse");

  grad.append("stop").attr("offset", "0%").attr("stop-color", "white").attr("stop-opacity", 0);
  grad.append("stop").attr("offset", "100%").attr("stop-color", "white").attr("stop-opacity", 1);

  const path = layer.append("line")
    .attr("stroke", `url(#${gradId})`)
    .attr("stroke-width", 2)
    .attr("stroke-linecap", "round")
    .attr("opacity", 0.9);

  // 文字提示元素（无背景，仅显示文字）
  let label;
  if (showLabel) {
    label = layer.append("text")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "central")
      .attr("fill", "#ffffff")
      .attr("font-size", 11)
      .attr("font-weight", "500")
      .attr("stroke", "rgba(0,0,0,0.5)")
      .attr("stroke-width", 0.6)
      .style("opacity", 0)  // 初始透明
      .style("pointer-events", "none")
      .style("font-family", "monospace")
      .text("...");

  }

  let progress = 0;
  let phase = "forward";
  let flashDrawn = false;

  // === 添加 hover 透明圆圈（用于交互） ===
  const hoverCircle = layer.append("circle")
    .attr("cx", xEnd)
    .attr("cy", yEnd)
    .attr("r", d.radius + 8) // 稍大一点好点中
    .attr("fill", "transparent")
    .style("cursor", "pointer");

  const tooltip = d3.select("#tooltip");

  hoverCircle
    .on("mousemove", (event) => {
      tooltip
        //.html(`Distance: ${d.distance.toFixed(1)} km<br>Dead/Missing: ${d.dead}`)
        .html(`Year: ${d.year}<br>Distance: ${d.distance.toFixed(1)} km<br>Dead/Missing: ${d.dead}`)
        .style("left", `${event.pageX + 10}px`)
        .style("top", `${event.pageY - 20}px`)
        .style("opacity", 1);
    })
    .on("mouseleave", () => {
      tooltip.style("opacity", 0);
    });


  function animate() {
    progress += LAUNCHING_SPEED * speed;

    if (phase === "forward") {
      let labelFadedIn = false;

      const t = Math.min(progress, 1);
      const xCurrent = xStart + (xEnd - xStart) * t;
      const yCurrent = yStart + (yEnd - yStart) * t;

      path.attr("x1", xStart).attr("y1", yStart).attr("x2", xCurrent).attr("y2", yCurrent);
      grad.attr("x1", xStart).attr("y1", yStart).attr("x2", xCurrent).attr("y2", yCurrent);

      if (showLabel) {
        const dist = (50 * (1 - t) + d.distance * t).toFixed(2);
        label.text(`${dist} km`);

        const offset = 26;
        let offsetX = 0;
        let offsetY = 0;
        if (d.angle >= 3.25) {
          offsetX = Math.cos(d.angle + Math.PI / 2) * offset - 8;
          offsetY = Math.sin(d.angle + Math.PI / 2) * offset + 5;
        }
        else if (d.angle >= 3 && d.angle < 3.25) {
          offsetX = Math.cos(d.angle + Math.PI / 2) * offset;
          offsetY = Math.sin(d.angle + Math.PI / 2) * offset + 5;
        }
        else {
          offsetX = Math.cos(d.angle + Math.PI / 2) * offset - 15;
          offsetY = Math.sin(d.angle + Math.PI / 2) * offset + 10;
        }

        label.attr("x", xCurrent + offsetX)
          .attr("y", yCurrent + offsetY);

        // 首次淡入
        if (!labelFadedIn) {
          labelFadedIn = true;
          setTimeout(() => {
            label.transition()
              .duration(200)
              .style("opacity", 1);
          }, 200);

        }
      }

      if (t >= 1) {
        phase = "shrink";
        progress = 0;
      }
    }

    else if (phase === "shrink") {
      const t = Math.min(progress, 1);
      const xShrink = xStart + (xEnd - xStart) * t;
      const yShrink = yStart + (yEnd - yStart) * t;

      path.attr("x1", xShrink).attr("y1", yShrink).attr("x2", xEnd).attr("y2", yEnd);
      grad.attr("x1", xShrink).attr("y1", yShrink).attr("x2", xEnd).attr("y2", yEnd);

      if (t >= 1 && !flashDrawn) {
        flashDrawn = true;

        // 切换为显示死亡人数 + 淡出
        if (showLabel) {
          const offset = 26;
          let offsetX = 0;
          let offsetY = 0;
          if (d.angle >= 3.25) {
            offsetX = Math.cos(d.angle + Math.PI / 2) * offset - 8;
            offsetY = Math.sin(d.angle + Math.PI / 2) * offset + 5;
          }
          else if (d.angle >= 3 && d.angle < 3.25) {
            offsetX = Math.cos(d.angle + Math.PI / 2) * offset;
            offsetY = Math.sin(d.angle + Math.PI / 2) * offset + 5;
          }
          else {
            offsetX = Math.cos(d.angle + Math.PI / 2) * offset - 15;
            offsetY = Math.sin(d.angle + Math.PI / 2) * offset + 10;
          }

          // 旧 label 淡出
          label.transition()
            .duration(300)
            .style("opacity", 0)
            .remove();

          // 创建新 label 并淡入 + 延时淡出
          const newLabel = layer.append("text")
            .attr("x", xEnd + offsetX)
            .attr("y", yEnd + offsetY)
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "central")
            .attr("fill", "#ffffff")
            .attr("font-size", 11)
            .attr("font-weight", "500")
            .attr("stroke", "rgba(0,0,0,0.5)")
            .attr("stroke-width", 0.6)
            .style("opacity", 0)
            .style("pointer-events", "none")
            .style("font-family", "monospace")
            .text(`${d.dead} dead`);

          newLabel.transition()
            .duration(300)
            .style("opacity", 1)
            .transition()
            .delay(800)
            .duration(300)
            .style("opacity", 0)
            .remove();
        }

        // 涟漪动画
        const rippleGroup = layer.append("g").attr("transform", `translate(${xEnd}, ${yEnd})`);

        let opacity;
        if (d.dead <= 5) opacity = 0.1;
        else if (d.dead <= 10) opacity = 0.15;
        else if (d.dead <= 20) opacity = 0.2;
        else if (d.dead <= 50) opacity = 0.25;
        else if (d.dead <= 100) opacity = 0.3;
        else opacity = 0.4;
        console.log(d.angle);
        const inner = rippleGroup.append("circle")
          .attr("r", 0)
          .attr("fill", "none")
          .attr("stroke", "white")
          .attr("stroke-width", RIPPLE_INNER_STROKE)
          .attr("opacity", 0);

        inner.transition()
          .duration(RIPPLE_TRANS_DURATION)
          .attr("r", d.radius)
          .attr("opacity", opacity);

        const outer = rippleGroup.append("circle")
          .attr("r", 0)
          .attr("fill", "white")
          .attr("opacity", 0);

        outer.transition()
          .duration(RIPPLE_TRANS_DURATION)
          .attr("r", d.radius)
          .attr("opacity", RIPPLE_OUTER_OPA_ORG)
          .transition()
          .delay(RIPPLE_SHOWING)
          .duration(RIPPLE_OUTER_FADING_DURATION)
          .attr("r", d.radius * RIPPLE_OUTER_ENLARGE)
          .attr("opacity", 0)
          .tween("blur", () => t => outer.style("filter", `blur(${(t * 4).toFixed(2)}px)`))
          .remove();

        path.remove();

        setTimeout(() => {
          if (onEnd) onEnd();
        }, 500);

        return;
      }
    }

    if (!flashDrawn) requestAnimationFrame(animate);
  }

  animate();
}
