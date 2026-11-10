# 今日情绪抽签

一个适合手机分享的静态 H5 小页面。点一下，抽出今天的情绪、宜忌和一句评语，还可以把卡片保存成图片。

纯静态 HTML/CSS/JS，无后端、无第三方库。卡片由 canvas 画成复古漫画风，不使用 emoji 图标。

## 本地预览

在本目录启动任意静态服务器，例如：

```bash
cd /workspace/games/qingxu-daka
python3 -m http.server 8767
```

然后用手机或浏览器打开 `http://127.0.0.1:8767/`。

## 说明

- 第一次抽取按当天日期固定「今日签」，点「再测一次」会换一条不同的签
- 「保存图片」会下载卡片；在 iOS 或微信里如果无法直接下载，会弹出图片并提示长按保存
- 页脚：作者 hukx · [请作者喝奶茶](https://afdian.com/a/hukxai)

## 本地检查

```bash
node --check js/app.js
python3 -m http.server 8767
# 另开终端：
node tools/screenshot.mjs
```

`tools/screenshot.mjs` 会用注入脚本打开一张固定卡片（不依赖页面上的调试 URL 参数），截图写到 `/tmp/qingxu-shots/`。
