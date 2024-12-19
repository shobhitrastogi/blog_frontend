import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

interface Post {
  _id: string;
  title: string;
  content: string;
  author: {
    name: string;
    email: string;
  };
  createdAt: string;
}

export const BlogDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`https://blog-backend-kjbu.onrender.com/api/posts/${id}`);
        if (response.ok) {
          const data = await response.json();
          setPost(data);
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to fetch post details.",
          });
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "An error occurred while fetching post details.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id, toast]);

  if (isLoading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!post) {
    return (
      <div className="text-center mt-10 text-red-500">Post not found.</div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{post.title}</CardTitle>
          <p className="text-muted-foreground">
            By {post.author.name} • {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </CardHeader>
        <CardContent>
          <p className="text-lg">{post.content}</p>
        </CardContent>
      </Card>
      <div className="mt-4">
        <Button variant="outline" onClick={() => window.history.back()}>
          Go Back
        </Button>
      </div>
    </div>
  );
};
