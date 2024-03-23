import { useQuery } from "@tanstack/react-query";
import { fetchComments } from "./api";
import "./PostDetail.css";

export function PostDetail({ post, deletePost, updateMutaion }) {
  const { id } = post;
  const { isLoading, data } = useQuery({
    queryKey: ["post-comment", id],
    queryFn: () => fetchComments(id),
  });

  if (isLoading) {
    return <>loading......</>;
  }

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button onClick={() => deletePost.mutate(id)}>Delete</button>
      {deletePost.isPending && <div className="loading">Delete to Post</div>}
      {deletePost.isSuccess && (
        <div className="success">Post was (not) deleted</div>
      )}
      <button onClick={() => updateMutaion.mutate(id)}>Update title</button>
      {updateMutaion.isPending && <div className="loading">Delete to Post</div>}
      {updateMutaion.isSuccess && (
        <div className="success">Post was (not) deleted</div>
      )}

      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
