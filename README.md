# Self Massage · 把放松还给自己

一本可以慢慢翻的身体练习册：135 张动作卡片，按部位查找，逐步查看手型、接触位置和移动方向。

- 国内在线体验：[aihrzs.top/self-massage](https://aihrzs.top/self-massage/)
- 备用在线体验：[GitHub Pages](https://links-cui.github.io/self-massage/)（部分国内网络访问较慢，可能出现图片加载不全）
- 原始素材：[教材动作素材 · 135 项完整图文](教材动作素材.md)；七批拆解合并为一份 Markdown，附教材原图、编号对应和中英文步骤，可用于制作自己的网站。
- 功能：六组身体部位、编号目录、搜索、收藏、随机抽卡、人物步骤图、点位总览、分解姿势、放大与自动翻页、图例和方位教程。
- 技术：React + TypeScript + Vite，纯静态页面；无需 API key、数据库或服务端。图片与字体随站点提供，浏览页面不请求外部字体/CDN。

## 本地运行

需要 Node.js 22.12+（推荐 Node.js 24）和 npm。

```sh
git clone https://github.com/LINKS-cui/self-massage.git
cd self-massage
npm ci
npm run dev
```

打开 http://127.0.0.1:4186/ 。

```sh
npm test          # 135 项内容与素材完整性校验
npm run build    # 生成 dist/
npm run preview  # 预览构建产物；先停止占用 4186 的开发服务器
```

所有在用 PNG 图像、动作数据、SVG 标注组件和字体都包含在仓库内。无需另行获取图片，也不依赖 Git LFS。网站图片约 532 MB，教材参考图片约 79 MB，初次克隆请等待下载完成。

只想使用教材素材时，阅读 [教材动作素材.md](教材动作素材.md)，保留该文件及 `materials/textbook/` 目录即可，不必安装网站依赖。文档按七个章节整理 135 项动作，每项保留教材编号、原图、中文步骤及英文译稿；公共规则集中说明，已删去重复问答、旧判断、待办和制作过程记录。

可选浏览器检查：

```sh
npx playwright install chromium
npm run test:browser
```

该检查在临时本地端口模拟 `/self-massage/` 子路径，核对封面、各动作阶段/分解图、总览和移动端布局。

## 项目结构

| 路径 | 内容 |
| --- | --- |
| `src/main.tsx` | 首页、卡片集、详情、收藏与搜索 |
| `src/UsageGuide.tsx` | 阅读图解、身体方位与页面操作教程 |
| `src/catalog.json` | 135 项动作文字与内容版本 |
| `src/image-demos.ts` | 组合当前图解配置和素材绑定 |
| `src/image-demo-batches/` | 分批动作配置、覆盖层和样式 |
| `src/*Overlay.tsx` | 点位、轨迹和接触方式的 SVG 标注 |
| `public/illustrations/` | 当前网页实际使用的原尺寸 PNG |
| `public/fonts/` | ZCOOL KuaiLe 字体与 OFL 许可 |
| `assets-manifest.json` | 素材路径、大小、SHA-256 与许可 |
| `.github/workflows/pages.yml` | 推送 main 后构建并部署 Pages |
| `教材动作素材.md` | 七批拆解整理后的 135 项动作，含目录与中英文步骤 |
| `materials/textbook/` | 文档引用的教材动作裁图、整页原图及补充参考图 |

教材参考图作为仓库中的独立素材提供，不参与插画版网站构建。历史候选图片、工作快照、账户配置、本机日志和 node_modules 不属于发布内容。

## 部署到 GitHub Pages

本仓库通过 GitHub Actions 发布。

1. 在仓库 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。
2. 向 `main` 推送代码，或者在 Actions 中手动运行 **Build and deploy GitHub Pages**。
3. 部署成功后访问 `https://<你的用户名>.github.io/<仓库名>/`。

`base: './'` 与 hash 路由使构建产物可放在域名根目录或子目录。部署时应上传完整的 `dist/`。项目不配置自定义域名，不会接管账号已有的 GitHub Pages 根站点。

GitHub Pages 的网络可达性取决于地区和运营商，不能把部署成功等同于中国大陆所有网络均可稳定直连。国内入口独立于此仓库的 Pages 工作流。

## 图文与内容状态

人物图由生成式图像工具制作，动作说明根据项目维护者确认的步骤整理，点位和轨迹由独立 SVG 层表达。生成图可能仍有姿势、接触或解剖细节误差；页面构建/资源检查不等于专业教学核验。

图解配置中的 `draft` / `not-approved` 表示教学审核状态，开源许可与网站上线不会自动改变它。自动翻页只帮助看图，不是练习计时。反馈问题时请附动作编号、步骤及具体观察，便于修正。

## 开源许可

- **代码、构建脚本和工程说明：MIT**，见 [LICENSE](LICENSE)。
- **动作文字、图解说明、原创图像/图解作品，以及随附的教材原图和补充图：CC BY 4.0**，见 [CONTENT-LICENSE.md](CONTENT-LICENSE.md) 和 [完整许可](LICENSE-CONTENT.txt)。
- **ZCOOL KuaiLe 字体：SIL OFL 1.1**，见 [字体许可](public/fonts/OFL.txt)。
- 第三方 npm 依赖保留各自许可，见 [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md)。

转载请署名 **LINKS-cui / Self Massage**，链接本仓库和对应许可，并标明修改；教材原图内已有的原作者署名也应保留。
