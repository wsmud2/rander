// 获取元素
const inputArea = document.getElementById('input-area');
const outputArea = document.getElementById('output-area');
const toggleBtn = document.getElementById('toggle-view-btn');
const editorContainer = document.querySelector('.editor-container');

// 渲染函数
function renderOutput() {
    // 检查 inputArea 是否存在，避免在DOM加载完成前执行出错
    if (inputArea) {
        outputArea.innerHTML = inputArea.value;
    }
}

// 监听输入
// 同样检查元素是否存在
if (inputArea) {
    inputArea.addEventListener('input', renderOutput);
}

// --- 切换按钮的事件监听 ---
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

// 页面加载时首次渲染
// 使用 DOMContentLoaded 可以确保所有HTML元素都已加载完毕
document.addEventListener('DOMContentLoaded', renderOutput);
