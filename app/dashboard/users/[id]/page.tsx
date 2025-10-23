import { Layout } from "@/components/layout/Layout";
import UserPost from "@/components/posts/UserPost";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserEdit from "@/components/users/UserEdit";
import { getUserById, getUserPost } from "@/services/users.service";
import { Building2, Globe, MapPin, Phone } from "lucide-react";

interface UserDetailProps {
  params: {
    id: string;
  };
}
export default async function UserDetail({ params }: UserDetailProps) {
  const [userDetail, userPost] = await Promise.all([
    getUserById(params.id),
    getUserPost(params.id),
  ]);

  if (!userDetail) {
    return (
      <Layout>
        <div className="p-6">
          <h1 className="text-xl font-semibold text-red-600">User not found</h1>
          <p className="text-muted-foreground">Please check the user ID.</p>
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {userDetail.name}
          </h1>
          <p className="text-muted-foreground mt-2">
            User details and activity
          </p>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>User Information</CardTitle>
            <CardDescription>Basic details about this user</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline">@{userDetail.username}</Badge>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <a
                  href={`https://${userDetail.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {userDetail.website}
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{userDetail.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>
                  {userDetail.address.city}, {userDetail.address.street}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <span className="font-semibold text-sm">Company</span>
              </div>
              <div className="pl-6 space-y-1">
                <p className="font-medium">{userDetail.company.name}</p>
                <p className="text-sm text-muted-foreground italic">
                  {userDetail.company.catchPhrase}
                </p>
                <p className="text-xs text-muted-foreground">
                  {userDetail.company.bs}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-2">
          <Tabs defaultValue="posts" className="space-y-4">
            <TabsList>
              <TabsTrigger value="posts">Posts List ({userPost.length})</TabsTrigger>
              <TabsTrigger value="edit">Edit Profile</TabsTrigger>
            </TabsList>

            <TabsContent value="posts" className="space-y-4">
              <UserPost posts={userPost} />
            </TabsContent>

            <TabsContent value="edit">
              <UserEdit user={userDetail} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
