// 获取元素
const inputArea = document.getElementById('input-area');
const outputArea = document.getElementById('output-area');
const toggleBtn = document.getElementById('toggle-view-btn');
const editorContainer = document.querySelector('.editor-container');

// 渲染函数
function renderOutput() {
    // 检查 inputArea 和 outputArea 是否存在，避免出错
    if (inputArea && outputArea) {
        let content = inputArea.value;
        
        // 【修改点】使用正则表达式为 <line> 标签内的内容前后添加空格
        //  - (.*?) 匹配标签内的任意字符（非贪婪模式）
        //  - '$1' 是对匹配到的内容的引用
        content = content.replace(/<line>(.*?)<\/line>/g, '<line> $1 </line>');

        outputArea.innerHTML = content;
    }
}

// 监听输入事件，实现实时更新
if (inputArea) {
    inputArea.addEventListener('input', renderOutput);
}

// 监听切换按钮的点击事件
if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
        // 切换 'full-view-mode' 类
        const isNowFullView = editorContainer.classList.toggle('full-view-mode');

        // 根据当前状态更新按钮文本
        if (isNowFullView) {
            toggleBtn.textContent = '返回编辑';
        } else {
            toggleBtn.textContent = '全屏预览';
        }
    });
}

renderOutput();
