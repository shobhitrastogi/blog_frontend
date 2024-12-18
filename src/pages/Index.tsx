import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { PostGrid } from "@/components/PostGrid";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Latest Posts</h1>
        <Button onClick={() => navigate("/create")} size="lg">
          Create Post
        </Button>
      </div>
      <PostGrid />
    </div>
  );
};

export default Index;