/**
 * Hiển thị thông báo Toast (Messenger Style)
 * param {string} message - Nội dung thông báo
 * param {string} type - Loại thông báo: 'success' | 'error'
 * Created by: Minh Khue (17/12/2024)
 */
function showToast(message = "", type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    // Create toast element
    const toast = document.createElement('div');
    toast.classList.add('dx-toast-content');
    toast.classList.add(type === 'success' ? 'dx-toast-success-content' : 'dx-toast-error-content');

    // Icon
    const icon = document.createElement('div');
    icon.classList.add('dx-toast-icon');
    icon.classList.add(type === 'success' ? 'dx-toast-success-icon' : 'dx-toast-error-icon');

    // Message
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('dx-toast-message');
    msgDiv.textContent = message;

    // Append children
    toast.appendChild(icon);
    toast.appendChild(msgDiv);

    // Append to container
    container.appendChild(toast);

    // Auto remove
    setTimeout(() => {
        toast.classList.add('hide');
        toast.addEventListener('animationend', () => {
            if (toast.parentElement) {
                container.removeChild(toast);
            }
        });
    }, 3000);

    // Click to remove immediately
    toast.onclick = () => {
        toast.classList.add('hide');
        toast.addEventListener('animationend', () => {
            if (toast.parentElement) {
                container.removeChild(toast);
            }
        });
    };
}

/**
 * Thông báo lỗi 
 * Param {input id, errorId, messenger } int, messenger - id của ô nhập liệu, id lỗi, thông báo trả về
 * Created by: Minh Khue (16/12/2024)
 */
function showInputError(inputId = null, errorId = null, message = "") {
    const input = document.getElementById(inputId);
    const errorDiv = document.getElementById(errorId);

    if (input) {
        input.classList.add('input-error');
        // Add input listener to clear error on typing
        input.addEventListener('input', function () {
            resetInputError(inputId, errorId);
        }, { once: true });
    }

    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
    }
}

/**
 * reset các thông báo lỗi validate
 * Param {input id, errorId } int, messenger - id của ô nhập liệu, id lỗi
 * Created by: Minh Khue (16/12/2024)
 */
function resetInputError(inputId, errorId) {
    const input = document.getElementById(inputId);
    const errorDiv = document.getElementById(errorId);

    if (input) input.classList.remove('input-error');
    if (errorDiv) {
        errorDiv.textContent = '';
        errorDiv.style.display = 'none';
    }
}

function resetValidation() {
    // List of all validated fields
    resetInputError('popupName', 'errorName');
}
