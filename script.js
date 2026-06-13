// Form Validation and Interaction
const form = document.getElementById('intakeForm');
const successMessage = document.getElementById('successMessage');

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
        return false;
    } else {
        field.classList.remove('error');
        errorElement.textContent = '';
        errorElement.classList.remove('show');
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
    validateField('message');
    
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

// Handle Form Submission
function handleFormSubmit() {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Collect multiple checkboxes
    const services = formData.getAll('services');
    data.services = services.length > 0 ? services.join(', ') : 'None selected';
    
    console.log('Form Data:', data);
    
    // Simulate API call
    submitToServer(data);
}

function submitToServer(data) {
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';
    
    // Simulate API delay
    setTimeout(() => {
        // In a real application, you would send the data to your server
        // Example:
        // fetch('/api/intake', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data)
        // })
        // .then(response => response.json())
        // .then(result => showSuccessMessage())
        // .catch(error => showErrorMessage(error));
        
        showSuccessMessage();
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        form.reset();
    }, 1500);
}

function showSuccessMessage() {
    successMessage.textContent = '✓ Your intake form has been submitted successfully! We will review your information and get back to you within 24 hours.';
    successMessage.classList.add('show');
    
    // Scroll to success message
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Hide message after 6 seconds
    setTimeout(() => {
        successMessage.classList.remove('show');
    }, 6000);
}

function showErrorMessage(error) {
    successMessage.textContent = '✗ There was an error submitting your form. Please try again.';
    successMessage.classList.add('show');
    successMessage.style.backgroundColor = '#ffebee';
    successMessage.style.borderColor = '#d32f2f';
    successMessage.style.color = '#d32f2f';
}

// Reset form button functionality
form.querySelector('button[type="reset"]').addEventListener('click', () => {
    // Clear all error messages
    const errorMessages = form.querySelectorAll('.error-message');
    errorMessages.forEach(msg => {
        msg.classList.remove('show');
        msg.textContent = '';
    });
    
    const inputFields = form.querySelectorAll('.error');
    inputFields.forEach(field => field.classList.remove('error'));
    
    successMessage.classList.remove('show');
});

// Keyboard navigation improvements
form.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        const formElements = Array.from(form.elements);
        const currentIndex = formElements.indexOf(e.target);
        if (currentIndex < formElements.length - 1) {
            formElements[currentIndex + 1].focus();
        }
    }
});