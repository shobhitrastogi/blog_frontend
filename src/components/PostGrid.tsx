import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Post {
  _id: string;
  title: string;
  content: string;
  author: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
}

export const PostGrid = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [posts, setPosts] = useState<Post[]>([]);
  const [user, setUser] = useState<{ id: string; name: string } | null>(null);

  // Fetch user details from localStorage
  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  // Fetch posts from backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://blog-backend-kjbu.onrender.com/api/posts");
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message || "Failed to fetch posts",
        });
      }
    };

    fetchPosts();
  }, [toast]);

  // Handle post deletion
  const handleDelete = async (postId: string) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:5000/api/posts/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to delete post");
      }

      setPosts(posts.filter((post) => post._id !== postId));
      toast({
        title: "Success",
        description: "Post deleted successfully!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "An error occurred while deleting the post",
      });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <Card key={post._id} className="post-card shadow-lg rounded-lg p-4">
          <CardHeader>
            <CardTitle className="line-clamp-2 text-lg font-bold">{post.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground line-clamp-3">{post.content}</p>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-muted-foreground w-full">
              By {post.author.name} • {new Date(post.createdAt).toLocaleDateString()}
            </div>
            <div className="flex justify-end gap-2 w-full">
              <Button
                variant="secondary"
                onClick={() => navigate(`/blog/${post._id}`)}
              >
                View Details
              </Button>
              {user && user.id === post.author._id && (
                <>
                  <Button
                    variant="outline"
                    onClick={() => navigate(`/edit/${post._id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(post._id)}
                  >
                    Delete
                  </Button>
                </>
              )}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
