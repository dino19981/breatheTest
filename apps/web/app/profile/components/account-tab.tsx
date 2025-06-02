import { Card, CardContent } from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import { Badge } from "@workspace/ui/components/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import { ChevronRight, Info, LogOut, Pencil, Settings } from "lucide-react";

interface User {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

interface AccountTabProps {
  user: User | null;
  onLogout: () => void;
}

export function AccountTab({ user, onLogout }: AccountTabProps) {
  if (!user) {
    return null;
  }

  return (
    <Card>
      <CardContent className="px-6 pb-6">
        {/* User Profile Section */}
        <div className="mb-6 flex flex-col items-center">
          <div className="relative group mb-4">
            <Avatar className="h-32 w-32 border-2 border-primary/20 shadow-sm">
              <AvatarImage src={user.photoURL || ""} />
              <AvatarFallback className="text-3xl font-semibold bg-primary/10">
                {user.displayName?.[0] || "U"}
              </AvatarFallback>
            </Avatar>
            <Button
              size="icon"
              variant="outline"
              className="absolute -bottom-2 -right-2 h-9 w-9 rounded-full bg-background shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-1">{user.displayName}</h3>
            <p className="text-sm text-muted-foreground mb-2">{user.email}</p>
            <Badge variant="secondary" className="text-xs">
              Member since 2024
            </Badge>
          </div>
        </div>

        {/* Account Actions */}
        <div className="space-y-0">
          <Button variant="ghost" className="w-full justify-between h-12">
            <span className="flex items-center gap-2">
              <Pencil className="h-4 w-4" />
              Edit Profile
            </span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="ghost" className="w-full justify-between h-12">
            <span className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Change Password
            </span>
            <ChevronRight className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-between h-12 text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <span className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              Reset Progress
            </span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-between h-12 text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <span className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              Delete Account
            </span>
            <ChevronRight className="h-4 w-4" />
          </Button>

          <div className="pt-2">
            <Button
              variant="outline"
              className="w-full h-12 gap-2"
              onClick={onLogout}
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
