import { createClient } from "contentful";
import PostCard from "../components/PostCard";

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const res = await client.getEntries({ content_type: "web3" });

  return {
    props: {
      posts: res.items,
    },
  };
}

export default function Posts({ posts }) {
  console.log(posts);
  return (
    <div className="blog-list">
      {posts.map((post) => (
        <PostCard key={post.sys.id} post={post} />
      ))}

      <style jsx>{`
        .blog-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 20px 60px;
        }

        @media (max-width: 768px) {
          .blog-list {
            grid-template-columns: 1fr; 
          }
        }
      `}</style>
    </div>
  );
}
