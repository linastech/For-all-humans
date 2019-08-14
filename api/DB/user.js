const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      username: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      surname: {
          type: DataTypes.STRING,
          allowNull: true,
          defaultValue: null,
      },
      email: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false
      },
      picture: {
          type: DataTypes.STRING,
          allowNull: true,
          defaultValue: '/static/assets/img/user/profile-pictures/default.png'
      },
  }, {
    hooks: {
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync(user.password, salt)
      }
    },
  })

  User.createUser = function(userData){
    return new Promise(async(resolve, reject) => {
      let transaction;    

      try {
        // get transaction
        transaction = await sequelize.transaction()

        await User.create(userData, {transaction})

        await transaction.commit()

        resolve()
      }catch(error){ 
        console.log(error)
        if (error) await transaction.rollback()

        reject(error) 
      }
    })
  }

  User.authenticate = async (username, password) => {
    try {
      const data = await User.findOne({ where: { email: username } })

      if(typeof data == 'undefined') 
        return false

      const authenticated = await bcrypt.compare(password, data.dataValues.password)

      if(authenticated)
        return {
          userData: data.dataValues,
          authenticated: true
        }
      else
        return { authenticated: false }
    }catch(error){
      return { authenticated: false }
    }
  }

  return User
}