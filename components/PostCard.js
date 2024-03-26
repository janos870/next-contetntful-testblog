import Link from "next/link";

export default function PostCard({ post }) {
  const { title, slug, thumbneil } = post.fields;
  return (
    <div className="card">
      <div className="featured">
        <img
          src={"https:" + thumbneil.fields.file.url}
          width={550}
          height={400}
          alt="post-image"
          className="post-image"
        />
      </div>
      <div className="content">
        <div className="info">
          <h4>{title}</h4>
        </div>
        <div className="actions">
          <Link
            style={{
              background: "#f01b29",
              textDecoration: "none",
              color: "white",
              padding: "5px",
              borderTopLeftRadius: "10px",
            }}
            href={"/blog/" + slug}
          >
            <>Post Detail</>
          </Link>
        </div>
      </div>
      <style jsx>{`
        .card {
          transform: rotateZ(-1deg);
          width: 100%;
          margin: auto,
        }
        .content {
          background: #fff;
          box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.1);
          margin: 0;
          position: relative;
          top: -40px;
          left: -10px;
        }
        .info {
          padding: 5px;
        }
        .info h4 {
          margin: 4px 0;
          text-transform: uppercase;
        }
        .actions {
          margin-top: 20px;
          display: flex;
          justify-content: flex-end;
        }
        .post-image {
          width: auto;
        }
        @media (max-width: 768px) {
          .post-image {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
