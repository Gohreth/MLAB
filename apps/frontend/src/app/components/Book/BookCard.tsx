import { IAuthor } from "@/types/author";
import { IBook } from "@/types/book";
import dateFormat from "@/utils/dateFormat";
import { CaretDownIcon, ClockIcon, PersonIcon } from "@radix-ui/react-icons";
import {
  Badge,
  Box,
  Button,
  Card,
  DropdownMenu,
  Flex,
  Heading,
  Inset,
  ScrollArea,
  Separator,
  Strong,
  Text,
} from "@radix-ui/themes";
import Image from "next/image";
import BookCover from "./BookCover";
import { ICategory } from "@/types/category";
import BookActions from "./BookActions";

interface IBookCardProps {
  book: IBook;
}

export default function BookCard({ book }: IBookCardProps) {
  return (
    <Card variant="surface" className="min-h-[180px]  min-w-[400px]">
      <Flex direction={"column"}>
        <Flex>
          <BookCover book={book} />
          <Flex direction={"column"} style={{ width: "100%" }}>
            <Text size={"2"}>
              <Strong>{book.title}</Strong>
            </Text>
            <Separator my={"1"} size={"4"} />
            <ScrollArea
              type="auto"
              scrollbars="vertical"
              style={{ maxHeight: "130px" }}
            >
              <Box pr={"4"}>
                <Text size={"2"}>
                  {book.shortDescription ?? "No description"}
                </Text>
              </Box>
            </ScrollArea>
          </Flex>
        </Flex>
        <Flex pt={"5"} justify={"between"} align={"center"}>
          <Flex direction={"column"} gap={"2"}>
            <Flex align={"center"}>
              <PersonIcon />
              {book.authors.map((author: IAuthor, index, array) => (
                <Text ml={"1"} size={"1"} key={author.id}>
                  {author.name}
                  {index !== array.length - 1 ? "," : ""}
                </Text>
              ))}
            </Flex>

            <Flex align={"center"}>
              <ClockIcon />
              <Text ml={"1"} size={"1"}>
                {dateFormat(book.publishedDate)}
              </Text>
            </Flex>
          </Flex>
          <Flex direction={"column"} align={"end"} gap={"2"}>
            <Flex align={"center"} gap={"2"}>
              {book.categories.map((category: ICategory) => (
                <Badge key={category.id} variant="outline" color="crimson">
                  {category.name}
                </Badge>
              ))}
            </Flex>
            <Flex>
              <BookActions />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}
