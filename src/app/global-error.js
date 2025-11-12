"use client";

export default function GlobalError({ error, reset }) {
  console.error("Global error:", error);

  return (
    <html>
      <body>
        <div style={{ padding: "20px", textAlign: "center" }}>
          <h1>Something went wrong!</h1>
          <p>We're experiencing technical difficulties.</p>
          <p>Please try refreshing the page or try again later.</p>
          <button
            onClick={() => reset()}
            style={{
              padding: "10px 20px",
              background: "#007acc",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
          {process.env.NODE_ENV === "development" && (
            <details style={{ marginTop: "20px", textAlign: "left" }}>
              <summary>Error details (dev only)</summary>
              <pre
                style={{
                  background: "#f5f5f5",
                  padding: "10px",
                  overflow: "auto",
                }}
              >
                {error?.message}
                {error?.stack}
              </pre>
            </details>
          )}
        </div>
      </body>
    </html>
  );
}
