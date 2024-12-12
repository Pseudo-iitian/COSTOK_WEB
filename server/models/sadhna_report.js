module.exports = (sequelize, DataTypes) => {
  const SadhnaReport = sequelize.define("sadhna_report", {
    previous_night_sleep_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    morning_wakeup_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    target_chanting_end_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    chanting_rounds: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    day_rest_duration: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    hearing_topic: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    hearing_duration: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    reading_topic: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    reading_duration: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    service_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    service_duration: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    reporting_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
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
  });

  return SadhnaReport;
};
