// ========== 基本参数设置 Base Parameters ==========

// SVG Canvas
export const FRAME_WIDTH = 650;   // SVG 宽度 / SVG width
export const FRAME_HEIGHT = 650;  // SVG 高度 / SVG height

// Basic Graphics
export const cx = FRAME_WIDTH / 2;  // 中心点横坐标 / Center X
export const cy = FRAME_HEIGHT / 2; // 中心点纵坐标 / Center Y
export const LAUNCH_RADIUS = 300;       // 发射半径 / Launch radius
export const RANGE_CIRCLE_STROKE = 2;

export const CROSS_LINE_STROKE = 1.5;
export const CROSS_LINE_OPACITY = 0.75;
export const CROSS_LINE_LENGTH = 5;

// Data Processing
export const SCALE_DEAD_MIN = 5;
export const SCALE_DEAD_MAX = 25;
export const SCALE_DISTANCE_MIN = 0.1;
export const SCALE_DISTANCE_MAX = 0.9;

// Mapping Paths
export const ANGLE_BUCKETS = 20;
export const FEATURED_DEAD = 8;
export const FEATURED_DISTANCE = 0.4;
export const LAUNCH_INTERVAL = 50;  //ms

// Visualizing Tracking Lines
export const INITIAL_INCIDENTS = 3;      // 前几条事件慢速发射 / Number of early slow-launch events
export const FIRST_DELAY = 3000;     // 第一条的启动延迟（毫秒）/ Delay before first path
export const INITIAL_DELAY = 6000;   // 其他几条之间的延迟 / Delay between initial paths
export const LAUNCHING_SPEED = 0.04;

export const MAX_CURRENT = 5;     // 同时最多活动路径数 / Max number of concurrent animations
export const MIN_GAP = 400;          // 每次发射之间的最小间隔（毫秒）/ Minimum interval between launches

// // Visualizing Ripple Circles
// const RIPPLE_TRANS_DURATION = 300;
// const RIPPLE_SHOWING = 300;

// const RIPPLE_INNER_FADING_DURATION = 1000;
// const RIPPLE_INNER_OPA_ORG = 0.9;
// const RIPPLE_INNER_ENLARGE = 1.8;

// const RIPPLE_OUTER_FADING_DURATION = 1400;
// const RIPPLE_OUTER_OPA_ORG = 0.3;
// const RIPPLE_OUTER_ENLARGE = 3.0;

// Ripple 动画控制 Ripple Animation Settings
export const RIPPLE_TRANS_DURATION = 200;         // 初始缩放时间 Initial scale-in duration
export const RIPPLE_SHOWING = 200;                // 停留时间 Delay before fade out
export const RIPPLE_OUTER_FADING_DURATION = 1400; // 外圈淡出时间 Outer ripple fade out
export const RIPPLE_OUTER_OPA_ORG = 0.9;          // 外圈初始不透明度
export const RIPPLE_OUTER_ENLARGE = 3.0;          // 外圈最大扩张比例
//const RIPPLE_INNER_OPA_ORG = 0.15;          // 内圈最终不透明度 Inner stays
export const RIPPLE_INNER_STROKE = 2;


// Updating Stats
export const UPDATE_RATE = 850;
export const UPDATE_SPEED_YEAR = 675;
export const UPDATE_SPEED = 500;
export const START_YEAR = 2014; 