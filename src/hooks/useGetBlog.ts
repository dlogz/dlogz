import { useQuery } from "@tanstack/react-query";

interface BlogData {
  title: string;
  content: string;
  timestamp: string;
  thumbnail: string;
  heading: string;
}

export const useGetBlog = (slug: string) => {
  return useQuery({
    queryKey: ["blog", slug],
    queryFn: async (): Promise<BlogData> => {
      const response = await fetch(
        `https://aggregator.walrus-testnet.walrus.space/v1/${slug}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch blog data");
      }

      const data = await response.text();
      return JSON.parse(data) as BlogData;
    },
    enabled: !!slug,
    retry: false,
  });
};
