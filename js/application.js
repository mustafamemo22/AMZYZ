// Form validation and submission handling
console.log('Application script loaded');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded');
    const form = document.getElementById('applicationForm');
    console.log('Form element:', form);
    
    if (form) {
        form.addEventListener('submit', function(event) {
            console.log('Form submit event triggered');
            submitApplication(event);
        });
    } else {
        console.error('Application form not found! Make sure the form has id="applicationForm"');
    }
});

function submitApplication(event) {
    console.log('submitApplication function called');
    event.preventDefault();

    // Get form data
    const formData = new FormData(event.target);

    // Validate form data
    if (!validateForm(formData)) {
        console.log('Form validation failed');
        return;
    }

    // Show loading state
    const submitButton = event.target.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = 'Submitting...';

    // Send to server
    fetch('https://b6f9-156-205-100-125.ngrok-free.app/submit-application', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showSuccessMessage();
            event.target.reset();
        } else {
            throw new Error(data.message || 'Error submitting application');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error submitting your application. Please try again.');
    })
    .finally(() => {
        // Reset button state
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
    });
}

// Form validation
function validateForm(formData) {
    console.log('Validating form data');
    
    // Check each required field
    const requiredFields = {
        fullName: 'Full Name',
        dob: 'Date of Birth',
        gender: 'Gender',
        passportNumber: 'Passport Number',
        passportIssueDate: 'Passport Issue Date',
        passportExpiryDate: 'Passport Expiry Date',
        passportIssuePlace: 'Passport Issue Place',
        nationality: 'Nationality',
        fatherName: 'Father\'s Full Name',
        fatherDob: 'Father\'s Date of Birth',
        fatherPassport: 'Father\'s Passport Number',
        fatherNationality: 'Father\'s Nationality',
        motherName: 'Mother\'s Full Name',
        motherDob: 'Mother\'s Date of Birth',
        motherPassport: 'Mother\'s Passport Number',
        motherNationality: 'Mother\'s Nationality',
        field: 'Field of Study',
        university: 'University'
    };

    let missingFields = [];
    
    for (const [field, label] of Object.entries(requiredFields)) {
        if (!formData.get(field) || formData.get(field).trim() === '') {
            missingFields.push(label);
        }
    }

    // Check if other university is required
    if (formData.get('university') === 'other' && (!formData.get('otherUniversity') || formData.get('otherUniversity').trim() === '')) {
        missingFields.push('Other University Name');
    }

    if (missingFields.length > 0) {
        console.log('Missing fields:', missingFields);
        alert(`Please fill in the following required fields: ${missingFields.join(', ')}`);
        return false;
    }

    // File validation
    const files = formData.getAll('documents');
    if (!files || files.length === 0) {
        alert('Please upload all required documents');
        return false;
    }

    for (let file of files) {
        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            console.log('File too large:', file.name, file.size);
            alert('File size should not exceed 5MB');
            return false;
        }
        const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
        if (!allowedTypes.includes(file.type)) {
            console.log('Invalid file type:', file.name, file.type);
            alert('Only PDF, JPG, and PNG files are allowed');
            return false;
        }
    }

    console.log('Form validation passed');
    return true;
}

// Show success message
function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.className = 'alert alert-success text-center';
    successDiv.style.position = 'fixed';
    successDiv.style.top = '20px';
    successDiv.style.left = '50%';
    successDiv.style.transform = 'translateX(-50%)';
    successDiv.style.zIndex = '1000';
    successDiv.style.padding = '15px 30px';
    successDiv.style.borderRadius = '5px';
    successDiv.style.backgroundColor = '#2ecc71';
    successDiv.style.color = 'white';
    successDiv.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
    successDiv.innerHTML = 'Application submitted successfully! We will contact you soon.';

    document.body.appendChild(successDiv);

    // Remove message after 5 seconds
    setTimeout(() => {
        successDiv.style.opacity = '0';
        successDiv.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            document.body.removeChild(successDiv);
        }, 500);
    }, 5000);
}

// Add some CSS for form styling
document.head.insertAdjacentHTML('beforeend', `
    <style>
        #apply-form {
            padding: 120px 0 60px;
            background: #f8f9fa;
            position: relative;
            z-index: 1;
        }
        
        #apply-form .contact-info {
            background: white;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        #apply-form .form-section-title {
            color: #2c3e50;
            margin: 30px 0 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid #3498db;
        }
        
        #apply-form .form-group {
            margin-bottom: 20px;
        }
        
        #apply-form label {
            font-weight: 600;
            color: #2c3e50;
            margin-bottom: 8px;
            display: block;
        }
        
        #apply-form .form-control {
            border: 1px solid #ddd;
            border-radius: 4px;
            padding: 12px;
            transition: all 0.3s ease;
            width: 100%;
        }
        
        #apply-form .form-control:focus {
            border-color: #3498db;
            box-shadow: 0 0 0 0.2rem rgba(52, 152, 219, 0.25);
        }
        
        #apply-form .btn-primary {
            background: #3498db;
            border: none;
            padding: 12px 30px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            transition: all 0.3s ease;
            margin-top: 20px;
        }
        
        #apply-form .btn-primary:hover {
            background: #2980b9;
            transform: translateY(-2px);
        }

        #apply-form .text-muted {
            color: #6c757d;
            font-size: 0.875rem;
            margin-top: 5px;
            display: block;
        }

        #apply-form .document-list {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin: 15px 0;
            border: 1px solid #e9ecef;
        }

        #apply-form .document-list p {
            margin: 8px 0;
            color: #2c3e50;
            display: flex;
            align-items: center;
            font-size: 0.95rem;
        }

        #apply-form .document-list p:before {
            content: "•";
            color: #3498db;
            font-weight: bold;
            margin-right: 10px;
        }

        #apply-form .form-group input[type="file"] {
            display: block;
            width: 100%;
            padding: 18px 14px;
            font-size: 15px;
            color: #333;
            background: #f8f9fa;
            border: 2px dashed #3498db;
            border-radius: 10px;
            box-shadow: 0 2px 8px rgba(52,152,219,0.07);
            margin-top: 8px;
            margin-bottom: 6px;
            transition: border-color 0.3s, box-shadow 0.3s;
        }
        #apply-form .form-group input[type="file"]:hover,
        #apply-form .form-group input[type="file"]:focus {
            border-color: #2980b9;
            background: #f5faff;
            box-shadow: 0 4px 12px rgba(52,152,219,0.13);
        }
        #apply-form .form-group label[for="documents"] {
            font-size: 1.08em;
            font-weight: 700;
            color: #2c3e50;
            margin-bottom: 6px;
        }
        #apply-form .form-group .text-muted {
            color: #6c757d;
            font-size: 0.93em;
            margin-top: 2px;
            margin-bottom: 0;
            display: block;
        }
        #apply-form .form-group input[type="file"]::-webkit-file-upload-button {
            visibility: hidden;
        }
        #apply-form .form-group input[type="file"]::before {
            content: 'Choose Files';
            display: inline-block;
            background: #3498db;
            color: #fff;
            border: none;
            border-radius: 5px;
            padding: 8px 18px;
            outline: none;
            white-space: nowrap;
            -webkit-user-select: none;
            cursor: pointer;
            font-weight: 600;
            font-size: 15px;
            margin-right: 12px;
            transition: background 0.2s;
        }
        #apply-form .form-group input[type="file"]:hover::before {
            background: #2980b9;
        }
        #apply-form .form-group input[type="file"]:active::before {
            background: #217dbb;
        }
        #apply-form .form-group input[type="file"]::-ms-browse {
            display: none;
        }
        #apply-form select.form-control {
            height: 45px;
        }

        #apply-form input[type="date"].form-control {
            height: 45px;
        }
        
        @media (max-width: 1024px) {
            #apply-form {
                padding: 100px 0 40px;
            }
        }
        @media (max-width: 768px) {
            #apply-form {
                padding: 80px 0 30px;
            }
            #apply-form .contact-info {
                padding: 20px;
            }
            #apply-form .document-list {
                padding: 15px;
            }
            #apply-form .form-group input[type="file"] {
                padding: 14px 8px;
                font-size: 14px;
            }
        }
        @media (max-width: 480px) {
            #apply-form {
                padding: 70px 0 20px;
            }
        }
    </style>
`); 