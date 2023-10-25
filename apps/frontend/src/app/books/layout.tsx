import type { Metadata } from "next";
import Navbar from "../components/Navbar/Navbar";

export const metadata: Metadata = {
  title: "ReadConnect | Books Gallery",
  description: "Books gallery fro ReadConnect web application",
};

export default function BooksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
}
