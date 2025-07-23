import { useRef, useState, useEffect } from "react";
import { createBookmark, deleteBookmark } from "../lib/bookmarks";
import BookmarkForm from "../components/BookmarkForm";
import BookmarkList from "../components/BookmarkList";
import { Button } from "../components/ui/button";

const BookmarksPage = () => {
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef(null);
  const [bookmarks, setBookmarks] = useState([
    {
      id: 1,
      title: "OpenAI",
      url: "https://openai.com",
      description: "AI research and deployment company.",
    },
    {
      id: 2,
      title: "Supabase Docs",
      url: "https://supabase.com/docs",
      description: "Official documentation for Supabase.",
    },
    {
      id: 3,
      title: "React",
      url: "https://reactjs.org",
      description: "A JavaScript library for building user interfaces.",
    },
  ]);

  const handleAddBookmark = async (newBookmarkData) => {
    console.log("Received in parent:", newBookmarkData);
    try {
      console.log("Entered try block");
      const newBookmark = await createBookmark(newBookmarkData);
      setBookmarks((prev) => [newBookmark, ...prev]);
    } catch (err) {
      console.error(err);
      alert("Failed to add bookmark");
    }
  };

  const handleDeleteBookmark = async (id) => {
    try {
      await deleteBookmark(id);
      setBookmarks((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete bookmark");
    }
  };

    // Dismiss form on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (formRef.current && !formRef.current.contains(e.target)) {
        setShowForm(false);
      }
    };
    if (showForm) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showForm]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <header className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold">Your Bookmarks</h1>
          <Button onClick={() => setShowForm(true)}>Add Bookmark</Button>
        </header>

        

        <BookmarkList bookmarks={bookmarks} onDelete={handleDeleteBookmark} />
      </div>
            {showForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div
            ref={formRef}
            className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md"
          >
            <BookmarkForm onAdd={handleAddBookmark} />
          </div>
        </div>
      )}
    </div>
  );
};

export default BookmarksPage;
