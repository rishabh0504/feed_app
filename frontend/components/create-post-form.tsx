"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

interface CreatePostFormProps {
  onPostCreated: () => void;
}

export function CreatePostForm({ onPostCreated }: CreatePostFormProps) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: content.trim() }),
      });

      if (response.ok) {
        setContent("");
        onPostCreated();
      }
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <Textarea
          placeholder="Share your thoughts, ideas, or just say hello..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[120px] resize-none border-2 border-gray-200 focus:border-blue-400 transition-colors bg-white/50"
          disabled={isSubmitting}
        />
        <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
          {content.length}/500
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          {content.trim()
            ? `${content.trim().split(" ").length} words`
            : "Start typing..."}
        </div>
        <Button
          type="submit"
          disabled={!content.trim() || isSubmitting}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
        >
          <Send className="w-4 h-4" />
          {isSubmitting ? "Posting..." : "Share Post"}
        </Button>
      </div>
    </form>
  );
}
