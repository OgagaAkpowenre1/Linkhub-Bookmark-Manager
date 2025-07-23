import BookmarkCard from "./BookmarkCard";

const BookmarkList = ({ bookmarks, onDelete }) => {
  return (
    <div className="space-y-4">
      {/* {bookmarks.map((bookmark) => (
        <BookmarkCard key={bookmark.id} bookmark={bookmark} onDelete={onDelete} />
      ))} */}
      {bookmarks.map((bookmark, index) =>
        bookmark ? (
          <BookmarkCard
            key={bookmark.id || index}
            bookmark={bookmark}
            onDelete={onDelete}
          />
        ) : null
      )}
    </div>
  );
};

export default BookmarkList;
