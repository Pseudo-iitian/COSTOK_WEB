// Helper function to mask username and email
const maskSensitiveData = (username, email) => {
    // Mask the username (mobile number) to show only the first two and last two digits
    const maskedUsername = username.replace(/(?<=.{2}).(?=.{2})/g, "*");
  
    // Mask the email to hide part of the username in the email
    const emailParts = email.split("@");
    const maskedEmail =
      emailParts[0].slice(0, 2) +
      "*********" +
      emailParts[0].slice(-2) +
      "@" +
      emailParts[1];
  
    return { maskedUsername, maskedEmail };
  };
  
  // Validation functions
  const isValidUsername = (username) => /^[0-9]{10}$/.test(username); // Checks if username is exactly 10 digits
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Basic email format validation
  
  module.exports = {
    maskSensitiveData,
    isValidUsername,
    isValidEmail,
  };
  