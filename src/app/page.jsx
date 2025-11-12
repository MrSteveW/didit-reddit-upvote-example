import { PostList } from "../components/PostList";

export default async function Home({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  return (
    <>
      <PostList currentPage={1} searchParams={resolvedSearchParams} />;
    </>
  );
}
