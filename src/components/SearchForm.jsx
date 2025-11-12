"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SearchForm({ searchTerm }) {
  const router = useRouter();
  const [inputValue, setInputValue] = useState(searchTerm);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const search = formData.get("searchposts");

    if (search?.trim()) {
      router.push(
        `/search-post?searchposts=${encodeURIComponent(search)}&showToast=true`
      );
    } else {
      router.push("/search-post");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label
        htmlFor="searchposts"
        className="mb-2 text-sm font-medium text-gray-900"
      >
        Search through posts:
      </label>
      <input
        name="searchposts"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="w-50 bg-gray-50 border border-gray-800 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
        placeholder="Enter search term..."
      />
      <button
        type="submit"
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
}
