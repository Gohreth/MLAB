import BackButton from "@/app/components/BackButton";
import AddReview from "@/app/components/Review/AddReview";
import ReviewCard from "@/app/components/Review/ReviewCard";
import { IBook } from "@/types/book";
import dateFormat from "@/utils/dateFormat";
import { ArrowLeftIcon, PlusIcon } from "@radix-ui/react-icons";
import {
  Box,
  Button,
  Container,
  Flex,
  ScrollArea,
  Separator,
  Strong,
  Text,
} from "@radix-ui/themes";

async function getData(id: number) {
  const response = await fetch(`http://localhost:3001/api/books/${id}`, {
    cache: "no-cache",
  });

  return response.json();
}

export default async function Page({ params }: { params: { id: number } }) {
  const dataResponse = await getData(params.id);
  const book: IBook = dataResponse.data.book;

  return (
    <Container size={"3"}>
      <Flex direction={"column"}>
        <Flex justify={"between"} align={"center"}>
          <Text mb={"4"} size={"6"}>
            <Strong>Information</Strong>
          </Text>
          <BackButton />
        </Flex>
        <Flex gap={"5"}>
          <Flex gap={"3"} direction={"column"} style={{ minWidth: "130px" }}>
            <Flex direction={"column"}>
              <Text size={"3"} weight={"light"}>
                <Strong>Title</Strong>
              </Text>
              <Text size={"1"}>{book.title}</Text>
            </Flex>
            <Flex direction={"column"}>
              <Text size={"3"} weight={"light"}>
                <Strong>ISBN</Strong>
              </Text>
              <Text size={"1"}>{book.isbn}</Text>
            </Flex>
            <Flex direction={"column"}>
              <Text size={"3"} weight={"light"}>
                <Strong>Pages</Strong>
              </Text>
              <Text size={"1"}>{book.pageCount}</Text>
            </Flex>
            <Flex direction={"column"}>
              <Text size={"3"} weight={"light"}>
                <Strong>Published date</Strong>
              </Text>
              <Text size={"1"}>{dateFormat(book.publishedDate)}</Text>
            </Flex>
            <Flex direction={"column"}>
              <Text size={"3"} weight={"light"}>
                <Strong>Author(s)</Strong>
              </Text>
              {book.authors.map((author) => (
                <Text key={author.id} as="div" size={"1"}>
                  {author.name}
                </Text>
              ))}
            </Flex>
            <Flex direction={"column"}>
              <Text size={"3"} weight={"light"}>
                <Strong>Category(ies)</Strong>
              </Text>
              {book.categories.map((category) => (
                <Text key={category.id} as="div" size={"1"}>
                  {category.name}
                </Text>
              ))}
            </Flex>
            <Flex direction={"column"}>
              <Text size={"3"} weight={"light"}>
                <Strong>Status</Strong>
              </Text>
              <Text size={"1"}>{book.status}</Text>
            </Flex>
          </Flex>
          <Box width={"100%"}>
            <Text size={"3"} as="div">
              <Strong>Description</Strong>
            </Text>
            <ScrollArea
              size={"1"}
              scrollbars="vertical"
              type="always"
              style={{ maxHeight: "400px", minHeight: "400px" }}
            >
              <Box pr={"4"}>
                <Text as="p" style={{ textAlign: "justify" }} size={"2"}>
                  {book.longDescription}
                </Text>
              </Box>
            </ScrollArea>
          </Box>
        </Flex>
        <Separator size={"4"} my={"6"} />
        <Flex justify={"between"} align={"center"} mb={"4"}>
          <Text size={"6"}>
            <Strong>Reviews</Strong>
          </Text>
          <AddReview />
        </Flex>
        <ScrollArea type="always" scrollbars="horizontal">
          <Flex gap={"5"} pb={"4"}>
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
          </Flex>
        </ScrollArea>
      </Flex>
    </Container>
  );
}
