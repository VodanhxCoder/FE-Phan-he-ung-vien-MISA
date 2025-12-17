const tableBody = document.getElementById("candidate-table-body");

/**
 * Định dạng ngày tháng theo định dạng Việt Nam
 * param {string} dateString - Chuỗi ngày tháng cần định dạng
 * return {string} - Ngày tháng đã định dạng
 * Created by: Minh Khue (15/12/2024)
 */
function formatDate(dateString) {
    if (!dateString) return "--";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString("vi-VN");
}

/**
 * Lấy màu avatar dựa trên tên
 * param {string} name - Tên đầy đủ của ứng viên
 * return   {string} - Lớp màu avatar
 * Created by: Minh Khue (15/12/2024)
 */
function getAvatarColor(name) {
    const colors = [
        "avatar-pink",
        "avatar-yellow",
        "avatar-blue",
        "avatar-teal",
        "avatar-rose",
    ];
    if (!name) return colors[0];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
}

/**
 * Hiển thị danh sách ứng viên lên bảng
 * param {Array} data - Danh sách ứng viên cần hiển thị
 * return {void}
 * Created by: Minh Khue (15/12/2024)
 */

function renderTable(data) {
    if (!tableBody) return;
    tableBody.innerHTML = "";
    const fragment = document.createDocumentFragment();

    data.forEach((candidate) => {
        const tr = document.createElement("tr");

        // Mapping new data structure to table columns
        const phone = candidate.Mobile || "--";
        const source = candidate.ChannelName || "--";
        const name = candidate.CandidateName || "--";
        const email = candidate.Email || "--";
        const campaign = candidate.RecruitmentCampaignNames || "--";
        const position = candidate.JobPositionName || "--";
        const recruitment = candidate.RecruitmentName || "--";
        const round = candidate.RecruitmentRoundName || "--";
        const rating = candidate.Score || "--";
        const appliedDate = formatDate(candidate.ApplyDate);
        const degree = candidate.EducationDegreeName || "--";
        const school = candidate.EducationPlaceName || "--";
        const major = candidate.EducationMajorName || "--";
        const recentWork = candidate.WorkPlaceRecent || "--";
        const hr = candidate.AttractivePersonnel || "--";
        const unit = candidate.OrganizationUnitName || "--";
        const overall = candidate.Overall || "--";
        const area = candidate.AreaName || "--";
        const presenter = candidate.PresenterName || "--";
        const info = "--"; // Placeholder for "Thông tin tiếp nhận"
        const potential =
            TALENT_POOL_TEXT[candidate.IsTalentPoolDetail] ||
            TALENT_POOL_TEXT[TALENT_POOL.NO];

        // Các trường dữ liệu khác
        const portalStatus =
            PORTAL_STATUS_TEXT[candidate.ProbationInfoStatus] ||
            PORTAL_STATUS_TEXT[PORTAL_STATUS.NOT_CREATED];
        const activeStatus =
            ACTIVE_STATUS_TEXT[candidate.Active] ||
            ACTIVE_STATUS_TEXT[ACTIVE_STATUS.INACTIVE];
        const candidateType =
            CANDIDATE_TYPE_TEXT[candidate.CandidateType] ||
            CANDIDATE_TYPE_TEXT[CANDIDATE_TYPE.NORMAL];
        const birthdayFormat = candidate.BirthdayFormat;

        // Các trường bổ sung khác
        const countTask = candidate.CountTask || "--";
        const recruitmentChannelID = candidate.RecruitmentChannelID || "--";
        const candidateID = candidate.CandidateID || "--";
        const recruitmentID = candidate.RecruitmentID || "--";
        const isNew = candidate.IsNew || "--";
        const isSelfUpdate = candidate.IsSelfUpdate || "--";
        const isNewProbationInfo = candidate.IsNewProbationInfo || "--";
        const isSentProbationInfo = candidate.IsSentProbationInfo || "--";
        const recruitmentStatusReal = candidate.RecruitmentStatusReal || "--";
        const recruitmentStatus = candidate.RecruitmentStatus || "--";
        const isOutOfCapcity = candidate.IsOutOfCapcity || "--";
        const monthOfBirthday = candidate.MonthOfBirthday || "--";
        const yearOfBirthday = candidate.YearOfBirthday || "--";
        const isMultiNews = candidate.IsMultiNews || "--";
        const isEmployee = candidate.IsEmployee || "--";
        const customInforFields = candidate.CustomInforFields || "--";
        const presenterOUID = candidate.PresenterOUID || "--";
        const presenterOUName = candidate.PresenterOUName || "--";
        const unreadEmailQuantity = candidate.UnreadEmailQuantity || "--";
        const employeeBlackListIDs = candidate.EmployeeBlackListIDs || "--";
        const recruitmentCampaignIDs = candidate.RecruitmentCampaignIDs || "--";
        const candidateConvertID = candidate.CandidateConvertID || "--";
        const sentPropose = candidate.SentPropose || "--";
        const unreadCommentQuantity = candidate.UnreadCommentQuantity || "--";
        const statusTrain = candidate.StatusTrain || "--";
        const isSendTrain = candidate.IsSendTrain || "--";
        const proposeOfferStatus = candidate.ProposeOfferStatus || "--";
        const isHaveCV = candidate.IsHaveCV || "--";
        const fileCVID = candidate.FileCVID || "--";
        const isDuplicate = candidate.IsDuplicate || "--";

        const avatarColor = getAvatarColor(name);
        // Use dynamic status from data
        const candidateStatus = candidate.CandidateStatusName;

        // Only show the "Nhân viên" tag if the RecruitmentRoundName is "Đã tuyển"
        let statusHtml = "";
        if (round === "Đã tuyển") {
            statusHtml = `
                    <span class="tag tag-success">
                        <div class="icon-check-green"></div>
                        Nhân viên
                    </span>
                `;
        }

        tr.setAttribute("data-id", candidate.CandidateID);
        tr.innerHTML = `
                <td class="col-check"><input type="checkbox" class="input-table-checkbox" aria-label="Chọn ứng viên" /></td>
                <td class="col-name name-cell">
                    <span class="avatar ${avatarColor}">${getInitials(
            name
        )}</span>
                    <div class="name-info">
                        <span class="full-name">${name}</span>
                        ${statusHtml}
                    </div>
                </td>
                <td class="col-phone">${phone}</td>
                <td class="col-source">${source}</td>
                
                <td class="col-email">${email}</td>
                <td class="col-campaign">${campaign}</td>
                <td class="col-position">${position}</td>
                <td class="col-recruitment">${recruitment}</td>
                <td class="col-round">${round}</td>
                <td class="col-rating">${rating}</td>
                <td class="col-applied-date">${appliedDate}</td>
                <td class="col-degree">${degree}</td>
                <td class="col-school">${school}</td>
                <td class="col-major">${major}</td>
                <td class="col-recent-work">${recentWork}</td>
                <td class="col-hr">${hr}</td>
                <td class="col-unit">${unit}</td>
                <td class="col-overall">${overall}</td>
                <td class="col-area">${area}</td>
                <td class="col-presenter">${presenter}</td>
                <td class="col-info">${info}</td>
                <td class="col-potential">${potential}</td>
                <td class="col-action "><div class="icon icon-action-change"></div></td>
            `;
        fragment.appendChild(tr);
    });
    tableBody.appendChild(fragment);
}

/**
 * Lấy chữ cái đầu của tên
 * param {string} name - Tên đầy đủ của ứng viên
 * return {string} - Chữ cái đầu của tên
 * Created by: Minh Khue (15/12/2024)
 */
function getInitials(name) {
    if (!name) return "";
    const parts = name.split(" ");
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}


/**
 * Kiểm tra ứng viên trùng lặp
 * @param {Object} candidate - Đối tượng ứng viên cần kiểm tra
 * @return {boolean} - Trả về true nếu trùng lặp, ngược lại false
 * Created by: Minh Khue (17/12/2024)
 */
function CheckDuplicateCandidate(candidate) {
    const duplicate = appState.candidates.find((c) => {
        // Không so sánh chính nó
        if (c.CandidateID === candidate.CandidateID) return false;

        const emailMatch =
            candidate.Email &&
            c.Email &&
            c.Email.trim().toLowerCase() === candidate.Email.trim().toLowerCase();

        const mobileMatch =
            candidate.Mobile &&
            c.Mobile &&
            c.Mobile.trim() === candidate.Mobile.trim();

        // Chỉ cần 1 trong 2 điều kiện đúng
        return emailMatch || mobileMatch;
    });

    return Boolean(duplicate);
}

/** * Tô màu các dòng trùng lặp trong bảng
 * Created by: Minh Khue (17/12/2024)
 */
function setColorDuplicateRows() {
    const rows = tableBody.querySelectorAll("tr");
    rows.forEach((row) => {
        const candidateID = row.getAttribute("data-id");

        const candidate = appState.candidates.find(
            (c) => c.CandidateID == candidateID
        );
        if (CheckDuplicateCandidate(candidate)) {
            row.classList.add("duplicate-row");
        } else {
            row.classList.remove("duplicate-row");
        }
    });
}
