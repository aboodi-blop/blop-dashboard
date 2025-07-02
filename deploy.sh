#!/bin/bash

# Blop Application Deployment Script
# This script automates the build and deployment process

set -e  # Exit on any error

echo "🚀 Starting Blop Application Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if .env file exists
if [ ! -f .env ]; then
    print_warning ".env file not found. Using demo mode."
    print_warning "For production deployment, create .env with Firebase config."
else
    print_status ".env file found"
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    print_status "Installing dependencies..."
    npm install
else
    print_status "Dependencies already installed"
fi

# Clean previous build
print_status "Cleaning previous build..."
rm -rf dist

# Run build
print_status "Building application..."
npm run build

# Check if build was successful
if [ ! -d "dist" ]; then
    print_error "Build failed! dist directory not created."
    exit 1
fi

print_status "Build completed successfully!"

# Check deployment target
read -p "Choose deployment target (vercel/firebase/netlify/preview): " target

case $target in
    vercel)
        print_status "Deploying to Vercel..."
        if ! command -v vercel &> /dev/null; then
            print_warning "Vercel CLI not found. Installing..."
            npm install -g vercel
        fi
        vercel --prod
        ;;
    firebase)
        print_status "Deploying to Firebase..."
        if ! command -v firebase &> /dev/null; then
            print_warning "Firebase CLI not found. Installing..."
            npm install -g firebase-tools
        fi
        firebase deploy --only hosting
        ;;
    netlify)
        print_status "Deploying to Netlify..."
        if ! command -v netlify &> /dev/null; then
            print_warning "Netlify CLI not found. Installing..."
            npm install -g netlify-cli
        fi
        netlify deploy --prod --dir=dist
        ;;
    preview)
        print_status "Starting local preview..."
        npm run preview
        ;;
    *)
        print_error "Invalid target. Choose: vercel, firebase, netlify, or preview"
        exit 1
        ;;
esac

print_status "Deployment process completed! 🎉"