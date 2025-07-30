"use client";

import type React from "react";

import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Send,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Post } from "@/types";

interface PostCardProps {
  post: Post;
  onPostUpdate: (post: Post) => void;
}

export function PostCard({ post, onPostUpdate }: PostCardProps) {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  const handleLike = async () => {
    try {
      const response = await fetch(`/api/posts/${post.id}/like`, {
        method: "POST",
      });
      if (response.ok) {
        const updatedPost = await response.json();
        onPostUpdate(updatedPost);
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleDislike = async () => {
    try {
      const response = await fetch(`/api/posts/${post.id}/dislike`, {
        method: "POST",
      });
      if (response.ok) {
        const updatedPost = await response.json();
        onPostUpdate(updatedPost);
      }
    } catch (error) {
      console.error("Error disliking post:", error);
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newComment.trim()) return;

    setIsSubmittingComment(true);

    try {
      const response = await fetch(`/api/posts/${post.id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: newComment.trim() }),
      });

      if (response.ok) {
        const updatedPost = await response.json();
        onPostUpdate(updatedPost);
        setNewComment("");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {post.content.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="font-medium text-gray-800">Anonymous User</p>
              <p className="text-xs text-muted-foreground">
                {formatDate(post.createdAt)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50/50 rounded-lg p-4 mb-4">
          <p className="whitespace-pre-wrap text-gray-800 leading-relaxed">
            {post.content}
          </p>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col space-y-4 bg-gray-50/30">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className="flex items-center gap-2 hover:bg-green-50 hover:text-green-600 transition-colors group"
            >
              <ThumbsUp className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="font-medium">{post.liked}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleDislike}
              className="flex items-center gap-2 hover:bg-red-50 hover:text-red-600 transition-colors group"
            >
              <ThumbsDown className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="font-medium">{post.disliked}</span>
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-2 hover:bg-blue-50 hover:text-blue-600 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="font-medium">
              {Array.isArray(post.comments) && post.comments.length}
            </span>
            {showComments ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </Button>
        </div>

        {showComments && (
          <div className="w-full space-y-4">
            <Separator className="bg-gray-200" />

            <form onSubmit={handleAddComment} className="space-y-3">
              <Textarea
                placeholder="Write a thoughtful comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[80px] resize-none border-2 border-gray-200 focus:border-blue-400 transition-colors bg-white"
                disabled={isSubmittingComment}
              />
              <div className="flex justify-end">
                <Button
                  type="submit"
                  size="sm"
                  disabled={!newComment.trim() || isSubmittingComment}
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
                >
                  <Send className="w-3 h-3" />
                  {isSubmittingComment ? "Adding..." : "Comment"}
                </Button>
              </div>
            </form>

            {Array.isArray(post.comments) && post.comments.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-semibold text-sm text-gray-700 flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Comments ({post.comments.length})
                </h4>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {post.comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="bg-white rounded-lg p-4 shadow-sm border border-gray-200"
                    >
                      <div className="flex items-start space-x-3">
                        {/* Avatar Circle with First Letter */}
                        <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm shrink-0">
                          {comment.content.charAt(0).toUpperCase()}
                        </div>

                        {/* Content + Timestamp */}
                        <div className="flex flex-col">
                          <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
                            {comment.content}
                          </p>
                          <span className="text-xs text-muted-foreground mt-1">
                            {formatDate(comment.createdAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
