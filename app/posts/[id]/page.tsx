import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/src/components/ui/card";
import { Textarea } from "@/src/components/ui/textarea";
import { MessageSquare, ThumbsUp } from "lucide-react";
import Link from "next/link";

export default async function Page({
}: {
  params: Promise<{ id: string }>
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl">
                  Decentralized Finance: The Future of Banking
                </CardTitle>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Link href="#" className="hover:underline">
                    @author
                  </Link>
                  <span>•</span>
                  <span>Posted 2 days ago</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Decentralized Finance, or DeFi, is revolutionizing the way we
                  think about banking and financial services. By leveraging
                  blockchain technology, DeFi platforms are creating open,
                  transparent, and accessible financial systems that operate
                  without central authorities.
                </p>
                <p className="mb-4">
                  One of the key advantages of DeFi is its potential to provide
                  financial services to the unbanked and underbanked populations
                  around the world. With just an internet connection and a
                  smartphone, anyone can access a wide range of financial
                  services, from savings accounts to loans and insurance.
                </p>
                <p>
                  However, DeFi is not without its challenges. Regulatory
                  uncertainty, smart contract vulnerabilities, and the
                  complexity of some DeFi protocols are all hurdles that need to
                  be addressed as the ecosystem matures.
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex space-x-4 text-sm text-muted-foreground">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center"
                  >
                    <ThumbsUp className="mr-1 h-4 w-4" />
                    1.2k
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center"
                  >
                    <MessageSquare className="mr-1 h-4 w-4" />
                    36
                  </Button>
                </div>
                <Button variant="secondary" size="sm">
                  Tip Author
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Comments</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea placeholder="Share your thoughts..." />
                <Button className="mt-2">Post Comment</Button>
                <div className="mt-6 space-y-4">
                  {[1, 2].map((comment) => (
                    <div key={comment} className="border-t pt-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <Link
                            href="#"
                            className="font-semibold hover:underline"
                          >
                            @user{comment}
                          </Link>
                          <p className="text-sm text-muted-foreground">
                            Posted 1 day ago
                          </p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <ThumbsUp className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="mt-2">
                        This is a great article! I learned a lot about DeFi and
                        its potential impact.
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About the Author</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  John Doe is a blockchain enthusiast and DeFi researcher with
                  over 5 years of experience in the crypto space.
                </p>
                <Button variant="outline" className="w-full mt-4">
                  Follow
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Related Posts</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    "Understanding Yield Farming",
                    "The Rise of DEXs",
                    "Stablecoins Explained",
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
          </div>
        </div>
      </main>
    </div>
  );
}
