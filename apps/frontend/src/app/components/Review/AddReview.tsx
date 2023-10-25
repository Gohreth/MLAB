"use client";
import { PlusIcon, StarFilledIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  Button,
  Flex,
  TextField,
  Text,
  TextArea,
  Select,
} from "@radix-ui/themes";
import React from "react";
import Stars from "../Rating/Stars";

export default function AddReview() {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button variant="solid">
          <PlusIcon />
          Add review
        </Button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title size={"6"}>Send your review</Dialog.Title>
        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Rating
            </Text>
            <Select.Root defaultValue="1">
              <Select.Trigger></Select.Trigger>
              <Select.Content>
                <Select.Group>
                  <Select.Label>Stars rating</Select.Label>
                  <Select.Item value="1">
                    <Stars rating={1} />
                  </Select.Item>
                  <Select.Item value="2">
                    <Stars rating={2} />
                  </Select.Item>
                  <Select.Item value="3">
                    <Stars rating={3} />
                  </Select.Item>
                  <Select.Item value="4">
                    <Stars rating={4} />
                  </Select.Item>
                  <Select.Item value="5">
                    <Stars rating={5} />
                  </Select.Item>
                </Select.Group>
              </Select.Content>
            </Select.Root>
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Content
            </Text>
            <TextArea placeholder="Type your review..." />
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button>Save</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
