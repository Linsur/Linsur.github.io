document.addEventListener("DOMContentLoaded", () => {
    // 管理菜单滚动位置
    let menu = document.getElementById('menu');
    if (menu) {
        menu.scrollLeft = localStorage.getItem("menu-scroll-position") || 0;
        menu.onscroll = () => {
            localStorage.setItem("menu-scroll-position", menu.scrollLeft);
        };
    }

    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(decodeURIComponent(targetId));
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
                });
                history.replaceState(null, null, targetId === "top" ? " " : `#${targetId}`);
            }
        });
    });

    // 显示/隐藏回到顶部按钮
    const mybutton = document.getElementById("top-link");
    window.onscroll = () => {
        if (document.body.scrollTop > 800 || document.documentElement.scrollTop > 800) {
            mybutton.style.visibility = "visible";
            mybutton.style.opacity = "1";
        } else {
            mybutton.style.visibility = "hidden";
            mybutton.style.opacity = "0";
        }
    };

    // 主题切换功能
    const themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
        const savedTheme = localStorage.getItem("pref-theme");
        if (savedTheme === 'dark') {
            document.body.classList.add('dark');
        }
        themeToggle.addEventListener("click", () => {
            const isDark = document.body.classList.toggle('dark');
            localStorage.setItem("pref-theme", isDark ? 'dark' : 'light');
        });
    }
});
