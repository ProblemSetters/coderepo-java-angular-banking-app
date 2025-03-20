#!/bin/bash

# Initialize error flag
set -e  # Exit on any error

# Run backend build and frontend installation in parallel
(
  cd backend || exit 1
  mvn clean package -DskipTests -T 1C
) &
backend_pid=$!

(
  cd frontend || exit 1
  npm install -f
) &
frontend_pid=$!

# Wait for both processes and capture their exit status
wait $backend_pid || { echo "Backend setup failed"; exit 1; }
wait $frontend_pid || { echo "Frontend setup failed"; exit 1; }

echo "Backend and frontend setup completed successfully!"