import { useEffect, useState } from "react";

export default function ViewResponses() {
  const [responses, setResponses] = useState([]);
const server = import.meta.env.VITE_BACKEND_URL
  useEffect(() => {
    // fetch("http://127.0.0.1:8000/api/view/")
    fetch(`${server}/api/view`)
      .then((res) => res.json())
      .then((data) => setResponses(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>All Responses</h2>
      {responses.length === 0 ? (
        <p>No responses yet</p>
      ) : (
        <ul>
          {responses.map((item) => (
            <li key={item.id}>
              <strong>{item.name}</strong> ({item.email}): {item.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
