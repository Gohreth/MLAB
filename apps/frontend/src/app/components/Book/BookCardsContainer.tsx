import { IBook } from "@/types/book";
import BookCard from "./BookCard";
import { Grid } from "@radix-ui/themes";

interface IBookCardsContainerProps {
  books: IBook[];
}

export default function BookCardsContainer({
  books,
}: IBookCardsContainerProps) {
  return (
    <Grid flow={"row"} gap={"3"}>
      {books.map((book: IBook) => (
        <BookCard key={book._id} book={book} />
      ))}
    </Grid>
  );
}
