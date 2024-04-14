"use client";

import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function RecentlyAdded() {
  const { data, error, isLoading } = useSWR("/api/question", fetcher);

  if (isLoading || error) return <h2>Loading...</h2>;

  const limitedData = data.slice(0, 5);

  return (
    <main>
      <h1>Recently added</h1>
      <div className="container-questions-list-recently">
        {limitedData.map((q) => (
          <div className="container-recently-list" key={q._id}>
            <h2>Your question:</h2>
            <p>{q.question}</p>
            <h3>See the answer:</h3>
            <a href={`question/${q._id}`}>Click here to see the answer...</a>
          </div>
        ))}
      </div>
    </main>
  );
}
