import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Comments({ comment }) {
  async function handleSubmitComment(event) {
    e.preventDefault();
    const formData = new FormData(event.target);
    const entryData = Object.fromEntries(formData);
    onSubmit(entryData);
  }
  async function AddComment(entryData) {
    const router = useRouter();
    const [addQuestion, setAddQuestion] = useState(false);
    setAddQuestion(true);
    const response = await fetch("/api/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entryData),
    });
    if (!response.ok) {
      alert("Ooops, something went wrong. Your comment was not added :(");
      console.log(error);
    }
    if (response.ok) {
      setAddQuestion(false);
      router.push("/question/${id}");
      alert("Yes! You have added this comment. See the comment down below!");
    }
  }
  return (
    // <h1>Hello</h1>
    <>
      <form onSubmit={handleSubmitComment}>
        <label htmlFor="name">Your Name</label>
        <input type="text" name="name" placeholder="name" />
        <label htmlFor="comment">Your Comment</label>
        <input type="text" name="comment" placeholder="comment here..." />
        <button type="submit">Send</button>
      </form>
      {comment && (
        <>
          <h1> {comment.length} fans commented on this place:</h1>
          {comment.map(({ _id, name, comment }) => {
            return (
              <div key={_id}>
                <p>
                  <small>
                    <strong>{name}</strong>
                  </small>
                </p>
                <span>{comment}</span>
              </div>
            );
          })}
        </>
      )}
    </>
  );
}
