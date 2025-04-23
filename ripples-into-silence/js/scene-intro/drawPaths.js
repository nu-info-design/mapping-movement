// js/scene-intro/drawPaths.js

import {
  ANGLE_BUCKETS, LAUNCH_INTERVAL, LAUNCH_RADIUS,
  INITIAL_DELAY, FIRST_DELAY, MAX_CURRENT, MIN_GAP
} from "../config.js";

import { launchPathWithStats } from "./launchPathWithStats.js";

// 全局状态对象，用于跨函数共享当前年份与当前年内事件计数
export const state = {
  currentYearIndex: 0,
  eventsLaunchedThisYear: 0
};

// 第一幕路径发射主逻辑函数
export function drawPaths({ allYears, yearEventCounts, firstBatch, remainingBuckets }) {
  let active = 0;
  let lastLaunchTime = 0;
  let gradCount = 0;

  const sectorOrder = d3.shuffle(d3.range(ANGLE_BUCKETS));
  let sectorPointer = 0;

  // === 第一阶段：初始慢速发射几条路径 ===
  function launchInitial() {
    let i = 0;
    setTimeout(() => {
      // 第一个发射
      launchPathWithStats({
        d: firstBatch[i],
        gradId: `grad${gradCount++}`,
        allYears,
        yearEventCounts,
        showLabel: true,
        speed: 0.25,
        getCurrentYearIndex: () => state.currentYearIndex,
        getEventsLaunchedThisYear: () => state.eventsLaunchedThisYear,
        advanceYear: () => state.currentYearIndex++,
        resetCounter: () => state.eventsLaunchedThisYear = 0,
        incrementCounter: () => ++state.eventsLaunchedThisYear,
        onComplete: () => active--
      });
      i++;

      // 剩余路径依次发射
      const timer = setInterval(() => {
        if (i >= firstBatch.length) {
          clearInterval(timer);
          launchGrouped(); // 进入第二阶段
          return;
        }
        launchPathWithStats({
          d: firstBatch[i],
          gradId: `grad${gradCount++}`,
          allYears,
          yearEventCounts,
          showLabel: true,
          speed: 0.25,
          getCurrentYearIndex: () => state.currentYearIndex,
          getEventsLaunchedThisYear: () => state.eventsLaunchedThisYear,
          advanceYear: () => state.currentYearIndex++,
          resetCounter: () => state.eventsLaunchedThisYear = 0,
          incrementCounter: () => ++state.eventsLaunchedThisYear,
          onComplete: () => active--
        });
        i++;
      }, INITIAL_DELAY);
    }, FIRST_DELAY);
  }

  // === 第二阶段：分扇区轮询发射剩余路径 ===
  function launchGrouped() {
    const interval = setInterval(() => {
      const now = Date.now();
      if (active >= MAX_CURRENT || now - lastLaunchTime < MIN_GAP) return;

      let found = false, tries = 0;
      while (!found && tries < ANGLE_BUCKETS) {
        const sectorIndex = sectorOrder[sectorPointer];
        const bucket = remainingBuckets[sectorIndex];

        if (bucket.length > 0) {
          const d = bucket.shift();
          active++;
          lastLaunchTime = now;

          launchPathWithStats({
            d,
            gradId: `grad${gradCount++}`,
            allYears,
            yearEventCounts,
            getCurrentYearIndex: () => state.currentYearIndex,
            getEventsLaunchedThisYear: () => state.eventsLaunchedThisYear,
            advanceYear: () => state.currentYearIndex++,
            resetCounter: () => state.eventsLaunchedThisYear = 0,
            incrementCounter: () => ++state.eventsLaunchedThisYear,
            onComplete: () => active--
          });

          found = true;
        }

        sectorPointer = (sectorPointer + 1) % ANGLE_BUCKETS;
        tries++;
      }

      // 所有 bucket 发射完毕后清除计时器
      if (remainingBuckets.every(b => b.length === 0)) clearInterval(interval);
    }, LAUNCH_INTERVAL);
  }

  // 启动动画流程
  launchInitial();
}