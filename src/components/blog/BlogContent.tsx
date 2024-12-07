"use client";

import { useGetBlog } from "@/src/hooks/useGetBlog";
import { Skeleton } from "../ui/skeleton";
import {
  useGetUserBlog,
  useGetUserContract,
} from "@/src/hooks/useGetUserContract";
import { MdPreview } from "../ui/MdPreview";
import { ThumbsUp, ThumbsDown, Eye, Award, Star, Share2 } from "lucide-react";
import { Badge } from "../ui/badge";
import { motion } from "framer-motion";

const MOCK_ATTESTATIONS = {
  upvotes: 124,
  downvotes: 8,
  views: 1205,
  rating: 4.8,
  attestations: [
    {
      type: "Technical Accuracy",
      count: 45,
      icon: Award,
    },
    {
      type: "Helpful",
      count: 89,
      icon: Star,
    },
  ],
};

interface BlogContentProps {
  slug: string;
}

export const BlogContent = ({ slug }: BlogContentProps) => {
  const { data: userContract } = useGetUserContract();
  const { data: userBlog } = useGetUserBlog(userContract || "", slug);
  const { data: blog, isLoading, error } = useGetBlog(userBlog?.blobId || "");

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto mt-8 space-y-4">
        <Skeleton className="h-12 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    );
  }

  if (error || !userBlog) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto mt-8 text-center"
      >
        <h1 className="text-2xl font-bold text-red-500">Error loading blog</h1>
        <p className="">Please try again later</p>
      </motion.div>
    );
  }

  if (!blog) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto mt-8 text-center"
      >
        <h1 className="text-2xl font-bold">Blog not found</h1>
      </motion.div>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto mt-8 px-4"
    >
      <header className="mb-8">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
        >
          {blog.title}
        </motion.h1>
        <div className="flex flex-col space-y-4">
          <motion.time
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className=""
          >
            {new Date(blog.timestamp).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </motion.time>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-4 items-center"
          >
            <div className="flex items-center space-x-4 p-3  rounded-lg">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-1 cursor-pointer hover:text-green-600 transition-colors"
              >
                <ThumbsUp className="h-5 w-5" />
                <span>{MOCK_ATTESTATIONS.upvotes}</span>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-1 cursor-pointer hover:text-red-600 transition-colors"
              >
                <ThumbsDown className="h-5 w-5" />
                <span>{MOCK_ATTESTATIONS.downvotes}</span>
              </motion.div>

              <div className="flex items-center space-x-1 ">
                <Eye className="h-5 w-5" />
                <span>{MOCK_ATTESTATIONS.views}</span>
              </div>

              <div className="flex items-center space-x-1 text-yellow-500">
                <Star className="h-5 w-5 fill-yellow-400" />
                <span>{MOCK_ATTESTATIONS.rating}</span>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="ml-auto flex items-center space-x-1  hover:text-blue-600 transition-colors"
              >
                <Share2 className="h-5 w-5" />
                <span>Share</span>
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-2"
          >
            {MOCK_ATTESTATIONS.attestations.map((attestation, index) => {
              const IconComponent = attestation.icon;
              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Badge
                    variant="outline"
                    className="px-3 py-1  flex items-center gap-1 cursor-pointer hover:text-opacity-90 transition-colors"
                  >
                    <IconComponent className="h-4 w-4" />
                    {attestation.type}
                    <span className="ml-1 ">{attestation.count}</span>
                  </Badge>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </header>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="prose prose-lg max-w-none prose-headings: prose-p: prose-a:text-blue-600"
      >
        <MdPreview>{blog.content}</MdPreview>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-8 p-4 bg-yellow-50 rounded-lg text-sm text-yellow-800 border border-yellow-200"
      >
        <p className="font-semibold">Development Note:</p>
        <p>
          Currently showing mock engagement data. Upvotes, ratings, and
          attestations will be implemented using True Network attestation
          service.
        </p>
      </motion.div>
    </motion.article>
  );
};