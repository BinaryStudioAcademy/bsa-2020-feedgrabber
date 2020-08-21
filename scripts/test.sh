#/bin/bash

echo "Running pull request checks..."

echo "Checking backend"
cd ./backend/core
./gradlew assemble || exit 1
cd ../../
echo "Done backend testing"

echo "Checking event processor"
cd ./backend/event_processor
./gradlew assemble || exit 1
cd ../../
echo "Done event processor testing"

echo "Checking frontend"
cd frontend
npm i
npm run checkTs && npm run checkStyle || exit 1
echo "Done frontend"
echo "Check successful!"