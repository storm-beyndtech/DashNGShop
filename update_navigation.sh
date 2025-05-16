#!/bin/bash

sed -i 's/onClick: () => navigate/onClick: () => setLocation/g' client/src/pages/dashboard/user-dashboard.tsx
sed -i 's/navigate("\/)/setLocation("\/)/g' client/src/pages/dashboard/user-dashboard.tsx
chmod +x update_navigation.sh
./update_navigation.sh
