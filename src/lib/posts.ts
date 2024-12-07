export interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export const savePosts = (posts: Post[]) => {
  localStorage.setItem("blog-posts", JSON.stringify(posts));
};

export const getPosts = (): Post[] => {
  if (typeof window === "undefined") return [];
  const posts = localStorage.getItem("blog-posts");
  return posts ? JSON.parse(posts) : [];
};

export const createPost = (title: string, content: string): Post => {
  const posts = getPosts();
  const newPost = {
    id: Date.now().toString(),
    title,
    content,
    createdAt: new Date().toISOString(),
  };

  posts.unshift(newPost);
  savePosts(posts);
  return newPost;
};
