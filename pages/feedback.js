import { useState } from "react";
import { extractFeedback, buildFeedBackPath } from "./api/feedback";

export default function Feedback(props) {
  const [data, setData] = useState();

  function loadFeedback(id) {
    fetch(`/api/${id}`)
      .then((res) => res.json())
      .then((data) => setData(data.feedback));
  }

  return (
    <div>
        {data && <p>{data.email}</p>}
      <ul>
        {props.feedbackItems.map((item) => (
          <li key={item.id}>
            {item.text}
            <button onClick={loadFeedback.bind(null, item.id)}>
              Show details
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const filePath = buildFeedBackPath();
  const data = extractFeedback(filePath);
  return {
    props: {
      feedbackItems: data,
    },
  };
}
