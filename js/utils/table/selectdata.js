/**
 * Khởi tạo sự kiện cho checkbox trong bảng ứng viên
 * CreatedBy: Minh Khue (17/12/2025)
 */
function initCheckboxEvents() {

    const checkAll = document.getElementById("checkAll");
    const tableBody = document.getElementById("candidate-table-body");
    if (!checkAll || !tableBody) return;

    // Event chọn tất cả
    checkAll.addEventListener("change", () => {
        handleCheckAll(checkAll, tableBody);
        updateToolbarState(tableBody);
    });

    // Event cho từng checkbox dòng (event delegation)
    tableBody.addEventListener("change", (e) => {
        if (!e.target.classList.contains("input-table-checkbox")) return;
        handleRowCheck(checkAll, tableBody, e.target);
        updateToolbarState(tableBody);
    });
}

/**
 * Xử lý sự kiện chọn tất cả checkbox trong bảng
 * @param {HTMLInputElement} checkAll - Checkbox "Chọn tất cả"
 * @param {HTMLElement} tableBody - Phần thân của bảng chứa các dòng dữ liệu
 * CreatedBy: Minh Khue (17/12/2025)
 */
function handleCheckAll(checkAll, tableBody) {
    const rowChecks = tableBody.querySelectorAll(".input-table-checkbox");

    rowChecks.forEach(cb => {
        cb.checked = checkAll.checked;
        toggleRowHighlight(cb);
    });

    checkAll.indeterminate = false;
}


/** * Xử lý sự kiện chọn một checkbox dòng trong bảng
 * @param {HTMLInputElement} checkAll - Checkbox "Chọn tất cả"
 * @param {HTMLElement} tableBody - Phần thân của bảng chứa các dòng dữ liệu
 * @param {HTMLInputElement} checkbox - Checkbox dòng được thay đổi trạng thái
 * CreatedBy: Minh Khue (17/12/2025)
 */
function handleRowCheck(checkAll, tableBody, checkbox) {
    toggleRowHighlight(checkbox);

    const all = tableBody.querySelectorAll(".input-table-checkbox");
    const checked = tableBody.querySelectorAll(".input-table-checkbox:checked");

    checkAll.checked = checked.length === all.length;
    checkAll.indeterminate = checked.length > 0 && checked.length < all.length;
}
/**
 * Thêm hoặc bỏ highlight cho dòng khi checkbox được chọn hoặc bỏ chọn
 * @param {HTMLInputElement} checkbox - Checkbox dòng được thay đổi trạng thái
 * CreatedBy: Minh Khue (17/12/2025)
 */
function toggleRowHighlight(checkbox) {
    const row = checkbox.closest("tr");
    if (!row) return;

    row.classList.toggle("row-checked", checkbox.checked);
}

/**
 * Cập nhật trạng thái của toolbar bên phải dựa trên số lượng checkbox được chọn
 * @param {HTMLElement} tableBody - Phần thân của bảng chứa các dòng dữ liệu
 * CreatedBy: Minh Khue (17/12/2025)
 */

function updateToolbarState(tableBody) {
    const checkedCount = tableBody.querySelectorAll(".input-table-checkbox:checked").length;
    const toolbarRight = document.querySelector(".toolbar-right");

    if (!toolbarRight) return;

    if (checkedCount > 0) {
        toolbarRight.classList.add("has-selection");
    } else {
        toolbarRight.classList.remove("has-selection");
    }
}

/**
 * Khởi tạo sự kiện cho more toolbar popup
 * CreatedBy: Minh Khue (17/12/2025)
 */
function initMoreToolbarEvents() {
    const moreToolbar = document.querySelector(".more-toolbar");
    const popup = document.getElementById("moreToolbarPopup");

    if (!moreToolbar || !popup) return;

    // Toggle popup khi click vào icon more
    moreToolbar.addEventListener("click", (e) => {
        // Nếu click vào popup thì không làm gì (để sự kiện click của các item trong popup hoạt động)
        if (e.target.closest('.more-toolbar-popup')) return;

        e.stopPropagation();
        popup.classList.toggle("show");
    });

    // Đóng popup khi click ra ngoài
    document.addEventListener("click", (e) => {
        if (!moreToolbar.contains(e.target)) {
            popup.classList.remove("show");
        }
    });

    // Sự kiện xóa ứng viên
    const btnDelete = document.getElementById("btn-delete-candidate");
    if (btnDelete) {
        btnDelete.addEventListener("click", () => {
            // Đóng popup
            popup.classList.remove("show");

            // Lấy danh sách ID đã chọn
            const tableBody = document.getElementById("candidate-table-body");
            const selectedCheckboxes = tableBody.querySelectorAll(".input-table-checkbox:checked");

            if (selectedCheckboxes.length === 0) {
                return;
            }

            const idsToDelete = Array.from(selectedCheckboxes).map(cb => {
                const row = cb.closest("tr");
                return row.getAttribute("data-id");
            });

            // Hiển thị xác nhận
            if (confirm(`Bạn có chắc chắn muốn xóa ${idsToDelete.length} ứng viên đã chọn không?`)) {
                if (typeof deleteCandidates === 'function') {
                    deleteCandidates(idsToDelete);
                } else {
                    console.error("Hàm deleteCandidates chưa được định nghĩa");
                }
            }
        });
    }
}
