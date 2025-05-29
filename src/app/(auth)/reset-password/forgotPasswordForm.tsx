"use client";
import { CiMail } from "react-icons/ci";
import React, { useState } from "react";
import Alert from "@/app/components/Alert";
import Spinner from "@/app/components/Spinner";
import Link from "next/link";
import { ForgotPasswordSchema } from "@/utils/validationSchema";
import { forgotPAsswordAction } from "@/actions/password.action";
const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [clientError, setClientError] = useState("");
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [serverSuccess, setServerSuccess] = useState("");

  const formSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = ForgotPasswordSchema.safeParse({ email });
    if (!validation.success) {
      return setClientError(validation.error.errors[0].message);
    }
    setLoading(true);
    forgotPAsswordAction({ email }).then((result) => {
      if (result.success) {
        setClientError("");
        setServerError("");
        setEmail("");
        setServerSuccess(result.message);
      }
      if (!result.success) {
        setServerSuccess("");
        setServerError(result.message);
      }
      setLoading(false)
    })
    .catch(() => setServerError("Something went wrong"))
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <div className="flex flex-col mb-3">
        <label className="p-1 text-slate-500 font-bold" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="border border-slate-500 rounded-md px-2 py-1 text-xl"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
      </div>
      {(clientError || serverError) && (
        <Alert type="error" message={clientError || serverError} />
      )}
      {serverSuccess && <Alert type="success" message={serverSuccess} />}
      <button
        disabled={loading}
        className="disabled:bg-gray-300 flex items-center justify-center bg-slate-800 hover:bg-slate-900 mt-4 text-white cursor-pointer rounded-lg w-full p-2 text-xl "
        type="submit"
      >
        {loading ? (
          <Spinner />
        ) : (
          <>
            <CiMail className="me-1 text-2xl" /> Submit
          </>
        )}
      </button>
      <div className="mt-2 p-1">
        <Link className="underline text-blue-500" href="/login">
          Back to login
        </Link>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
