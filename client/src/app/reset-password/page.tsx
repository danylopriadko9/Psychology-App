import React from "react";

export default function ResetPassword() {
  return (
    <div className=" flex flex-col justify-center items-center py-20 w-full">
      <h1 className="text-3xl font-bold mb-5 text-center">
        Password Reset Request Sent! 📧
      </h1>
      <p className="text-center mb-2">
        We've sent you an email with a password recovery link. Please check your
        inbox (and your spam or junk folder, just in case). Follow the
        instructions in the email to reset your password.
      </p>
      <p className="text-center text-xs text-gray-600">
        If you don't receive the email within a few minutes, try resending the
        request or contact our support team for assistance.
      </p>
    </div>
  );
}
