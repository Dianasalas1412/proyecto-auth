import toast from "react-hot-toast";
import { authenticate } from "./helper";

/** Validación de la pagina de inicio de sesión */
export async function usernameValidate(values) {
  const errors = usernameVerify({}, values);

  if (values.username) {
    // Revisando si el usuario existe.
    const { status } = await authenticate(values.username);

    if (status !== 200) {
      errors.exist = toast.error("El usuario no existe...!");
    }
  }

  return errors;
}

/** Validación de contraseña */
export async function passwordValidate(values) {
  const errors = passwordVerify({}, values);

  return errors;
}

/** Validación del cambio de contraseña */
export async function resetPasswordValidation(values) {
  const errors = passwordVerify({}, values);

  if (values.password !== values.confirm_pwd) {
    errors.exist = toast.error("Contraseña incorrecta...!");
  }

  return errors;
}

/** Validación de la pagina de registro */
export async function registerValidation(values) {
  const errors = usernameVerify({}, values);
  passwordVerify(errors, values);
  emailVerify(errors, values);

  return errors;
}

/** Validación de la pagina del perfil */
export async function profileValidation(values) {
  const errors = emailVerify({}, values);
  return errors;
}

/** ************************************************* */

/** Validación de la contraseña */
function passwordVerify(errors = {}, values) {
  /* eslint-disable no-useless-escape */
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  if (!values.password) {
    errors.password = toast.error("La contraseña es obligatoria...!");
  } else if (values.password.includes(" ")) {
    errors.password = toast.error("Contraseña invalida...!");
  } else if (values.password.length < 4) {
    errors.password = toast.error(
      "La contraseña debe tener más de 4 carácteres."
    );
  } else if (!specialChars.test(values.password)) {
    errors.password = toast.error("La contraseña debe tener al menos un caracter especial.");
  }

  return errors;
}

/** Validación del usuario */
function usernameVerify(error = {}, values) {
  if (!values.username) {
    error.username = toast.error("El nombre de usuario es obligatorio...!");
  } else if (values.username.includes(" ")) {
    error.username = toast.error("El nombre de usuario es invalido...!");
  }

  return error;
}

/** Validación del correo */
function emailVerify(error = {}, values) {
  if (!values.email) {
    error.email = toast.error("El correo electrónico es obligatorio...!");
  } else if (values.email.includes(" ")) {
    error.email = toast.error("Wrong Email...!");
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    error.email = toast.error("El correo electronico es invalido...!");
  }

  return error;
}
