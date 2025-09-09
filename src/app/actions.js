'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Server action to handle contact form submissions
 */
export async function sendContactEmail(formData) {
  try {
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const description = formData.get('description');
    const subscribe = formData.get('subscribe') === 'on';

    // Basic validation (client-side validation should handle most cases)
    if (!email || !description) {
      throw new Error('Missing required fields');
    }

    // Send confirmation email to user
    const userEmailContent = `
      <h2>Thank you for contacting Compound!</h2>
      <p>Dear ${name || 'valued customer'},</p>
      <p>We've received your message and will get back to you within 24-48 hours.</p>
      <p>Best regards,<br>The Compound Team</p>
    `;

    await resend.emails.send({
      from: 'Compound <noreply@cmpnd.cc>',
      to: email,
      subject: 'Thank you for contacting Compound',
      html: userEmailContent,
    });

    // Send admin notification with contact details
    const adminEmailContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name || 'Not provided'}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
      <p><strong>Newsletter Subscription:</strong> ${subscribe ? 'Yes' : 'No'}</p>
      <h3>Message:</h3>
      <p>${description.replace(/\n/g, '<br>')}</p>
    `;

    await resend.emails.send({
      from: 'Compound <contact@cmpnd.cc>',
      to: [process.env.ADMIN_EMAIL, process.env.ADMIN2_EMAIL],
      reply_to: email,
      subject: `New Contact Form Submission from ${name || email}`,
      html: adminEmailContent,
    });

    // If user subscribed to newsletter, add them to the audience
    if (subscribe) {
      await addToAudience({
        email: email,
        name: name,
        unsubscribed: false
      });
    }

    return { success: true, message: 'Message sent successfully' };

  } catch (error) {
    console.error('Contact form error:', error);
    throw new Error(error.message || 'Failed to send message');
  }
}

/**
 * Server action to handle newsletter subscription
 */
export async function subscribeNewsletter(formData) {
  try {
    const email = formData.get('email');
    const name = formData.get('name') || ''; // Optional name field

    // Basic validation (client-side validation should handle most cases)
    if (!email) {
      throw new Error('Email is required');
    }

    // Add subscriber to the Resend audience
    await addToAudience({
      email: email,
      name: name,
      unsubscribed: false
    });

    // Send welcome email to subscriber
    const welcomeContent = `
      <h2>Welcome to Compound!</h2>
      <p>Thank you for subscribing to our newsletter.</p>
      <p>You'll be the first to know about our latest innovations in sustainable algae solutions and environmental initiatives.</p>
      <p>Stay connected with us as we work towards a more sustainable future.</p>
      <p>Best regards,<br>The Compound Team</p>
      <hr>
      <p style="font-size: 12px; color: #666;">
        You can unsubscribe at any time by managing your preferences in your email settings.
      </p>
    `;

    await resend.emails.send({
      from: 'Compound <newsletter@cmpnd.cc>',
      to: email,
      subject: 'Welcome to Compound - Your Sustainable Future Starts Here',
      html: welcomeContent,
    });

    return { success: true, message: 'Successfully subscribed to newsletter' };

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    throw new Error(error.message || 'Failed to subscribe to newsletter');
  }
}

/**
 * Add contact to Resend audience
 */
export async function addToAudience({ email, name, unsubscribed = false }) {
  try {
    const contactData = {
      email: email,
      unsubscribed: unsubscribed,
      audienceId: process.env.RESEND_AUDIENCE_ID
    };

    // Only add first_name if name is provided
    if (name) {
      contactData.firstName = name;
    }

    const data = await resend.contacts.create(contactData);
    return data;
  } catch (error) {
    console.error('Error adding to audience:', error);
    throw new Error(error.message || 'Failed to add to audience');
  }
}

/**
 * Generic email sending function that can be reused
 */
export async function sendEmail({
  to,
  subject,
  html,
  from = 'Compound <noreply@cmpnd.cc>'
}) {
  try {
    await resend.emails.send({
      from,
      to,
      subject,
      html,
    });

    return { success: true, message: 'Email sent successfully' };

  } catch (error) {
    console.error('Email sending error:', error);
    throw new Error(error.message || 'Failed to send email');
  }
}
