import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "content.md");
export const BOOK_CONTENT = fs.readFileSync(filePath, "utf-8");
