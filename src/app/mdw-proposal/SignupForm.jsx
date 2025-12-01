'use client';

import { useState, useTransition } from 'react';
import { submitSignup } from './actions';
import { useFormStatus } from 'react-dom';

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="signup-button"
        >
            {pending ? 'Joining...' : 'Join the Movement'}
        </button>
    );
}

export default function SignupForm({ initialCount }) {
    const [count, setCount] = useState(initialCount);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState(null);

    async function clientAction(formData) {
        const result = await submitSignup(formData);

        if (result.error) {
            setError(result.error);
        } else {
            setCount(prev => prev + 1);
            setIsSubmitted(true);
        }
    }

    return (
        <div className="signup-container">
            <div className="signup-stats">
                <span className="signup-count">{count}</span>
                <span className="signup-label">people have joined!</span>
            </div>

            {!isSubmitted ? (
                <form action={clientAction} className="signup-form">
                    <div className="form-group">
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            required
                            className="signup-input"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            required
                            className="signup-input"
                        />
                    </div>
                    {error && <p className="signup-error">{error}</p>}
                    <SubmitButton />
                </form>
            ) : (
                <div className="signup-success">
                    <p>Thank you for your interest! We'll be in touch.</p>
                </div>
            )}
        </div>
    );
}
