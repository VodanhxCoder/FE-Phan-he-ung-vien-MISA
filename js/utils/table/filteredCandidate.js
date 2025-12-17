/**
 * Quản lý phân trang
 */



/**
 *  Cập nhật chỉ số của bảng ghi
 * Created by Minh Khue (16/12/2025)
*/
function updatePaginationUI() {
    const total = appState.filteredCandidates.length;
    const start = total === 0 ? 0 : (appState.currentPage - 1) * appState.pageSize + 1;
    let end = start + appState.pageSize - 1;
    if (end > total) end = total;

    // Update Total
    const totalEl = document.querySelector('.total span');
    if (totalEl) totalEl.textContent = total;

    // Update Range
    const rangeEl = document.querySelector('.number-pagination span');
    if (rangeEl) rangeEl.textContent = `${start} - ${end} bản ghi`;
}


/**
 *  Khởi tạo sự kiện phân trang
 * Created by Minh Khue (16/12/2025)
*/
function initPagination() {
    const prevBtn = document.querySelector('.icon-left-arrow');
    const nextBtn = document.querySelector('.icon-right-arrow');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (appState.currentPage > 1) {
                appState.currentPage--;
                updateTable();
                setColorDuplicateRows();

            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const maxPage = Math.ceil(appState.filteredCandidates.length / appState.pageSize);
            if (appState.currentPage < maxPage) {
                appState.currentPage++;
                updateTable();
                setColorDuplicateRows();

            }
        });
    }

    // Page Size Dropdown Logic
    const paginationEl = document.querySelector('.pagination');
    const dropdownEl = document.querySelector('.page-size-dropdown');
    const pageSizeText = document.querySelector('.page-size-text');

    if (paginationEl && dropdownEl) {
        // Toggle dropdown
        paginationEl.addEventListener('click', (e) => {
            e.stopPropagation();
            const isVisible = dropdownEl.style.display === 'block';
            dropdownEl.style.display = isVisible ? 'none' : 'block';
        });

        // Close when clicking outside
        document.addEventListener('click', () => {
            dropdownEl.style.display = 'none';

        });

        // Handle option selection
        const options = document.querySelectorAll('.page-size-option');
        options.forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent toggling again
                const newSize = parseInt(e.target.getAttribute('data-value'));

                if (appState.pageSize !== newSize) {
                    appState.pageSize = newSize;
                    appState.currentPage = 1; // Reset to first page

                    if (pageSizeText) pageSizeText.textContent = newSize;
                    updateTable();
                    setColorDuplicateRows();

                }
                dropdownEl.style.display = 'none';
            });
        });
    }
}
