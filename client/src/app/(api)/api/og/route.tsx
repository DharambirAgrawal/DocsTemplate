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
    // Using Tailwind color palette
    let bgColor = "#1d4ed8"; // blue-700 as primary default
    let accentColor = "#3b82f6"; // blue-500

    if (level === "beginner") {
      bgColor = "#15803d"; // green-700
      accentColor = "#22c55e"; // green-500
    } else if (level === "intermediate") {
      bgColor = "#b45309"; // amber-700
      accentColor = "#f59e0b"; // amber-500
    } else if (level === "advanced") {
      bgColor = "#b91c1c"; // red-700
      accentColor = "#ef4444"; // red-500
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
            backgroundImage: `radial-gradient(circle at 25px 25px, ${accentColor}30 4%, transparent 0%),
               radial-gradient(circle at 75px 75px, ${accentColor}40 4%, transparent 0%)`,
            backgroundSize: "100px 100px",
            fontFamily: "Inter",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Enhanced abstract shapes in background */}
          <div
            style={{
              position: "absolute",
              width: "800px",
              height: "800px",
              borderRadius: "50%",
              background: `${accentColor}40`,
              top: "-350px",
              right: "-150px",
              zIndex: 0,
              filter: "blur(2px)",
            }}
          />

          <div
            style={{
              position: "absolute",
              width: "600px",
              height: "600px",
              borderRadius: "50%",
              background: `${accentColor}30`,
              bottom: "-250px",
              left: "-150px",
              zIndex: 0,
              filter: "blur(2px)",
            }}
          />

          {/* Additional decorative elements */}
          <div
            style={{
              position: "absolute",
              width: "400px",
              height: "400px",
              borderRadius: "50%",
              border: `15px solid ${accentColor}25`,
              right: "50px",
              bottom: "100px",
              zIndex: 0,
            }}
          />

          <div
            style={{
              position: "absolute",
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              background: `${accentColor}20`,
              left: "100px",
              top: "80px",
              zIndex: 0,
            }}
          />

          {/* Diagonal stripes */}
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              background: `repeating-linear-gradient(45deg, ${accentColor}10, ${accentColor}10 10px, transparent 10px, transparent 50px)`,
              zIndex: 0,
              opacity: "0.4",
            }}
          />

          {/* Logo and branding - BIGGER */}
          <div
            style={{
              position: "absolute",
              top: "40px",
              left: "40px",
              display: "flex",
              alignItems: "center",
              zIndex: 5,
            }}
          >
            <img
              src={`${process.env.CLIENT_BASE_URL}/icons/logo.png`}
              width="80"
              height="80"
              alt="Logo"
            />
            <div
              style={{
                fontSize: 48,
                fontWeight: "bold",
                color: "white",
                marginLeft: "20px",
                textShadow: "0 2px 10px rgba(0,0,0,0.3)",
              }}
            >
              Pathgurus
            </div>
          </div>

          {/* Main content - enhanced */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 5,
              width: "90%",
              maxWidth: "900px",
              background: `linear-gradient(135deg, ${accentColor}40, ${accentColor}20)`,
              backdropFilter: "blur(8px)",
              padding: "40px",
              borderRadius: "24px",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
              border: `1px solid ${accentColor}60`,
            }}
          >
            {level && type === "course" && (
              <div
                style={{
                  fontSize: 24,
                  color: "white",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  marginBottom: "20px",
                  background: accentColor,
                  padding: "10px 30px",
                  borderRadius: "30px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                }}
              >
                {level} LEVEL
              </div>
            )}

            <div
              style={{
                fontSize: 72,
                fontWeight: "bold",
                textAlign: "center",
                color: "white",
                lineHeight: 1.2,
                marginBottom: subtitle ? "28px" : "0",
                textShadow: "0 2px 10px rgba(0,0,0,0.3)",
              }}
            >
              {title}
            </div>

            {subtitle && (
              <div
                style={{
                  fontSize: 36,
                  color: "#f8fafc", // slate-50
                  textAlign: "center",
                  maxWidth: "800px",
                  lineHeight: 1.4,
                  textShadow: "0 1px 3px rgba(0,0,0,0.2)",
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
                  marginTop: "36px",
                  padding: "14px 30px",
                  backgroundColor: "white",
                  borderRadius: "40px",
                  boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
                }}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 3L19 12L5 21V3Z"
                    fill={bgColor}
                    stroke={bgColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span
                  style={{
                    marginLeft: "14px",
                    color: bgColor,
                    fontWeight: "bold",
                    fontSize: "24px",
                  }}
                >
                  LESSON
                </span>
              </div>
            )}
          </div>

          {/* Decorative elements */}
          <div
            style={{
              position: "absolute",
              right: "70px",
              top: "70px",
              width: "120px",
              height: "120px",
              borderRadius: "24px",
              background: `${accentColor}50`,
              transform: "rotate(15deg)",
              zIndex: 1,
            }}
          />

          <div
            style={{
              position: "absolute",
              left: "100px",
              bottom: "150px",
              width: "80px",
              height: "80px",
              borderRadius: "16px",
              background: `${accentColor}50`,
              transform: "rotate(-20deg)",
              zIndex: 1,
            }}
          />

          {/* Enhanced Footer */}
          <div
            style={{
              position: "absolute",
              bottom: "40px",
              display: "flex",
              alignItems: "center",
              color: "white",
              fontSize: "20px",
              zIndex: 5,
            }}
          >
            <div
              style={{
                padding: "14px 32px",
                background: "rgba(255,255,255,0.2)",
                borderRadius: "40px",
                backdropFilter: "blur(10px)",
                display: "flex",
                alignItems: "center",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                border: "1px solid rgba(255,255,255,0.3)",
              }}
            >
              <span style={{ fontWeight: "bold" }}>pathgurus.com</span>
              <span style={{ margin: "0 12px" }}>•</span>
              <span>Inspiring Ideas Everyday</span>
            </div>
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
