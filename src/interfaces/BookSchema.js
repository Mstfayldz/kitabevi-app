export const categories = ["Tümü", "Roman", "Bilim Kurgu", "Fantastik", "Tarih"];

export const BookSchema = {
  id: "number",
  title: "string",
  author: "string",
  year: "number",
  category: "string",
  price: "string",
  image: "string (Emoji)",
  owner: "string (email)",
  trending: "boolean"
};