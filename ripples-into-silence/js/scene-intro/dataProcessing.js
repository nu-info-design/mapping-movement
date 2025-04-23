// js/scene-intro/dataProcessing.js

import {
  SCALE_DEAD_MIN, SCALE_DEAD_MAX,
  SCALE_DISTANCE_MIN, SCALE_DISTANCE_MAX,
  ANGLE_BUCKETS, INITIAL_INCIDENTS,
  FEATURED_DEAD, FEATURED_DISTANCE
} from "../config.js";

export async function loadAndProcessData(csvPath = "./data/lampedusa_nearby_incidents.csv") {
  const rawData = await d3.csv(csvPath);

  const events = rawData
    .filter(d =>
      d["Incident Year"] &&
      d["Total Number of Dead and Missing"] &&
      d["Distance_to_Lampedusa_km"]
    )
    .map(d => ({
      year: +d["Incident Year"],
      dead: +d["Total Number of Dead and Missing"],
      distance: +d["Distance_to_Lampedusa_km"]
    }));

  const rScale = d3.scaleSqrt()
    .domain(d3.extent(events, d => d.dead))
    .range([SCALE_DEAD_MIN, SCALE_DEAD_MAX]);

  const disappearScale = d3.scaleLinear()
    .domain(d3.extent(events, d => d.distance))
    .range([SCALE_DISTANCE_MIN, SCALE_DISTANCE_MAX])
    .clamp(true);

  const baseAngles = d3.range(events.length).map(i =>
    (i / events.length) * 2 * Math.PI + (Math.random() - 0.5) * 0.05
  );

  const paths = events.map((d, i) => ({
    ...d,
    angle: baseAngles[i],
    radius: rScale(d.dead),
    disappearRatio: disappearScale(d.distance)
  }));

  const yearEventCounts = {};
  paths.forEach(p => {
    yearEventCounts[p.year] = (yearEventCounts[p.year] || 0) + 1;
  });

  const allYears = Object.keys(yearEventCounts)
    .sort((a, b) => a - b)
    .map(Number);

  // 初始池：轻微 & 靠近
  const initialPool = paths.filter(p =>
    p.dead > 1 && p.dead <= FEATURED_DEAD && p.disappearRatio < FEATURED_DISTANCE
  );

  // 限制角度范围（从下往上发射的角度）
  const firstBatch = initialPool
    .filter(d => {
      const angleDeg = d.angle * 180 / Math.PI;
      return angleDeg >= 100 && angleDeg <= 260;
    })
    .slice(0, INITIAL_INCIDENTS);

  const remainingPaths = paths.filter(p => !firstBatch.includes(p));

  const buckets = Array.from({ length: ANGLE_BUCKETS }, () => []);
  remainingPaths.forEach(p => {
    const angleNorm = (p.angle % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
    const sector = Math.floor((angleNorm / (2 * Math.PI)) * ANGLE_BUCKETS);
    buckets[sector].push(p);
  });

  return {
    paths,
    allYears,
    yearEventCounts,
    firstBatch,
    remainingBuckets: buckets
  };
}
