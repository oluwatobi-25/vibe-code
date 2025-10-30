import Image from "next/image";
import { Button } from "@/components/ui/button"
import { db } from "@/lib/db";
import UserButton from "@/features/auth/components/user-button";

export default async function Home() {

  const user = db.user
  return (
     <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Button>Click me</Button>
      <UserButton/>
    </div>

  );
}
