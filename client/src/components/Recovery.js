import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import { generateOTP, verifyOTP } from "../helpers/helper";
import { useAuthStore } from "../store/store";

import styles from "../styles/Username.module.css";

export default function Recovery() {
  const { username } = useAuthStore((state) => state.auth);
  const [OTP, setOTP] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    generateOTP(username).then((OTP) => {
      console.log(OTP);
      if (OTP) return toast.success("Código OTP ha sido envíado a tu correo!");
      return toast.error("Ha ocurrido un problema al generar el código OTP!");
    });
  }, [username]);

  async function onSubmit(e) {
    e.preventDefault();
    try {
      let { status } = await verifyOTP({ username, code: OTP });
      if (status === 201) {
        toast.success("Verificación exitosa!");
        return navigate("/reset");
      }
    } catch (error) {
      return toast.error("Código incorrecto, revisa nuevamente tu correo!");
    }
  }

  // handler of resend OTP
  function resendOTP() {
    let sentPromise = generateOTP(username);

    toast.promise(sentPromise, {
      loading: "Enviando...",
      success: <b>Hemos envíado el código OTP a tu correo!</b>,
      error: <b>No se pudo envíar el código OTP!</b>,
    });

    sentPromise.then((OTP) => {
      console.log(OTP);
    });
  }
  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Recuperar contraseña</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Ingresa el código OTP para recuperar la contraseña
            </span>
          </div>

          <form className="pt-20" onSubmit={onSubmit}>
            <div className="textbox flex flex-col items-center gap-6">
              <div className="input text-center">
                <span className="py-4 text-sm text-left text-gray-500">
                  Ingresa tu código OTP de 6 dígitos que envíamos a tu correo.
                </span>
                <input
                  onChange={(e) => setOTP(e.target.value)}
                  className={styles.textbox}
                  type="text"
                  placeholder="Código OTP"
                />
              </div>

              <button className={styles.btn} type="submit">
                Recuperar contraseña
              </button>
            </div>
          </form>

          <div className="text-center py-4">
            <span className="text-gray-500">
              No te ha llegado el código?{" "}
              <button onClick={resendOTP} className="text-red-500">
                Reenviar
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
