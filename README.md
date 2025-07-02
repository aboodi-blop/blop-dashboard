# 💰 Blop - Business Budget Management Application

A modern, responsive business budget management application built with React, TypeScript, and Firebase. Features multi-role authentication, real-time data synchronization, and comprehensive financial tracking.

![Blop Preview](https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop&q=80)

## ✨ Features

- **🔐 Multi-role Authentication** - Admin, Investor, Accountant, Guest roles
- **💹 Real-time Financial Tracking** - Income, expenses, and investor management
- **📊 Dual Currency Support** - USD and SAR with automatic conversion
- **📱 Responsive Design** - Works perfectly on desktop and mobile
- **🌙 Dark Mode** - Beautiful light and dark themes
- **🔍 Global Search** - Search across all transactions and data
- **📈 Interactive Dashboard** - Visual overview of financial health
- **🔄 Offline Support** - Demo mode works without internet
- **⚡ Real-time Sync** - Live updates across all devices

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Firebase project (optional - app works in demo mode)

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd blop-budget-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables** (Optional)

   ```bash
   cp .env.example .env
   ```

   Fill in your Firebase configuration in `.env`:

   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Start development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🌐 Hosting & Deployment

### Quick Deployment Options

#### Option 1: Vercel (Recommended - Easiest)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy with one command
npm run deploy:vercel
```

#### Option 2: Firebase Hosting

```bash
# Install Firebase CLI
npm i -g firebase-tools

# Login and deploy
firebase login
npm run deploy:firebase
```

#### Option 3: Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
npm run deploy:netlify
```

### Automated Deployment Script

Make the deployment script executable and run it:

```bash
chmod +x deploy.sh
./deploy.sh
```

The script will guide you through the deployment process for any platform.

### Manual Build

```bash
# Build for production
npm run build

# Preview the build locally
npm run preview
```

## 🏗️ Architecture

### Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS v4
- **Animation**: Framer Motion
- **Backend**: Firebase (Firestore, Auth, Storage)
- **State Management**: React Context + Hooks
- **Build Tool**: Vite
- **Deployment**: Vercel, Firebase Hosting, or Netlify

### Project Structure

```
├── components/           # React components
│   ├── ui/              # Reusable UI components (shadcn/ui)
│   ├── hooks/           # Custom React hooks
│   └── utils/           # Utility functions
├── lib/                 # External service integrations
├── styles/              # Global CSS and Tailwind config
└── public/              # Static assets
```

## 🔧 Configuration

### Firebase Setup (Optional)

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Firestore Database
3. Enable Authentication (Email/Password)
4. Enable Storage (optional)
5. Copy configuration to `.env` file

### Demo Mode

The app works perfectly without Firebase configuration:

- All data stored in localStorage
- Full functionality available
- Perfect for testing and demos

## 🎯 Usage

### Demo Credentials

- **Email**: `test@blop.design`
- **Password**: `test123`
- **Role**: Admin (full access)

### User Roles

- **Admin**: Full access to all features
- **Investor**: View financial data and own investments
- **Accountant**: Manage transactions and reports
- **Guest**: Read-only access

## 📱 Features Overview

### Dashboard

- Real-time financial overview
- Quick action buttons
- Recent transaction history
- Visual charts and metrics

### Income Management

- Track multiple income sources
- Frequency-based calculations (daily, weekly, monthly, yearly)
- Investor profit distribution
- Category organization

### Expense Management

- Comprehensive expense tracking
- Payment status tracking
- Recurring expense support
- Investor cost sharing

### Investor Management

- Profit/loss sharing percentages
- Individual investor tracking
- Performance analytics

## 🎨 Customization

### Themes

The app supports light and dark themes with custom color schemes defined in `styles/globals.css`.

### Branding

- Update colors in the CSS custom properties
- Replace favicon in `public/`
- Modify logo and branding elements

## 🔐 Security

### Production Security

- Environment variables for sensitive data
- Firebase security rules included
- Input validation and sanitization
- Protected routes and authentication

### Development

- TypeScript for type safety
- ESLint for code quality
- Error boundaries for fault tolerance

## 📊 Performance

### Optimizations

- Code splitting with React.lazy
- Image optimization
- Bundle size optimization
- Responsive loading states

### Analytics

- Real-time performance monitoring
- Error tracking
- User interaction analytics

## 🧪 Testing

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Build verification
npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Common Issues

**Build fails:**

```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Environment variables not working:**

- Ensure they start with `VITE_`
- Check spelling and values
- Restart development server

**Firebase connection issues:**

- Verify `.env` configuration
- Check Firebase project settings
- Ensure billing is enabled for production

### Getting Help

- Check the [Issues](../../issues) page
- Review the [Hosting Guide](HOSTING_GUIDE.md)
- Check Firebase setup in [FIREBASE_SETUP.md](FIREBASE_SETUP.md)

## 🌟 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Firebase](https://firebase.google.com/) for backend services
- [Vite](https://vitejs.dev/) for lightning-fast development

---

Made with ❤️ for better business financial management