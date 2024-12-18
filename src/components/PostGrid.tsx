import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

// Temporary mock data until we connect to backend
const posts = [
  {
    id: 1,
    title: "Getting Started with MERN Stack",
    excerpt: "Learn how to build full-stack applications with MongoDB, Express, React, and Node.js",
    author: "John Doe",
    date: "2024-02-20"
  },
  {
    id: 2,
    title: "Advanced React Patterns",
    excerpt: "Discover advanced patterns and techniques to improve your React applications",
    author: "Jane Smith",
    date: "2024-02-19"
  },
  {
    id: 3,
    title: "MongoDB Best Practices",
    excerpt: "Essential tips and tricks for working with MongoDB in production",
    author: "Mike Johnson",
    date: "2024-02-18"
  }
];

export const PostGrid = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <Card key={post.id} className="post-card">
          <CardHeader>
            <CardTitle className="line-clamp-2">{post.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-muted-foreground">
              By {post.author} • {new Date(post.date).toLocaleDateString()}
            </div>
            <Button variant="outline" onClick={() => navigate(`/post/${post.id}`)}>
              Read More
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};