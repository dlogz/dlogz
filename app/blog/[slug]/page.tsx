import { BlogContent } from "@/src/components/blog/BlogContent";


export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug
  return (
    <main className="container mx-auto py-8">
      <BlogContent slug={slug} />
    </main>
  );
}
