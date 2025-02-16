// ==UserScript==
// @name EarthMC 地图快速定位
// @version 2025.3.3
// @updateURL https://cdn.jsdelivr.net/gh/AkarinLiu/EarthMC-Quick-Locate@master/main.user.js
// @downloadURL https://cdn.jsdelivr.net/gh/AkarinLiu/EarthMC-Quick-Locate@master/main.user.js
// @namespace https://github.com/AkarinLiu
// @homepage https://github.com/AkarinLiu/EarthMC-Quick-Locate
// @supportURL https://github.com/AkarinLiu/EarthMC-Quick-Locate/issues/new
// @description 始终可用的坐标定位面板，支持参数覆盖和即时更新
// @author AkarinLiu
// @match https://map.earthmc.net/*
// @icon https://map.earthmc.net/favicon.ico
// @grant GM_addStyle
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
        .coord-input:focus {
            outline: 2px solid #00ff8866;
        }
        .locator-button {
            background: linear-gradient(to right, #00ff88, #00ccff);
            border: none;
            color: #002211;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            font-weight: bold;
            transition: 0.2s;
        }
        .locator-button:hover {
            opacity: 0.9;
            transform: translateY(-1px);
        }
    `);

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
            z: document.getElementById('mcZ').value || 0
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