module.exports = {
    apps: [
        {
            name: 'mailsota-server',
            script: './src/index.js',
            instances: 'max', // Use all available CPU cores
            exec_mode: 'cluster',
            env: {
                NODE_ENV: 'development',
            },
            env_production: {
                NODE_ENV: 'production',
            },
            max_memory_restart: '1G',
            merge_logs: true,
            autorestart: true,
            watch: false
        },
    ],
};
