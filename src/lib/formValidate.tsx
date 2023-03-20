export default function LoginValidate(values: {
  email: string;
  password: string;
}) {
  let errors = {
    email: "",
    password: "",
  };
  // Email Errors
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid";
  }
  // Password Errors
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password needs to be 6 characters or more";
  }
  return errors;
}
