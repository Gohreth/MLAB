"use client";
import * as RadixAvatar from "@radix-ui/react-avatar";
import { CrossCircledIcon, ExitIcon } from "@radix-ui/react-icons";
import { Button, Flex, Popover, Text } from "@radix-ui/themes";

interface IAvatarProps {
  initial: string;
}

export default function Avatar({ initial }: IAvatarProps) {
  async function logout() {
    try {
      const response = await fetch("http://localhost:3001/api/user/signout", {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();

      if (!data.success) throw new Error();
      window.location.href = "http://localhost:3000";
    } catch (error) {}
  }

  return (
    <Popover.Root>
      <Popover.Trigger className="cursor-pointer">
        <RadixAvatar.Root className="hover:animate-pulse bg-blackA1 inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
          <RadixAvatar.Image
            className="h-full w-full rounded-[inherit] object-cover"
            //src="https://pbs.twimg.com/media/ERMukEjW4AAjtgU?format=png&name=small"
            alt="Colm Tuite"
          />
          <RadixAvatar.Fallback className=" rounded-full border-2 border-current text-violet11 leading-1 flex h-full w-full items-center justify-center text-[15px] font-medium">
            {initial.toUpperCase()}
          </RadixAvatar.Fallback>
        </RadixAvatar.Root>
      </Popover.Trigger>
      <Popover.Content>
        <Flex gap="3" direction={"column"}>
          <Button size="1" variant="ghost" onClick={logout}>
            <Flex gap={"2"} align={"center"}>
              <ExitIcon />
              <Text>Logout</Text>
            </Flex>
          </Button>
          <Popover.Close>
            <Button size="1" variant="ghost" color="crimson">
              <Flex gap={"2"} align={"center"}>
                <CrossCircledIcon color="crimson" />
                <Text>Dismiss</Text>
              </Flex>
            </Button>
          </Popover.Close>
        </Flex>
      </Popover.Content>
    </Popover.Root>
  );
}
