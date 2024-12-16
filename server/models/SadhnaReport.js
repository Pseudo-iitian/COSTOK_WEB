module.exports = (sequelize, DataTypes) => {
  const SadhnaReport = sequelize.define(
    "SadhnaReport",
    {
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
      reporting_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        primaryKey: true, // Primary key for foreign key referencing
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "Users", // Matches table name for User model
          key: "username",
        },
        onDelete: "CASCADE",
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "Users",
          key: "email",
        },
        onDelete: "CASCADE",
      },
    },
    {
      tableName: "sadhna_reports",
      underscored: true,
    }
  );

  return SadhnaReport;
};
