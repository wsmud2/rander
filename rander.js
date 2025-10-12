// 获取元素
const inputArea = document.getElementById('input-area');
const outputArea = document.getElementById('output-area');
const toggleBtn = document.getElementById('toggle-view-btn');
const editorContainer = document.querySelector('.editor-container');

// 渲染函数
function renderOutput() {
    // 检查 inputArea 和 outputArea 是否存在，避免出错
    if (inputArea && outputArea) {
        outputArea.innerHTML = inputArea.value;
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
