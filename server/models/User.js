module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING, // Full name as a string
      allowNull: false,
      validate: {
        len: [2, 100], // Name should be between 2 and 100 characters
      },
    },
    username: {
      type: DataTypes.STRING, // Storing mobile numbers as strings
      allowNull: false,
      unique: true, // Ensures the mobile number is unique
      validate: {
        isNumeric: true, // Ensures only numeric values
        len: [10, 15], // Mobile number should be between 10 and 15 digits
      },
    },
    email: {
      type: DataTypes.STRING, // Email as a string
      allowNull: false,
      unique: true, // Ensures the email is unique
      validate: {
        isEmail: true, // Ensures valid email format
      },
    },
    password: {
      type: DataTypes.STRING, // Password stored as a hashed string
      allowNull: false,
      validate: {
        len: [8, 100], // Password should be at least 8 characters long
      },
    },
  });

  return User;
};
