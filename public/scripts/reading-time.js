// public/scripts/reading-time.js
function addReadingTime() {
  // 首页不显示阅读时间
  if (window.location.pathname === '/' || window.location.pathname === '/en/') return;

  const content = document.querySelector('.sl-markdown-content, main');
  if (!content) return;

  const text = content.textContent || '';

  // 统计中文字符（基本汉字范围）
  const chineseChars = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
  // 统计英文字母（不区分大小写）
  const englishChars = (text.match(/[a-zA-Z]/g) || []).length;

  // 根据内容的主要语言决定显示单位
  const isChineseContent = chineseChars > englishChars;
  const label = isChineseContent ? '分钟阅读' : 'min read';

  // 计算阅读时间（保留原算法：取中文时间和英文时间的较大值）
  const chineseTime = chineseChars / 350;      // 中文阅读速度 350 字/分钟
  const englishWords = text.trim().split(/\s+/).filter(w => w.length > 0).length;
  const englishTime = englishWords / 200;      // 英文阅读速度 200 词/分钟
  const totalMinutes = Math.max(chineseTime, englishTime);
  const readingTime = Math.max(1, Math.round(totalMinutes));

  // 创建阅读时间徽章
  const badge = document.createElement('div');
  badge.style.cssText = `
    display: inline-block;
    padding: 4px 14px;
    margin-bottom: 16px;
    background: var(--sl-color-gray-6);
    color: var(--sl-color-white);
    border-radius: 20px;
    font-size: 0.85rem;
    opacity: 0.8;
  `;
  badge.textContent = `${readingTime} ${label}`;

  // 插入到标题前
  const title = content.querySelector('h1, h2, h3');
  if (title) {
    title.parentNode.insertBefore(badge, title);
  } else {
    content.prepend(badge);
  }
}

// 确保 DOM 加载后执行
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', addReadingTime);
} else {
  addReadingTime();
}