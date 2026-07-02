const bcrypt = require("bcryptjs");

bcrypt.hash("manager123", 10).then(console.log);