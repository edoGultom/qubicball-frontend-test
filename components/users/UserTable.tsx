"use client";

import { User } from "@/types/user.type";
import { ArrowUpDown, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

interface UserTableProps {
  users: User[];
}

type SortField = "name" | "email" | "username" | "company";
type SortDirection = "asc" | "desc";

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const handleSort = useCallback(
    (field: SortField) => {
      if (sortField === field) {
        setSortDirection(sortDirection === "asc" ? "desc" : "asc");
      } else {
        setSortField(field);
        setSortDirection("asc");
      }
    },
    [sortField, sortDirection]
  );

  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) => {
      let aValue: string;
      let bValue: string;

      if (sortField === "company") {
        aValue = a.company?.name?.toLowerCase?.() ?? "";
        bValue = b.company?.name?.toLowerCase?.() ?? "";
      } else {
        aValue = a[sortField]?.toLowerCase?.() ?? "";
        bValue = b[sortField]?.toLowerCase?.() ?? "";
      }

      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [users, sortField, sortDirection]);

  const SortButton = useCallback(
    ({ field, children }: { field: SortField; children: React.ReactNode }) => (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleSort(field)}
        className="font-semibold"
      >
        {children}
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    [handleSort]
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Users ({users.length} total)</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <SortButton field="name">Name</SortButton>
                </TableHead>
                <TableHead>
                  <SortButton field="username">Username</SortButton>
                </TableHead>
                <TableHead>
                  <SortButton field="email">Email</SortButton>
                </TableHead>
                <TableHead>
                  <SortButton field="company">Company</SortButton>
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {sortedUsers.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center text-muted-foreground"
                  >
                    No users found
                  </TableCell>
                </TableRow>
              ) : (
                sortedUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.company?.name ?? "N/A"}</TableCell>
                    <TableCell className="text-right">
                      <Link href={`/dashboard/users/${user.id}`}>
                        <Button variant="ghost" size="sm">
                          View
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserTable;
