"use client";

import { EraserIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";

export default function ClearButton() {
  const router = useRouter();
  return (
    <Button
      variant="surface"
      color="crimson"
      onClick={() => router.push(`http://localhost:3000/books`)}
    >
      <EraserIcon height="16" width="16" />
      Clear filters
    </Button>
  );
}
