"use client";

import { useGetBlog } from "@/src/hooks/useGetBlog";
import { Skeleton } from "../ui/skeleton";
import {
  useGetAgentAddress,
  useGetUserBlog,
  useGetUserContract,
} from "@/src/hooks/useGetUserContract";

import {
  ThumbsUp,
  ThumbsDown,
  Eye,
  Award,
  Star,
  Share2,
  Clock,
  Book,
  Hash,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { usePublishBlog } from "@/src/hooks/usePublishBlog";
import { Loader2 } from "lucide-react";
import PromiseButton from "../ui/PromiseButton";
import { useUpdateMeta } from "@/src/hooks/useUpdateMeta";
import dynamic from "next/dynamic";
const MdPreview = dynamic(
  () => import("@uiw/react-markdown-preview").then((mod) => mod.default),
  { ssr: false }
);

const MOCK_ATTESTATIONS = {
  upvotes: 124,
  downvotes: 8,
  views: 1205,
  rating: 4.8,
  attestations: [
    {
      type: "Accuracy",
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
  const { publishBlog, isPublishing } = usePublishBlog();
  const { data: agentAddress } = useGetAgentAddress(userContract || "");
  const { updateMeta, isUpdating } = useUpdateMeta();

  console.log(userBlog, "Blog", agentAddress, "Agent Address");

  const handlePublish = async () => {
    if (userContract && slug) {
      await publishBlog(slug);
    }
  };

  const handleUpdateMeta = async () => {
    if (userContract && slug) {
      await updateMeta(slug);
    }
  };

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

  if (!userContract) {
    return (
      <div className="mx-auto mt-8 text-center flex flex-col items-center justify-center">
        <p className="text-2xl font-bold">Please connect your wallet</p>
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
        {blog.thumbnail && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-6 rounded-lg overflow-hidden"
          >
            <img
              src={blog.thumbnail}
              alt={`Thumbnail for ${blog.title}`}
              className="w-full h-[400px] object-cover"
            />
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-900 to-green-600 bg-clip-text text-transparent"
        >
          {blog.title}
        </motion.h1>
        <div className="flex flex-col space-y-4">
          <motion.time
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-between"
          >
            {new Date(blog.timestamp).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </motion.time>
          {!userBlog?.isPublished && userContract && (
            <Button
              onClick={handlePublish}
              disabled={isPublishing}
              variant="outline"
              className="ml-2"
            >
              {isPublishing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Publishing...
                </>
              ) : (
                "Publish"
              )}
            </Button>
          )}
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

          <div className="flex flex-row gap-4">
            <p className="text-sm text-gray-500">
              AI Metrics (Powered by Coinbase AI Agent)
            </p>
            <div className="flex items-center space-x-1">
              <Clock className="h-5 w-5" />
              <span>{userBlog.estimatedReadTime.toString()} min</span>
            </div>

            <div className="flex items-center space-x-1">
              <Book className="h-5 w-5" />
              <span>{userBlog.readabilityScore.toString()}/100</span>
            </div>

            <div className="flex items-center space-x-1">
              <Hash className="h-5 w-5" />
              <span>
                {userBlog.blobHash.slice(0, 6)}...{userBlog.blobHash.slice(-6)}
              </span>
            </div>
          </div>

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
            {[...userBlog?.tags, "D-Blog"].map((tag, index) => {
              return (
                <Badge className="h-6 text-xs" key={index}>
                  {tag}
                </Badge>
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
        <MdPreview className={"p-4 rounded"} source={blog.content} />
      </motion.div>

      {/* <motion.div
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
      </motion.div> */}

      <div className="pt-10 flex flex-row justify-end">
        <PromiseButton
          className=""
          onClick={handleUpdateMeta}
          disabled={isUpdating}
        >
          Reset Meta (Dev Mode)
        </PromiseButton>
      </div>
    </motion.article>
  );
};
