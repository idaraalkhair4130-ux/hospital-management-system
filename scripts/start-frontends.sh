#!/bin/bash

# Kill any lingering processes on ports 5170-5179
echo "🧹 Cleaning up ports..."
fuser -k 5170/tcp 5173/tcp 5174/tcp 5175/tcp 5176/tcp 5177/tcp 5178/tcp 5179/tcp > /dev/null 2>&1

echo "🚀 Starting Frontend Modules..."

# Landing Hub (Port 5170)
echo "   - Landing Hub (5170)"
(cd frontend/landing && npm run dev) &

# Auth (Port 5173)
echo "   - Auth Module (5173)"
(cd frontend/auth && npm run dev) &

# Portals
echo "   - Patient Portal (5174)"
(cd frontend/patient && npm run dev) &

echo "   - Doctor Portal (5175)"
(cd frontend/doctor && npm run dev) &

echo "   - Reception Portal (5176)"
(cd frontend/reception && npm run dev) &

echo "   - Pharmacy Portal (5177)"
(cd frontend/pharmacy && npm run dev) &

echo "   - Ward Portal (5178)"
(cd frontend/ward && npm run dev) &

echo "   - Billing Portal (5179)"
(cd frontend/billing && npm run dev) &

echo "✅ All Frontends Launching..."
echo "👉 Open http://localhost:5170 for the Main Hub."
