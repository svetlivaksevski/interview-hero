export default function QuestionsForm({
  onSubmit,
  loadingAddQuestion,
  defaultData,
  formName,
  setLoadingAddQuestion,
}) {
  async function handleSubmit(event) {
    event.preventDefault();
    setLoadingAddQuestion(true);
    const formData = new FormData(event.target);
    const entryData = Object.fromEntries(formData);
    onSubmit(entryData);
  }
  return (
    <div>
      <form class="form" aria-labelledby="Form" onSubmit={handleSubmit}>
        <label htmlFor="question">Question:</label>
        <textarea
          id="question"
          name="question"
          rows="5"
          cols="30"
          defaultValue={defaultData?.question}
        />
        <label htmlFor="answer">Answer:</label>

        <textarea
          id="answer"
          name="answer"
          rows="5"
          cols="30"
          defaultValue={defaultData?.answer}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
