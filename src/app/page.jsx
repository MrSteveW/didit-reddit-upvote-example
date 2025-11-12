import { PostList } from "../components/PostList";
import { SearchBar } from "../components/SearchBar";

export default async function Home({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  return (
    <>
      <SearchBar/>
      <PostList currentPage={1} searchParams={resolvedSearchParams} />;
    </>
  );
}
