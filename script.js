// 创建飘落效果
function createFallingEffect() {
  const effects = ['❄', '✿', '✦'];
  const container = document.querySelector('.falling-effects');

  setInterval(() => {
    const element = document.createElement('div');
    element.className = 'falling-element';
    element.textContent = effects[Math.floor(Math.random() * effects.length)];
    element.style.left = Math.random() * 100 + '%';
    element.style.animationDuration = Math.random() * 3 + 2 + 's';
    element.style.color = `rgba(139,0,0,${Math.random()*0.5+0.5})`;
    
    container.appendChild(element);
    
    element.addEventListener('animationend', () => {
      element.remove();
    });
  }, 500);
}

window.onload = createFallingEffect;