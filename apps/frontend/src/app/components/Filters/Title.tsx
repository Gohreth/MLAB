"use client";

import { TextIcon } from "@radix-ui/react-icons";
import { TextField } from "@radix-ui/themes";
import Link from "next/link";
import React, { useRef, useState } from "react";

interface ITitleProps {
  urlSearchParams: URLSearchParams;
}

export default function Title({ urlSearchParams }: ITitleProps) {
  const queryEntries = Object.fromEntries(urlSearchParams);
  const [title, setTitle] = useState("");

  return (
    <TextField.Root>
      <TextField.Slot>
        <Link
          style={{ minWidth: "100%" }}
          passHref
          href={{
            pathname: "/books",
            query: {
              ...queryEntries,
              keyword: title,
            },
          }}
        >
          <TextIcon height="16" width="16" />
        </Link>
      </TextField.Slot>
      <TextField.Input
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Search by title…"
        value={queryEntries["keyword"]}
      />
    </TextField.Root>
  );
}
