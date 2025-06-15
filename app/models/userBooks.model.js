module.exports = (sequelize, Sequelize) => {
  const UserBooks = sequelize.define(
    "UserBooks",
    {
      bookName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      userEmail: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      imageUrl: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      isStartedReading: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      startedReadingTime: {
        type: Sequelize.DATE,
      },
      isReadingFinished: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      currentPageNumber: {
        type: Sequelize.INTEGER,
        defaultValue: false,
      },
    },
    {
      timestamps: false,
    }
  );
  return UserBooks;
};
