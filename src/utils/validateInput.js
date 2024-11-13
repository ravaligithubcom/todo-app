// Utility functions to validate different types of input

// Function to validate username
export const validateUsername = (username) => {
  const isValid = username.length >= 3 && username.length <= 20;
  return {
    isValid,
    message: isValid
      ? ""
      : "Username must be between 3 and 20 characters long.",
  };
};

// Function to validate email
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailRegex.test(email);
  return {
    isValid,
    message: isValid ? "" : "Please enter a valid email address.",
  };
};

// Function to validate password
export const validatePassword = (password) => {
  const isValid = password.length >= 8;
  return {
    isValid,
    message: isValid ? "" : "Password must be at least 8 characters long.",
  };
};

// Function to validate confirm password (checks if it matches the password)
export const validateConfirmPassword = (password, confirmPassword) => {
  const isValid = password === confirmPassword;
  return {
    isValid,
    message: isValid ? "" : "Passwords do not match.",
  };
};

// Function to validate all fields in a form at once
export const validateForm = (formData) => {
  const { username, email, password, confirmPassword } = formData;

  // Validate each field individually
  const usernameValidation = validateUsername(username);
  const emailValidation = validateEmail(email);
  const passwordValidation = validatePassword(password);
  const confirmPasswordValidation = validateConfirmPassword(
    password,
    confirmPassword
  );

  // Combine results into a single object
  const isValid =
    usernameValidation.isValid &&
    emailValidation.isValid &&
    passwordValidation.isValid &&
    confirmPasswordValidation.isValid;

  return {
    isValid,
    errors: {
      username: usernameValidation.message,
      email: emailValidation.message,
      password: passwordValidation.message,
      confirmPassword: confirmPasswordValidation.message,
    },
  };
};
