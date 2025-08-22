import { useState } from "react";

export default function SubmitForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
const server = import.meta.env.VITE_BACKEND_URL|| 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");

    try {
      const res = await  fetch(`${server}/api/submit1`,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus("Form submitted successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("Error submitting form");
      }
    } catch (error) {
      console.error(error);
      setStatus("Server error");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
      <input
        type="text"
        name="name"
        placeholder="Your name"
        value={formData.name}
        onChange={handleChange}
        required
      /><br /><br />
      <input
        type="email"
        name="email"
        placeholder="Your email"
        value={formData.email}
        onChange={handleChange}
        required
      /><br /><br />
      <textarea
        name="message"
        placeholder="Your message"
        value={formData.message}
        onChange={handleChange}
        required
      /><br /><br />
      <button type="submit">Submit</button>
      <p>{status}</p>
    </form>
  );
}
