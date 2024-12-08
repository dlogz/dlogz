"use server";
import { blogSchema, blogStatsSchema, userSchema } from "@/true-network/schema";
import { getTrueNetworkInstance } from "@/true-network/true.config";

export async function attestBlog(
  walletAddress: string,
  blogData: {
    blog_id: number;
    blog_title: number;
    blog_content: number;
    blog_author: number;
  }
) {
  try {
    const api = await getTrueNetworkInstance();
    const blogOutput = await blogSchema.attest(api, walletAddress, blogData);
    await api.network.disconnect();
    return { success: true, data: blogOutput };
  } catch (error) {
    console.error("Error attesting blog:", error);
    return { success: false, error: "Failed to attest blog" };
  }
}

export async function attestUser(
  walletAddress: string,
  userData: {
    user_trust_score: number;
    user_blogs: number;
  }
) {
  try {
    const api = await getTrueNetworkInstance();
    const userOutput = await userSchema.attest(api, walletAddress, userData);
    await api.network.disconnect();
    return { success: true, data: userOutput };
  } catch (error) {
    console.error("Error attesting user:", error);
    return { success: false, error: "Failed to attest user" };
  }
}

export async function attestBlogStats(
  walletAddress: string,
  blogStats: {
    upvote: number;
    downvote: number;
    rating: number;
    accuracy: number;
    helpfullness: number;
  }
) {
  try {
    const api = await getTrueNetworkInstance();
    const userOutput = await blogStatsSchema.attest(
      api,
      walletAddress,
      blogStats
    );
    await api.network.disconnect();
    return { success: true, data: userOutput };
  } catch (error) {
    console.error("Error attesting user:", error);
    return { success: false, error: "Failed to attest user" };
  }
}
