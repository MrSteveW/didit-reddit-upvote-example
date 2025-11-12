import { SearchPosts } from "@/components/SearchPosts";

export default async function SearchPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Search Posts</h1>
      <SearchPosts currentPage={1} searchParams={resolvedSearchParams} />
    </div>
  );
}
