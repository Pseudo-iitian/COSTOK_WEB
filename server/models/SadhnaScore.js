module.exports = (sequelize, DataTypes) => {
  const SadhnaScore = sequelize.define("sadhna_score", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // This makes the id auto-incrementing
    },
    sleepscore: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    wakeupscore: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    dayrestscore: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    chantingscore: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    hearingscore: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    readingscore: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    servicescore: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    username: {
      type: DataTypes.STRING, // Mobile number
      allowNull: false,
      references: {
        model: "Users", // Table name (should match the table name for the User model)
        key: "username", // Foreign key references the username field in User
      },
      onDelete: "CASCADE", // If a user is deleted, their reports will also be deleted
    },
    email: {
      type: DataTypes.STRING, // Email
      allowNull: false,
      references: {
        model: "Users", // Table name
        key: "email", // Foreign key references the email field in User
      },
      onDelete: "CASCADE",
    },
    reporting_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      references: {
        model: "sadhna_reports", // Table name
        key: "reporting_date", // Foreign key references the reporting_date field in Sadhna Reports
      },
      onDelete: "CASCADE",
    },
  });

  return SadhnaScore;
};
