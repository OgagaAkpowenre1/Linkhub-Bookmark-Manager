// components/FilterBar.jsx
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function FilterBar({
  tags = [],
  onFilterChange,
  searchQuery,
  setSearchQuery,
  selectedTags,
  setSelectedTags,
}) {

    
  const toggleTag = (tag) => {
    let updatedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];

    setSelectedTags(updatedTags);
    onFilterChange(searchQuery, updatedTags);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    onFilterChange(value, selectedTags);
  };

  return (
    <div className="space-y-3">
      <Input
        placeholder="Search bookmarks..."
        value={searchQuery}
        onChange={handleSearch}
        className="w-full"
      />

      <div className="flex gap-2 overflow-x-auto whitespace-nowrap pb-1 scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-gray-300">
        {tags.map((tag) => {
          const active = selectedTags.includes(tag);
          return (
            <Badge
              key={tag}
              onClick={() => toggleTag(tag)}
              variant={active ? "default" : "outline"}
              className={`cursor-pointer whitespace-nowrap capitalize transition-all ${
                active ? "bg-blue-600 text-white" : "hover:bg-gray-200"
              }`}
            >
              #{tag}
            </Badge>
          );
        })}
      </div>
    </div>
  );
}
