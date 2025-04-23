// js/scene-intro/launchPathWithStats.js

import { renderPath } from "./renderPath.js";
import { intro_defs, intro_layer } from "./drawCanvas.js";
import {
    updateIncidentCount,
    updateDeathCount,
    updateYearProgress
} from "./updateStats.js";
import { updateProgress } from "./yearProgressBar.js";

export function launchPathWithStats({
    d,
    gradId,
    allYears,
    yearEventCounts,
    getCurrentYearIndex,
    getEventsLaunchedThisYear,
    advanceYear,
    resetCounter,
    incrementCounter,
    onComplete,
    speed = 1,
    showLabel = false
}) {
    renderPath({
        d,
        gradId,
        defs: intro_defs,
        layer: intro_layer,
        speed,
        showLabel,
        onEnd: () => {
            updateIncidentCount(d);
            updateDeathCount(d);

            updateYearProgress(
                d,
                allYears,
                yearEventCounts,
                getCurrentYearIndex,
                getEventsLaunchedThisYear,
                advanceYear,
                resetCounter,
                incrementCounter,
                updateProgress
            );

            if (onComplete) onComplete();
        }
    });
}

