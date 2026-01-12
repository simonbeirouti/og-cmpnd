'use client';

import { useState, useEffect } from 'react';
import './MDWCountdown.css';

/**
 * MDWCountdown - Smart countdown component for MDW events
 * Automatically determines next event and sizes accordingly
 */
export default function MDWCountdown() {
    const [timers, setTimers] = useState([]);
    const [isClient, setIsClient] = useState(false);

    // Define all events
    const events = [
        {
            targetDate: '2026-03-02',
            label: 'Final Proposal'
        },
        {
            targetDate: '2026-05-14',
            label: 'MDW Start Date'
        }
    ];

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient) return;

        const calculateTimeLeft = (targetDate) => {
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
                    expired: true,
                    totalMs: 0
                };
            }

            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
                expired: false,
                totalMs: difference
            };
        };

        const updateTimers = () => {
            const calculatedTimers = events.map(event => ({
                ...event,
                timeLeft: calculateTimeLeft(event.targetDate)
            }));

            // Find the next upcoming event (not expired, smallest time remaining)
            const upcomingEvents = calculatedTimers.filter(t => !t.timeLeft.expired);
            let nextEventIndex = -1;

            if (upcomingEvents.length > 0) {
                const nextEvent = upcomingEvents.reduce((prev, curr) =>
                    curr.timeLeft.totalMs < prev.timeLeft.totalMs ? curr : prev
                );
                nextEventIndex = calculatedTimers.findIndex(t => t === nextEvent);
            }

            // Add size property based on whether it's the next event
            const timersWithSize = calculatedTimers.map((timer, index) => ({
                ...timer,
                isNext: index === nextEventIndex,
                size: index === nextEventIndex ? 'large' : 'small'
            }));

            setTimers(timersWithSize);
        };

        // Initial calculation
        updateTimers();

        // Update every second
        const timer = setInterval(updateTimers, 1000);

        return () => clearInterval(timer);
    }, [isClient]);

    if (!isClient || timers.length === 0) {
        return (
            <div className="mdw-countdown-container">
                {events.map((event, index) => (
                    <div key={index} className="countdown-timer-wrapper">
                        <div className="countdown-timer">
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
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="mdw-countdown-container">
            {timers.map((timer, index) => (
                <div
                    key={index}
                    className={`countdown-timer-wrapper ${timer.size}`}
                >
                    <div className="countdown-timer">
                        <div className={`countdown-label ${timer.timeLeft.expired ? 'expired' : ''}`}>
                            {timer.label} {timer.timeLeft.expired && '✅'}
                        </div>
                        {!timer.timeLeft.expired && (
                            <div className="countdown-display">
                                <div className="countdown-unit">
                                    <div className="countdown-value">
                                        {String(timer.timeLeft.days).padStart(2, '0')}
                                    </div>
                                    <div className="countdown-unit-label">Days</div>
                                </div>
                                <div className="countdown-separator">:</div>
                                <div className="countdown-unit">
                                    <div className="countdown-value">
                                        {String(timer.timeLeft.hours).padStart(2, '0')}
                                    </div>
                                    <div className="countdown-unit-label">Hours</div>
                                </div>
                                <div className="countdown-separator">:</div>
                                <div className="countdown-unit">
                                    <div className="countdown-value">
                                        {String(timer.timeLeft.minutes).padStart(2, '0')}
                                    </div>
                                    <div className="countdown-unit-label">Minutes</div>
                                </div>
                                <div className="countdown-separator">:</div>
                                <div className="countdown-unit">
                                    <div className="countdown-value">
                                        {String(timer.timeLeft.seconds).padStart(2, '0')}
                                    </div>
                                    <div className="countdown-unit-label">Seconds</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
