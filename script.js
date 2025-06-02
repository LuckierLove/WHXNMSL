// 创建飘落效果
function createFallingEffect() {
  const effects = ['❄', '✿', '✦'];
  const container = document.querySelector('.falling-effects');

  // 在 createFallingEffect 函数内完整实现
  setInterval(() => {
    const element = document.createElement('div');
    element.className = 'falling-element' + (element.dataset.type === 'flower' ? ' horizontal-flower' : '');
    element.textContent = effects[Math.floor(Math.random() * effects.length)];
    element.style.left = Math.random() * 100 + '%';
    element.style.animationDuration = Math.random() * 3 + 2 + 's';
    element.style.color = `rgba(139,0,0,${Math.random()*0.5+0.5})`;
    
    // 新增奠花特效（100%概率测试用）
    const mourningFlower = document.createElement('div');
    mourningFlower.className = 'mourning-flower';
    mourningFlower.textContent = '奠';
    mourningFlower.style.left = Math.random() * 100 + '%';
    mourningFlower.style.animationDuration = '8s';
    container.appendChild(mourningFlower);
  }, 500);
}

window.onload = createFallingEffect;


// 上香献花功能
const incenseBtn = document.getElementById('incense-btn');
const flowerBtn = document.getElementById('flower-btn');
const incenseCountSpan = document.getElementById('incense-count');
const flowerCountSpan = document.getElementById('flower-count');
const memorialContainer = document.querySelector('.memorial-container');

let incenseCount = 0;
let flowerCount = 0;

incenseBtn.addEventListener('click', () => {
  incenseCount++;
  incenseCountSpan.textContent = incenseCount;
  createEffect('🔥', 'incense'); // 创建香的动态效果
});

flowerBtn.addEventListener('click', () => {
  flowerCount++;
  flowerCountSpan.textContent = flowerCount;
  createEffect('🌸', 'flower'); // 创建花的动态效果
});

function createEffect(emoji, type) {
  const effect = document.createElement('div');
  effect.className = `interaction-effect ${type}`;
  effect.textContent = emoji;
  
  // 随机位置，靠近按钮区域
  const btnRect = (type === 'incense' ? incenseBtn : flowerBtn).getBoundingClientRect();
  effect.style.left = `${btnRect.left + btnRect.width / 2 - 10 + (Math.random() * 40 - 20)}px`;
  effect.style.top = `${btnRect.top - 20 + (Math.random() * 20 - 10)}px`;
  
  document.body.appendChild(effect);

  // 动画结束后移除元素
  effect.addEventListener('animationend', function() {
    this.remove(); // 改用 this 代替 element
  });
}

// 为动态效果添加CSS样式 (需要添加到 styles.css)
/*
.interaction-effect {
  position: fixed;
  font-size: 30px;
  opacity: 1;
  animation: fadeOutUp 1.5s forwards;
  pointer-events: none;
  z-index: 10;
}

@keyframes fadeOutUp {
  0% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(-50px); opacity: 0; }
}
*/

// 在创建花朵元素时添加 data-type 属性
element.dataset.type = Math.random() < 0.5 ? 'flower' : 'normal';


// 移动窗口功能
document.addEventListener('DOMContentLoaded', function() {
  const movingWindow = document.getElementById('movingWindow');
  const closeButtons = document.querySelectorAll('.close-btn');
  const memorialContainer = document.querySelector('.memorial-container');
  const memorialPortrait = document.getElementById('memorial-portrait');
  
  // 为所有关闭按钮添加点击事件
  closeButtons.forEach(button => {
    button.addEventListener('click', function() {
      movingWindow.style.display = 'none';
      
      // 3秒后重新显示窗口
      setTimeout(() => {
        movingWindow.style.display = 'block';
      }, 3000);
    });
  });
  
  // 检测窗口是否与遗照重叠
  function checkOverlap() {
    // 获取遗照的位置和尺寸
    const portraitRect = memorialPortrait.getBoundingClientRect();
    const windowRect = movingWindow.getBoundingClientRect();
    
    // 检查是否重叠
    const isOverlapping = (
      windowRect.right > portraitRect.left &&
      windowRect.left < portraitRect.right &&
      windowRect.bottom > portraitRect.top &&
      windowRect.top < portraitRect.bottom
    );
    
    // 根据是否重叠添加或移除overlap类
    if (isOverlapping) {
      movingWindow.classList.add('overlap');
    } else {
      movingWindow.classList.remove('overlap');
    }
  }
  
  // 每16毫秒（约60fps）检查一次重叠状态
  setInterval(checkOverlap, 16);
});

  // 确保窗口不会遮挡遗照
  function adjustWindowPosition() {
    // 获取遗照容器的位置和尺寸
    const memorialRect = memorialContainer.getBoundingClientRect();
    const windowRect = movingWindow.getBoundingClientRect();
    
    // 计算遗照的安全区域（稍微扩大一些）
    const safeZone = {
      left: memorialRect.left - 50,
      right: memorialRect.right + 50,
      top: memorialRect.top - 50,
      bottom: memorialRect.bottom + 50
    };
    
    // 检查窗口是否进入安全区域
    const isInSafeZone = (
      windowRect.right > safeZone.left &&
      windowRect.left < safeZone.right &&
      windowRect.bottom > safeZone.top &&
      windowRect.top < safeZone.bottom
    );
    
    // 如果进入安全区域，临时调整窗口位置
    if (isInSafeZone) {
      // 将窗口移到页面左上角或右上角
      if (windowRect.left < window.innerWidth / 2) {
        movingWindow.style.left = '10px';
        movingWindow.style.top = '10px';
      } else {
        movingWindow.style.left = (window.innerWidth - windowRect.width - 10) + 'px';
        movingWindow.style.top = '10px';
      }
    }
  }
  
  // 每100毫秒检查一次窗口位置
  setInterval(adjustWindowPosition, 100);
// 这里不需要结束括号，因为它是多余的
