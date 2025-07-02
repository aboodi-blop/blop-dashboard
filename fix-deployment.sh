#!/bin/bash

echo "🔧 Fixing Blop deployment issues..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if root App.tsx exists and remove it
if [ -f "App.tsx" ]; then
    print_warning "Found duplicate App.tsx in root directory"
    rm App.tsx
    print_status "Removed duplicate App.tsx from root"
else
    print_status "No duplicate App.tsx found"
fi

# Verify src/App.tsx exists
if [ -f "src/App.tsx" ]; then
    print_status "Correct App.tsx found in src/ directory"
else
    print_error "src/App.tsx not found! This is required."
    exit 1
fi

# Clean build directory
if [ -d "dist" ]; then
    rm -rf dist
    print_status "Cleaned old build directory"
fi

# Install dependencies
print_status "Installing dependencies..."
npm install

# Build the project
print_status "Building project..."
npm run build

if [ -d "dist" ]; then
    print_status "Build successful! ✨"
    
    # Create 404.html for GitHub Pages SPA routing
    cp dist/index.html dist/404.html
    print_status "Created 404.html for SPA routing"
    
    echo ""
    print_status "🚀 Your app is ready for deployment!"
    echo ""
    echo "Next steps:"
    echo "1. Commit and push your changes:"
    echo "   git add ."
    echo "   git commit -m \"Fix deployment configuration\""
    echo "   git push origin main"
    echo ""
    echo "2. Your app will be live at:"
    echo "   https://aboodi-blop.github.io/blop-dashboard/"
    echo ""
else
    print_error "Build failed! Check the error messages above."
    exit 1
fi