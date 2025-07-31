import BookmarkCard from "./BookmarkCard";

const BookmarkList = ({ bookmarks, onDelete, onEdit }) => {
  return (
    <div className="space-y-4 overflow-y-auto">
      {/* {bookmarks.map((bookmark) => (
        <BookmarkCard key={bookmark.id} bookmark={bookmark} onDelete={onDelete} />
      ))} */}
      {bookmarks.map((bookmark, index) =>
        bookmark ? (
          <BookmarkCard 
            key={bookmark.id || index}
            bookmark={bookmark}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ) : null
      )}
    </div>
  );
};

export default BookmarkList;
