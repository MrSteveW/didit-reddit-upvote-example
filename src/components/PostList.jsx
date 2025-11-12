import Link from "next/link";
import { Pagination } from "./Pagination";
import { Vote } from "./Vote";
import { db } from "@/db";
import { POSTS_PER_PAGE } from "@/config";

export async function PostList({ currentPage = 1, searchParams }) {
  const query = searchParams;
  let orderClause = "ORDER BY posts.created_at DESC";
  let sortDescription = "newest first";

  if (query.sort === "votes") {
    orderClause = "ORDER BY vote_total DESC, posts.created_at DESC";
    sortDescription = "most votes";
  }

  const { rows: posts } =
    await db.query(`SELECT posts.id, posts.title, posts.body, posts.created_at, users.name, 
    COALESCE(SUM(votes.vote), 0) AS vote_total
     FROM posts
     JOIN users ON posts.user_id = users.id
     LEFT JOIN votes ON votes.post_id = posts.id
     GROUP BY posts.id, posts.title, posts.body, posts.created_at, users.name
     ${orderClause}
     LIMIT ${POSTS_PER_PAGE}
     OFFSET ${POSTS_PER_PAGE * (currentPage - 1)}`);

  return (
    <>
      <div className="mb-4 p-4">
        <span className="mr-2">Sort by:</span>
        <Link
          href="/?sort=newest"
          className={`hover:text-red-300 mr-2 ${
            !query.sort || query.sort === "newest"
              ? "font-bold text-red-500"
              : ""
          }`}
        >
          Newest First
        </Link>
        <Link
          href="/?sort=votes"
          className={`hover:text-red-300 ml-2 ${
            query.sort === "votes" ? "font-bold text-red-500" : ""
          }`}
        >
          Most Votes
        </Link>
      </div>
      <ul className="max-w-screen-lg mx-auto p-4 mb-4 ">
        {posts.map((post) => (
          <li
            key={post.id}
            className=" py-4 flex space-x-6 hover:bg-zinc-200 rounded-lg"
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
