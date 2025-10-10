"use client";

import Link from "next/link";
import { allUpdates } from 'contentlayer/generated'
import Marquee from "@/components/Marquee/Marquee";

import "./UpdateNavigator.css";

export default function UpdateNavigator({ currentUpdate, mode = "next" }) {
    // Sort updates by date to determine chronological order (oldest first)
    const sortedUpdates = [...allUpdates].sort((a, b) => new Date(a.date) - new Date(b.date));

    // Find current update index (if currentUpdate is provided)
    const currentIndex = currentUpdate ? sortedUpdates.findIndex(u => u._raw.flattenedPath === currentUpdate._raw.flattenedPath) : -1;

    let targetUpdate;
    let archiveNumber;

    // If no currentUpdate provided (currentIndex === -1), always show latest
    if (currentIndex === -1) {
        targetUpdate = sortedUpdates[sortedUpdates.length - 1];
        archiveNumber = sortedUpdates.length;
    } else {
        switch (mode) {
            case "latest":
                // Always show the latest (most recent) update
                targetUpdate = sortedUpdates[sortedUpdates.length - 1];
                archiveNumber = sortedUpdates.length;
                break;

            case "previous":
                // Show previous update, or latest if on first
                if (currentIndex === 0) {
                    targetUpdate = sortedUpdates[sortedUpdates.length - 1]; // wrap to latest
                    archiveNumber = sortedUpdates.length;
                } else {
                    targetUpdate = sortedUpdates[currentIndex - 1];
                    archiveNumber = currentIndex; // since sortedUpdates is 0-indexed, archive number is index + 1
                }
                break;

            case "next":
            default:
                // Show next update, or first if on latest (creates a cycle)
                const isOnLatest = currentIndex === sortedUpdates.length - 1;
                const targetIndex = isOnLatest ? 0 : currentIndex + 1;
                targetUpdate = sortedUpdates[targetIndex];
                archiveNumber = targetIndex + 1;
                break;
        }
    }

    // Don't render if no target update found
    if (!targetUpdate) {
        return null;
    }

    return (
        <Link href={targetUpdate.url} className="next-archive-link">
            <section className="next-archive">
                <div className="next-archive-bg"></div>
                <div className="marquee-archive">
                    <Marquee text={targetUpdate.title} />
                </div>
                <div className="container">
                    <p className="primary">[ Update {archiveNumber} ]</p>
                    <div className="next-archive-img">
                        <img src={targetUpdate.thumbnailImage} alt="" />
                    </div>
                    <h2>{targetUpdate.title}</h2>
                </div>
            </section>
        </Link>
    );
}
