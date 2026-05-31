# 第七天晴

一个纯文字七日模拟器。新版把界面和文本推向更高压的方向：倒计时、噪声、墙感、动作、清醒等状态会直接出现在界面里，剧情也更锋利。

## 游玩方式

直接用浏览器打开：

```text
D:\GameProjects\SevenDaysClear\index.html
```

如果浏览器缓存旧脚本，使用本地服务地址更稳定：

```text
http://127.0.0.1:4177/index.html
```

## 操作

- 鼠标点击选项。
- 键盘 `1`、`2`、`3` 可快速选择。
- `继续` 会读取当前浏览器存档。
- `清空` 会清除当前新版存档并回到开局页。
- `翻口供` 会查看本轮七天记录。

## 上传到 GitHub Pages

这是纯静态网页，上传到 GitHub 后可以直接用 GitHub Pages 打开。

1. 在 GitHub 新建一个仓库，例如 `seven-days-clear`。
2. 把本目录里的文件上传到仓库根目录：
   - `index.html`
   - `styles.css`
   - `app.js`
   - `README.md`
   - `.nojekyll`
3. 进入仓库 `Settings` -> `Pages`。
4. `Build and deployment` 选择 `Deploy from a branch`。
5. `Branch` 选择 `main`，目录选择 `/root`，保存。
6. 等一两分钟后，页面会出现在：

```text
https://你的GitHub用户名.github.io/seven-days-clear/
```

如果仓库名改成别的，就把网址最后一段换成对应仓库名。
