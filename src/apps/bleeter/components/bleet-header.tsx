import { useState } from "react";
import { BadgeCheck, Flag, MoreHorizontal, Trash2, UserPlus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogOverlay
} from "@/components/ui/alert-dialog"

interface Bleet {
  handle: string;
  name: string;
  verified?: boolean;
  time: string;
  ad?: boolean;
}

interface BleetHeaderProps {
  bleet: Bleet;
}

export function BleetHeader({ bleet }: BleetHeaderProps) {
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);

  return (
    <div className="flex justify-between w-full">
      <div className="flex items-center">
        <a className="text-base font-medium hover:underline" href={bleet.handle}>
          {bleet.name}
        </a>
        {bleet.verified && (
          <BadgeCheck fill="#60a5fa" className="w-5 h-5 ml-1 text-background" strokeWidth={2} />
        )}
        <p className="ml-1 text-sm text-gray-400">
          {bleet.handle} · {bleet.time}
        </p>
      </div>
      {bleet.ad && <p className="text-sm text-gray-400">Ad</p>}
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="text-gray-400">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mt-2 min-w-48" align="start" side="left" >
          <DropdownMenuItem onClick={() => setAlertDialogOpen(true)} className="space-x-2">
            <Trash2 className="w-3 h-3" />
            <span className="text-xs">Remove post</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="space-x-2">
            <UserPlus className="w-3 h-3" />
            <span className="text-xs">Follow {bleet.handle}</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="space-x-2">
            <Flag className="w-3 h-3" />
            <span className="text-xs">Report post</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={alertDialogOpen} onOpenChange={setAlertDialogOpen}>
        <AlertDialogOverlay className="rounded-[3.5rem]" />
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently the post from your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setAlertDialogOpen(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
