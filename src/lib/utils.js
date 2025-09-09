/**
 * Client-side validation utilities
 */

/**
 * Validate email format using regex
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export function validateEmail(email) {
  if (!email || typeof email !== 'string') return false;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

/**
 * Validate required field
 * @param {string} value - Value to check
 * @returns {boolean} - True if not empty, false otherwise
 */
export function validateRequired(value) {
  if (!value || typeof value !== 'string') return false;
  return value.trim().length > 0;
}

/**
 * Validate phone number (basic validation)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - True if valid format, false otherwise
 */
export function validatePhone(phone) {
  if (!phone || typeof phone !== 'string') return true; // Phone is optional

  // Remove all non-digit characters
  const digitsOnly = phone.replace(/\D/g, '');

  // Check if it has at least 10 digits (basic US format)
  return digitsOnly.length >= 10;
}

/**
 * Validate contact form data
 * @param {Object} formData - Form data object
 * @returns {Object} - { isValid: boolean, errors: Object }
 */
export function validateContactForm(formData) {
  const errors = {};
  let isValid = true;

  // Name validation
  if (!validateRequired(formData.name)) {
    errors.name = 'Name is required';
    isValid = false;
  }

  // Email validation
  if (!validateRequired(formData.email)) {
    errors.email = 'Email is required';
    isValid = false;
  } else if (!validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
    isValid = false;
  }

  // Phone validation (optional)
  if (formData.phone && !validatePhone(formData.phone)) {
    errors.phone = 'Please enter a valid phone number';
    isValid = false;
  }

  // Description validation
  if (!validateRequired(formData.description)) {
    errors.description = 'Message is required';
    isValid = false;
  }

  return { isValid, errors };
}

/**
 * Validate newsletter subscription form data
 * @param {Object} formData - Form data object
 * @returns {Object} - { isValid: boolean, errors: Object }
 */
export function validateNewsletterForm(formData) {
  const errors = {};
  let isValid = true;

  // Email validation
  if (!validateRequired(formData.email)) {
    errors.email = 'Email is required';
    isValid = false;
  } else if (!validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
    isValid = false;
  }

  return { isValid, errors };
}

/**
 * Get form data from HTML form element
 * @param {HTMLFormElement} form - The form element
 * @returns {Object} - Form data as object
 */
export function getFormData(form) {
  const formData = new FormData(form);
  const data = {};

  for (let [key, value] of formData.entries()) {
    if (key === 'subscribe') {
      data[key] = value === 'on';
    } else {
      data[key] = value.toString().trim();
    }
  }

  return data;
}
