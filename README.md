# EarthMC 地图快速定位脚本

## 截图
![脚本效果截图](./assets/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202025-02-15%20210918.png)

## 简介

这是一个用于 EarthMC 地图的浏览器用户脚本，提供便捷的坐标定位功能。无论当前 URL 是否包含坐标参数，都能快速定位到指定坐标，并保留其他地图参数（如维度、缩放级别等）。

---

## 功能特性

### 核心功能
- **坐标快速定位**：输入 X/Z 坐标后立即跳转到目标位置
- **参数智能处理**：自动继承并保留现有 URL 参数（如 `world` 和 `zoom`）
- **实时同步**：自动填充当前 URL 中的坐标值到输入框

### 用户体验
- **始终可见的面板**：固定在页面右上角，随时可用
- **现代 UI 设计**：毛玻璃效果、渐变按钮、清晰的输入框
- **便捷操作**：
  - 支持回车键提交
  - 自动聚焦第一个输入框
  - 实时更新 URL 参数

### 健壮性
- **防重复跳转**：避免不必要的页面刷新
- **参数兼容性**：支持从其他链接直接带参数访问
- **输入验证**：支持小数和负数坐标

---

## 安装与使用

| GitHub | JSdelivr |
| ---- | ---- |
| [点击安装](https://github.com/AkarinLiu/EarthMC-Quick-Locate/raw/refs/heads/master/main.user.js) | [点击安装](https://cdn.jsdelivr.net/gh/AkarinLiu/EarthMC-Quick-Locate@master/main.user.js) |
### 使用方法
1. 访问 [EarthMC 地图](https://map.earthmc.net/)。
2. 在页面右上角找到定位面板。
3. 输入 X 和 Z 坐标：
   - 直接输入数字（支持小数和负数）
   - 按回车键或点击“立即定位”按钮
4. 页面将自动跳转到目标位置，同时保留当前维度和缩放级别。

---

## 参数说明

### URL 参数
- `world`：地图维度（默认为 `minecraft_overworld`）
- `zoom`：地图缩放级别（默认为 `0`）
- `x`：X 坐标（必填）
- `z`：Z 坐标（必填）

### 示例
- 主世界坐标定位：  
  `https://map.earthmc.net/?world=minecraft_overworld&zoom=3&x=1234&z=-5678`
- 下界坐标定位：  
  `https://map.earthmc.net/?world=nether&zoom=5&x=100&z=200`

---

## 开发与定制

### 代码结构
- **样式管理**：使用 `GM_addStyle` 注入 CSS，确保样式隔离
- **事件绑定**：通过 `addEventListener` 实现交互逻辑
- **URL 处理**：基于 `URL` 和 `URLSearchParams` 实现参数解析与构建

### 自定义选项
1. **修改面板位置**：  
   编辑 `.earthmc-locator` 样式中的 `top` 和 `right` 属性。
2. **调整 UI 风格**：  
   修改 `GM_addStyle` 中的 CSS 变量，如背景颜色、按钮渐变等。
3. **扩展功能**：  
   可在 `navigateToCoords` 函数中添加自定义逻辑，例如保存历史记录或添加标记。

---

## 常见问题

### Q1: 脚本不生效怎么办？
- 确保脚本管理器已启用
- 检查脚本的 `@match` 规则是否包含 `https://map.earthmc.net/*`
- 尝试刷新页面或重新安装脚本

### Q2: 如何清除坐标参数？
- 直接删除输入框中的值并提交，脚本会自动使用默认值（0, 0）

### Q3: 是否支持其他地图服务？
- 目前仅针对 EarthMC 地图优化，但可通过修改 URL 构建逻辑适配其他服务

---

## 贡献与反馈

欢迎提交 Issue 或 Pull Request 改进脚本！  

---

## 许可证

本项目采用 [Apache 2.0 许可证](LICENSE)。  
请自由使用、修改和分发代码，但需保留原作者信息。

## 鸣谢

[DeepSeek 深度求索](https://deepseek.com)
