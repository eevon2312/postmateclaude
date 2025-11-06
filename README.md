# Postmate - Send Real Postcards Worldwide

A modern web application that lets users design and send real postcards globally from their phones or browsers, blending digital convenience with physical emotion.

## Features

- 🎨 **Easy Design**: Choose from beautiful templates, upload photos, and add handwritten-style messages
- 🌍 **Global Delivery**: Send postcards to any country through PostGrid's worldwide network
- 📦 **Real-time Tracking**: Track your postcard from creation to delivery
- 💳 **Secure Payment**: Integrated with Stripe for safe transactions
- 🔐 **Flexible Auth**: Google OAuth or guest checkout
- 📱 **QR Reply System**: Recipients can send digital thank-yous via QR code
- 📊 **Dashboard**: View order history and delivery status

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with Google OAuth
- **Payment**: Stripe
- **Mail API**: PostGrid
- **QR Codes**: qrcode library

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Google OAuth credentials
- Stripe account
- PostGrid API key

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd postmateclaude
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your credentials:
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/postmate"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Stripe
STRIPE_SECRET_KEY="sk_test_your_stripe_secret_key"
STRIPE_PUBLISHABLE_KEY="pk_test_your_stripe_publishable_key"
STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret"

# PostGrid
POSTGRID_API_KEY="your-postgrid-api-key"
POSTGRID_WEBHOOK_SECRET="your-postgrid-webhook-secret"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

4. Set up the database:
```bash
npx prisma migrate dev --name init
npx prisma generate
```

5. (Optional) Seed templates:
```bash
npx prisma db seed
```

6. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
postmateclaude/
├── app/                      # Next.js app directory
│   ├── api/                  # API routes
│   │   ├── auth/            # NextAuth endpoints
│   │   ├── postcards/       # Postcard CRUD
│   │   ├── templates/       # Template management
│   │   ├── replies/         # QR reply handling
│   │   └── webhooks/        # Stripe & PostGrid webhooks
│   ├── create/              # Postcard designer page
│   ├── checkout/            # Payment & address page
│   ├── dashboard/           # User dashboard
│   ├── reply/               # QR reply page
│   └── auth/                # Authentication pages
├── components/              # React components
├── lib/                     # Utilities & integrations
│   ├── prisma.ts           # Prisma client
│   ├── auth.ts             # NextAuth config
│   └── postgrid.ts         # PostGrid integration
├── prisma/                  # Database schema
└── types/                   # TypeScript types
```

## Key Features Implementation

### 1. Postcard Designer
- Template selection with preview
- Image upload and crop
- Handwriting-style message editor
- Real-time preview (front & back)

### 2. Payment & Processing
- Stripe Checkout integration
- Webhook handling for payment confirmation
- Automatic PostGrid order creation

### 3. Tracking Dashboard
- View all sent postcards
- Real-time status updates
- Order history

### 4. QR Reply System
- QR code generation for each postcard
- Recipient can scan and send digital reply
- Reply notifications

## API Endpoints

### Postcards
- `POST /api/postcards/create` - Create new postcard order
- `GET /api/postcards` - Get user's postcards

### Templates
- `GET /api/templates` - Get available templates

### Replies
- `POST /api/replies` - Submit QR reply

### Webhooks
- `POST /api/webhooks/stripe` - Stripe payment events
- `POST /api/webhooks/postgrid` - PostGrid delivery updates

## Webhooks Setup

### Stripe Webhook
1. Install Stripe CLI: https://stripe.com/docs/stripe-cli
2. Forward webhooks to local:
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```
3. Copy webhook signing secret to `.env`

### PostGrid Webhook
Configure in PostGrid dashboard:
- URL: `https://your-domain.com/api/webhooks/postgrid`
- Events: delivery status updates

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy

### Environment Variables for Production
Make sure to update:
- `NEXTAUTH_URL` to your production domain
- `NEXT_PUBLIC_APP_URL` to your production domain
- Stripe and PostGrid production keys

## Database Schema

The application uses the following models:
- **User**: User accounts (Google OAuth)
- **Account/Session**: NextAuth session management
- **Template**: Postcard design templates
- **Postcard**: User-created postcards with tracking
- **Payment**: Stripe payment records
- **Reply**: QR code replies from recipients

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Prisma Studio (database GUI)
npx prisma studio
```

## Pricing

- Base postcard: $1.99
- International shipping: $2.50
- Total per postcard: $4.49

## Future Enhancements

- [ ] Native iOS/Android apps
- [ ] Bulk sending for businesses
- [ ] Advanced template editor
- [ ] Email notifications for replies
- [ ] Analytics dashboard
- [ ] Subscription plans

## License

Private - All rights reserved

## Support

For issues or questions, contact support@postmate.app

---

Built with ❤️ using Next.js, Stripe, and PostGrid
