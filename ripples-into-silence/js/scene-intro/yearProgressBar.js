// js/scene-intro/yearProgressBar.js

let allYears = [];
let yearMap = [];
let progressStartTime = null;
let totalDuration = 60000;

// 使用百分比（0~1）自定义每年位置
const yearLabelPositions = {
    2014: 0.05,
    2015: 0.148,
    2016: 0.245,
    2017: 0.385,
    2018: 0.42,
    2019: 0.444,
    2020: 0.468,
    2021: 0.493,
    2022: 0.528,
    2023: 0.625,
    2024: 0.895
};

// ===== 初始化年份标签 =====
export function initYearProgressBar(years) {
    allYears = years;
    const container = d3.select("#year-pop-labels");
    container.html("");
    yearMap = [];

    allYears.forEach((year) => {
        const proportion = yearLabelPositions[year];
        if (proportion == null) return; // 没定义位置就跳过

        const label = container.append("div")
            .attr("class", "year-pop hidden") // 一开始就隐藏
            .attr("id", `pop-${year}`)
            .style("left", `${proportion * 100}%`)
            .style("top", "-34px")
            .text(year);

        // 只在成功创建 label 后 push
        if (label.node()) {
            yearMap.push({ year, label, shown: false });
        }
    });
}

// ===== 匀速推进进度条 =====
export function startLinearProgressBar(duration = totalDuration) {
    totalDuration = duration;
    const bar = d3.select("#year-progress-fill").node();
    progressStartTime = performance.now();

    function animate(now) {
        const elapsed = now - progressStartTime;
        const progress = Math.min(elapsed / totalDuration, 1);
        bar.style.width = `${progress * 100}%`;

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            // 动画结束后：让当前高亮年份也淡出
            const activeLabel = d3.select(".year-pop.active");
            if (!activeLabel.empty()) {
                activeLabel.classed("active", false).classed("inactive", true);
            }
            setTimeout(() => {
                // ✅ 添加淡出 class
                d3.select("#year-progress-fill").classed("fade-out", true);
              }, 1000); // 动画结束后延迟 1s 开始淡出
              
        }
    }

    requestAnimationFrame(animate);
}

// ===== 高亮当前年份 =====
export function updateProgress(currentYearIndex) {
    if (!yearMap.length) return;

    // 遍历年份标签，处理状态切换
    yearMap.forEach((d, i) => {
        if (i < currentYearIndex) {
            d.label.classed("hidden", false).classed("inactive", true).classed("active", false);
        } else if (i > currentYearIndex) {
            d.label.classed("hidden", true).classed("inactive", false).classed("active", false);
        }
    });

    // 等待淡化动画结束后再高亮当前年份
    const transitionDelay = 300;
    setTimeout(() => {
        const d = yearMap[currentYearIndex];
        if (d) {
            d.label.classed("hidden", false).classed("inactive", false).classed("active", true);
        }
    }, transitionDelay);
}
