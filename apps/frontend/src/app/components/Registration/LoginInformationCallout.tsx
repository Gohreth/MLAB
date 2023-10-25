"use client";

import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Callout, Strong } from "@radix-ui/themes";

export default function LoginInformationCallout() {
  return (
    <Callout.Root>
      <Callout.Icon>
        <InfoCircledIcon />
      </Callout.Icon>
      <Callout.Text>
        You can login with <Strong>dummy@test.com</Strong> -{" "}
        <Strong>dummy123</Strong> for testing purposes.
      </Callout.Text>
    </Callout.Root>
  );
}
