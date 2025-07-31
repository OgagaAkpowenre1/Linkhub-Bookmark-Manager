import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";

const BookmarkCard = ({ bookmark, onDelete }) => {
  return ( 
    <Card>
      <CardHeader className="flex flex-col items-center text-center gap-2">
        <CardTitle className="text-lg font-medium">
          <a 
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {bookmark.title}
          </a>
        </CardTitle>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete(bookmark.id)}
        >
          Delete
        </Button>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">{bookmark.description}</p>

                {/* Tag List */}
        {bookmark.tags && bookmark.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {bookmark.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BookmarkCard;
