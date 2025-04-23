// js/scene-intro/controller.js

import { drawCanvas } from "./drawCanvas.js";
import { drawCircle } from "./drawCircle.js";
import { drawRadiusLine } from "./drawRadiusLine.js";
import { fadeInUI } from "./fadeUI.js";
import { drawPaths } from "./drawPaths.js";
import { loadAndProcessData } from "./dataProcessing.js";
import {
    initYearProgressBar,
    updateProgress,
    startLinearProgressBar
} from "./yearProgressBar.js";

import { showIslandSVG, showIslandLabel } from "./showIsland.js";

export async function runSceneIntro() {
    // 1. 贴上透明画布
    drawCanvas();

    // 2. 启动岛屿动画与文字动画（确保调用函数，不是重复调用）
    const svgPromise = showIslandSVG();     // 淡入 + 缩放 + 十字出现
    const labelPromise = showIslandLabel(); // 文本淡入淡出

    // 3. 等岛屿和文字动画完成（等待上面声明的 promise，而不是再次调用函数）
    await Promise.all([svgPromise, labelPromise]);

    // 4. 绘制发射范围圆（淡入动画 + 等待结束）
    await drawCircle(2000); // 内部已有延时 + 动画时长共 3.2s

    // 5. 再延迟一小段时间后绘制半径线
    await new Promise(res => setTimeout(res, 0));
    drawRadiusLine();

    // 6. 再等待半径线完全结束（你在 drawRadiusLine 中设置了：动画 1.6s + 停留 2.5s + 淡出 1s = 共 5.1s）
    await new Promise(res => setTimeout(res, 3600));

    // 7. 淡入 UI（已在 fadeUI.js 中处理分步顺序）
    await fadeInUI();

    // 8. 进入主流程
    const {
        allYears,
        yearEventCounts,
        firstBatch,
        remainingBuckets
    } = await loadAndProcessData();

    initYearProgressBar(allYears);
    startLinearProgressBar();

    setTimeout(() => {
        updateProgress(0);
    }, 2000);

    drawPaths({
        allYears,
        yearEventCounts,
        firstBatch,
        remainingBuckets
    });
}