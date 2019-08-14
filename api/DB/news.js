module.exports = (sequelize, DataTypes) => {
    const News = sequelize.define('News', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING(100000),
        allowNull: false,
      },
      author: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING(100000),
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  })

  return News
}