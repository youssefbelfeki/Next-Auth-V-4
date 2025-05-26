"use client";
import { IoMdLogIn } from "react-icons/io";
import React, { useState } from "react";
import { LoginSchema } from "@/utils/validationSchema";
import Alert from "@/app/components/Alert";
import Spinner from "@/app/components/Spinner";
import { loginAction } from "@/actions/auth.action";
import SocialProviders from "@/app/components/SocialProviders";
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [clientError, setClientError] = useState("");
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const formSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = LoginSchema.safeParse({ email, password });
    if (!validation.success) {
      return setClientError(validation.error.errors[0].message);
    }
    setLoading(true);
    loginAction({ email, password }).then((result) => {
      if (!result?.success) setServerError(result.message);
      setLoading(false);
    });
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
      <div className="flex flex-col mb-3">
        <label className="p-1 text-slate-500 font-bold" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="border border-slate-500 rounded-md px-2 py-1 text-xl"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
      </div>
      {(clientError || serverError) && (
        <Alert type="error" message={clientError || serverError} />
      )}
      <button
        disabled={loading}
        className="disabled:bg-gray-300 flex items-center justify-center bg-slate-800 hover:bg-slate-900 mt-4 text-white cursor-pointer rounded-lg w-full p-2 text-xl "
        type="submit"
      >
        {loading ? (
          <Spinner />
        ) : (
          <>
            <IoMdLogIn className="me-1 text-2xl" /> Login
          </>
        )}
      </button>
      <SocialProviders />
    </form>
  );
};

export default LoginForm;
