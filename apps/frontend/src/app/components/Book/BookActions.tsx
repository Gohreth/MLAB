"use client";

import { CaretDownIcon } from "@radix-ui/react-icons";
import { Button, DropdownMenu, Strong, Text } from "@radix-ui/themes";

export default function BookActions() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="outline" color="gray">
          Actions
          <CaretDownIcon />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item>
          <Text>
            Add to <Strong>Wishlist</Strong>
          </Text>
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <Text>
            Add to <Strong>Already Read</Strong>
          </Text>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
