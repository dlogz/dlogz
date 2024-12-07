"use client";

import Md from "@/src/components/ui/Md";
import { useRouter } from "next/navigation";
import { useCreateBlog } from "@/src/hooks/useCreateBlog";

function Page() {
  const router = useRouter();
  const { createBlog } = useCreateBlog(() => router.push("/blogs"));

  return (
    <div className="min-h-screen p-6">
      <Md onPublish={createBlog} onClose={() => router.push("/blogs")} />
    </div>
  );
}

export default Page;
