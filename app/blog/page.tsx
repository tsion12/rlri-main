import { redirect } from "next/navigation";

export default function BlogIndexRedirect() {
  redirect("/main/en/blogs");
}
