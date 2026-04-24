#!/bin/bash
# Run from /opt/sermon-tools on the server to deploy or update
set -e

echo "=== Deploying Sermon Tools ==="

cd /opt/sermon-tools

# Pull latest code
git pull origin main

# Rebuild and restart container
docker-compose build --no-cache
docker-compose up -d

echo "=== Done — sermon.donbarger.com is live ==="
docker-compose ps
