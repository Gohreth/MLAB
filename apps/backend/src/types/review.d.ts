export interface IReview {
  id: number;
  content: string;
  rating: number;
  userId: number;
  bookId: number;
}

export type IReviewParams = Omit<IReview, "id">;
