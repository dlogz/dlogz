import { Schema, U32, U64 } from "@truenetworkio/sdk/dist";

export const userSchema = Schema.create({
  user_trust_score: U32,
  user_blogs: U64,
});

export const blogSchema = Schema.create({
  blog_id: U32,
  blog_title: U32,
  blog_content: U32,
  blog_author: U32,
});

export const blogStatsSchema = Schema.create({
  upvote: U32,
  downvote: U32,
  rating: U32,
  accuracy: U32,
  helpfullness: U32,
});
