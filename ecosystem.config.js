module.exports = {
  apps: [
    {
      name: 'kps-api',
      script: './app/api_kps.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
        PORT: 3001
      },
      env_sandbox: {
        NODE_ENV: 'sandbox',
        PORT: 3001,
        SSL_KEY: '/etc/ssl/kps/privkey.pem',
        SSL_CERT: '/etc/ssl/kps/fullchain.pem'
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3001,
        SSL_KEY: '/etc/ssl/kps/privkey.pem',
        SSL_CERT: '/etc/ssl/kps/fullchain.pem'
      }
    }
  ]
};
