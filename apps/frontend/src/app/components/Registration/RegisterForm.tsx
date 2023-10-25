"use client";

import {
  CrossCircledIcon,
  EnvelopeClosedIcon,
  LockClosedIcon,
  PersonIcon,
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

interface IFormValues {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
}

export default function RegisterForm() {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<IFormValues>();

  const [apiErrors, setApiErrors] = useState<{ message: string }[]>([]);

  const onSubmit = async (values: IFormValues) => {
    let data;
    try {
      const response = await fetch("http://localhost:3001/api/user/signup", {
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
            <PersonIcon height="16" width="16" />
          </TextField.Slot>
          <TextField.Input
            {...register("username", { required: "Username is required" })}
            type="text"
            placeholder="Enter your username..."
          />
        </TextField.Root>
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
        <TextField.Root>
          <TextField.Slot>
            <LockClosedIcon height="16" width="16" />
          </TextField.Slot>
          <TextField.Input
            {...register("repeatPassword", {
              required: "Password is required",
              validate: (val: string) => {
                if (watch("password") !== val) return "Passwords don't match";
              },
            })}
            type="password"
            placeholder="Confirm your password..."
          />
        </TextField.Root>
        <Button type="submit" variant="surface" color="grass">
          <Text>
            <Strong>REGISTER</Strong>
          </Text>
        </Button>
      </Flex>
    </form>
  );
}
