# 网站部署

本项目是纯静态网站，同一份 `dist/` 可部署在域名根目录或子目录。图片、字体和动作数据随网站提供。

## EdgeOne 主站

- 访问域名：`massage.aihrzs.top`
- 腾讯云 EdgeOne Pages / Makers 项目：`self-massage`
- 加速区域：全球可用区（含中国大陆）
- 发布方式：直接上传构建产物。GitHub 推送不会自动更新 EdgeOne。

更新网站时：

1. 获取仓库最新版本，执行 `npm ci`、`npm test`、`npm run build`。
2. 打开腾讯云 EdgeOne 的 `self-massage` 项目，在“构建部署”中选择“新建部署”。
3. 上传完整的 `dist/` 文件夹，确认其根目录包含 `index.html`，并发布到生产环境。
4. 等待部署状态变为“成功”，再通过自定义域名检查首页、卡片目录、动作详情和图片。

教材原图在 `materials/textbook/`，供开源使用者再创作，不属于 `dist/`。不要把整个仓库、`node_modules/`、本机配置或验证日志上传到托管服务。

域名在 DNSPod 管理，`massage` 子域名单独指向 EdgeOne。保留主域名 `aihrzs.top` 的现有解析，以及其他业务与邮件记录。域名续费与托管服务相互独立，维护者需保持域名有效。

首次绑定其他域名时，先按控制台提供的记录验证域名归属，再配置其分配的 CNAME 和免费 HTTPS 证书。包含中国大陆的加速区域要求域名已备案。具体要求以 [自定义域名文档](https://pages.edgeone.ai/zh/document/custom-domain) 和 [免费证书文档](https://pages.edgeone.ai/zh/document/apply-for-free-certificate) 为准。

## 备用入口

- GitHub Pages：<https://links-cui.github.io/self-massage/>，由 `.github/workflows/pages.yml` 在推送 `main` 后构建发布。
- 原有国内入口：<https://aihrzs.top/self-massage/>，保留原部署。

不同入口由不同部署渠道维护；修改代码后，应确认需要更新的每个入口都发布了对应版本。
