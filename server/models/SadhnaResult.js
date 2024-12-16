module.exports = (sequelize, DataTypes) => {
  const SadhnaResult = sequelize.define("sadhna_result", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: "sadhna_reports", // Reference to the `sadhna_report` table
        key: "id", // References the `id` field in the `sadhna_report` table
      },
      onDelete: "CASCADE", // Ensures no orphan records if the parent is deleted
    },
    final_score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0, // Default value set to 0
    },
    username: {
      type: DataTypes.STRING, // Reference to the User table's `username`
      allowNull: false,
      references: {
        model: "Users", // Table name for the `User` model
        key: "username", // Foreign key references the `username` field in `Users`
      },
      onDelete: "CASCADE", // Ensures related records are cleaned up if the user is deleted
    },
    reporting_date: {
      type: DataTypes.DATEONLY, // Reference to `reporting_date` in the `sadhna_report`
      allowNull: false,
      references: {
        model: "sadhna_reports", // Reference to the `sadhna_report` table
        key: "reporting_date", // Foreign key references the `reporting_date` field
      },
      onDelete: "CASCADE",
    },
  });

  return SadhnaResult;
};
