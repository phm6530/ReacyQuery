import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { fetchPosts, deletePost, updatePost } from "./api";
import { PostDetail } from "./PostDetail";
const maxPostPage = 10;

export function Posts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);

  const deleteMutaion = useMutation({
    mutationFn: (postId) => deletePost(postId),
  });

  const updateMutaion = useMutation({
    mutationFn: (postId) => updatePost(postId),
  });

  console.log(deleteMutaion.isPending);

  // replace with useQuery
  const queryclient = useQueryClient();

  useEffect(() => {
    const nextpage = currentPage + 1;
    queryclient.prefetchQuery({
      queryKey: ["post", nextpage],
      queryFn: () => fetchPosts(nextpage),
    });
  }, [currentPage, queryclient]);

  const { data, isLoading } = useQuery({
    queryKey: ["post", currentPage],
    queryFn: () => fetchPosts(currentPage),
    staleTime: 10000,
  });

  // const { data } = useQuery("posts", fetchPosts);
  // console.log(data);
  if (isLoading) {
    return <div>Loading ....</div>;
  }
  return (
    <>
      <ul>
        {data.map((post) => {
          // console.log(post);
          return (
            <li
              key={post.id}
              className="post-title"
              onClick={() => {
                deleteMutaion.reset();
                updateMutaion.reset();
                setSelectedPost(post);
              }}
            >
              {post.title}
            </li>
          );
        })}
      </ul>
      <div className="pages">
        <button
          disabled={currentPage <= 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Previous page
        </button>
        <span>Page {currentPage}</span>
        <button onClick={() => setCurrentPage((prev) => prev + 1)}>
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && (
        <PostDetail
          post={selectedPost}
          deletePost={deleteMutaion}
          updateMutaion={updateMutaion}
        />
      )}
    </>
  );
}
