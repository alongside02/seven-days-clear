# 第七天晴

一个纯文字、无美术资源的 7 日模拟器。玩家扮演一位即将退租的女性，在手机消息流、短租房、日记措辞和很小的现实行动之间做选择。

**在线游玩：** [https://alongside02.github.io/seven-days-clear/](https://alongside02.github.io/seven-days-clear/)

## 这是什么

《第七天晴》表面是退租前七天的生活管理，实际围绕“观看、叙述、身体行动”展开。游戏不会直接解释主题，而是让数值和选项一点点暴露：你看见越多相似惨状，房间越像世界；你做越多具体行动，世界越不只剩房间。

## 特色

- 纯 HTML/CSS/JavaScript，无构建步骤，无图片资源。
- 7 天 × 早晨/白天/夜晚，共 21 个选择节点。
- 隐性状态外显为高压仪表盘：噪声、墙感、动作、清醒、措辞。
- 多结局，包括“未命名”“同温层”“续租”“空包”“晴天误差”等。
- 本地存档、重开、七天回顾、键盘 `1`/`2`/`3` 快捷选择。
- 手机端已适配，320px 宽度下无横向溢出。

## 本地运行

直接打开：

```text
D:\GameProjects\SevenDaysClear\index.html
```

或者启动任意静态服务器后访问：

```text
http://127.0.0.1:4177/index.html
```

## 文件结构

```text
index.html   页面结构
styles.css   视觉与移动端适配
app.js       剧情、状态、结局与存档逻辑
.nojekyll    GitHub Pages 静态发布标记
```

## 发布

项目已通过 GitHub Pages 从 `main` 分支根目录发布：

[https://alongside02.github.io/seven-days-clear/](https://alongside02.github.io/seven-days-clear/)
