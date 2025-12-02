// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    initMenu();
    initThemeToggle();
    initSearch();
});

// 初始化菜单功能
function initMenu() {
    const menuItems = document.querySelectorAll('.menu-item');
    const pages = document.querySelectorAll('.page');

    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // 移除所有激活状态
            menuItems.forEach(menu => menu.classList.remove('active'));
            pages.forEach(page => page.classList.remove('active'));

            // 添加当前激活状态
            this.classList.add('active');
            const pageId = this.getAttribute('data-page') + '-page';
            document.getElementById(pageId).classList.add('active');
        });
    });
}

// 初始化主题切换
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;

    // 检查本地存储中的主题设置
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    }

    themeToggle.addEventListener('click', function() {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

// 更新主题图标
function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('i');

    if (theme === 'dark') {
        icon.className = 'fa fa-sun-o';
    } else {
        icon.className = 'fa fa-moon-o';
    }
}

// 初始化搜索功能
function initSearch() {
    const searchInput = document.getElementById('searchInput');

    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        if (searchTerm.trim() === '') {
            clearSearchHighlight();
            return;
        }

        searchAndHighlight(searchTerm);
    });

    // 按下回车键搜索
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const searchTerm = e.target.value.toLowerCase();
            searchAndHighlight(searchTerm);
        }
    });
}

// 搜索并高亮文本
function searchAndHighlight(searchTerm) {
    clearSearchHighlight();

    const activePage = document.querySelector('.page.active');
    const textElements = activePage.querySelectorAll('h1, h2, h3, p, li, code');

    textElements.forEach(element => {
        const text = element.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            // 创建高亮效果
            const originalText = element.textContent;
            const regex = new RegExp(`(${searchTerm})`, 'gi');
            const highlightedText = originalText.replace(regex, '<mark>$1</mark>');
            element.innerHTML = highlightedText;

            // 滚动到第一个匹配项
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
}

// 清除搜索高亮
function clearSearchHighlight() {
    const markedElements = document.querySelectorAll('mark');
    markedElements.forEach(mark => {
        const parent = mark.parentNode;
        parent.replaceChild(document.createTextNode(mark.textContent), mark);
        parent.normalize();
    });
}

// 页面测试功能
function testVoice() {
    // 模拟语音测试功能（纯前端演示）
    const testButton = document.createElement('button');
    testButton.textContent = '测试语音功能';
    testButton.className = 'test-button';
    testButton.style.cssText = `
        background-color: var(--accent-color);
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 5px;
        cursor: pointer;
        font-size: 1rem;
        margin-top: 1rem;
    `;

    testButton.addEventListener('click', function() {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance('这是pyttsx3的语音测试功能');
            window.speechSynthesis.speak(utterance);
            alert('正在播放测试语音，请确保您的扬声器已打开');
        } else {
            alert('您的浏览器不支持Web Speech API，请使用现代浏览器测试');
        }
    });

    // 添加到首页
    const quickStart = document.querySelector('.quick-start');
    quickStart.appendChild(testButton);
}

// 添加测试按钮
testVoice();
