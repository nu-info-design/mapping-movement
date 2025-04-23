// js/scene-intro/fadeUI.js

export function fadeInUI() {
    return new Promise(resolve => {
        // 左上角淡入
        d3.select("#incident-count")
            .transition().duration(800).style("opacity", 1);

        d3.select("#left .label")
            .transition().duration(800).style("opacity", 1);

        // 右上角稍后淡入
        setTimeout(() => {
            d3.select("#death-count")
                .transition().duration(800).style("opacity", 1);

            d3.select("#right .label")
                .transition().duration(800).style("opacity", 1);
        }, 1000); // 1 秒后

        // 底部进度条再稍晚一点
        setTimeout(() => {
            d3.select("#year-progress-bar")
                .transition().duration(800).style("opacity", 1);

            d3.select("#year-pop-labels")
                .transition().duration(800).style("opacity", 1);
        }, 2000); // 再等 1 秒

        // 所有动画结束后 resolve
        setTimeout(() => {
            resolve();
        }, 3000); // 总共 3 秒
        console.log("finish label")
    });
}
