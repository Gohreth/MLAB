import db from "../database";

interface IAmazonBook {
  _id: number;
  title: string;
  isbn: string;
  pageCount: number;
  publishedDate: {
    $date: Date; // Assuming this is a string in the provided format
  };
  thumbnailUrl: string;
  shortDescription: string;
  longDescription: string;
  status: string;
  authors: string[];
  categories: string[];
}

export class Data {
  private static toJSONArray(text: string) {
    const array = `[${text}]`;
    const fixed = array.replaceAll("} {", "} , {");
    return JSON.parse(fixed);
  }
  private static async fetchData(limit: number) {
    const response = await fetch(
      "https://raw.githubusercontent.com/dudeonthehorse/datasets/master/amazon.books.json"
    );
    const dataArray: IAmazonBook[] = this.toJSONArray(await response.text());
    return dataArray.slice(0, limit);
  }

  static async seed(limit: number) {
    const data: IAmazonBook[] = await this.fetchData(limit);

    await db.user.create({
      username: "Dummy",
      email: "dummy@test.com",
      password: "dummy123",
    });

    for (const row of data) {
      const { publishedDate, authors, categories, ...bookData } = row;
      const newBook = await db.book.create({
        ...bookData,
        publishedDate: publishedDate?.$date,
      });

      for (const author of authors) {
        if (!author) continue;
        const [newAuthor, created] = await db.author.findOrCreate({
          where: { name: author },
        });
        newBook.addAuthor(newAuthor);
      }

      for (const category of categories) {
        if (!category) continue;
        const [newCategory, created] = await db.category.findOrCreate({
          where: { name: category },
        });
        newBook.addCategory(newCategory);
      }
    }
  }
}
