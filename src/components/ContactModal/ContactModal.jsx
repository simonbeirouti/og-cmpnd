"use client";

import { useState } from "react";
import { sendContactEmail } from "@/app/actions";
import { validateContactForm, getFormData } from "@/lib/utils";
import "./ContactModal.css";

const ContactModal = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formDataObj = getFormData(form);

    // Clear previous errors
    setValidationErrors({});
    setSubmitMessage("");

    // Client-side validation
    const { isValid, errors } = validateContactForm(formDataObj);

    if (!isValid) {
      setValidationErrors(errors);
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData(form);
      const result = await sendContactEmail(formData);

      if (result.success) {
        setSubmitMessage("Thank you for your message! We'll get back to you soon.");
        form.reset();
        setTimeout(() => {
          onClose();
          setSubmitMessage("");
        }, 3000);
      } else {
        setSubmitMessage("Something went wrong. Please try again.");
      }
    } catch (error) {
      setSubmitMessage(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="contact-modal-overlay" onClick={onClose}>
      <div className="contact-modal" onClick={(e) => e.stopPropagation()}>
        <div className="contact-modal-header">
          <h3>Get in Touch</h3>
          <button className="contact-modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <form className="contact-form" onSubmit={handleSubmit} noValidate action="#" method="post">
          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              className={validationErrors.name ? "error" : ""}
              required
            />
            {validationErrors.name && (
              <div className="field-error">{validationErrors.name}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              className={validationErrors.email ? "error" : ""}
              required
            />
            {validationErrors.email && (
              <div className="field-error">{validationErrors.email}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className={validationErrors.phone ? "error" : ""}
            />
            {validationErrors.phone && (
              <div className="field-error">{validationErrors.phone}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="description">Message *</label>
            <textarea
              id="description"
              name="description"
              rows="4"
              className={validationErrors.description ? "error" : ""}
              required
            />
            {validationErrors.description && (
              <div className="field-error">{validationErrors.description}</div>
            )}
          </div>

          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              id="subscribe"
              name="subscribe"
            />
            <label className="checkbox-label" htmlFor="subscribe">
              <span className="checkmark"></span>
            </label>
            <label className="checkbox-text" htmlFor="subscribe">
              Subscribe to our newsletter for updates on sustainable solutions
            </label>
          </div>

          <button
            type="submit"
            className="contact-submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>

          {submitMessage && (
            <div className={`submit-message ${submitMessage.includes("Thank you") ? "success" : "error"}`}>
              {submitMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactModal;
