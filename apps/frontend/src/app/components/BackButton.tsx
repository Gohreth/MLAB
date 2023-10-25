"use client";

import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";

export default function BackButton() {
  const router = useRouter();
  return (
    <Button onClick={() => router.back()} variant="ghost" size={"2"}>
      <ArrowLeftIcon />
      Go back
    </Button>
  );
}
