# Firebase Setup Guide for Blop Budget Management

This guide will help you set up Firebase for your Blop application.

## 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: `blop-budget-management`
4. Enable Google Analytics (optional)
5. Complete project creation

## 2. Enable Authentication

1. In Firebase Console, go to **Authentication**
2. Click **Get started**
3. Go to **Sign-in method** tab
4. Enable **Email/Password** authentication
5. Optionally enable **Google** sign-in for additional convenience

## 3. Set up Firestore Database

1. Go to **Firestore Database**
2. Click **Create database**
3. Choose **Start in test mode** (we'll add security rules later)
4. Select a location closest to your users
5. Click **Done**

### Apply Security Rules

1. Go to **Firestore Database** > **Rules**
2. Replace the default rules with the content from `/firestore.rules`
3. Click **Publish**

## 4. Set up Firebase Storage (Optional)

1. Go to **Storage**
2. Click **Get started**
3. Choose **Start in test mode**
4. Select a location
5. Click **Done**

### Apply Storage Rules

1. Go to **Storage** > **Rules**
2. Replace the default rules with the content from `/storage.rules`
3. Click **Publish**

## 5. Get Firebase Configuration

1. Go to **Project Settings** (gear icon)
2. Scroll down to **Your apps**
3. Click **Web app** icon (</>)
4. Register your app with name: `blop-web-app`
5. Copy the configuration object

## 6. Environment Variables

Create a `.env.local` file in your project root:

```bash
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Optional: Firebase Analytics
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## 7. Create Admin User

After deploying your app:

1. Go to your deployed application
2. Create an account with email: `admin@yourcompany.com`
3. In Firebase Console, go to **Firestore Database**
4. Find the user document in the `users` collection
5. Edit the document and change `role` from `guest` to `admin`

## 8. Initialize Default Data

The app will automatically create default investors for new users. If you need to add sample data:

1. Sign in to your admin account
2. Navigate to each section (Income, Expenses, Investors)
3. Add sample data using the UI

## 9. Production Settings

### Security
- Review and tighten security rules based on your needs
- Enable App Check for additional security
- Set up proper CORS settings

### Performance
- Enable offline persistence in Firestore
- Set up Cloud Functions for complex operations
- Configure indexes for better query performance

### Monitoring
- Enable Firebase Analytics
- Set up Performance Monitoring
- Configure Crashlytics for error tracking

## 10. Backup and Recovery

Set up regular backups:
1. Go to **Firestore Database** > **Backups**
2. Schedule daily backups
3. Configure backup retention policy

## 11. Development vs Production

### Development
```bash
# Use Firebase emulators for development
npm install -g firebase-tools
firebase login
firebase init emulators
firebase emulators:start
```

### Production
- Use the production Firebase project
- Enable billing if needed for higher quotas
- Set up monitoring and alerts

## Common Issues

### CORS Errors
- Add your domain to authorized domains in Authentication settings
- Check that your API keys are correctly configured

### Security Rules
- Test rules in the Firebase Console Rules playground
- Ensure user authentication is working properly

### Quota Limits
- Monitor usage in Firebase Console
- Upgrade to Blaze plan if needed for production use

## Support

For Firebase-specific issues:
- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Support](https://firebase.google.com/support)

For Blop application issues:
- Check the application logs in the browser console
- Verify environment variables are correctly set
- Test authentication flow step by step