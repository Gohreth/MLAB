import { CrossCircledIcon } from "@radix-ui/react-icons";
import { Callout, Flex } from "@radix-ui/themes";
import React from "react";
import { FieldErrors } from "react-hook-form";
import { ILoginFormValues } from "./LoginForm";

interface ICalloutErrors {
  clientErrors: FieldErrors<ILoginFormValues>;
  serverErrors: { message: string }[];
}

export default function CalloutErrors({
  clientErrors,
  serverErrors,
}: ICalloutErrors) {
  let errors: string[] = [];
  if (serverErrors) serverErrors.forEach((error) => errors.push(error.message));
  Object.keys(clientErrors).map((key: string) =>
    errors.push(clientErrors[key as keyof typeof clientErrors]?.message!)
  );
  return (
    <>
      {errors.length > 0 && (
        <Callout.Root variant="soft" color="crimson" size={"1"} role="alert">
          <Callout.Icon>
            <CrossCircledIcon />
          </Callout.Icon>
          <Flex direction={"column"} gap={"0"}>
            {errors.map((error: string, index) => (
              <Callout.Text key={index} size={"1"}>
                {error}
              </Callout.Text>
            ))}
          </Flex>
        </Callout.Root>
      )}
    </>
  );
}
