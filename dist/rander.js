document.addEventListener('DOMContentLoaded', () => {
    // --- 1. 获取所有需要的 DOM 元素 ---
    const inputArea = document.getElementById('input-area');
    const outputArea = document.getElementById('output-area');
    const toggleBtn = document.getElementById('toggle-view-btn');
    const copyBtn = document.getElementById('copy-btn');
    const clearBtn = document.getElementById('clear-btn');
    const editorContainer = document.querySelector('.editor-container');

    // --- 2. 定义 MUD 标签到 CSS 类的映射 ---
    const tagToClassMap = {
        'ord': 'ord',
        'blk': 'blk',
        'hic': 'hic',
        'hig': 'hig',
        'hiy': 'hiy',
        'hir': 'hir',
        'line': 'line'
        // 在这里可以轻松扩展更多标签
    };

    /**
     * 优化的 MUD 文本核心渲染函数
     * @param {string} text - 从输入框获取的原始文本
     * @returns {string} - 格式化后的 HTML 字符串
     */
    function formatMudText(text) {
        if (!text) {
            return '';
        }

        const supportedTags = Object.keys(tagToClassMap);
        const tagsRegex = new RegExp(`&lt;(/?)(${supportedTags.join('|')})&gt;`, 'g');

        // 步骤 1: 转义所有 HTML 关键字符，防止 XSS 攻击
        let formattedText = text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');

        // 步骤 2: 将我们支持的 MUD 标签还原，并转换为带 class 的 <span>
        // 例如: &lt;hic&gt; 变为 <span class="hic">
        //       &lt;/hic&gt; 变为 </span>
        formattedText = formattedText.replace(tagsRegex, (match, slash, tagName) => {
            const className = tagToClassMap[tagName];
            // 如果是闭合标签 (slash 为 '/')，则输出 </span>
            // 否则输出 <span class="className">
            return slash ? `</span>` : `<span class="${className}">`;
        });

        // 步骤 3: 将换行符 \n 转换成 HTML 的 <br> 标签
        formattedText = formattedText.replace(/\n/g, '<br/>');

        return formattedText;
    }

    /**
     * 渲染输出到预览区
     */
    function renderOutput() {
        const rawText = inputArea.value;
        const renderedHtml = formatMudText(rawText);
        outputArea.innerHTML = renderedHtml;
    }

    // --- 3. 绑定所有事件监听器 ---

    // 监听输入事件，实现实时更新
    inputArea.addEventListener('input', renderOutput);

    // 监听切换按钮的点击事件
    toggleBtn.addEventListener('click', () => {
        const isNowFullView = editorContainer.classList.toggle('full-view-mode');
        toggleBtn.textContent = isNowFullView ? '返回编辑' : '全屏预览';
    });

    // 监听复制按钮的点击事件
    copyBtn.addEventListener('click', () => {
        // 使用现代的 Clipboard API，更安全可靠
        navigator.clipboard.writeText(outputArea.innerHTML).then(() => {
            const originalText = copyBtn.textContent;
            copyBtn.textContent = '复制成功!';
            setTimeout(() => {
                copyBtn.textContent = originalText;
            }, 1500);
        }).catch(err => {
            console.error('复制失败:', err);
            alert('复制失败，请检查浏览器权限或手动复制。');
        });
    });

    // 监听清空按钮的点击事件
    clearBtn.addEventListener('click', () => {
        inputArea.value = '';
        renderOutput(); // 清空后立即更新预览
        inputArea.focus(); // 将焦点放回输入框
    });

    // --- 4. 页面加载后立即执行一次初始渲染 ---
    renderOutput();
});
