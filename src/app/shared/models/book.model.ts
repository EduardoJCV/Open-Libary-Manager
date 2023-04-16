export interface OLMBookModel {
  id: string;
  title: string;
  author: string;
  publisher: string;
  isbn: string;
  description: string;
  coverImage: string;
  publishedDate: Date | string;
  language: string;
  category: string;
  stock: number;
  barcode: string;
}
