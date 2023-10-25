import { IAuthor } from "./author";
import { ICategory } from "./category";

export interface IBook {
  _id: number;
  title: string;
  isbn: string;
  pageCount: number;
  publishedDate: string;
  thumbnailUrl: string;
  shortDescription: string;
  longDescription: string;
  status: string;
  authors: IAuthor[];
  categories: ICategory[];
}
