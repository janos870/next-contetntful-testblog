import { createClient } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Skeleton from "../../components/Skeleton";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});

export const getStaticPaths = async () => {
  const res = await client.getEntries({ content_type: "web3" });

  const paths = res.items.map((item) => {
    return {
      params: { slug: item.fields.slug },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export async function getStaticProps({ params }) {
  const { items } = await client.getEntries({
    content_type: "web3",
    "fields.slug": params.slug,
  });
  if (!items.length) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: { post: items[0] },
    revalidate: 1,
  };
}

export default function blogDetails({ post }) {
  console.log(post);
  if (!post) return <Skeleton />;
  const { feature, title, method } = post.fields;
  return (
    <div>
      <div className="banner">
        <img
          src={"https:" + feature.fields.file.url}
          width={1000}
          height={500}
          alt="post-image"
        />
        <h2>{title}</h2>
      </div>
      <div className="method">
        <h3>Method:</h3>
        <div>{documentToReactComponents(method)}</div>
      </div>

      <style jsx>{`
        h2,
        h3 {
          text-transform: uppercase;
        }
        .banner h2 {
          margin: 0;
          background: #fff;
          display: inline-block;
          padding: 20px;
          position: relative;
          top: -60px;
          left: -10px;
          transform: rotateZ(-1deg);
          box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.1);
        }

        img {
          width: 100%;
          height: auto;
        }
      `}</style>
    </div>
  );
}
