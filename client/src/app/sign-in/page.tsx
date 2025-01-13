"use client";
//###############################################################
import React from "react";
//============= NAVIGATION ===================
import Link from "next/link";
import { useRouter } from "next/navigation";
//============= COMPONENTS ===================
import PasswordInput from "../Components/PasswordInput";
import ButtonElement from "../Components/ButtonElement";
import InputElement from "../Components/InputElement";
//============= LIBRARIES ===================
import Swal from "sweetalert2";
//============= REDUX ===================
import { signIn } from "@/GlobalRedux/features/auth/asyncThunks";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/GlobalRedux/store";
import Providers from "@/GlobalRedux/Provider";
//###############################################################

export default function SingIn() {
  const [password, setPassword] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleButton = async () => {
    const result = await dispatch(signIn({ email, password }));
    if (signIn.rejected.match(result)) {
      Swal.fire({
        title: "Error!",
        text: (result.payload as string) || "Unknown error",
        icon: "error",
        confirmButtonText: "Got it",
      });
      return;
    }
    router.push("/");
  };

  return (
    <Providers>
      <main className=" flex flex-col justify-center items-center py-20 w-full">
        <div className="flex flex-col w-full">
          <h1 className=" text-3xl font-bold text-left  mb-5">
            Welcome Back 👋
          </h1>
          <p className="text-left w-full">
            Today is a new day. It's your day. You shape it.
          </p>
          <p className=" text-left w-full">
            Sign in to start managing your projects.{" "}
          </p>

          <div className="flex flex-col w-full gap-3 mt-8">
            <InputElement
              labelTitle="Email"
              name="email"
              placeholder="example@gmail.com"
              value={email}
              handleChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInput
              type="password"
              value={password}
              handleChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
              labelTitle="Password"
            />
            <Link
              className="text-blue-500 text-right underline"
              href="/email-provide"
            >
              Forgot password?
            </Link>
            <ButtonElement title="Sign In" handleClick={handleButton} />
          </div>
          <p className="text-center mt-2">
            Do not you have an account?{" "}
            <Link
              className="text-blue-500 text-right underline"
              href="/sign-up"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </main>
    </Providers>
  );
}
