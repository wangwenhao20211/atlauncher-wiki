import { createWidget } from 'https://esm.sh/l2d-widget@0.1.1';

createWidget({
  model: {
    path: '/models/yanwenzi.model3.json',
    scale: 0.9,
    tips: {
      typing: {
        param: 'ParamMouthOpenY',
        speed: 90,
      },
      welcomeMessage: ['你好！'],
      messages: [
        '去评论区说几句？',
        'zzzzzzzzzzzzz',
        '试试搜点什么？',
        'PlaceholderContent4',
      ],
      duration: 2000,
      interval: 10000,
    },
  },
  position: 'bottom-right',
  size: { width: 240, height: 100 },
});