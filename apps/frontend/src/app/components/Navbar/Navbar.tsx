import { Flex, Heading } from "@radix-ui/themes";
import Profile from "./Profile";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <header className="w-auto py-2 px-4 shadow-card shadow-current rounded-lg m-2 mb-4">
      <Flex justify={"between"} align={"center"}>
        <Heading as="h1" color="gray" weight={"bold"}>
          ReadConnect
        </Heading>
        <ThemeToggle />
        <Profile />
      </Flex>
    </header>
  );
}
