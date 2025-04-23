// js/scene-intro/showIsland.js

import { drawCross } from "./drawCross.js";

export function showIslandSVG() {
    return new Promise(resolve => {
        const islandWrapper = d3.select("#lampedusa-intro .island-wrapper");

        // 立即显示，不再延迟和淡入
        islandWrapper.classed("show", true);

        // 缩放为十字（0.8s 后）
        setTimeout(() => {
            islandWrapper.classed("shrink", true);

            // 缩放后绘制十字
            setTimeout(() => {
                drawCross();
                resolve();
            }, 0);
        }, 2000); // 整体缩短等待时间
    });
}

// 岛屿文字动画（立即出现 + 停留 + 淡出）
export function showIslandLabel() {
    return new Promise(resolve => {
        const label = d3.select(".lampedusa-label");

        // 使用 class 控制淡入
        label.classed("show", true);

        // 停留后淡出
        setTimeout(() => {
            label.classed("show", false);
        }, 3500);

        // 动画完成后 resolve
        setTimeout(() => {
            resolve();
        }, 1500);
    });
}
