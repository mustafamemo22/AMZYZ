// Form validation and submission handling
function submitApplication(event) {
    event.preventDefault();

    // Get form data
    const formData = {
        fullName: document.getElementById('fullName').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        nationality: document.getElementById('nationality').value.trim(),
        degree: document.getElementById('degree').value,
        field: document.getElementById('field').value.trim(),
        message: document.getElementById('message').value.trim(),
        documents: document.getElementById('documents').files
    };

    // Validate form data
    if (!validateForm(formData)) {
        return;
    }

    // Create WhatsApp message
    const whatsappMessage = createWhatsAppMessage(formData);

    // Send to WhatsApp
    sendToWhatsApp(whatsappMessage);

    // Show success message
    showSuccessMessage();

    // Reset form
    document.getElementById('applicationForm').reset();
}

// Form validation
function validateForm(data) {
    // Basic validation
    if (!data.fullName || !data.email || !data.phone || !data.nationality || !data.degree || !data.field) {
        alert('Please fill in all required fields');
        return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('Please enter a valid email address');
        return false;
    }

    // Phone validation
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!phoneRegex.test(data.phone)) {
        alert('Please enter a valid phone number');
        return false;
    }

    // File validation
    if (data.documents.length > 0) {
        for (let file of data.documents) {
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                alert('File size should not exceed 5MB');
                return false;
            }
            if (file.type !== 'application/pdf') {
                alert('Only PDF files are allowed');
                return false;
            }
        }
    }

    return true;
}

// Create WhatsApp message
function createWhatsAppMessage(data) {
    let message = `*New Application Submission*\n\n`;
    message += `*Full Name:* ${data.fullName}\n`;
    message += `*Email:* ${data.email}\n`;
    message += `*Phone:* ${data.phone}\n`;
    message += `*Nationality:* ${data.nationality}\n`;
    message += `*Desired Degree:* ${data.degree}\n`;
    message += `*Field of Study:* ${data.field}\n`;
    
    if (data.message) {
        message += `*Additional Information:* ${data.message}\n`;
    }

    if (data.documents.length > 0) {
        message += `\n*Documents:* ${data.documents.length} file(s) attached`;
    }

    return encodeURIComponent(message);
}

// Send to WhatsApp
function sendToWhatsApp(message) {
    // Replace with your WhatsApp number
    const whatsappNumber = '1234567890'; // Replace with your actual WhatsApp number
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
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
            padding: 100px 0;
            background: #f8f9fa;
        }
        
        #apply-form .contact-info {
            background: white;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        #apply-form .form-group {
            margin-bottom: 20px;
        }
        
        #apply-form label {
            font-weight: 600;
            color: #2c3e50;
            margin-bottom: 8px;
        }
        
        #apply-form .form-control {
            border: 1px solid #ddd;
            border-radius: 4px;
            padding: 12px;
            transition: all 0.3s ease;
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
        }
        
        #apply-form .btn-primary:hover {
            background: #2980b9;
            transform: translateY(-2px);
        }
        
        @media (max-width: 768px) {
            #apply-form {
                padding: 60px 0;
            }
            
            #apply-form .contact-info {
                padding: 20px;
            }
        }
    </style>
`); 