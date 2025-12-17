// Select elements using classes to minimize HTML changes
const btnAddCandidate = document.getElementById("btn-add-new-user");
const modalAdd = document.querySelector(".modal-add");
const overlay = document.getElementById("overlay");
const closeModal = document.getElementById("closeModal");
const btnCancel = document.querySelector(".btn-cancel");

/**
 * Mở pop-up thêm ứng viên
 * return {void}
 * Created by: Minh Khue (15/12/2024)
 */
function openModal() {
    if (modalAdd) modalAdd.classList.add("show");
    if (overlay) overlay.classList.add("show");
}
/**
 * Đóng pop-up thêm ứng viên
 * return {void}
 * Created by: Minh Khue (15/12/2024)
 */
function closeModalFunc() {
    if (modalAdd) modalAdd.classList.remove("show");
    if (overlay) overlay.classList.remove("show");
}


/**
 * Mở pop-up thêm ứng viên
 * 
 * Created by: Minh Khue (16/12/2024)
 */
function openAddModal() {
    appState.editingId = null;
    const title = document.querySelector('.modal-header .title-header');
    if (title) title.textContent = "Thêm ứng viên";

    // Clear form
    const inputs = [
        'popupName', 'popupEmail', 'popupPhone', 'popupDOB',
        'popupAddress', 'popupDegree', 'popupSchool', 'popupMajor',
        'popupApplyDate',
        // Reference
        'popupRefName', 'popupRefPhone', 'popupRefEmail', 'popupRefPosition', 'popupRefCompany',
        // Experience
        'popupExpWorkplace', 'popupExpStartDate', 'popupExpEndDate', 'popupExpPosition', 'popupExpDesc'
    ];
    inputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });

    // Checkboxes
    const checkboxes = ['fastAdd', 'refAdd'];
    checkboxes.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.checked = false;
    });

    const selects = ['popupGender', 'popupArea', 'popupSource', 'popupHR', 'popupCollaborator'];
    selects.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.selectedIndex = 0;
    });

    // Set default Apply Date to today
    const applyDateEl = document.getElementById('popupApplyDate');
    if (applyDateEl) {
        applyDateEl.value = new Date().toISOString().split('T')[0];
    }

    resetValidation();
    openModal();
}
/**
 * Set giá trị cho một trường trong form
 * @param {string} id - ID của phần tử
 * @param {any} value - Giá trị cần đặt
 * @param {any} defaultValue - Giá trị mặc định nếu value là null hoặc undefined
 * @return {void}
 * Created by: Minh Khue (16/12/2024)
*/
const setValue = (id, value, defaultValue = "") => {
    const el = document.getElementById(id);
    if (!el) return;

    if (el.type === "checkbox") {
        el.checked = Boolean(value);
    } else {
        el.value = value ?? defaultValue;
    }
};

/**
 * Đặt giá trị cho form từ đối tượng ứng viên
 * @param {Object} candidate - Đối tượng ứng viên
 * @return {void}
 * Created by: Minh Khue (16/12/2024)
 */
function SetvalueDataToForm(candidate) {

    // ===== BASIC INFO =====
    setValue("popupName", candidate.CandidateName);
    setValue("popupEmail", candidate.Email);
    setValue("popupPhone", candidate.Mobile);

    // DOB
    if (candidate.YearOfBirthday && candidate.MonthOfBirthday) {
        const month = String(candidate.MonthOfBirthday).padStart(2, "0");
        setValue("popupDOB", `${candidate.YearOfBirthday}-${month}-01`);
    }

    setValue("popupGender", candidate.Gender, "Chọn giới tính");
    setValue("popupArea", candidate.AreaName, "Chọn giá trị");
    setValue("popupAddress", candidate.Address);
    setValue("popupDegree", candidate.EducationDegreeName);
    setValue("popupSchool", candidate.EducationPlaceName);
    setValue("popupMajor", candidate.EducationMajorName);

    // Apply Date
    if (candidate.ApplyDate) {
        const date = new Date(candidate.ApplyDate);
        if (!isNaN(date)) {
            setValue("popupApplyDate", date.toISOString().split("T")[0]);
        }
    }

    setValue("popupSource", candidate.ChannelName, "Chọn nguồn ứng viên");
    setValue("popupHR", candidate.AttractivePersonnel);
    setValue("popupCollaborator", candidate.PresenterName, "Chọn cộng tác viên");
    setValue("popupRecentWork", candidate.WorkPlaceRecent);

    // ===== REFERENCE =====
    setValue("popupRefName", candidate.ReferenceName);
    setValue("popupRefPhone", candidate.ReferencePhone);
    setValue("popupRefEmail", candidate.ReferenceEmail);
    setValue("popupRefPosition", candidate.ReferencePosition);
    setValue("popupRefCompany", candidate.ReferenceCompany);
    setValue("fastAdd", candidate.IsFastAddRef);
    setValue("refAdd", candidate.IsRefAddRef);

    // ===== EXPERIENCE =====
    setValue("popupExpWorkplace", candidate.ExperienceWorkplace);
    setValue("popupExpStartDate", candidate.ExperienceStartDate);
    setValue("popupExpEndDate", candidate.ExperienceEndDate);
    setValue("popupExpPosition", candidate.ExperiencePosition);
    setValue("popupExpDesc", candidate.ExperienceDesc);

}
/**
 * Mở pop-up chỉnh sửa ứng viên
 * @param {number} id - ID của ứng viên cần chỉnh sửa
 * @return {void}    
 * Created by: Minh Khue (16/12/2024)
 */
function openEditModal(id) {
    const candidate = appState.candidates.find(c => c.CandidateID == id);
    if (!candidate) return;

    appState.editingId = candidate.CandidateID;

    const headerTitle = document.querySelector('.modal-header .title-header');
    if (headerTitle) {
        headerTitle.textContent = "Chỉnh sửa thông tin ứng viên";
    }
    // Set form values
    SetvalueDataToForm(candidate);
    resetValidation();
    openModal();
}


