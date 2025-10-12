document.addEventListener('DOMContentLoaded', () => {
    const sourceInput = document.getElementById('source-input');
    const renderOutput = document.getElementById('render-output');

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
`;
    sourceInput.value = exampleText;

    /**
     * 核心渲染函数
     * 直接将输入框的文本作为HTML设置给<pre>标签
     * 浏览器会自动解析其中的MUD标签，并应用 ws.css 中定义的样式
     */
    function render() {
        renderOutput.innerHTML = sourceInput.value;
    }

    // 监听输入框的 input 事件，实现实时更新
    sourceInput.addEventListener('input', render);

    // 页面加载后立即渲染一次示例
    render();
});
