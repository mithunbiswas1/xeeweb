module.exports = {
  apps: [
    {
      name: "xeeweb",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      cwd: "/var/www/xeeweb",
      instances: "max", // Use all CPU cores
      exec_mode: "cluster", // Enable cluster mode
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      error_file: "./logs/err.log",
      out_file: "./logs/out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      merge_logs: true,
      max_memory_restart: "500M",
      restart_delay: 3000,
      max_restarts: 5,
      min_uptime: "10s",
    },
  ],
};
