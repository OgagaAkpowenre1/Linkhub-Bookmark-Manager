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
      </CardContent>
    </Card>
  );
};

export default BookmarkCard;
