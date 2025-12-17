
/**
 * Tạo đối tượng ứng viên mặc định dựa trên cấu trúc dữ liệu mẫu
 * return {Object} - Đối tượng ứng viên với các trường mặc định
 * Created by: Minh Khue (06/12/2024)
 */
function getDefaultCandidateModel() {
    // Sử dụng CandidateTemplate từ schema.js nếu có
    if (typeof CandidateTemplate !== 'undefined') {
        // Clone object để tránh tham chiếu
        return JSON.parse(JSON.stringify(CandidateTemplate));
    }

    // Fallback nếu không có schema
    const template = (candidates && candidates.length > 0) ? candidates[0] : {};

    const model = {};
    for (const key in template) {
        if (Object.prototype.hasOwnProperty.call(template, key)) {
            model[key] = null;
        }
    }

    model.CreatedDate = new Date().toISOString();
    model.ModifiedDate = new Date().toISOString();
    model.Active = 1;

    return model;
}

/**
 * Lưu thông tin ứng viên
 * param {Object} candidate - Đối tượng ứng viên chứa thông tin cần lưu
 * return {boolean} - Trả về true nếu lưu thành công, ngược lại false
 * Created by: Minh Khue (06/12/2024)
 */
function saveCandidate() {
    const name = document.getElementById('popupName').value;
    const email = document.getElementById('popupEmail').value;
    const phone = document.getElementById('popupPhone').value;
    const dob = document.getElementById('popupDOB').value;
    const gender = document.getElementById('popupGender').value;
    const area = document.getElementById('popupArea').value;
    const address = document.getElementById('popupAddress').value;
    const degree = document.getElementById('popupDegree').value;
    const school = document.getElementById('popupSchool').value;
    const major = document.getElementById('popupMajor').value;
    const applyDate = document.getElementById('popupApplyDate').value;
    const source = document.getElementById('popupSource').value;
    const hr = document.getElementById('popupHR').value;
    const collaborator = document.getElementById('popupCollaborator').value;
    const recentWork = document.getElementById('popupRecentWork').value;

    // Reference Data
    const refNameEl = document.getElementById('popupRefName');
    const refPhoneEl = document.getElementById('popupRefPhone');
    const refEmailEl = document.getElementById('popupRefEmail');
    const refPositionEl = document.getElementById('popupRefPosition');
    const refCompanyEl = document.getElementById('popupRefCompany');
    const fastAddEl = document.getElementById('fastAdd');
    const refAddEl = document.getElementById('refAdd');

    const refName = refNameEl ? refNameEl.value : '';
    const refPhone = refPhoneEl ? refPhoneEl.value : '';
    const refEmail = refEmailEl ? refEmailEl.value : '';
    const refPosition = refPositionEl ? refPositionEl.value : '';
    const refCompany = refCompanyEl ? refCompanyEl.value : '';
    const fastAdd = fastAddEl ? fastAddEl.checked : false;
    const refAdd = refAddEl ? refAddEl.checked : false;

    // Experience Data
    const expWorkplace = document.getElementById('popupExpWorkplace').value;
    const expStartDate = document.getElementById('popupExpStartDate').value;
    const expEndDate = document.getElementById('popupExpEndDate').value;
    const expPosition = document.getElementById('popupExpPosition').value;
    const expDesc = document.getElementById('popupExpDesc').value;

    // Reset validation
    resetValidation();

    if (!name) {
        showInputError('popupName', 'errorName', 'Họ và tên không được để trống');
        showToast(TOAST_MESSAGE.ERROR.VALIDATION, TOAST_TYPE.ERROR);
        return;
    }

    if (email && !email.includes('@')) {
        showInputError('popupEmail', 'errorEmail', 'Email không hợp lệ');
        showToast(TOAST_MESSAGE.ERROR.VALIDATION, TOAST_TYPE.ERROR);
        return;
    }

    const commonData = {
        CandidateName: name,
        Email: email,
        Mobile: phone,
        Gender: gender !== 'Chọn giới tính' ? gender : null,
        AreaName: area !== 'Chọn giá trị' ? area : null,
        Address: address,
        EducationDegreeName: degree,
        EducationPlaceName: school,
        EducationMajorName: major,
        ApplyDate: applyDate ? new Date(applyDate).toISOString() : new Date().toISOString(),
        ChannelName: source !== 'Chọn nguồn ứng viên' ? source : null,
        AttractivePersonnel: hr,
        PresenterName: collaborator !== 'Chọn cộng tác viên' ? collaborator : null,
        WorkPlaceRecent: recentWork,

        // New Fields
        ReferenceName: refName,
        ReferencePhone: refPhone,
        ReferenceEmail: refEmail,
        ReferencePosition: refPosition,
        ReferenceCompany: refCompany,
        IsFastAddRef: fastAdd,
        IsRefAddRef: refAdd,

        ExperienceWorkplace: expWorkplace,
        ExperienceStartDate: expStartDate,
        ExperienceEndDate: expEndDate,
        ExperiencePosition: expPosition,
        ExperienceDesc: expDesc
    };

    // Handle Birthday
    if (dob) {
        const dateObj = new Date(dob);
        if (!isNaN(dateObj.getTime())) {
            commonData.MonthOfBirthday = dateObj.getMonth() + 1;
            commonData.YearOfBirthday = dateObj.getFullYear();
            commonData.BirthdayFormat = 3; // Assuming 3 means full date or similar
        }
    }

    if (appState.editingId) {
        // Edit Logic
        const index = appState.candidates.findIndex(c => c.CandidateID === appState.editingId);
        if (index !== -1) {
            appState.candidates[index] = {
                ...appState.candidates[index],
                ...commonData,
                ModifiedDate: new Date().toISOString()
            };
            showToast(TOAST_MESSAGE.SUCCESS.EDIT, TOAST_TYPE.SUCCESS);
        }
    } else {
        // Add Logic
        // Tạo đối tượng mới dựa trên mẫu
        const defaultModel = getDefaultCandidateModel();

        const newCandidate = {
            ...defaultModel,
            ...commonData,
            CandidateID: Date.now(), // ID tự sinh
            CreatedDate: new Date().toISOString(),
            ModifiedDate: new Date().toISOString()
        };

        appState.candidates.unshift(newCandidate);
        showToast(TOAST_MESSAGE.SUCCESS.ADD, TOAST_TYPE.SUCCESS);
    }

    localStorage.setItem('candidates', JSON.stringify(appState.candidates));

    // Reset Search/Page
    appState.filteredCandidates = appState.candidates;
    appState.currentPage = 1;

    updateTable();
    closeModalFunc();
}
