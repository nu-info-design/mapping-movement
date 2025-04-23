// js/main.js

import { runSceneIntro } from "./scene-intro/controller.js";
import { drawDeathSurvivalChart } from './scene-intro/deathSurvivalChart.js';
import { startRippleBackground } from './scene-intro/rippleBackground.js';


window.addEventListener("DOMContentLoaded", () => {
  startRippleBackground("#ripple-background");
});



// 绘制死亡与存活图表
drawDeathSurvivalChart("#death-chart-container");

let animationStarted = false;
let allowAutoAnimation = true; // 默认允许动画

function lockScroll() {
  document.body.style.overflow = 'hidden';
  const nav = document.getElementById('main-nav');
  if (nav) nav.style.pointerEvents = 'none';
}

function unlockScroll() {
  document.body.style.overflow = '';
  const nav = document.getElementById('main-nav');
  if (nav) nav.style.pointerEvents = 'auto';
}

function showReplayButton() {
  const btn = document.getElementById('replay-btn');
  if (btn) {
    btn.style.opacity = 1;
    btn.style.pointerEvents = 'auto';
  }
}

function hideReplayButton() {
  const btn = document.getElementById('replay-btn');
  if (btn) {
    btn.style.opacity = 0;
    btn.style.pointerEvents = 'none';
  }
}

function resetVizArea() {
  const viz = document.getElementById('viz');
  if (viz) viz.innerHTML = '';
}

window.addEventListener('scroll', () => {
  const nav = document.querySelector('#main-nav');
  const navLinks = document.querySelectorAll('#main-nav .nav-link');
  const navTop = nav.getBoundingClientRect().top;

  if (navTop <= 0) {
    nav.classList.add('sticky-top', 'visible');
    navLinks.forEach((link, i) => {
      setTimeout(() => {
        link.classList.add('visible');
      }, i * 150);
    });

    if (!animationStarted && allowAutoAnimation) {
      animationStarted = true;
      lockScroll();
      runSceneIntro().then(() => {
        unlockScroll();
        showReplayButton();
      });
    }
  }

  const windowH = window.innerHeight;

  const steps = document.querySelectorAll('.fade-step');
  steps.forEach((step, i) => {
    const rect = step.getBoundingClientRect();
    const triggerPoint = windowH * 0.95 - i * 15;
    if (rect.top < triggerPoint) {
      step.classList.add('visible');
    }
  });

  const introSteps = document.querySelectorAll('.intro-step');
  introSteps.forEach((step, i) => {
    if (!step) return;
    const rect = step.getBoundingClientRect();
    const triggerPoint = windowH * 0.8 - i * 30;
    if (step && rect.top < triggerPoint) {
      step.classList.add("visible");
    }
  });

  const rippleBG = document.getElementById("ripple-background");
  const cover = document.getElementById("cover");
  const intro = document.getElementById("intro");

  const coverRect = cover.getBoundingClientRect();
  const introRect = intro.getBoundingClientRect();

  const coverInView = coverRect.bottom > 0 && coverRect.top < windowH;
  const introInView = introRect.bottom > 0 && introRect.top < windowH;

  if (coverInView || introInView) {
    rippleBG.classList.remove("hidden");
  } else {
    rippleBG.classList.add("hidden");
  }
});

function autoScrollAndStartAnimation() {
  const nav = document.querySelector('#main-nav');
  const navLinks = document.querySelectorAll('#main-nav .nav-link');

  const check = () => {
    if (animationStarted || !nav || !allowAutoAnimation) return;

    const navTop = nav.getBoundingClientRect().top;

    if (navTop < window.innerHeight * 0.6 && navTop > 0) {
      const scrollTarget = window.scrollY + navTop;

      window.scrollTo({
        top: scrollTarget,
        behavior: 'smooth',
      });

      setTimeout(() => {
        if (animationStarted) return;

        animationStarted = true;
        nav.classList.add('sticky-top', 'visible');
        navLinks.forEach((link, i) => {
          setTimeout(() => {
            link.classList.add('visible');
          }, i * 150);
        });

        lockScroll();
        runSceneIntro().then(() => {
          unlockScroll();
          showReplayButton();
        });
      }, 800);
    } else {
      requestAnimationFrame(check);
    }
  };

  requestAnimationFrame(check);
}

// ✅ 页面加载后判断是否顶部，不是则禁用自动动画
window.addEventListener('load', () => {
  if (window.scrollY > 100) {
    allowAutoAnimation = false; // 页面刷新非顶部，禁止自动锁屏动画
  }

  setTimeout(() => {
    autoScrollAndStartAnimation();
  }, 200);
});

// 手动触发一次 scroll 检查
window.dispatchEvent(new Event('scroll'));

const scrollySteps = document.querySelectorAll('.scrolly-step');
const imgFront = document.getElementById('scrolly-image-front');
const imgBack = document.getElementById('scrolly-image-back');
const scrollyGraphic = document.querySelector('.scrolly-graphic');
const scrollyContainer = document.querySelector('.scrolly-section');

let currentImage = ''; // 当前显示图

if (scrollySteps.length && imgFront && imgBack && scrollyGraphic) {
  // 控制图像淡出（当整个 scrolly 区域滚出时）
  window.addEventListener('scroll', () => {
    const rect = scrollyContainer.getBoundingClientRect();
    const screenH = window.innerHeight;

    const fullyInView = rect.top < screenH * 0.5 && rect.bottom > screenH * 0.5;

    if (fullyInView) {
      scrollyGraphic.classList.remove('hidden');
    } else {
      scrollyGraphic.classList.add('hidden');
    }
  });

  // 控制段落切图 + 单张图 fade
  scrollySteps.forEach((step, index) => {
    let topMargin = '-60%';
    let bottomMargin = '-60%';
  
    // 为第一个图延后出现（靠下）
    if (index === 0) {
      topMargin = '-40%'; 
      bottomMargin = '-30%';
    }
  
    // 为最后一个图提早消失（靠上）
    if (index === scrollySteps.length - 1) {
      topMargin = '-40%'; 
      bottomMargin = '-40%';
    }
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          scrollySteps.forEach(step => step.classList.remove('active'));
          entry.target.classList.add('active');
  
          const imgId = entry.target.dataset.img;
          const newSrc = `./assets/${imgId}.svg`;
  
          if (newSrc === currentImage) return;
          currentImage = newSrc;
  
          imgBack.src = imgFront.src;
          imgBack.classList.add('visible');
          imgFront.classList.remove('visible');
  
          imgFront.src = newSrc;
          imgFront.alt = imgId;
  
          imgFront.onload = () => {
            imgFront.classList.add('visible');
            imgBack.classList.remove('visible');
          };
        }
      });
    }, {
      rootMargin: `${topMargin} 0px ${bottomMargin} 0px`,
      threshold: 0
    });
  
    observer.observe(step);
  });
  
} 