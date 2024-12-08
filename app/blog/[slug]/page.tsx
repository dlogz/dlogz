import { BlogContent } from "@/src/components/blog/BlogContent";

interface BlogPageProps {
  params: {
    slug: string;
  };
}

export default function BlogPage({ params }: BlogPageProps) {
  return (
    <main className="container mx-auto py-8">
      <BlogContent slug={params.slug} />
    </main>
  );
}
