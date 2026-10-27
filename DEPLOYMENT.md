# 网站部署

本项目是纯静态网站，同一份 `dist/` 可部署在域名根目录或子目录。图片、字体和动作数据随网站提供。

## EdgeOne 主站

- 访问域名：`massage.aihrzs.top`
- 腾讯云 EdgeOne Pages / Makers 项目：`self-massage`
- 加速区域：全球可用区（含中国大陆）
- 关联仓库：`LINKS-cui/self-massage`
- 生产分支：`main`，启用自动部署
- 发布方式：GitHub 推送触发 EdgeOne 测试、构建和部署，无需手动上传。

更新网站时：

1. 获取仓库最新版本，完成修改后执行 `npm ci`、`npm test`、`npm run build`。
2. 提交并推送到 `main`，或将修改合并进 `main`。
3. 在 EdgeOne 的“构建部署”中检查本次提交对应的部署；状态变为“成功”后，生产域名自动切换到新版本。
4. 打开 `https://massage.aihrzs.top/` 检查页面和图片。推送成功与部署成功是两步，构建失败时应查看日志并修复后重新推送。

当前构建配置：

| 配置 | 值 |
| --- | --- |
| 框架预设 | Vite |
| 根目录 | `./` |
| Node.js | `24.18.0` |
| 安装命令 | `npm ci` |
| 构建命令 | `npm test && npm run build` |
| 输出目录 | `dist` |

EO Makers GitHub App 仅关联 `self-massage` 仓库。自行 Fork 后部署时，需在自己的 EdgeOne 项目中关联自己的仓库、设置上述构建参数，并启用生产分支自动部署。

教材原图在 `materials/textbook/`，供开源使用者再创作，不属于 `dist/`。不要把整个仓库、`node_modules/`、本机配置或验证日志上传到托管服务。

域名在 DNSPod 管理，`massage` 子域名单独指向 EdgeOne。保留主域名 `aihrzs.top` 的现有解析，以及其他业务与邮件记录。域名续费与托管服务相互独立，维护者需保持域名有效。

首次绑定其他域名时，先按控制台提供的记录验证域名归属，再配置其分配的 CNAME 和免费 HTTPS 证书。包含中国大陆的加速区域要求域名已备案。具体要求以 [自定义域名文档](https://pages.edgeone.ai/zh/document/custom-domain) 和 [免费证书文档](https://pages.edgeone.ai/zh/document/apply-for-free-certificate) 为准。

## 备用入口

- GitHub Pages：<https://links-cui.github.io/self-massage/>，由 `.github/workflows/pages.yml` 在推送 `main` 后构建发布。
- 原有国内入口：<https://aihrzs.top/self-massage/>，保留原部署。

EdgeOne 主站与 GitHub Pages 备用站均随 `main` 推送自动部署，但应分别确认部署结果。原有国内入口保留历史部署，不参与这两条自动部署流程。
