# Compound

A modern, interactive website for Compound - an algae-based sustainability company focused on carbon sequestration, sustainable packaging, biofuels, and regenerative agriculture solutions.

## 🚀 Technology Stack

This project is built with Next.js 15 and leverages cutting-edge web technologies for smooth, performant user experiences:

### Core Framework

### Animation & Interaction
- **GSAP** - Professional-grade animation library for complex scroll-based interactions
- **@gsap/react** - React hooks for GSAP integration
- **Lenis** - Smooth scrolling library for enhanced user experience
- **Lottie** - Vector animations for interactive elements

### Email & Communication
- **Resend** - Email service for contact forms and notifications

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd compound
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## 📧 Email Configuration

The project uses Resend for email functionality. Configure your API key in the environment variables:

```env
RESEND_API_KEY="your_api_key_here"
RESEND_AUDIENCE_ID="your_audience_id_here"
ADMIN_EMAIL="admin@email.here"
```