import { Container, Flex } from "@radix-ui/themes";
import BookCardsContainer from "../components/Book/BookCardsContainer";
import Pagination from "../components/Book/Pagination";
import Category from "../components/Filters/Category";
import { redirect } from "next/navigation";
import Title from "../components/Filters/Title";
import ClearButton from "../components/Filters/ClearButton";

async function getCategoriesData() {
  const response = await fetch("http://localhost:3001/api/categories", {});
  return response.json();
}

async function getBooksData(urlSearchParams: URLSearchParams) {
  const response = await fetch(
    `http://localhost:3001/api/books?` + urlSearchParams,
    {
      cache: "no-cache",
    }
  );
  return response.json();
}

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { page, keyword, category } = searchParams;

  let urlSearchParams = new URLSearchParams();

  if (page && typeof page === "string") {
    urlSearchParams.set("page", +page ? (+page).toString() : "1");
  }

  if (keyword && typeof keyword === "string") {
    urlSearchParams.set("keyword", keyword);
  }

  if (category && typeof category === "string") {
    if (+category) {
      urlSearchParams.set("category", category);
    }
  }

  const booksResponse = await getBooksData(urlSearchParams);
  const categoriesResponse = await getCategoriesData();

  //Checks if current page param is greater than total pages for pagination
  if (page && page > booksResponse.data.totalPages) {
    urlSearchParams.set("page", booksResponse.data.totalPages.toString());

    //Then redirects to the current path with the correct params (max total page)
    redirect(`http://localhost:3000/books?${urlSearchParams}`);
  }

  return (
    <Container>
      <Flex gap={"3"}>
        <Title urlSearchParams={urlSearchParams} />
        <Category
          categories={categoriesResponse.data.categories}
          urlSearchParams={urlSearchParams}
        />
        <ClearButton />
      </Flex>

      <Pagination
        page={page && +page ? +page : 1}
        maxPage={booksResponse.data.totalPages}
        urlSearchParams={urlSearchParams}
      />
      <BookCardsContainer books={booksResponse.data.books} />
    </Container>
  );
}
