// Form Validation and Interaction
const form = document.getElementById('intakeForm');
const successMessage = document.getElementById('successMessage');
const submitBtn = form.querySelector('button[type="submit"]');
const intakeEndpoint = form.dataset.intakeEndpoint?.trim();

if (!intakeEndpoint) {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Intake unavailable';
    form.querySelectorAll('input, select, textarea').forEach(field => field.disabled = true);
    showStatus('Online intake is not available yet. Please do not enter personal information.', 'error');
}

// Validation Rules
const validationRules = {
    firstName: {
        validate: (value) => value.trim().length > 0,
        message: 'First name is required'
    },
    lastName: {
        validate: (value) => value.trim().length > 0,
        message: 'Last name is required'
    },
    email: {
        validate: (value) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(value);
        },
        message: 'Please enter a valid email address'
    },
    phone: {
        validate: (value) => {
            const phoneRegex = /^[\d\s\-()+]+$/;
            return value.trim().length > 0 && phoneRegex.test(value);
        },
        message: 'Please enter a valid phone number'
    },
    companyName: {
        validate: (value) => value.trim().length > 0,
        message: 'Company name is required'
    },
    companySize: {
        validate: (value) => value !== '',
        message: 'Please select a company size'
    },
    industry: {
        validate: (value) => value !== '',
        message: 'Please select an industry'
    },
    message: {
        validate: (value) => value.trim().length <= 1000,
        message: 'Message must be 1000 characters or less'
    }
};

// Form Submission
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (validateForm()) {
        handleFormSubmit();
    }
});

// Validate Individual Field
function validateField(fieldName) {
    const field = document.getElementById(fieldName);
    const errorElement = document.getElementById(`${fieldName}Error`);
    
    if (!field || !validationRules[fieldName]) return true;
    
    const value = field.value;
    const rule = validationRules[fieldName];
    const isValid = rule.validate(value);
    
    if (!isValid) {
        field.classList.add('error');
        errorElement.textContent = rule.message;
        errorElement.classList.add('show');
        field.setAttribute('aria-invalid', 'true');
        return false;
    } else {
        field.classList.remove('error');
        errorElement.textContent = '';
        errorElement.classList.remove('show');
        field.removeAttribute('aria-invalid');
        return true;
    }
}

// Validate Checkboxes (Services)
function validateCheckboxGroup(groupName) {
    const checkboxes = document.querySelectorAll(`input[name="${groupName}"]`);
    const errorElement = document.getElementById(`${groupName}Error`);
    const isChecked = Array.from(checkboxes).some(cb => cb.checked);
    
    if (!isChecked && groupName === 'services') {
        errorElement.textContent = 'Please select at least one service';
        errorElement.classList.add('show');
        return false;
    } else {
        errorElement.textContent = '';
        errorElement.classList.remove('show');
        return true;
    }
}

// Validate Entire Form
function validateForm() {
    let isValid = true;
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'companyName', 'companySize', 'industry'];
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    // Validate optional field character limit
    if (!validateField('message')) {
        isValid = false;
    }
    
    // Validate services checkbox group
    if (!validateCheckboxGroup('services')) {
        isValid = false;
    }
    
    return isValid;
}

// Real-time Validation (on blur)
const inputFields = form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], select, textarea');
inputFields.forEach(field => {
    field.addEventListener('blur', () => {
        if (field.id && validationRules[field.id]) {
            validateField(field.id);
        }
    });
    
    field.addEventListener('input', () => {
        if (field.classList.contains('error')) {
            validateField(field.id);
        }
    });
});

// Submission requires an endpoint that returns a durable receipt.
async function handleFormSubmit() {
    if (!intakeEndpoint) {
        showStatus('Online intake is not available yet.', 'error');
        return;
    }

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    data.services = formData.getAll('services');

    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';
    successMessage.classList.remove('show');

    try {
        const response = await fetch(intakeEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Intake request failed');
        const result = await response.json();
        if (typeof result.receiptId !== 'string' || !result.receiptId.trim()) {
            throw new Error('No receipt returned');
        }
        showStatus('Your request was received. Receipt: ' + result.receiptId, 'success');
        form.reset();
    } catch (error) {
        showStatus('We could not confirm receipt. Your form has not been cleared. Please try again later.', 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit';
    }
}

function showStatus(message, type) {
    successMessage.textContent = message;
    successMessage.classList.toggle('error', type === 'error');
    successMessage.classList.add('show');
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Reset form button functionality
form.querySelector('button[type="reset"]').addEventListener('click', () => {
    // Clear all error messages
    const errorMessages = form.querySelectorAll('.error-message');
    errorMessages.forEach(msg => {
        msg.classList.remove('show');
        msg.textContent = '';
    });
    
    const invalidFields = form.querySelectorAll('[aria-invalid]');
    invalidFields.forEach(field => field.removeAttribute('aria-invalid'));
    const inputFields = form.querySelectorAll('.error');
    inputFields.forEach(field => field.classList.remove('error'));
    
    if (intakeEndpoint) successMessage.classList.remove('show');
});

