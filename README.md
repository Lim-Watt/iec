<div id="top"></div>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<br />
<div align="center">

  <h3 align="center">iec</h3>

  <p align="center">
    一个简单的p2p通信项目
    <br />
    <br />
    <a href="https://github.com/Lim-Watt/iec">查看 Demo</a>
    ·
    <a href="https://github.com/Lim-Watt/iec/issues">反馈 Bug</a>
    ·
    <a href="https://github.com/Lim-Watt/iec/issues">请求新功能</a>
  </p>
</div>



<details>
  <summary>目录</summary>
  <ol>
    <li>
      <a href="#关于本项目">关于本项目</a>
      <ul>
        <li><a href="#构建工具">构建工具</a></li>
      </ul>
    </li>
    <li>
      <a href="#开始">开始</a>
      <ul>
        <li><a href="#依赖">依赖</a></li>
        <li><a href="#安装">安装</a></li>
      </ul>
    </li>
    <li><a href="#使用方法">使用方法</a></li>
	<li><a herf="#注意事项">注意事项</a></li>
    <li><a href="#路线图">路线图</a></li>
    <li><a href="#贡献">贡献</a></li>
    <li><a href="#许可证">许可证</a></li>
  </ol>
</details>



## 关于本项目

你说的对，但是它难道不好玩吗？

### 构建工具

* [Node.js](https://nodejs.org/)

## 开始

这是一份在本地构建项目的指导的例子。
要获取本地副本并且配置运行，你可以按照下面的示例步骤操作。

### 依赖

* Node.js v20.12

### 安装


1. 克隆本仓库
   ```sh
   git clone https://github.com/Lim-Watt/iec.git
   ```
1. 安装 NPM 包
   ```sh
   npm install
   ```
1. 在 `config.json` 中填写你的 OS 和用户名
   - OS 必须是 `linux` 或 `win`。
   - 用户名是聊天时显示的名称。

## 使用方法

鸽了（因为还在开发，可能有重大改动

## 注意事项

1. 仅作学习研究使用
1. 不保证连接的安全性
1. 暂仅支持win和有gnome-terminal的系统。
1. win的cmd相当难看并且字符集有限，推荐Windows Terminal。
1. 项目开发中，注意更新和统一。
1. ~~不要说是我写的。~~

## 路线图

- [ ] 重建交互流程
  - [ ] asker 将 IP 传参获取，改为输入获取。
  - [ ] asker 申请和交互部分分离
  - [ ] asker 100ms 尝试联接（而不是liser 1s 延迟发送
- [ ] 扩展生态
  - [x] windows
  - [ ] Mac
  - [ ] VsCode 插件
  - [ ] linux 其他发行版

到 [open issues](https://github.com/Lim-Watt/iec/issues) 页查看所有请求的功能 （以及已知的问题）。

## 贡献

贡献让开源社区成为了一个非常适合学习、启发和创新的地方。你所做出的任何贡献都是**受人尊敬**的。

如果你有好的建议，请复刻（fork）本仓库并且创建一个拉取请求（pull request）。你也可以简单地创建一个议题（issue），并且添加标签「enhancement」。不要忘记给项目点一个 star！再次感谢！

1. 复刻（Fork）本项目
1. 创建你的 Feature 分支 (`git checkout -b feature/AmazingFeature`)
1. 提交你的变更 (`git commit -m 'Add some AmazingFeature'`)
1. 推送到该分支 (`git push origin feature/AmazingFeature`)
1. 创建一个拉取请求（Pull Request）

## 许可证

根据 MIT 许可证分发。打开 [LICENSE.txt](LICENSE.txt) 查看更多内容。

[contributors-shield]: https://img.shields.io/github/contributors/Lim-Watt/iec.svg?style=for-the-badge
[contributors-url]: https://github.com/Lim-Watt/iec/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Lim-Watt/iec.svg?style=for-the-badge
[forks-url]: https://github.com/Lim-Watt/iec/network/members
[stars-shield]: https://img.shields.io/github/stars/Lim-Watt/iec.svg?style=for-the-badge
[stars-url]: https://github.com/Lim-Watt/iec/stargazers
[issues-shield]: https://img.shields.io/github/issues/Lim-Watt/iec.svg?style=for-the-badge
[issues-url]: https://github.com/Lim-Watt/iec/issues
[license-shield]: https://img.shields.io/github/license/Lim-Watt/iec.svg?style=for-the-badge
[license-url]: https://github.com/Lim-Watt/iec/blob/master/LICENSE.txt
