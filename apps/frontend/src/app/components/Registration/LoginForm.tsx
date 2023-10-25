"use client";

import {
  CrossCircledIcon,
  EnvelopeClosedIcon,
  LockClosedIcon,
} from "@radix-ui/react-icons";
import {
  Button,
  Strong,
  TextField,
  Text,
  Flex,
  Callout,
} from "@radix-ui/themes";
import { useState } from "react";
import { useForm } from "react-hook-form";
import CalloutErrors from "./CalloutErrors";

export interface ILoginFormValues {
  email: string;
  password: string;
}

export default function LoginForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ILoginFormValues>();

  const [apiErrors, setApiErrors] = useState<{ message: string }[]>([]);

  const onSubmit = async (values: ILoginFormValues) => {
    let data;
    try {
      const response = await fetch("http://localhost:3001/api/user/signin", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      data = await response.json();

      if (!data.success) throw new Error();

      window.location.href = "http://localhost:3000/books";
    } catch (error) {
      setApiErrors(data.errors);
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex direction={"column"} gap={"4"}>
        <CalloutErrors serverErrors={apiErrors} clientErrors={errors} />
        <TextField.Root>
          <TextField.Slot>
            <EnvelopeClosedIcon height="16" width="16" />
          </TextField.Slot>
          <TextField.Input
            autoComplete="off"
            {...register("email", { required: "Email is required" })}
            type="email"
            placeholder="Enter your email..."
          />
        </TextField.Root>
        <TextField.Root>
          <TextField.Slot>
            <LockClosedIcon height="16" width="16" />
          </TextField.Slot>
          <TextField.Input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be longer than 6 characters",
              },
            })}
            type="password"
            placeholder="Enter your password..."
          />
        </TextField.Root>
        <Button type="submit" variant="surface" color="grass">
          <Text>
            <Strong>LOGIN</Strong>
          </Text>
        </Button>
      </Flex>
    </form>
  );
}
