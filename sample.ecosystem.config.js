module.exports = {
  apps: [{
    name: 'SpellerRobot',
    script: './index.js',
    env_production: {
      NODE_ENV: "production",
      TOKEN: 'TOKEN'
    }
  }]
}