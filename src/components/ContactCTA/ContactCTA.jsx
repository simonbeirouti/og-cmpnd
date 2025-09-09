"use client";

import { useState } from "react";
import { subscribeNewsletter } from "@/app/actions";
import { validateNewsletterForm, getFormData } from "@/lib/utils";
import "./ContactCTA.css";

const ContactCTA = () => {
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
    const { isValid, errors } = validateNewsletterForm(formDataObj);

    if (!isValid) {
      setValidationErrors(errors);
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData(form);
      const result = await subscribeNewsletter(formData);

      if (result.success) {
        setSubmitMessage("Thank you for subscribing! We'll keep you updated.");
        form.reset();
        setTimeout(() => {
          setSubmitMessage("");
        }, 5000);
      } else {
        setSubmitMessage("Something went wrong. Please try again.");
      }
    } catch (error) {
      setSubmitMessage(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-cta">
      <div className="contact-cta-container">
        <div className="contact-cta-content">
          <div className="contact-cta-text">
            <p>
              Join our community and be the first to know about our latest
              innovations in sustainable algae solutions.
            </p>
          </div>
          <form className="contact-cta-form" onSubmit={handleSubmit} noValidate action="#" method="post">
            <div className="cta-form-group">
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                className={validationErrors.email ? "error" : ""}
                required
              />
              {validationErrors.email && (
                <div className="field-error">{validationErrors.email}</div>
              )}
              <button
                type="submit"
                className="cta-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </button>
            </div>
            {submitMessage && (
              <div className={`cta-submit-message ${submitMessage.includes("Thank you") ? "success" : "error"}`}>
                {submitMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
