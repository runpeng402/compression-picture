import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  // 动态读取 ?title=xxx ?size=xxKB 等参数
  const title = searchParams.get("title") || "ExactSize Image Compressor";
  const subtitle = searchParams.get("subtitle") || "";
  const size = searchParams.get("size") || "";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
          background: "linear-gradient(to bottom right, #2563eb, #1e3a8a)",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontFamily: "sans-serif",
          padding: "40px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            marginBottom: "20px",
          }}
        >
          {title}
        </div>

        {size && (
          <div
            style={{
              fontSize: 42,
              fontWeight: 500,
              opacity: 0.9,
              marginBottom: "20px",
            }}
          >
            {size}
          </div>
        )}

        {subtitle && (
          <div
            style={{
              fontSize: 28,
              opacity: 0.9,
              maxWidth: "80%",
            }}
          >
            {subtitle}
          </div>
        )}

        <div
          style={{
            position: "absolute",
            bottom: 40,
            fontSize: 28,
            opacity: 0.9,
          }}
        >
          ExactSize · Image Compressor
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
