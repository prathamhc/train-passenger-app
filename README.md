# Train Passenger App

A simple web app to view passenger lists for small trips. Shows Name, Sex, Age, and Seat No. for each train journey.  

## Features
- Homepage with journey buttons
- Responsive passenger table view
- Easy to add new journeys via XLSX files

## Tech Stack
- React (Vite), Tailwind CSS
- SheetJS (xlsx) for Excel parsing
- Deployment: Vercel

## Usage
1. Add XLSX files to `/public/data/`.
2. Update `journeys.js`.
3. Run:
   ```bash
   npm install
   npm run dev
