"use client";
export default function Error({ error, reset }) {
  console.log(error);
  return (
    <div>
      <p>I`m so sorry, something went wrong</p>
      <p>If you`re trying to vote. Please log in</p>
      <p>{error.message}</p>
    </div>
  );
}
