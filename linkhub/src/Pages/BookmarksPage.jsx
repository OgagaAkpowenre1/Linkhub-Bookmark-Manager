import { useRef, useState, useEffect } from "react";
import { createBookmark, deleteBookmark } from "../lib/bookmarks";
import BookmarkForm from "../components/BookmarkForm";
import BookmarkList from "../components/BookmarkList";
import FilterBar from "../components/FilterBar";
import { Button } from "../components/ui/button";
import { supabase } from "../auth/supabaseClient";
import Loader from "../components/Loader";

const BookmarksPage = () => {
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredBookmarks, setFilteredBookmarks] = useState([]);
  const [tags, setTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [bookmarkToEdit, setBookmarkToEdit] = useState(null);
  const bookmarksToShow =
    filteredBookmarks.length > 0 || searchQuery || selectedTags.length > 0
      ? filteredBookmarks
      : bookmarks;

  const editBookmark = (bookmark) => {
    setBookmarkToEdit(bookmark);
    setShowForm(true);
  };

  const handleAddBookmark = async (newBookmarkData) => {
    try {
      console.log("Received in parent:", newBookmarkData);
      const newBookmark = await createBookmark(newBookmarkData);

      console.log("Returned from Supabase:", newBookmark);
      fetchData();
      setBookmarks((prev) => [newBookmark, ...prev]);
    } catch (err) {
      console.error(err);
      alert("Failed to add bookmark");
    }
  };

  const handleEditBookmark = async (updatedBookmark) => {
    try {
      const { id, ...fieldsToUpdate } = updatedBookmark;

      const { error } = await supabase
        .from("bookmarks")
        .update(fieldsToUpdate)
        .eq("id", id);

      if (error) throw error;

      // Optionally re-fetch bookmarks or optimistically update UI
      fetchData(); // if you're using a fetch function
    } catch (err) {
      console.error("Edit failed:", err.message);
    }
  };

  const handleDeleteBookmark = async (id) => {
    try {
      await deleteBookmark(id);
      fetchData();
      setBookmarks((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete bookmark");
    }
  };

  const onFilterChange = (query, tags) => {
    setSearchQuery(query);
    setSelectedTags(tags);

    let filtered = bookmarks.filter((bookmark) => {
      const matchesSearch =
        bookmark.title.toLowerCase().includes(query.toLowerCase()) ||
        bookmark.description.toLowerCase().includes(query.toLowerCase());

      const matchesTags = tags.every((tag) => bookmark.tags?.includes(tag));
      return matchesSearch && matchesTags;
    });

    setFilteredBookmarks(filtered);
  };

  async function fetchData() {
    setLoading(true);

    const { data: userData, error: userError } = await supabase.auth.getUser();
    const user = userData?.user;

    if (!user || userError) {
      console.error("No user signed in");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("bookmarks")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Failed to fetch bookmarks:", error.message);
    } else {
      setBookmarks(data);
    }

    const { data: tags } = await supabase.from("tags").select("name");
    setTags(tags.map((t) => t.name));

    setLoading(false);
  }

  // Only run this ONCE on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Handle outside click only when form is open
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
    <div className="w-full bg-gray-50 py-8 px-4 min-h-screen">
      <div className="mx-auto space-y-6">
        <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-semibold">Your Bookmarks</h1>
          <Button onClick={() => setShowForm(true)}>Add Bookmark</Button>
        </header>
        <FilterBar
          tags={tags}
          onFilterChange={onFilterChange}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />

        {loading ? (
          <Loader loading={loading} />
        ) : (
          <BookmarkList
            bookmarks={bookmarksToShow}
            onDelete={handleDeleteBookmark}
            onEdit={editBookmark}
          />
        )}
      </div>
      {showForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div
            ref={formRef}
            className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md"
          >
            <BookmarkForm
              onAdd={handleAddBookmark}
              initialData={bookmarkToEdit}
              onClose={() => {
                setShowForm(false);
                setBookmarkToEdit(null);
              }}
              onEdit={handleEditBookmark}
            />
          </div>
        </div>
      )}
      {!loading && bookmarks.length === 0 && (
        <p className="text-gray-500 text-center">
          No bookmarks yet. Get started!
        </p>
      )}
    </div>
  );
};

export default BookmarksPage;
