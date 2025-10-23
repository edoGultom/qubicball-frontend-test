"use client"
import { UserFormData } from "@/schemas/user.schema";
import { User } from "@/types/user.type";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { FormField } from "../form/FormField";
import { Button } from "../ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { updateUser } from "@/services/users.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface UserEditFormProps {
    user: User;
}

const UserEdit: React.FC<UserEditFormProps> = ({ user }) => {
    const router = useRouter();
    const {
        register: formField,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<UserFormData>({
        defaultValues: {
            name: user.name,
            email: user.email,
            phone: user.phone,
            company: {
                name: user.company?.name || '',
            },
        },
    });
    const onSubmit = async (data: UserFormData) => {
        const updated = await updateUser(user.id, data);
        if (updated) {
            toast.success("User updated successfully!");
            router.refresh()
        } else {
            toast.error("Failed to update user");
        }
    };
    return (
        <Card>
            <CardHeader>
                <CardTitle>Edit User Information</CardTitle>
                <CardDescription>
                    Update user details. Changes will be validated before saving.
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <FormField
                            label="Name"
                            type="text"
                            placeholder="Please insert name"
                            registration={formField("name")}
                            error={errors.name}
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="space-y-2">
                        <FormField
                            label="Email"
                            type="text"
                            placeholder="Please insert email"
                            registration={formField("email")}
                            error={errors.email}
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="space-y-2">
                        <FormField
                            label="Phone"
                            type="text"
                            placeholder="Please insert phone"
                            registration={formField("phone")}
                            error={errors.phone}
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="space-y-2">
                        <FormField
                            label="Company Name"
                            type="text"
                            placeholder="Please insert a company name"
                            registration={formField("company.name")}
                            error={errors.company?.name}
                            disabled={isSubmitting}
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            "Save Changes"
                        )}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
};

export default UserEdit;
