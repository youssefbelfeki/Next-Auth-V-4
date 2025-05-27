import { verifyingEmailToken } from "@/actions/verification.action";
import Link from "next/link";
import React from "react";
import { GoVerified } from "react-icons/go";
import { VscError } from "react-icons/vsc";
interface VerifyPageProps {
  searchParams: Promise<{ token: string }>;
}
const VerifyPage = async ({ searchParams }: VerifyPageProps) => {
  const currentSearchParams = await searchParams;
  const result = await verifyingEmailToken(currentSearchParams.token);
  return (
    <div className="text-center">
      {result.success ? (
        <div className="flex items-center justify-center flex-col mb-4">
          <GoVerified className="text-green-700 text-8xl" />
          <h1 className="mt-2 text-green-700 text-3xl font-semibold">
            Email Verified
          </h1>
          <p className="mt-3 text-green-700 text-xl">your email verifier</p>
        </div>
      ) : (
        <div className="flex items-center justify-center flex-col mb-4">
          <VscError className="text-red-700 text-8xl" />
          <h1 className="mt-2 text-red-700 text-3xl font-semibold">Error</h1>
          <p className="mt-3 text-red-700 text-xl">
            Something went wrong, Try again
          </p>
          <Link href="/login" className="text-blue-600 underline text-xl">
            Go to Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default VerifyPage;
