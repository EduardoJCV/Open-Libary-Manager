export interface OLMLoanModel {
  id: string;
  bookId: string;
  userId: string;
  loanDate: Date | string;
  returnDate: Date | string | null;
}
