/**
 * Xóa danh sách ứng viên theo ID
 * @param {Array<string>} ids - Danh sách ID ứng viên cần xóa
 * CreatedBy: Minh Khue (17/12/2025)
 */
function deleteCandidates(ids) {
    if (!ids || ids.length === 0) return;

    // Xóa khỏi danh sách gốc
    // Chuyển CandidateID sang string để so sánh chính xác với ids (là mảng string)
    appState.candidates = appState.candidates.filter(c => !ids.includes(String(c.CandidateID)));

    // Xóa khỏi danh sách đã lọc (nếu đang search)
    appState.filteredCandidates = appState.filteredCandidates.filter(c => !ids.includes(String(c.CandidateID)));

    // Lưu lại vào localStorage
    localStorage.setItem("candidates", JSON.stringify(appState.candidates));

    // Render lại bảng
    updateTable();

    // Cập nhật lại trạng thái toolbar (ẩn more toolbar vì đã xóa hết selection)
    const tableBody = document.getElementById("candidate-table-body");
    if (tableBody) {
        // Bỏ check all nếu có
        const checkAll = document.getElementById("checkAll");
        if (checkAll) checkAll.checked = false;

        updateToolbarState(tableBody);
    }

    // Hiển thị thông báo thành công
    if (typeof showToast === 'function') {
        showToast(TOAST_MESSAGE.SUCCESS.DELETE, TOAST_TYPE.SUCCESS);
    }
}
