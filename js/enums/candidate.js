/* =========================
 * Candidate Enums
 * ========================= */

// /** Giới tính */
// const GENDER = {
//     MALE: 1,
//     FEMALE: 2,
//     OTHER: 0,
// };

// const GENDER_TEXT = {
//     [GENDER.MALE]: "Nam",
//     [GENDER.FEMALE]: "Nữ",
//     [GENDER.OTHER]: "Khác",
// };

/** Kho tiềm năng */
const TALENT_POOL = {
    NO: 0,
    YES: 1,
};

const TALENT_POOL_TEXT = {
    [TALENT_POOL.YES]: "Có",
    [TALENT_POOL.NO]: "--",
};

/** Trạng thái Portal */
const PORTAL_STATUS = {
    NOT_CREATED: null,
    CREATED: 1,
};

const PORTAL_STATUS_TEXT = {
    [PORTAL_STATUS.CREATED]: "Đã tạo",
    [PORTAL_STATUS.NOT_CREATED]: "Chưa tạo",
};

/** Trạng thái Active */
const ACTIVE_STATUS = {
    INACTIVE: 0,
    ACTIVE: 1,
};

const ACTIVE_STATUS_TEXT = {
    [ACTIVE_STATUS.ACTIVE]: "Đang hoạt động",
    [ACTIVE_STATUS.INACTIVE]: "Ngừng hoạt động",
};

/** Thông báo Toast */
const TOAST_MESSAGE = {
    SUCCESS: {
        ADD: "Thêm mới ứng viên thành công",
        EDIT: "Sửa thông tin thành công",
        DELETE: "Xóa ứng viên thành công"
    },
    ERROR: {
        DEFAULT: "Đã có lỗi xảy ra, vui lòng thử lại",
        VALIDATION: "Dữ liệu không hợp lệ"
    }
};

const TOAST_TYPE = {
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info'
};

/** Loại ứng viên */
const CANDIDATE_TYPE = {
    NORMAL: 0,
    INTERNAL: 1,
};

const CANDIDATE_TYPE_TEXT = {
    [CANDIDATE_TYPE.INTERNAL]: "Nội bộ",
    [CANDIDATE_TYPE.NORMAL]: "Thường",
};


// /** Birthday format */
// const BIRTHDAY_FORMAT = {
//     FULL_DATE: 1,
//     MONTH_YEAR: 2,
//     YEAR_ONLY: 3,
// };
