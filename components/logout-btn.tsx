"use client";
import { deleteAuthCookie } from "@/lib/auth";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();
  return (
    <Button
      className="cursor-pointer"
      onClick={async () => {
        await deleteAuthCookie();
        router.replace("/");
      }}
    >
      Logout
    </Button>
  );
}
