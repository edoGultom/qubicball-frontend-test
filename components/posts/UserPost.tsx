import { Post } from "@/types/user.type";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";

interface UserPostProps {
    posts: Post[];
}

const UserPost: React.FC<UserPostProps> = ({ posts }) => {
    if (posts.length === 0) {
        return (
            <Card>
                <CardContent className="pt-6">
                    <p className="text-center text-muted-foreground">No posts found</p>
                </CardContent>
            </Card>
        );
    }
    return (
        <div className="space-y-4">
            {posts.map((post) => (
                <Card key={post.id}>
                    <CardHeader>
                        <div className="flex items-start justify-between">
                            <CardTitle className="text-lg">{post.title}</CardTitle>
                            <Badge variant="secondary">#{post.id}</Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{post.body}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default UserPost;