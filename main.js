// 简化的页面交互效果
document.addEventListener('DOMContentLoaded', () => {
    // 平滑的标题出现效果
    const titles = document.querySelectorAll('.title-text');
    titles.forEach(title => {
        title.style.opacity = '0';
        title.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            title.style.transition = 'opacity 1s ease, transform 1s ease';
            title.style.opacity = '1';
            title.style.transform = 'translateY(0)';
        }, 100);
    });

    // 导航按钮悬停效果增强
    const navButtons = document.querySelectorAll('.nav-button');
    navButtons.forEach(button => {
        button.addEventListener('mouseover', () => {
            button.style.transition = 'all 0.3s ease';
        });
    });
});

// 优化的滚动效果
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const cards = document.querySelectorAll('.content-card');
    
    cards.forEach(card => {
        const cardTop = card.offsetTop;
        if (scrolled > cardTop - window.innerHeight * 0.8) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
});