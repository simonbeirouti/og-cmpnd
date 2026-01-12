'use client';

import { useState, useEffect } from 'react';
import './CountdownTimer.css';

/**
 * CountdownTimer - A reusable countdown timer component
 * @param {string} targetDate - ISO date string or date string in format 'YYYY-MM-DD'
 * @param {string} label - Label to display above the countdown
 * @param {string} timezone - Timezone (default: 'Australia/Melbourne')
 */
export default function CountdownTimer({ targetDate, label, timezone = 'Australia/Melbourne' }) {
    const [timeLeft, setTimeLeft] = useState(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient) return;

        const calculateTimeLeft = () => {
            // Parse the target date and set it to midnight AEST
            const target = new Date(targetDate);
            target.setHours(0, 0, 0, 0);

            const now = new Date();
            const difference = target - now;

            if (difference <= 0) {
                return {
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                    expired: true
                };
            }

            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
                expired: false
            };
        };

        // Initial calculation
        setTimeLeft(calculateTimeLeft());

        // Update every second
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate, isClient]);

    if (!isClient || !timeLeft) {
        return (
            <div className="countdown-timer">
                <div className="countdown-label">{label}</div>
                <div className="countdown-display">
                    <div className="countdown-unit">
                        <div className="countdown-value">--</div>
                        <div className="countdown-unit-label">Days</div>
                    </div>
                    <div className="countdown-separator">:</div>
                    <div className="countdown-unit">
                        <div className="countdown-value">--</div>
                        <div className="countdown-unit-label">Hours</div>
                    </div>
                    <div className="countdown-separator">:</div>
                    <div className="countdown-unit">
                        <div className="countdown-value">--</div>
                        <div className="countdown-unit-label">Minutes</div>
                    </div>
                    <div className="countdown-separator">:</div>
                    <div className="countdown-unit">
                        <div className="countdown-value">--</div>
                        <div className="countdown-unit-label">Seconds</div>
                    </div>
                </div>
            </div>
        );
    }

    if (timeLeft.expired) {
        return (
            <div className="countdown-timer">
                <div className="countdown-label">{label}</div>
                <div className="countdown-expired">Event has started!</div>
            </div>
        );
    }

    return (
        <div className="countdown-timer">
            <div className="countdown-label">{label}</div>
            <div className="countdown-display">
                <div className="countdown-unit">
                    <div className="countdown-value">{String(timeLeft.days).padStart(2, '0')}</div>
                    <div className="countdown-unit-label">Days</div>
                </div>
                <div className="countdown-separator">:</div>
                <div className="countdown-unit">
                    <div className="countdown-value">{String(timeLeft.hours).padStart(2, '0')}</div>
                    <div className="countdown-unit-label">Hours</div>
                </div>
                <div className="countdown-separator">:</div>
                <div className="countdown-unit">
                    <div className="countdown-value">{String(timeLeft.minutes).padStart(2, '0')}</div>
                    <div className="countdown-unit-label">Minutes</div>
                </div>
                <div className="countdown-separator">:</div>
                <div className="countdown-unit">
                    <div className="countdown-value">{String(timeLeft.seconds).padStart(2, '0')}</div>
                    <div className="countdown-unit-label">Seconds</div>
                </div>
            </div>
        </div>
    );
}
