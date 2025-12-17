document.addEventListener("DOMContentLoaded", init);
/**
 * Trạng thái ứng dụng
 * Created by: Minh Khue (15/12/2024)
 */
let appState = {
    candidates: [],
    filteredCandidates: [],
    currentPage: 1,
    pageSize: 25,
    editingId: null
};

/**
 * Khởi tạo ứng dụng
 * return {void}
 * Created by: Minh Khue (15/12/2024)
 */
function init() {
    // Kiểm tra và khởi tạo dữ liệu trong LocalStorage
    let data = localStorage.getItem("candidates");
    if (!data) {
        localStorage.setItem("candidates", JSON.stringify(candidates));
        data = candidates;
    } else {
        data = JSON.parse(data);
    }

    appState.candidates = data;
    appState.filteredCandidates = data;

    /* Render bảng ứng viên */
    updateTable();
    /* Gắn sự kiện */
    bindEvents();
    /* Sidebar Toggle */
    initSidebar();
    /* Search */
    initSearch();
    /* Pagination */
    initPagination();
    setColorDuplicateRows();
    initCheckboxEvents();
    initMoreToolbarEvents();

}
/**
 * Cập nhật bảng hiển thị ứng viên dựa trên trạng thái hiện tại
 * Created by: Minh Khue (16/12/2025)
 */
function updateTable() {
    const start = (appState.currentPage - 1) * appState.pageSize;
    const end = start + appState.pageSize;
    const pageData = appState.filteredCandidates.slice(start, end);

    renderTable(pageData);
    updatePaginationUI();
    setColorDuplicateRows();
}

/**
 * Khởi tạo sự kiện tìm kiếm ứng viên
 * Created by: Minh Khue (16/12/2025)
 */
function initSearch() {
    const searchInput = document.querySelector('.title-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            appState.filteredCandidates = appState.candidates.filter(c =>
                (c.CandidateName && c.CandidateName.toLowerCase().includes(term)) ||
                (c.Email && c.Email.toLowerCase().includes(term)) ||
                (c.Mobile && c.Mobile.includes(term))
            );
            appState.currentPage = 1;
            updateTable();
            setColorDuplicateRows();
        });
    }
}



/**
 * Gắn sự kiện cho các nút và phần tử tương tác
 * return {void}
 * Created by: Minh Khue (15/12/2024)
 */
function bindEvents() {
    console.log('bindEvents called');
    const btnAddCandidate = document.getElementById("btn-add-new-user");
    const closeModal = document.getElementById("closeModal");
    const overlay = document.getElementById("overlay");
    const btnCancel = document.querySelector(".btn-cancel");
    const btnSave = document.querySelector(".btn-save");

    btnAddCandidate?.addEventListener("click", openAddModal);
    closeModal?.addEventListener("click", closeModalFunc);
    overlay?.addEventListener("click", closeModalFunc);
    btnCancel?.addEventListener("click", closeModalFunc);
    btnSave?.addEventListener("click", saveCandidate);

    const tableBody = document.getElementById("candidate-table-body");
    if (tableBody) {
        tableBody.addEventListener('click', (e) => {
            if (e.target.classList.contains('icon-action-change') || e.target.closest('.col-action')) {
                const tr = e.target.closest('tr');
                const id = tr.getAttribute('data-id');
                openEditModal(id);
            }
        });
    }
}