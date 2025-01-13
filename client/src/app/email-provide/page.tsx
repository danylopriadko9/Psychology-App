"use client";
import React from "react";
import InputElement from "../Components/InputElement";
import ButtonElement from "../Components/ButtonElement";
import { useRouter } from "next/navigation";
import { forgotPassword } from "@/GlobalRedux/features/auth/asyncThunks";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/GlobalRedux/store";
import Swal from "sweetalert2";
import Providers from "@/GlobalRedux/Provider";

export default function EmailProvide() {
  const [email, setEmail] = React.useState<string>("");

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleButton = async () => {
    const result = await dispatch(forgotPassword(email));
    if (forgotPassword.rejected.match(result)) {
      Swal.fire({
        title: "Error!",
        text: (result.payload as string) || "Unknown error",
        icon: "error",
        confirmButtonText: "Got it",
      });
      return;
    }
    router.push("/reset-password");
  };

  return (
    <Providers>
      <div className="w-full flex flex-col justify-center items-center py-20">
        <div className="flex flex-col w-full">
          <h1 className=" text-3xl font-bold text-left w-full mb-5">
            Provide your email 📨
          </h1>
          <InputElement
            labelTitle=""
            name="email"
            placeholder="example@gmail.com"
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />

          <ButtonElement title="Send code" handleClick={handleButton} />
        </div>
      </div>
    </Providers>
  );
}
