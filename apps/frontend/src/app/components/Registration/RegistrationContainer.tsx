"use client";
import {
  EnvelopeClosedIcon,
  LockClosedIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import {
  Box,
  Button,
  Flex,
  Strong,
  Tabs,
  Text,
  TextField,
} from "@radix-ui/themes";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function RegistrationContainer() {
  return (
    <Tabs.Root defaultValue="login">
      <Tabs.List>
        <Tabs.Trigger value="login">Login</Tabs.Trigger>
        <Tabs.Trigger value="register">Create account</Tabs.Trigger>
      </Tabs.List>

      <Box px="4" pt="3" pb="2">
        <Tabs.Content value="login">
          <LoginForm />
        </Tabs.Content>

        <Tabs.Content value="register">
          <RegisterForm />
        </Tabs.Content>
      </Box>
    </Tabs.Root>
  );
}
