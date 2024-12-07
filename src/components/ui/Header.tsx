import Link from "next/link";
import { BookOpen, Search, Wallet } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <BookOpen className="h-6 w-6" />
          <span className="text-xl font-bold">DecentraLog</span>
        </Link>
        <div className="flex-1 max-w-sm mx-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search posts" className="pl-8" />
          </div>
        </div>
        <nav className="flex items-center space-x-4">
          <Link href="/create" className="text-sm font-medium hover:underline">
            Create Post
          </Link>
          <Button variant="outline" size="sm" className="flex items-center">
            <Wallet className="mr-2 h-4 w-4" />
            Connect Wallet
          </Button>
        </nav>
      </div>
    </header>
  );
}
