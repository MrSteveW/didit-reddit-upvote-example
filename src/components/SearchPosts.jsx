import Link from "next/link";
import { Pagination } from "./Pagination";
import { Vote } from "./Vote";
import { db } from "@/db";
import { POSTS_PER_PAGE } from "@/config";
import { SearchForm } from "./SearchForm";
import { SearchToast } from "./SearchToast";

export async function SearchPosts({ currentPage = 1, searchParams }) {
  const query = searchParams;
  const searchTerm = query?.searchposts || "";

  let sqlQuery;
  let queryParams;

  if (searchTerm) {
    sqlQuery = `
      SELECT posts.id, posts.title, posts.body, posts.created_at, users.name, 
      COALESCE(SUM(votes.vote), 0) AS vote_total
      FROM posts
      JOIN users ON posts.user_id = users.id
      LEFT JOIN votes ON votes.post_id = posts.id
      WHERE posts.title ILIKE $1 OR posts.body ILIKE $1
      GROUP BY posts.id, posts.title, posts.body, posts.created_at, users.name
      ORDER BY posts.created_at DESC
      LIMIT $2
      OFFSET $3
    `;
    queryParams = [
      `%${searchTerm}%`,
      POSTS_PER_PAGE,
      POSTS_PER_PAGE * (currentPage - 1),
    ];
  } else {
    sqlQuery = `
      SELECT posts.id, posts.title, posts.body, posts.created_at, users.name, 
      COALESCE(SUM(votes.vote), 0) AS vote_total
      FROM posts
      JOIN users ON posts.user_id = users.id
      LEFT JOIN votes ON votes.post_id = posts.id
      GROUP BY posts.id, posts.title, posts.body, posts.created_at, users.name
      ORDER BY posts.created_at DESC
      LIMIT $1
      OFFSET $2
    `;
    queryParams = [POSTS_PER_PAGE, POSTS_PER_PAGE * (currentPage - 1)];
  }

  const { rows: posts } = await db.query(sqlQuery, queryParams);

  return (
    <>
      <SearchToast
        searchTerm={searchTerm}
        hasResults={posts.length > 0}
        showToast={query?.showToast === "true"}
      />

      <div className="p-2">
        <SearchForm searchTerm={searchTerm} />
      </div>

      <ul className="max-w-screen-lg mx-auto p-4 mb-4">
        {posts.map((post) => (
          <li
            key={post.id}
            className="py-4 flex space-x-6 hover:bg-zinc-200 rounded-lg"
          >
            <Vote postId={post.id} votes={post.vote_total} />
            <div>
              <Link
                href={`/post/${post.id}`}
                className="text-3xl hover:text-pink-500"
              >
                {post.title}
              </Link>
              <p className="text-zinc-700">
                posted by {post.name} on{" "}
                {new Date(post.created_at).toLocaleString("en-GB")}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <Pagination currentPage={currentPage} />
    </>
  );
}
