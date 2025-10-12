document.addEventListener('DOMContentLoaded', () => {

    // --- DOM 元素获取 ---
    const sourceInput = document.getElementById('source-input');
    const renderArea = document.querySelector('.content-message');
    const renderBtn = document.getElementById('render-btn');
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    const controls = document.getElementById('controls');

    // --- 预填表示例数据 ---
    const exampleText = `<hiz>天山六阳掌</hiz>
逍遥派绝世武功
逍遥派的天山六阳掌，绝招生死符让人谈虎色变。
<blk>当装备为基本拳脚时：
攻击：+1700
命中：+1300
身法：+200
你对种了生死符的敌人伤害增加50%</blk>
<line>绝招</line>
<hic>【生死符】</hic>
内力消耗：1020\t出招时间：8秒\t冷却时间：30秒
逆运真气将阳刚之气转为阴柔，化水为冰，命中敌人后11秒后爆发，如果你的最大气血大于敌方当前气血，敌人气血将降为1，否则将受到你当前气血20%的伤害。不可招架

<hic>【阳关三叠】</hic>
内力消耗：1020\t出招时间：4秒\t冷却时间：12秒
以迅猛的掌力瞬间攻击对方三次，造成伤害后下次增加攻击83%，否则增加83%命中

<hic>【白虹掌力】</hic>
内力消耗：1020\t出招时间：4秒\t冷却时间：15秒
提起全身真气对敌人造成你攻击力附加你最大内力20%(13068)的伤害。
`;
    sourceInput.value = exampleText;

    /**
     * 核心渲染函数
     * 将输入框的原始文本渲染到显示区
     */
    function renderContent() {
        const rawText = sourceInput.value;
        
        // 使用<pre>标签可以完美保留原始文本中的所有换行和空格
        // 浏览器会自动解析我们在CSS中定义的自定义标签（如<hiz>）并应用样式
        renderArea.innerHTML = `<pre>${rawText}</pre>`;
        
        // 渲染后自动滚动到底部
        renderArea.scrollTop = renderArea.scrollHeight;
    }

    /**
     * 切换全屏模式
     */
    function toggleFullscreen() {
        renderArea.classList.toggle('fullscreen');
        const isFullscreen = renderArea.classList.contains('fullscreen');
        
        // 全屏时隐藏控制区，退出时显示
        controls.style.display = isFullscreen ? 'none' : 'flex';
        fullscreenBtn.textContent = isFullscreen ? '退出全屏' : '全屏';
    }

    // --- 事件监听 ---
    renderBtn.addEventListener('click', renderContent);
    fullscreenBtn.addEventListener('click', toggleFullscreen);

    // --- 页面加载后立即执行一次渲染 ---
    renderContent();
});
