import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";

const mockBookmarks = [
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
];

const BookmarksPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <header className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold">Your Bookmarks</h1>
          <Button>Add Bookmark</Button>
        </header>

        {mockBookmarks.map((bookmark) => (
          <Card key={bookmark.id}>
            <CardHeader>
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
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">{bookmark.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BookmarksPage;
