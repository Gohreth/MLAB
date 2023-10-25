import { Avatar, Box, Card, Flex, ScrollArea, Text } from "@radix-ui/themes";
import React from "react";
import Stars from "../Rating/Stars";
import { randomInt } from "crypto";

export default function ReviewCard() {
  return (
    <Card style={{ minWidth: 300, maxWidth: 300 }}>
      <Flex direction={"column"} gap={"4"}>
        <Flex gap="3" align="center">
          <Avatar
            size="3"
            src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
            radius="full"
            fallback="T"
          />
          <Box>
            <Text as="div" size="2" weight="bold">
              Nombre
            </Text>
            <Text as="div" size="2" color="gray">
              Correo
            </Text>
            <Stars rating={randomInt(5)} />
          </Box>
        </Flex>
        <ScrollArea
          type="always"
          scrollbars="vertical"
          style={{ minHeight: 60, maxHeight: 60 }}
        >
          <Box pr={"4"}>
            <Text size={"1"} as="p" style={{ textAlign: "justify" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
              quasi, quos accusantium fuga quod sapiente ex fugit aspernatur
              quidem odit porro sunt! Ab quaerat voluptate, earum qui aliquid
              nam minus?
            </Text>
          </Box>
        </ScrollArea>
      </Flex>
    </Card>
  );
}
