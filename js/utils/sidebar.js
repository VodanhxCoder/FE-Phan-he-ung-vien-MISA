
/**
 * Khởi tạo và xử lý sự kiện cho Sidebar
 * Created by: Minh Khue (16/12/2024)
 */
function initSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const collapseBtn = document.querySelector('.collapse-btn');

    // Restore state
    const isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
    if (isCollapsed && sidebar) {
        sidebar.classList.add('collapsed');
    }

    if (collapseBtn && sidebar) {
        collapseBtn.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
            localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
        });
    }
}