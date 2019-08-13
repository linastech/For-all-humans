const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      name: {
          type: DataTypes.STRING,
          allowNull: false
      },
      surname: {
          type: DataTypes.STRING,
          allowNull: false
      },
      email: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false
      },
      picture: {
          type: DataTypes.STRING,
          allowNull: false
      },
  }, {
      hooks: {
        beforeCreate: (user) => {
          const salt = bcrypt.genSaltSync();
          user.password = bcrypt.hashSync(user.password, salt);
        }
      }  
  })

  return User
}