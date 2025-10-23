"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
  registration: UseFormRegisterReturn;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  registration,
  className,
  ...props
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={registration.name}>{label}</Label>
      <Input
        id={registration.name}
        {...registration}
        {...props}
        className={`${
          error ? "border-red-500 focus-visible:ring-red-500" : ""
        } ${className || ""}`}
      />
      {error && (
        <p className="text-sm text-red-500">{error.message}</p>
      )}
    </div>
  );
};
