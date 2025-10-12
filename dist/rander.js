// 获取元素
const inputArea = document.getElementById('input-area');
const outputArea = document.getElementById('output-area');
const toggleBtn = document.getElementById('toggle-view-btn');
const editorContainer = document.querySelector('.editor-container');

/**
 * 模拟原版 MUD 客户端的核心渲染函数
 * @param {string} text - 从输入框获取的原始文本
 * @returns {string} - 格式化后的 HTML 字符串
 */
function formatMudText(text) {
    if (!text) {
        return '';
    }

    // 定义我们支持的 MUD 标签列表
    const supportedTags = ['ord', 'blk', 'hic', 'line', 'hig', 'hiy', 'hir', 'red', 'yel', 'blu', 'nor'];
    
    // 创建一个正则表达式，用于后续识别和还原 MUD 标签
    // 例如: /&lt;(\/?)(ord|blk|hic|...)&gt;/g
    const tagsRegex = new RegExp(`&lt;(/?)(${supportedTags.join('|')})&gt;`, 'g');

    // --- 开始模拟原版渲染流程 ---

    // 步骤 1: 转义 HTML 关键字符，防止注入。
    // 这是最重要的一步，确保用户输入的内容不会被当作恶意 HTML 执行。
    let formattedText = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    // 步骤 2: 还原我们支持的 MUD 标签。
    // 经过上一步，<hic> 变成了 &lt;hic&gt;。现在我们把它还原回来。
    // $1 会捕获到斜杠（如果是闭合标签），$2 会捕获到标签名。
    formattedText = formattedText.replace(tagsRegex, '<$1$2>');

    // 步骤 3: 对特定的 MUD 标签进行特殊处理。
    // 【核心】这就是原版实现 <line> 标签间隔的方式：给内容前后加上空格。
    // 我们使用 &nbsp; (HTML空格实体) 来确保浏览器不会折叠多个空格。
    formattedText = formattedText.replace(/<line>(.*?)<\/line>/g, '<line>&nbsp;$1&nbsp;</line>');

    // 步骤 4: 将换行符 \n 转换成 HTML 的 <br> 标签。
    // 这是为什么我们可以把预览区的 <pre> 换成 <div> 的原因。
    formattedText = formattedText.replace(/\n/g, '<br/>');

    return formattedText;
}


// 新的渲染函数
function renderOutput() {
    if (inputArea && outputArea) {
        const rawText = inputArea.value;
        const renderedHtml = formatMudText(rawText);
        outputArea.innerHTML = renderedHtml;
    }
}

// 监听输入事件，实现实时更新
if (inputArea) {
    inputArea.addEventListener('input', renderOutput);
}

// 监听切换按钮的点击事件
if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
        const isNowFullView = editorContainer.classList.toggle('full-view-mode');
        toggleBtn.textContent = isNowFullView ? '返回编辑' : '全屏预览';
    });
}

// 页面加载后立即执行一次初始渲染
renderOutput();
