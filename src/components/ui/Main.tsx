import { ThumbsUp, MessageSquare, ArrowUpRight } from "lucide-react";
import React from "react";
import { Button } from "./button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./card";
import Link from "next/link";

function Layout() {
  return (
    <main className="flex-1 container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {[1, 2, 3].map((post) => (
            <Card key={post}>
              <CardHeader>
                <CardTitle>
                  <Link href={`/post/${post}`} className="hover:underline">
                    Decentralized Finance: The Future of Banking
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Explore how DeFi is revolutionizing traditional financial
                  systems and what it means for the future of money.
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex space-x-4 text-sm text-muted-foreground">
                  <span className="flex items-center">
                    <ThumbsUp className="mr-1 h-4 w-4" />
                    1.2k
                  </span>
                  <span className="flex items-center">
                    <MessageSquare className="mr-1 h-4 w-4" />
                    36
                  </span>
                </div>
                <Button variant="ghost" size="sm">
                  Read More
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Trending Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {[
                  "Web3 Explained",
                  "NFTs: Beyond Art",
                  "Blockchain Scalability",
                ].map((title, index) => (
                  <li key={index}>
                    <Link href="#" className="text-sm hover:underline">
                      {title}
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Popular Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {["#blockchain", "#crypto", "#web3", "#defi", "#nft"].map(
                  (tag) => (
                    <Button key={tag} variant="secondary" size="sm">
                      {tag}
                    </Button>
                  )
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

export default Layout;
