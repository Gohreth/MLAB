"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Button, Flex, ScrollArea } from "@radix-ui/themes";
import Link from "next/link";

interface IPaginationProps {
  page: number;
  maxPage: number;
  urlSearchParams: URLSearchParams;
}
export default function Pagination({
  page,
  maxPage,
  urlSearchParams,
}: IPaginationProps) {
  const queryEntries = Object.fromEntries(urlSearchParams);

  return (
    <Flex gap={"2"} align={"center"} justify={"between"} my={"4"}>
      <Link
        href={{
          pathname: "/books",
          query: {
            ...queryEntries,
            page: page > 1 ? page - 1 : 1,
          },
        }}
        className={`${page <= 1 ? "pointer-events-none opacity-50" : ""}`}
      >
        <Button variant="outline">
          <ChevronLeftIcon width={24} height={24} />
          Previous
        </Button>
      </Link>
      <ScrollArea
        scrollbars="horizontal"
        type="scroll"
        size={"1"}
        style={{ maxWidth: "75vw" }}
      >
        <Flex gap={"2"} align={"center"}>
          {Array.apply(null, Array(maxPage)).map((_, index: number) => {
            return (
              <Link
                key={index}
                href={{
                  pathname: "/books",
                  query: {
                    ...queryEntries,
                    page: index + 1,
                  },
                }}
                className={`${
                  page === index + 1 ? "pointer-events-none opacity-50" : ""
                }`}
              >
                <Button variant="outline">{index + 1}</Button>
              </Link>
            );
          })}
        </Flex>
      </ScrollArea>

      <Link
        href={{
          pathname: "/books",
          query: {
            ...queryEntries,
            page: page + 1,
          },
        }}
        className={`${page >= maxPage ? "pointer-events-none opacity-50" : ""}`}
      >
        <Button variant="outline">
          Next
          <ChevronRightIcon width={24} height={24} />
        </Button>
      </Link>
    </Flex>
  );
}
