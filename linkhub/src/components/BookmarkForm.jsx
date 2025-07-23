import { useState } from "react";
import { Button } from "../components/ui/button";

const BookmarkForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    title: "",
    url: "",
    description: "",
  });

const handleChange = (e) => {
  const { name, value } = e.target;
  if (!name) return; // 🛡️ Prevent corrupting state with blank key
  setForm((prev) => ({ ...prev, [name]: value }));
};

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevents page reload
    console.log("Submitting...");

    const formData = new FormData(e.target);
    for (let [key, val] of formData.entries()) {
      console.log(`key: "${key}", value: "${val}"`);
    }

    if (!form.url || !form.title) {
      alert("Title and URL are required.");
      return;
    }

    await onAdd(form); // Call parent's onAdd handler
    setForm({ title: "", url: "", description: "" }); // Reset form
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        className="w-full border px-3 py-2 rounded"
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
      />
      <input
        className="w-full border px-3 py-2 rounded"
        name="url"
        placeholder="URL"
        value={form.url}
        onChange={handleChange}
        required
      />
      <input
        className="w-full border px-3 py-2 rounded"
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />
      {/* <input
        className="w-full border px-3 py-2 rounded"
        placeholder="Image URL (optional)"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      /> */}
      <Button type="submit">Add Bookmark</Button>
    </form>
  );
};

export default BookmarkForm;
