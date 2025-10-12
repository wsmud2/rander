// 使用DOMContentLoaded确保在操作DOM之前，所有元素都已加载
document.addEventListener('DOMContentLoaded', () => {

    // --- 模拟数据 ---
    const mockData = {
        messages: `你进入了武神殿。
<wht>这是一座宏伟的大殿，四周的石壁上刻满了古老的符文。</wht>
大殿中央站着一位白发苍苍的老者。
<hiy>【江湖】金钱帮弟子(Jqbdz)大喝一声：各位英雄，可否借一些黄金给在下，日后定当加倍奉还。</hiy>
你获得了<hig>1</hig>点潜能。
你获得了<hig>1</hig>点实战经验。
你获得了<hig>1</hig>点体会。
<hic>【系统】恭喜你！连续登录2天，奖励2金元宝。</hic>
<wht>你对著铁尸喝道：「畜生！今日不是你死就是我活！」</wht>
<hir>铁尸对著你喝道：「畜生！今日不是你死就是我活！」</hir>
你运起内力，将化骨绵掌的劲力聚集在掌上。
你深深地吸一囗气，真力自丹田缓缓升起。
你使出「腐骨」诀，一股阴毒的掌风直逼铁尸的胸口。
`,
        combat: `
<hir>--- 战斗开始 ---</hir>
<wht>你对铁尸发起了攻击！</wht>
你一招「腐骨」，击中了铁尸的胸口，造成了 <hig>125</hig> 点伤害。
<hir>铁尸怒吼一声，向你扑来！</hir>
铁尸的攻击被你轻松地躲开了。
你运起内力，准备下一轮攻击。
<wht>你对铁尸发起了攻击！</wht>
你一招「排山倒海」，击中了铁尸的头部，造成了 <hig>250</hig> 点伤害。
<hir>铁尸受到了致命一击！</hir>
铁尸倒在了地上，不再动弹。
你获得了<hig>150</hig>点实战经验。
你获得了<hig>80</hig>点潜能。
<hir>--- 战斗结束 ---</hir>
`,
        system: `
<hic>【系统】服务器将于5分钟后进行例行维护，请各位玩家提前下线。</hic>
<hic>【系统】玩家 张三 达成了「武林至尊」成就！</hic>
<hic>【系统】欢迎来到武神传说！</hic>
<hic>【系统】商城上架了新的道具「乾坤袋」，欢迎选购。</hic>
<hic>【系统】网络连接已恢复。</hic>
`
    };

    // --- DOM 元素获取 ---
    const renderArea = document.querySelector('.content-message');
    const controlArea = document.querySelector('.bottom-bar');
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    const dataBtns = document.querySelectorAll('.act-item[data-type]');
    const commandInput = document.getElementById('command-input');
    const sendBtn = document.getElementById('send-btn');

    /**
     * 渲染内容到渲染区
     * @param {string} dataType - 数据类型 ('messages', 'combat', 'system')
     */
    function renderContent(dataType) {
        const content = mockData[dataType];
        if (content) {
            // 使用<pre>标签可以保留文本中的换行和空格
            renderArea.innerHTML = `<pre>${content}</pre>`;
            // 每次渲染后都滚动到底部
            renderArea.scrollTop = renderArea.scrollHeight;
        }
    }

    /**
     * 提交用户输入的指令
     */
    function submitCommand() {
        const commandText = commandInput.value.trim();
        if (commandText) {
            const commandElement = document.createElement('pre');
            commandElement.className = 'user-command'; // 使用自定义样式
            commandElement.textContent = '> ' + commandText;
            renderArea.appendChild(commandElement);

            commandInput.value = ''; // 清空输入框
            renderArea.scrollTop = renderArea.scrollHeight; // 滚动到底部
        }
        commandInput.focus(); // 保持输入框聚焦
    }

    // --- 事件监听 ---

    // 初始加载“消息”数据
    const initialBtn = document.querySelector('.act-item[data-type="messages"]');
    if (initialBtn) {
        initialBtn.classList.add('active');
        renderContent('messages');
    }


    // 为数据切换按钮添加点击事件
    dataBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // 移除所有按钮的 'active' 类
            dataBtns.forEach(b => b.classList.remove('active'));
            // 为当前点击的按钮添加 'active' 类
            const currentBtn = e.currentTarget;
            currentBtn.classList.add('active');

            // 根据按钮的 data-type 属性渲染对应内容
            const dataType = currentBtn.dataset.type;
            renderContent(dataType);
        });
    });

    // 为全屏按钮添加点击事件
    fullscreenBtn.addEventListener('click', () => {
        renderArea.classList.toggle('fullscreen');
        const isFullscreen = renderArea.classList.contains('fullscreen');

        // 全屏时隐藏控制区，退出全屏时显示
        controlArea.style.display = isFullscreen ? 'none' : 'flex';
        fullscreenBtn.textContent = isFullscreen ? '退出全屏' : '全屏';
    });

    // 为发送按钮和输入框回车键添加事件
    sendBtn.addEventListener('click', submitCommand);
    commandInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // 阻止默认的回车行为
            submitCommand();
        }
    });
});
