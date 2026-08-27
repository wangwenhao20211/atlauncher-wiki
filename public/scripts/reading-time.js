// public/scripts/reading-time.js
function addReadingTime() {
  // 首页不显示阅读时间
  if (window.location.pathname === '/' || window.location.pathname === '/en/') return;

  const content = document.querySelector('.sl-markdown-content, main');
  if (!content) return;

  const text = content.textContent || '';

  // 统计中文字符（基本汉字）和英文字母（用于计算单词数）
  const chineseChars = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
  // 英文单词数：按空白分割后过滤空串
  const englishWords = text.trim().split(/\s+/).filter(w => w.length > 0).length;

  // 分别计算阅读时间（分钟）
  const chineseTime = chineseChars / 350;      // 中文 350 字/分钟
  const englishTime = englishWords / 200;      // 英文 200 词/分钟
  const totalMinutes = chineseTime + englishTime;
  const readingTime = Math.max(1, Math.round(totalMinutes));

  // 判断当前界面语言：优先使用 html 的 lang 属性，其次根据路径
  const htmlLang = document.documentElement.lang || '';
  const isEnglishUI = htmlLang.startsWith('en') || window.location.pathname.startsWith('/en/');
  const label = isEnglishUI ? 'min read' : '分钟阅读';

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