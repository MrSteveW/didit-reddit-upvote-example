"use client";
export default function Error({ error, reset }) {
  console.log(error);
  return (
    <div>
      <p>I`m so sorry, something went wrong</p>
      <p>{error.message}</p>
    </div>
  );
}
