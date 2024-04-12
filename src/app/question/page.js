"use client";
import useSWR from "swr";
import Navigation from "../../components/Navigation";
import Header from "../../components/Header";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function QuestionPage() {
  const { data, error, isLoading } = useSWR("/api/question", fetcher);

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading recently added questions...</div>;

  return (
    <>
      <Header />
      <div className="container">
        {data.map((q) => (
          <div className="container-questions-list" key={q._id}>
            <h2>Your question:</h2>
            <p>{q.question}</p>
            <h3>See the answer:</h3>
            <a href={`question/${q._id}`}>Clik here to see the answer...</a>
          </div>
        ))}
        <Navigation />
      </div>
    </>
  );
}
