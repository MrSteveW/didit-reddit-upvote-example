import { SearchPosts } from "@/components/SearchPosts";

export default async function SearchPostPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  return (
    <>
      <SearchPosts currentPage={1} searchParams={resolvedSearchParams} />;
    </>
  );
}
