import React from "react";
import { FormField, FormControl, FormMessage, FormLabel } from "./ui/form";
import { Input } from "@/components/ui/input";
import { Control, FieldPath, Form } from "react-hook-form";
import { z } from "zod";
import { authFormSchema } from "@/lib/utils";


const formSchema = authFormSchema('sign-up')
interface CustomInput {
  control : Control<z.infer<typeof formSchema>>
  name: FieldPath<z.infer<typeof formSchema>>
  label: string;
  placeholder: string;
  type:  string;
}

const CustomInput = ({ control, label, name, placeholder }:CustomInput) => {
  return (
    <div>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <div className="form-item">
            <FormLabel>{label}</FormLabel>
            <div className="flex w-full flex-col">
              <FormControl>
                <Input
                  placeholder={placeholder}
                  className="input-class"
                  type={name === 'password' ?  "password" : "text"}
                  {...field}
                />
              </FormControl>
              <FormMessage className="form-message mt-2" />
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default CustomInput;
