// ==UserScript==
// @name         EarthMC 地图快速定位
// @version      2025.3
// @updateURL    https://cdn.jsdelivr.net/gh/AkarinLiu/EarthMC-Quick-Locate@master/main.user.js
// @downloadURL  https://cdn.jsdelivr.net/gh/AkarinLiu/EarthMC-Quick-Locate@master/main.user.js
// @description  始终可用的坐标定位面板，支持参数覆盖和即时更新
// @author       AkarinLiu
// @match        https://map.earthmc.net/*
// @icon         https://map.earthmc.net/favicon.ico
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    // 创建统一样式
    GM_addStyle(`
        .earthmc-locator {
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0,0,0,0.85);
            padding: 15px;
            border-radius: 10px;
            color: #fff;
            z-index: 9999;
            backdrop-filter: blur(3px);
            border: 1px solid rgba(255,255,255,0.1);
            box-shadow: 0 4px 12px rgba(0,0,0,0.25);
        }
        .locator-title {
            margin: 0 0 12px 0;
            font-size: 16px;
            color: #00ff88;
        }
        .coord-group {
            display: flex;
            gap: 8px;
            margin-bottom: 12px;
        }
        .coord-input {
            width: 100px;
            padding: 8px;
            background: rgba(255,255,255,0.1);
            border: 1px solid rgba(255,255,255,0.2);
            border-radius: 4px;
            color: white;
            font-family: monospace;
        }
        。coord-input:focus {
            outline: 2px solid #00ff8866;
        }
        。locator-button {
            background: linear-gradient(to right, #00ff88, #00ccff);
            border: none;
            color: #002211;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            font-weight: bold;
            transition: 0.2s;
        }
        。locator-button:hover {
            opacity: 0.9;
            transform: translateY(-1px);
        }
    `);

    const createPanel = () => {
        const panel = document.createElement('div');
        panel.className = 'earthmc-locator';

        const title = document.createElement('h3');
        title.className = 'locator-title';
        title.innerHTML = '&#128506; 坐标定位'; // 使用HTML实体代替表情符号

        const coordGroup = document.createElement('div');
        coordGroup.className = 'coord-group';

        const inputX = document.createElement('input');
        inputX.type = 'number';
        inputX.className = 'coord-input';
        inputX.id = 'mcX';
        inputX.placeholder = 'X 坐标';
        inputX.step = 'any';

        const inputZ = document.createElement('input');
        inputZ.type = 'number';
        inputZ.className = 'coord-input';
        inputZ.id = 'mcZ';
        inputZ.placeholder = 'Z 坐标';
        inputZ.step = 'any';

        const button = document.createElement('button');
        button.className = 'locator-button';
        button.id = 'mcLocate';
        button.textContent = '立即定位';

        // 层级组装
        coordGroup.appendChild(inputX);
        coordGroup.appendChild(inputZ);
        panel.appendChild(title);
        panel.appendChild(coordGroup);
        panel.appendChild(button);

        return panel;
    };

    // 插入到页面
    const panel = createPanel();
    document.body.appendChild(panel);
    // 创建定位面板
    const panel = document.createElement('div');
    panel.className = 'earthmc-locator';
    panel.innerHTML = `
        <h3 class="locator-title">🗺️ 坐标定位</h3>
        <div class="coord-group">
            <input type="number" class="coord-input" id="mcX" placeholder="X 坐标" step="any">
            <input type="number" class="coord-input" id="mcZ" placeholder="Z 坐标" step="any">
        </div>
        <button class="locator-button" id="mcLocate">立即定位</button>
    `;

    // 插入到页面
    document.body.appendChild(panel);

    // 自动填充现有坐标
    const urlParams = new URLSearchParams(location.search);
    if (urlParams.has('x')) document.getElementById('mcX').value = urlParams.get('x');
    if (urlParams.has('z')) document.getElementById('mcZ').value = urlParams.get('z');

    // 核心定位函数
    const navigateToCoords = () => {
        const baseURL = new URL(window.location.href);
        const searchParams = baseURL.searchParams;

        // 保留必要参数
        const preservedParams = {
            world: searchParams.get('world') || 'minecraft_overworld',
            zoom: searchParams.get('zoom') || 0,
            x: document.getElementById('mcX').value || 0,
            z: document.getElementById('mcZ')。value || 0
        };

        // 构建新URL
        const newURL = new URL(baseURL);
        newURL.search = new URLSearchParams(preservedParams).toString();

        // 避免重复跳转
        if (newURL.href !== window.location.href) {
            window.location.href = newURL.href;
        }
    };

    // 事件绑定
    document.getElementById('mcLocate').addEventListener('click', navigateToCoords);

    // 回车键支持
    panel.querySelectorAll('.coord-input').forEach(input => {
        input.addEventListener('keypress', e => e.key === 'Enter' && navigateToCoords());
    });

    // 自动聚焦第一个输入框
    setTimeout(() => document.getElementById('mcX').focus(), 500);
})();
