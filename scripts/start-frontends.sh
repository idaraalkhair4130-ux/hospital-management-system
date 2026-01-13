#!/bin/bash
echo "🚀 Starting Frontend Modules..."

# Auth (Is now Global Login)
(cd frontend/auth && npm start) &

# Landing Hub
(cd frontend/landing && npm start) &

# Portals
(cd frontend/patient && npm start) &
(cd frontend/doctor && npm start) &
(cd frontend/reception && npm start) &
(cd frontend/pharmacy && npm start) &
(cd frontend/ward && npm start) &
(cd frontend/billing && npm start) &

echo "✅ Frontends launching on Ports 5173-5179..."
echo "Open http://localhost:5173 to Login."
