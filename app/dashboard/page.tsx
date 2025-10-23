import DashboardClient from "@/components/dashboard/DashboardClient";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPosts } from "@/services/posts.service";
import { getUsers } from "@/services/users.service";
import { Building2, Mail, Users } from "lucide-react";

export const dynamic = "force-dynamic"; // page ini selalu SSR

export default async function DashboardPage() {
  const [users, posts] = await Promise.all([
    getUsers(),
    getPosts()
  ]);
  const countCompanies = new Set(users.map((u) => u.company.name)).size;
  const countDimains = new Set(users.map((u) => u.email.split("@")[1])).size;
  const stats = {
    totalUsers: users.length,
    companies: countCompanies,
    domains: countDimains,
  };
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Manage and view all users in the system
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">
                Active user accounts
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Companies</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.companies}</div>
              <p className="text-xs text-muted-foreground">
                Unique organizations
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Email Domains
              </CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.domains}</div>
              <p className="text-xs text-muted-foreground">
                Different email providers
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Client-side */}
        <DashboardClient users={users} posts={posts} />
      </div>
    </Layout>
  );
}
