// app/api/og/route.tsx
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Get dynamic parameters
    const title = searchParams.get("title") || "Pathgurus Course";
    const subtitle = searchParams.get("subtitle") || "";
    const type = searchParams.get("type") || "course";
    const level = searchParams.get("level") || "";

    // Create color theme based on course level
    let bgColor = "#1a365d"; // Default blue
    let accentColor = "#4299e1";

    if (level === "beginner") {
      bgColor = "#276749"; // Green
      accentColor = "#68d391";
    } else if (level === "intermediate") {
      bgColor = "#744210"; // Yellow
      accentColor = "#ecc94b";
    } else if (level === "advanced") {
      bgColor = "#742a2a"; // Red
      accentColor = "#fc8181";
    }

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: bgColor,
            backgroundImage: `radial-gradient(circle at 25px 25px, ${accentColor}15 2%, transparent 0%), radial-gradient(circle at 75px 75px, ${accentColor}15 2%, transparent 0%)`,
            backgroundSize: "100px 100px",
            fontFamily: "Inter",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "40px",
            }}
          >
            <svg width="120" height="120" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 17L12 22L22 17"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 12L12 17L22 12"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div
              style={{
                fontSize: 60,
                fontWeight: "bold",
                background: "white",
                backgroundClip: "text",
                color: "transparent",
                marginLeft: "20px",
              }}
            >
              Pathgurus
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0,0,0,0.6)",
              borderRadius: "20px",
              padding: "40px 60px",
              maxWidth: "80%",
            }}
          >
            {level && type === "course" && (
              <div
                style={{
                  fontSize: 24,
                  color: accentColor,
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: "10px",
                }}
              >
                {level} LEVEL
              </div>
            )}

            <div
              style={{
                fontSize: 50,
                fontWeight: "bold",
                textAlign: "center",
                maxWidth: "700px",
                color: "white",
                lineHeight: 1.3,
              }}
            >
              {title}
            </div>

            {subtitle && (
              <div
                style={{
                  fontSize: 30,
                  color: "#f7fafc",
                  textAlign: "center",
                  marginTop: "20px",
                  maxWidth: "700px",
                  opacity: 0.9,
                }}
              >
                {subtitle}
              </div>
            )}

            {type === "lesson" && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "30px",
                  padding: "10px 20px",
                  backgroundColor: accentColor,
                  borderRadius: "30px",
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 3L19 12L5 21V3Z"
                    fill="rgba(0,0,0,0.7)"
                    stroke="rgba(0,0,0,0.7)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span
                  style={{
                    marginLeft: "10px",
                    color: "rgba(0,0,0,0.8)",
                    fontWeight: "bold",
                  }}
                >
                  LESSON
                </span>
              </div>
            )}
          </div>

          <div
            style={{
              position: "absolute",
              bottom: "30px",
              display: "flex",
              alignItems: "center",
              color: "white",
              opacity: 0.8,
            }}
          >
            <span style={{ marginRight: "6px" }}>pathgurus.com</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M19 12H5M12 19L5 12L12 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span style={{ marginLeft: "6px" }}>Learn, Grow, Succeed</span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error("Error generating OG image:", error);
    return new Response("Failed to generate OG image", { status: 500 });
  }
}
