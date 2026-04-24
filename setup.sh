#!/bin/bash
# One-time server setup for sermon.donbarger.com
# Run as root on a fresh Ubuntu 22.04 droplet
set -e

echo "=== Sermon Tools — Server Setup ==="

# System updates
apt-get update && apt-get upgrade -y
apt-get install -y git curl nginx certbot python3-certbot-nginx

# Install Docker
curl -fsSL https://get.docker.com | sh
systemctl enable docker
systemctl start docker

# Install Docker Compose
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" \
  -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# App directory
mkdir -p /opt/sermon-tools
cd /opt/sermon-tools

echo ""
echo "=== Server ready. Now run: ==="
echo "  1. git clone https://github.com/donbarger/sermon-tools.git ."
echo "  2. cp .env.example .env && nano .env  (add OPENROUTER_API_KEY)"
echo "  3. bash deploy.sh"
echo "  4. cp nginx.conf /etc/nginx/sites-available/sermon-tools"
echo "  5. ln -s /etc/nginx/sites-available/sermon-tools /etc/nginx/sites-enabled/"
echo "  6. nginx -t && systemctl reload nginx"
echo "  7. certbot --nginx -d sermon.donbarger.com"
