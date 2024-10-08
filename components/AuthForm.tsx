"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomInput from "./CustomInput";
import { authFormSchema } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";
import SignUp from "@/app/(auth)/sign-up/page";
import { signIn, signUp, getLoggedInUser } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";

// custom form

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = authFormSchema(type);
  
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);
    setIsLoading(true);
    try {
      //Sign up with Appwrite and create plain token
      if (type === "sign-up") {
        const newUser = await signUp(data);

        setUser(newUser);
      }
      if (type === "sign-in") {
        const response = await signIn({
          email: data.email,
          password: data.password,
        });
        if (response) router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className=" flex cursor-pointer items-center gap-1">
          <Image src="/icons/logo.svg" width={34} height={34} alt="ngu" />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            Horizon
          </h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? "Link Account" : type === "sign-in" ? "Sign-in" : "Sign-up"}
            <p className="text-16 font-normal text-gray-600">
              {user
                ? "Link your account to get started"
                : "Please enter your details"}
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">{}</div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "sign-up" && (
                <>
                  <div className="flex flex-row gap-4">
                    <CustomInput
                      control={form.control}
                      label="Firstname:"
                      name="firstName"
                      placeholder="Enter your firstname"
              
                    />
                    <CustomInput
                      control={form.control}
                      label="Lastname:"
                      name="lastName"
                      placeholder="Enter your lastname"

                    />
                  </div>

                  <CustomInput
                    control={form.control}
                    label="Address:"
                    name="address1"
                    placeholder="Enter your address:"
              
                  />
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      label="City:"
                      name="city"
                      placeholder="Example: Da Nang:"
                     
                    />
                    <CustomInput
                      control={form.control}
                      label="Postal Code:"
                      name="postalCode"
                      placeholder="Example: 555550"
                      
                    />{" "}
                  </div>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      label="Day of birth:"
                      name="dob"
                      placeholder="YYYY-MM-DD"
                      
                    />
                    <CustomInput
                      control={form.control}
                      label="SNN:"
                      name="snn"
                      placeholder="Example: 1234"
                     
                    />
                  </div>
                </>
              )}
              <CustomInput
                control={form.control}
                label="Email:"
                name="email"
                placeholder="Enter your email"
                
              />
              <CustomInput
                control={form.control}
                label="Password:"
                name="password"
                placeholder="Enter your password"
                
              />
              <div className="flex flex-col gap-4">
                <Button className="form-btn" type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <LoaderCircle size={20} className="animate-spin" /> &nbsp;
                      Loading...
                    </>
                  ) : type === "sign-in" ? (
                    "Sign In"
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </form>
          </Form>
          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === "sign-in"
                ? "Dont't have an account ? "
                : "Already have an account ? "}
            </p>
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="form-link"
            >
              {type === "sign-in" ? "Sign up" : "Sign in"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
