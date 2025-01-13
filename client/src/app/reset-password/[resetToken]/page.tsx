"use client";

import React from "react";
import PasswordCompare from "../../Components/PasswordsCompare";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/GlobalRedux/store";
import Swal from "sweetalert2";
import { resetPassword } from "@/GlobalRedux/features/auth/asyncThunks";
import Providers from "@/GlobalRedux/Provider";

export default function ResetPassword() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { resetToken } = useParams();

  const [password, setPassword] = React.useState("");
  const [passwordRepeated, setPasswordRepeated] = React.useState("");

  const handleButton = async () => {
    const result = await dispatch(
      resetPassword({
        password,
        passwordRepeated,
        resetPasswordToken: resetToken,
      })
    );
    if (resetPassword.rejected.match(result)) {
      console.log(result.payload);
      Swal.fire({
        title: "Error!",
        text: (result.payload as string) || "Unknown error",
        icon: "error",
        confirmButtonText: "Got it",
      });
      return;
    }
    Swal.fire({
      title: "Success!",
      text: "Your password was changed successfully",
      icon: "success",
      confirmButtonText: "Got it",
    });
    router.push("/sign-in");
  };
  return (
    <Providers>
      <div className=" flex flex-col justify-center items-center py-20 w-full">
        <div className="flex flex-col w-full">
          <div className=" flex flex-col gap-3">
            <h1 className=" text-3xl font-bold text-left w-full mb-5">
              Provide new password 🔒
            </h1>
            <PasswordCompare
              buttonTitle="Change password"
              buttonFunction={handleButton}
              password={password}
              setPassword={setPassword}
              passwordRepeated={passwordRepeated}
              setPasswordRepeated={setPasswordRepeated}
            />
          </div>
        </div>
      </div>
    </Providers>
  );
}
