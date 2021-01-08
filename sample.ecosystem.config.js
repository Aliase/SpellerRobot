module.exports = {
  apps: [{
    name: 'speller_robot',
    script: './index.js',
    env_production: {
      NODE_ENV: "production",
      TOKEN: 'TOKEN'
    }
  }]
}