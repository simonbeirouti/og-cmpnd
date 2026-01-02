'use server';

import { addSignup, getSignupCount } from '@/lib/db';
import { revalidatePath } from 'next/cache';
// import { addToAudience } from '../actions';

export async function submitSignup(formData) {
    const name = formData.get('name');
    const email = formData.get('email');

    if (!name || !email) {
        return { error: 'Name and email are required' };
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
