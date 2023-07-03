import { useRef, useState } from "react";


function HomePage() {
  const email = useRef();
  const feedback = useRef();
  const [items, setItems] = useState([])

  function submit(e) {
    e.preventDefault();

    const enteredEmail = email.current.value;
    const enteredFeedback = feedback.current.value;

    const reqBody = {
      email: enteredEmail,
      text: enteredFeedback,
    };

    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json()).then((data) => console.log(data));
  }

  function loadData(){
    fetch('/api/feedback').then((res) => res.json()).then((data) =>  setItems(data.feedback));
  }

  return (
    <div>
      <h1>The Home Page</h1>
      <form>
        <div>
          <label htmlFor="email">You Email Address</label>
          <br />
          <input type="email" id="email" ref={email} />
        </div>
        <div>
          <label htmlFor="feedback">You Feedback</label>
          <br />
          <textarea rows="5" id="feedback" ref={feedback} />
        </div>
        <button onClick={submit}>Send Feedback</button>
      </form>
      <hr/>
      <button onClick={loadData}>Load Data</button>
      <ul>
        {items.map(item => <li key={item.key}>{item.text}</li>)}
      </ul>
    </div>
  );
}

export default HomePage;
