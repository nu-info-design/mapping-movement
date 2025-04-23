// js/scene-intro/updateStats.js
import { updateProgress } from "./yearProgressBar.js";

// 全局变量用于累计统计，避免 text() 冲突
let totalIncidents = 0;

const yearDelayOverrides = {
    2017: -2000,
    2018: 0,
    2019: 1000,
    2020: 1500,
    2021: 1000,
    2022: 1000
};

// 更新事件计数器
export function updateIncidentCount(d) {
    const incidentCounter = d3.select("#incident-count");
    const from = totalIncidents;
    const to = ++totalIncidents;

    const format = d3.format("d");

    incidentCounter.transition().duration(800).tween("text", function () {
        const interp = d3.interpolateNumber(from, to);
        return function (t) {
            this.textContent = format(interp(t));
            //this.textContent = Math.floor(interp(t));
        };
    });
}

// 更新死亡/失踪人数
let totalDeaths = 0;
let currentAnimatedValue = 0;
let targetValue = 0;
let animationFrameId = null;

export function updateDeathCount(d) {
    targetValue = totalDeaths += d.dead;

    if (animationFrameId !== null) return;

    const element = d3.select("#death-count").node();
    const duration = 500;
    let start = null;

    function animate(timestamp) {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;
        const t = Math.min(elapsed / duration, 1);
        const eased = t * (2 - t);

        const current = currentAnimatedValue + (targetValue - currentAnimatedValue) * eased;
        element.textContent = Math.floor(current).toLocaleString();

        if (t < 1) {
            animationFrameId = requestAnimationFrame(animate);
        } else {
            currentAnimatedValue = targetValue;
            element.textContent = targetValue.toLocaleString();
            animationFrameId = null;
        }
    }

    // 延迟启动动画：设置你想要的偏移（比如 100ms）
    setTimeout(() => {
        animationFrameId = requestAnimationFrame(animate);
    }, 100); // <-- 调整这里：100ms 表示比事件数慢一点
}


// export function updateDeathCount(d) {
//   const deathCounter = d3.select("#death-count");
//   const from = totalDeaths;
//   const to = totalDeaths += d.dead;

//   const format = d3.format("d");

//   deathCounter.transition().duration(1200).tween("text", function () {
//     const interp = d3.interpolateNumber(from, to);
//     return function (t) {
//         this.textContent = format(interp(t));
//       //this.textContent = Math.floor(interp(t)).toLocaleString();
//     };
//   });
// }

// ================== 年份推进逻辑 + 进度条动画 ==================
export function updateYearProgress(
    d,
    allYears,
    yearEventCounts,
    getCurrentYearIndex,
    getEventsLaunchedThisYear,
    advanceYear,
    resetCounter,
    incrementCounter,
    updateProgress
) {
    incrementCounter();

    const currentYear = allYears[getCurrentYearIndex()];
    const totalThisYear = yearEventCounts[currentYear];

    if (getEventsLaunchedThisYear() >= totalThisYear) {
        resetCounter();
        advanceYear();

        const newIndex = getCurrentYearIndex();
        if (newIndex < allYears.length) {
            const nextYear = allYears[newIndex];
            const delay = yearDelayOverrides[nextYear] || 0;

            setTimeout(() => {
                if (updateProgress) updateProgress(newIndex);
            }, 1200 + delay);
        }
    }
}
