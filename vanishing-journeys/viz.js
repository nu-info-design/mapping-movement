const width = 1100, height = 1100, innerRadius = 100, outerRadius = 520;
let allowHighlight = false, rotation = 0;
let globalLines = [], aggregatedByCountry = new Map();
const pointerAngle = 0;

const svg = d3.select("#chart").append("svg").attr("width", width).attr("height", height);
const mainGroup = svg.append("g").attr("transform", `translate(${width/2},${height/2})`);
const learnMoreBtn = document.getElementById("learnMoreBtn");
const backBtn = document.getElementById("backBtn");
const dashboard = document.querySelector(".dashboard");
const pointer = document.querySelector(".pointer-arrow");
const container = document.getElementById("mainContainer");



const causeIcon = {
  "Drowning": "Drowning.svg",
  "Vehicle accident / death linked to hazardous transport": "Vehicle accident.svg",
  "Violence": "Violence.svg",
  "Unknown": "Unknown.svg",
  "Harsh environmental conditions / lack of adequate shelter, food, water": "Harsh.svg",
  "Sickness / lack of access to adequate healthcare": "Sickness.svg",
  "Accidental death":"Accidental.svg"
};


learnMoreBtn.addEventListener("click", () => {
  container.style.transform = "translateX(-40vw)";
  learnMoreBtn.style.display = "none";
  backBtn.style.opacity = "0";  // 保证初始透明
backBtn.style.display = "block";  // 显示元素但透明

setTimeout(() => {
  backBtn.style.opacity = "1";  // 1.5秒后渐显
}, 1500);

  dashboard.style.display = "block";
  pointer.style.display = "block";
  allowHighlight = true;

  document.querySelector(".main-title").style.display = "none";
  document.querySelector(".subtitle").style.display = "none";
  document.getElementById("legendImage").style.display = "none";
});


backBtn.addEventListener("click", () => {
  container.style.transform = "translateX(0)";
  backBtn.style.transform = "translateX(20)";
  learnMoreBtn.style.display = "block";
  backBtn.style.display = "none";
  dashboard.style.display = "none";
  pointer.style.display = "none";
  allowHighlight = false;

  globalLines.forEach(line => {
    line.element.attr("stroke", "#FFFFFF").attr("stroke-width", 1.2);
  });
  d3.select(".info-box").html("Dashboard content here");
  
  document.querySelector(".main-title").style.display = "block";
  document.querySelector(".subtitle").style.display = "block";
  document.getElementById("legendImage").style.display = "block";

  globalLines.forEach(line =>
    line.element.attr("stroke", "#FFFFFF").attr("stroke-width", 1.2)
  );
  d3.select(".info-box").html("Dashboard content here");
});






dashboard.style.display = "none"; pointer.style.display = "none";

// 加载并嵌入旋转文本 SVG
d3.xml("Text.svg").then(data => {
  const imported = document.importNode(data.documentElement, true);
  d3.select(mainGroup.node())
    .append(() => imported)
    .attr("x", -475)    // 👈 调整位置
    .attr("y", -475)
    .attr("width", 1000)
    .attr("height", 1000);
});




const distanceMap = {
  "Mexico": 1500, "Guatemala": 2800, "Honduras": 3200,
  "Cuba": 2300, "Colombia": 4500, "Nicaragua": 4000,
  "Haiti": 3200, "Dominican Republic": 3500,
  "Ecuador": 5500, "Venezuela (Bolivarian Republic of)": 5000
};

const maxDistance = d3.max(Object.values(distanceMap));
const scaleDistance = km => innerRadius + (km / maxDistance) * (outerRadius - innerRadius);

d3.csv("Missing_Migrants_2024.csv").then(data => {
  data.forEach(d => {
    d["Number of Survivors"] = +d["Number of Survivors"] || 0;
    d["Total Number of Dead and Missing"] = +d["Total Number of Dead and Missing"] || 0;
    d["Number of Males"] = +d["Number of Males"] || 0;
    d["Number of Females"] = +d["Number of Females"] || 0;
    d.capitalDist = +d["DistanceFromCapital"] || 0;
  });

  const filtered = data.filter(d => distanceMap[d["Country of Origin"]]);
  filtered.forEach(d => d.originDistance = distanceMap[d["Country of Origin"]]);
  const grouped = d3.group(filtered, d => d["Country of Origin"]);

  // 汇总国家级数据
  grouped.forEach((group, country) => {
    aggregatedByCountry.set(country, {
      country,
      totalSurvivors: d3.sum(group, d => d["Number of Survivors"]),
      totalDeaths: d3.sum(group, d => d["Total Number of Dead and Missing"]),
      totalMales: d3.sum(group, d => d["Number of Males"]),
      totalFemales: d3.sum(group, d => d["Number of Females"]),
      fullRows: group
    });
  });

  // 国家按事件数量排序，组内按 capitalDist 排序
  const sortedFiltered = Array.from(grouped.entries())
    .map(([country, group]) => ({
      country,
      incidents: group.sort((a, b) => b.capitalDist - a.capitalDist)
    }))
    .sort((a, b) => b.incidents.length - a.incidents.length)
    .flatMap(d => d.incidents);

  const total = sortedFiltered.length;

  sortedFiltered.forEach((d, i) => {
    const angle = (i / total) * 2 * Math.PI;
    const fullRadius = scaleDistance(d.originDistance);
    const incidentRadius = scaleDistance(d.originDistance - d.capitalDist);

    const redLine = mainGroup.append("line")
      .attr("x1", Math.cos(angle) * fullRadius)
      .attr("y1", Math.sin(angle) * fullRadius)
      .attr("x2", Math.cos(angle) * incidentRadius)
      .attr("y2", Math.sin(angle) * incidentRadius)
      .attr("stroke", "#FFFFFF")
      .attr("stroke-width", 1.2);

    globalLines.push({ angle, data: d, element: redLine });

    mainGroup.append("line")
      .attr("x1", Math.cos(angle) * innerRadius)
      .attr("y1", Math.sin(angle) * innerRadius)
      .attr("x2", Math.cos(angle) * fullRadius)
      .attr("y2", Math.sin(angle) * fullRadius)
      .attr("stroke", "white")
      .attr("stroke-dasharray", "2,3")
      .attr("opacity", 0.3);

    mainGroup.append("circle")
      .attr("cx", Math.cos(angle) * incidentRadius)
      .attr("cy", Math.sin(angle) * incidentRadius)
      .attr("r", Math.sqrt(20 + Math.pow(d["Total Number of Dead and Missing"], 2)) / 2)
      .attr("fill", "#ff0000");

    if (d["Number of Survivors"] > 0) {
      mainGroup.append("circle")
        .attr("cx", Math.cos(angle) * innerRadius)
        .attr("cy", Math.sin(angle) * innerRadius)
        .attr("r", Math.sqrt(20 + (d["Number of Survivors"] / 200) * 100) / 2)
        .attr("fill", "#6CAE9C");
    }
  });

  // 🖱️ 鼠标拖动旋转支持
let isDragging = false;
let startAngle = 0;
let lastRotation = 0;

// 计算角度（中心为坐标原点）
function getAngle(x, y) {
  return Math.atan2(y - height / 2, x - width / 2);
}

// 添加 drag 行为
svg.call(d3.drag()
  .on("start", (event) => {
    isDragging = true;
    startAngle = getAngle(event.x, event.y);
    lastRotation = rotation;
  })
  .on("drag", (event) => {
    if (isDragging) {
      const currentAngle = getAngle(event.x, event.y);
      const angleDiff = (currentAngle - startAngle) * (180 / Math.PI); // 弧度转角度
      rotation = lastRotation + angleDiff;
      mainGroup.attr("transform", `translate(${width / 2}, ${height / 2}) rotate(${rotation})`);
    }
  })
  .on("end", () => {
    isDragging = false;
  })
);


  d3.timer(() => {
    rotation += 0.06;
    mainGroup.attr("transform", `translate(${width / 2}, ${height / 2}) rotate(${rotation})`);
    if (!allowHighlight) return;

    let bestMatch = null, minDiff = Infinity;
    globalLines.forEach(obj => {
      const rotatedAngle = (obj.angle + rotation * Math.PI / 180) % (2 * Math.PI);
      const diff = Math.abs(rotatedAngle - pointerAngle);
      if (diff < minDiff) {
        minDiff = diff;
        bestMatch = obj;
      }
    });

    if (bestMatch && minDiff < 0.03) {
      globalLines.forEach(line =>
        line.element.attr("stroke", line === bestMatch ? "#F27772" : "#FFFFFF")
                    .attr("stroke-width", line === bestMatch ? 2.5 : 1.2));
      const countryData = aggregatedByCountry.get(bestMatch.data["Country of Origin"]);
      if (countryData) updateDashboard(countryData, bestMatch.data);
    }
  });
});

// ============ Dashboard 渲染 ============
function updateDashboard(countrySummary, incidentRow) {
  const topBox = d3.select(".info-top").html("");
  const bottomBox = d3.select(".info-bottom").html("");


const causeShortNameMap = {
  "Drowning": "Drowning",
  "Violence": "Violence",
  "Vehicle accident / death linked to hazardous transport": "Vehicle accident",
  "Harsh environmental conditions / lack of adequate shelter, food, water": "Harsh environment",
  "Sickness / lack of access to adequate healthcare": "Sickness",
  "Mixed or unknown": "Unknown",
  "Unknown": "Unknown",
  "Accidental death": "Accident"
};

const causeIconMap = {
  "Drowning": "Drowning.svg",
  "Violence": "Violence.svg",
  "Vehicle accident": "Vehicle accident.svg",  // ✅ 修改为简化名
  "Sickness": "Sickness.svg",
  "Accident": "Accidental.svg",
  "Harsh environment": "Harsh.svg",            
  "Unknown": "Unknown.svg"
};


  const {
    country,
    totalSurvivors,
    totalDeaths,
    totalMales,
    totalFemales,
    fullRows
  } = countrySummary;

  const total = totalSurvivors + totalDeaths;
  const survivorRate = total > 0 ? totalSurvivors / total : 0;
  const arcSize = Math.round(survivorRate * 100);

  // 🔼 Top Dashboard 内容
  topBox.append("p").html(`<strong>Country:</strong> ${country}`);
  const arcContainer = topBox.append("div").style("margin", "12px 0");
  arcContainer.append("p").text(`Survivor Rate: ${(survivorRate * 100).toFixed(1)}%`);
  arcContainer.append("div")
    .style("width", "60px")
    .style("height", "60px")
    .style("border-radius", "50%")
    .style("border", "4px solid #6CAE9C")
    .style("background", `conic-gradient(#6CAE9C ${arcSize}%, transparent ${arcSize}% 100%)`);

  const genderDiv = topBox.append("div").style("margin-top", "12px");
  genderDiv.append("p").text("Gender Ratio:");
  const totalGender = totalMales + totalFemales;
  const femaleCount = totalGender ? Math.round((totalFemales / totalGender) * 10) : 0;
  const maleCount = 10 - femaleCount;
  const iconRow = genderDiv.append("div")
  .style("display", "flex")
  .style("gap", "4px");

for (let i = 0; i < femaleCount; i++) {
  iconRow.append("img")
    .attr("src", "Female.svg")
    .attr("width", 30)   // ⬅️ 比 Male 大
    .attr("height", 30)
  
}

for (let i = 0; i < maleCount; i++) {
  iconRow.append("img")
    .attr("src", "Male.svg")
    .attr("width", 30)
    .attr("height", 30);
}

// ✅ 简化 cause 显示名映射


// ✅ 聚合死亡原因数据
const causeCounts = {};
fullRows.forEach(row => {
  const cause = row["Cause of Death"] || "Unknown";
  const short = causeShortNameMap[cause] || cause;
  causeCounts[short] = (causeCounts[short] || 0) + 1;
});

// ✅ 转为数组，按数量排序
const causeData = Object.entries(causeCounts)
  .map(([cause, count]) => ({ cause, count }))
  .sort((a, b) => b.count - a.count);

// ✅ 图表布局参数
const svgWidth = 400;
const svgHeight = causeData.length * 26 + 20;
const margin = { top: 10, right: 10, bottom: 20, left: 150 };
const width = svgWidth - margin.left - margin.right;
const height = svgHeight - margin.top - margin.bottom;

// ✅ 图表容器
topBox.append("p").style("margin-top", "14px").html("<strong>Causes of Death</strong>");
const svg = topBox.append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// ✅ 横轴比例尺
const x = d3.scaleLinear()
  .domain([0, d3.max(causeData, d => d.count)])
  .range([0, width]);

// ✅ 纵轴比例尺
const y = d3.scaleBand()
  .domain(causeData.map(d => d.cause))
  .range([0, height])
  .padding(0.15);

// ✅ 左侧图标
svg.selectAll("image")
  .data(causeData)
  .enter()
  .append("image")
  .attr("xlink:href", d => causeIconMap[d.cause] || "Unknown.svg")
  .attr("x", -margin.left + 20)
  .attr("y", d => y(d.cause))
  .attr("width", 18)
  .attr("height", 18);

// ✅ 柱状图 bar
svg.selectAll("rect")
  .data(causeData)
  .enter()
  .append("rect")
  .attr("x", 0)
  .attr("y", d => y(d.cause))
  .attr("width", d => x(d.count))
  .attr("height", y.bandwidth())
  .attr("fill", "#F27772");

// ✅ 数值标签
svg.selectAll("text.count")
  .data(causeData)
  .enter()
  .append("text")
  .attr("x", d => x(d.count) + 4)
  .attr("y", d => y(d.cause) + y.bandwidth() / 2 + 4)
  .text(d => d.count)
  .style("fill", "#fff")
  .style("font-size", "11px")
  .attr("class", "count");

// ✅ Y 轴标签
svg.append("g")
  .call(d3.axisLeft(y).tickSize(0))
  .selectAll("text")
  .style("font-size", "11px")
  .style("fill", "#fff");

  // 🔽 Bottom Dashboard 内容（单条事件信息）
 // 🔽 Bottom Dashboard 内容（单条事件信息）
 const cause = incidentRow["Cause of Death"] || "Unknown";
 const deaths = +incidentRow["Total Number of Dead and Missing"] || 0;
 const survivors = +incidentRow["Number of Survivors"] || 0;
 const iconSrc = causeIcon[cause] || "Unknown.svg";
 
 // 🖼️ 图标展示（最多显示20个，10个一行）
 const maxIcons = 20;
 const iconsToShow = Math.min(deaths, maxIcons);
 const extraIcons = deaths > maxIcons ? deaths - maxIcons : 0;
 
 const iconWrap = bottomBox.append("div")
   .style("margin", "10px 0")
   .style("display", "flex")
   .style("flex-wrap", "wrap")
   .style("gap", "4px")
   .style("max-width", "220px"); // 限制换行宽度
 
 for (let i = 0; i < iconsToShow; i++) {
   iconWrap.append("img")
     .attr("src", iconSrc)
     .attr("width", 30)
     .attr("height", 30)
     .attr("title", cause);
 }
 
 if (extraIcons > 0) {
   iconWrap.append("span")
     .style("margin-left", "6px")
     .style("align-self", "center")
     .style("color", "#ccc")
     .style("font-size", "12px")
     .text(`+${extraIcons} more`);
 }
 
 // 损失信息文本
 bottomBox.append("p").html(`
   <strong>Cause:</strong> ${cause}<br/>
   <strong>Deaths/Missing:</strong> <span style="color: #F27772;">${deaths}</span><br/>
   <strong>Survivors:</strong> ${survivors}
 `);
 

  const linkURL = incidentRow["URL"]; // Replace "URL" with your actual column name if different
if (linkURL) {
  bottomBox.append("p").html(`
    <strong>Event Link:</strong> 
    <a href="${linkURL}" target="_blank" rel="noopener noreferrer">Click to learn more about this incident 🔗</a>
  `);
}
}


