module.exports = (sequelize, DataTypes) => {
  const SadhnaResult = sequelize.define(
    "SadhnaResult",
    {
      final_score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
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
      reporting_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        references: {
          model: "sadhna_reports", // Matches table name for SadhnaReport model
          key: "reporting_date",
        },
        onDelete: "CASCADE",
      },
    },
    {
      tableName: "sadhna_results",
      underscored: true,
    }
  );

  return SadhnaResult;
};
