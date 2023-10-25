"use client";

import { IBook } from "@/types/book";
import { Inset } from "@radix-ui/themes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface IBookCoverProps {
  book: IBook;
}
export default function BookCover({ book }: IBookCoverProps) {
  const [error, setError] = useState(false);
  const router = useRouter();
  const placeholderSrc =
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/387928/book%20placeholder.png";
  const forceFallbackSrc = "";
  return (
    <Inset
      clip={"padding-box"}
      pr={"current"}
      side={"left"}
      className="min-w-[150px] max-w-[150px] hover:animate-pulse cursor-pointer"
    >
      <Image
        onClick={() => router.push(`/books/${book._id}`)}
        className="h-[180px] w-[150px]"
        src={error ? placeholderSrc : book.thumbnailUrl ?? forceFallbackSrc}
        alt={`Book cover for ${book.title}`}
        width={150}
        height={180}
        onError={() => setError(true)}
      />
    </Inset>
  );
}
