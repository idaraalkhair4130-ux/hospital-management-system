#!/bin/bash

echo "🚀 Starting HMS System..."

# Start Backends
echo "Starting Auth Backend (5001)..."
cd backend/module-auth && npm start &
PID_AUTH=$!

echo "Starting Patient Backend (5002)..."
cd ../module-patient && npm start &
PID_PATIENT=$!

echo "Starting Doctor Backend (5003)..."
cd ../module-doctor && npm start &
PID_DOCTOR=$!

echo "Starting Reception Backend (5004)..."
cd ../module-reception && npm start &
PID_RECEPTION=$!

echo "Starting Pharmacy Backend (5005)..."
cd ../module-pharmacy && npm start &
PID_PHARMACY=$!

echo "Starting Ward Backend (5006)..."
cd ../module-ward && npm start &
PID_WARD=$!

echo "Starting Billing Backend (5007)..."
cd ../module-billing && npm start &
PID_BILLING=$!

echo "✅ All Backends Started."

# Start Frontends (Optional: usually devs run these in separate tabs)
# Uncomment below to auto-start frontends
# cd ../../frontend/auth && npm run dev &
# ...

echo "System is running. Press CTRL+C to stop all."
wait $PID_AUTH $PID_PATIENT $PID_DOCTOR $PID_RECEPTION $PID_PHARMACY $PID_WARD $PID_BILLING
