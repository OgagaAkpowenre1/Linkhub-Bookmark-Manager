import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";

const BookmarkForm = ({ onAdd, onClose, initialData, onEdit }) => {
  const [form, setForm] = useState({
    title: initialData?.title || "",
    url: initialData?.url || "",
    description: initialData?.description || "",
    tags: initialData?.tags?.join(", ") || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (!name) return; // 🛡️ Prevent corrupting state with blank key
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const parsedTags = form.tags
      .split(",")
      .map((tag) => tag.trim().toLowerCase())
      .filter((tag) => tag.length > 0);

    const updatedData = {
      ...form,
      tags: parsedTags,
    };

    try {
      if (initialData && onEdit) {
        // Check if changes were made
        const unchanged =
          initialData.title === form.title &&
          initialData.url === form.url &&
          initialData.description === form.description &&
          initialData.tags?.join(",") === parsedTags.join(",");

        if (unchanged) {
          alert("No changes detected.");
          return;
        }

        await onEdit({
          ...initialData, // keep the ID and any other important fields
          ...updatedData,
        });
      } else {
        await onAdd(updatedData);
      }

      onClose(); // close modal/form after success
    } catch (err) {
      console.error("Submission error:", err.message);
      alert("There was an error. Please try again.");
    }
  };

  useEffect(() => {
    setForm({
      title: initialData?.title || "",
      url: initialData?.url || "",
      description: initialData?.description || "",
      tags: initialData?.tags?.join(", ") || "",
    });
  }, [initialData]);

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

      <input
        className="w-full border px-3 py-2 rounded"
        type="text"
        id="tags"
        name="tags"
        value={form.tags}
        onChange={(e) => setForm({ ...form, tags: e.target.value })}
        placeholder="e.g. dev, design, inspiration"
      />
      {/* <input
        className="w-full border px-3 py-2 rounded"
        placeholder="Image URL (optional)"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      /> */}
      {/* <Button type="submit">Add Bookmark</Button> */}
      <Button type="submit">
        {initialData ? "Save Changes" : "Add Bookmark"}
      </Button>
    </form>
  );
};

export default BookmarkForm;
