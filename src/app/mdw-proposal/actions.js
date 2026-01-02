'use server';

import { addSignup, getSignupCount, checkRateLimit } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
// import { addToAudience } from '../actions';

export async function submitSignup(formData) {
    const name = formData.get('name');
    const email = formData.get('email');

    if (!name || !email) {
        return { error: 'Name and email are required' };
    }

    // Rate Limiting Check
    const headersList = await headers();
    const forwardedFor = headersList.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0] : 'unknown';

    // In dev, ip might be 'unknown' or '::1', which is fine.
    const isAllowed = await checkRateLimit(ip);
    if (!isAllowed) {
        return { error: 'Too many requests. Please try again later.' };
    }

    try {
        await addSignup(name, email);

        // Add to Resend audience
        // try {
        //     await addToAudience({ email, name });
        // } catch (resendError) {
        //     console.error('Failed to add to Resend audience:', resendError);
        //     // We don't fail the request if Resend fails, just log it
        // }

        revalidatePath('/mdw-proposal');
        return { success: true };
    } catch (error) {
        console.error('Failed to submit signup:', error);
        return { error: 'Failed to submit signup' };
    }
}

export async function getInterestedCount() {
    try {
        return await getSignupCount();
    } catch (error) {
        console.error('Failed to get signup count:', error);
        return 0;
    }
}
