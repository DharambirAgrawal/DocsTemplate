// // app/api/og/route.tsx
// import { ImageResponse } from "next/og";
// import { NextRequest } from "next/server";

// export const runtime = "edge";

// // export async function GET(req: NextRequest) {
// //   try {
// //     const { searchParams } = new URL(req.url);

// //     // Get dynamic parameters
// //     const title = searchParams.get("title") || "Pathgurus Course";
// //     const subtitle = searchParams.get("subtitle") || "";
// //     const type = searchParams.get("type") || "course";
// //     const level = searchParams.get("level") || "";

// //     // Create color theme based on course level
// //     let bgColor = "#1a365d"; // Default blue
// //     let accentColor = "#4299e1";

// //     if (level === "beginner") {
// //       bgColor = "#276749"; // Green
// //       accentColor = "#68d391";
// //     } else if (level === "intermediate") {
// //       bgColor = "#744210"; // Yellow
// //       accentColor = "#ecc94b";
// //     } else if (level === "advanced") {
// //       bgColor = "#742a2a"; // Red
// //       accentColor = "#fc8181";
// //     }

// //     return new ImageResponse(
// //       (
// //         <div
// //           style={{
// //             height: "100%",
// //             width: "100%",
// //             display: "flex",
// //             flexDirection: "column",
// //             alignItems: "center",
// //             justifyContent: "center",
// //             backgroundColor: bgColor,
// //             backgroundImage: `url("${process.env.CLIENT_BASE_URL}/icons/logo.png")`,
// //             backgroundRepeat: "no-repeat",
// //             backgroundPosition: "center",
// //             backgroundSize: "100px 100px",
// //             fontFamily: "Inter",
// //           }}
// //         >
// //           <div
// //             style={{
// //               display: "flex",
// //               alignItems: "center",
// //               justifyContent: "center",
// //               marginBottom: "40px",
// //             }}
// //           >
// //             <div
// //               style={{
// //                 fontSize: 60,
// //                 fontWeight: "bold",
// //                 background: "white",
// //                 backgroundClip: "text",
// //                 color: "transparent",
// //                 marginLeft: "20px",
// //               }}
// //             >
// //               Pathgurus
// //             </div>
// //           </div>

// //           <div
// //             style={{
// //               display: "flex",
// //               flexDirection: "column",
// //               alignItems: "center",
// //               justifyContent: "center",
// //               backgroundColor: "rgba(0,0,0,0.6)",
// //               borderRadius: "20px",
// //               padding: "40px 60px",
// //               maxWidth: "80%",
// //             }}
// //           >
// //             {level && type === "course" && (
// //               <div
// //                 style={{
// //                   fontSize: 24,
// //                   color: accentColor,
// //                   fontWeight: "bold",
// //                   textTransform: "uppercase",
// //                   letterSpacing: "0.1em",
// //                   marginBottom: "10px",
// //                 }}
// //               >
// //                 {level} LEVEL
// //               </div>
// //             )}

// //             <div
// //               style={{
// //                 fontSize: 50,
// //                 fontWeight: "bold",
// //                 textAlign: "center",
// //                 maxWidth: "700px",
// //                 color: "white",
// //                 lineHeight: 1.3,
// //               }}
// //             >
// //               {title}
// //             </div>

// //             {subtitle && (
// //               <div
// //                 style={{
// //                   fontSize: 30,
// //                   color: "#f7fafc",
// //                   textAlign: "center",
// //                   marginTop: "20px",
// //                   maxWidth: "700px",
// //                   opacity: 0.9,
// //                 }}
// //               >
// //                 {subtitle}
// //               </div>
// //             )}

// //             {type === "lesson" && (
// //               <div
// //                 style={{
// //                   display: "flex",
// //                   alignItems: "center",
// //                   marginTop: "30px",
// //                   padding: "10px 20px",
// //                   backgroundColor: accentColor,
// //                   borderRadius: "30px",
// //                 }}
// //               >
// //                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
// //                   <path
// //                     d="M5 3L19 12L5 21V3Z"
// //                     fill="rgba(0,0,0,0.7)"
// //                     stroke="rgba(0,0,0,0.7)"
// //                     strokeWidth="2"
// //                     strokeLinecap="round"
// //                     strokeLinejoin="round"
// //                   />
// //                 </svg>
// //                 <span
// //                   style={{
// //                     marginLeft: "10px",
// //                     color: "rgba(0,0,0,0.8)",
// //                     fontWeight: "bold",
// //                   }}
// //                 >
// //                   LESSON
// //                 </span>
// //               </div>
// //             )}
// //           </div>

// //           <div
// //             style={{
// //               position: "absolute",
// //               bottom: "30px",
// //               display: "flex",
// //               alignItems: "center",
// //               color: "white",
// //               opacity: 0.8,
// //             }}
// //           >
// //             <span style={{ marginRight: "6px" }}>pathgurus.com</span>
// //             <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
// //               <path
// //                 d="M19 12H5M12 19L5 12L12 5"
// //                 stroke="currentColor"
// //                 strokeWidth="2"
// //                 strokeLinecap="round"
// //                 strokeLinejoin="round"
// //               />
// //             </svg>
// //             <span style={{ marginLeft: "6px" }}>Inspiring Idea Everyday</span>
// //           </div>
// //         </div>
// //       ),
// //       {
// //         width: 1200,
// //         height: 630,
// //       }
// //     );
// //   } catch (error) {
// //     console.error("Error generating OG image:", error);
// //     return new Response("Failed to generate OG image", { status: 500 });
// //   }
// // }

// // app/api/og/route.tsx
// // import { ImageResponse } from "next/og";
// // import { NextRequest } from "next/server";

// // export const runtime = "edge";

// // export async function GET(req: NextRequest) {
// //   try {
// //     const { searchParams } = new URL(req.url);

// //     // Get dynamic parameters
// //     const title = searchParams.get("title") || "Pathgurus Course";
// //     const subtitle = searchParams.get("subtitle") || "";
// //     const type = searchParams.get("type") || "course";
// //     const level = searchParams.get("level") || "";

// //     // Create color theme based on course level
// //     // Using Tailwind color palette
// //     let bgColor = "#1d4ed8"; // blue-700 as primary default
// //     let accentColor = "#3b82f6"; // blue-500

// //     if (level === "beginner") {
// //       bgColor = "#15803d"; // green-700
// //       accentColor = "#22c55e"; // green-500
// //     } else if (level === "intermediate") {
// //       bgColor = "#b45309"; // amber-700
// //       accentColor = "#f59e0b"; // amber-500
// //     } else if (level === "advanced") {
// //       bgColor = "#b91c1c"; // red-700
// //       accentColor = "#ef4444"; // red-500
// //     }

// //     return new ImageResponse(
// //       (
// //         <div
// //           style={{
// //             height: "100%",
// //             width: "100%",
// //             display: "flex",
// //             flexDirection: "column",
// //             alignItems: "center",
// //             justifyContent: "center",
// //             backgroundColor: bgColor,
// //             backgroundImage: `radial-gradient(circle at 25px 25px, ${accentColor}15 2%, transparent 0%),
// //                radial-gradient(circle at 75px 75px, ${accentColor}20 2%, transparent 0%)`,
// //             backgroundSize: "100px 100px",
// //             fontFamily: "Inter",
// //             overflow: "hidden",
// //             position: "relative",
// //           }}
// //         >
// //           {/* Abstract shapes in background */}
// //           <div
// //             style={{
// //               position: "absolute",
// //               width: "600px",
// //               height: "600px",
// //               borderRadius: "50%",
// //               background: `${accentColor}30`,
// //               top: "-300px",
// //               right: "-100px",
// //               zIndex: "0",
// //             }}
// //           />

// //           <div
// //             style={{
// //               position: "absolute",
// //               width: "400px",
// //               height: "400px",
// //               borderRadius: "50%",
// //               background: `${accentColor}20`,
// //               bottom: "-200px",
// //               left: "-100px",
// //               zIndex: "0",
// //             }}
// //           />

// //           {/* Logo and branding */}
// //           <div
// //             style={{
// //               position: "absolute",
// //               top: "40px",
// //               left: "40px",
// //               display: "flex",
// //               alignItems: "center",
// //               zIndex: "5",
// //             }}
// //           >
// //             <img
// //               src={`${process.env.CLIENT_BASE_URL}/icons/logo.png`}
// //               width="50"
// //               height="50"
// //               alt="Logo"
// //             />
// //             <div
// //               style={{
// //                 fontSize: 36,
// //                 fontWeight: "bold",
// //                 color: "white",
// //                 marginLeft: "16px",
// //               }}
// //             >
// //               Pathgurus
// //             </div>
// //           </div>

// //           {/* Main content */}
// //           <div
// //             style={{
// //               display: "flex",
// //               flexDirection: "column",
// //               alignItems: "center",
// //               justifyContent: "center",
// //               zIndex: "5",
// //               width: "90%",
// //               maxWidth: "900px",
// //             }}
// //           >
// //             {level && type === "course" && (
// //               <div
// //                 style={{
// //                   fontSize: 20,
// //                   color: "white",
// //                   fontWeight: "bold",
// //                   textTransform: "uppercase",
// //                   letterSpacing: "0.15em",
// //                   marginBottom: "16px",
// //                   background: accentColor,
// //                   padding: "8px 20px",
// //                   borderRadius: "30px",
// //                 }}
// //               >
// //                 {level} LEVEL
// //               </div>
// //             )}

// //             <div
// //               style={{
// //                 fontSize: 64,
// //                 fontWeight: "bold",
// //                 textAlign: "center",
// //                 color: "white",
// //                 lineHeight: 1.2,
// //                 marginBottom: subtitle ? "24px" : "0",
// //                 textShadow: "0 2px 10px rgba(0,0,0,0.2)",
// //               }}
// //             >
// //               {title}
// //             </div>

// //             {subtitle && (
// //               <div
// //                 style={{
// //                   fontSize: 32,
// //                   color: "#f8fafc", // slate-50
// //                   textAlign: "center",
// //                   maxWidth: "800px",
// //                   lineHeight: 1.4,
// //                 }}
// //               >
// //                 {subtitle}
// //               </div>
// //             )}

// //             {type === "lesson" && (
// //               <div
// //                 style={{
// //                   display: "flex",
// //                   alignItems: "center",
// //                   marginTop: "32px",
// //                   padding: "12px 24px",
// //                   backgroundColor: "white",
// //                   borderRadius: "30px",
//                   boxShadow: "0 4px 6px rgba(0,0,0,0.1)", here
// //                 }}
// //               >
// //                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
// //                   <path
// //                     d="M5 3L19 12L5 21V3Z"
// //                     fill={bgColor}
// //                     stroke={bgColor}
// //                     strokeWidth="2"
// //                     strokeLinecap="round"
// //                     strokeLinejoin="round"
// //                   />
// //                 </svg>
// //                 <span
// //                   style={{
// //                     marginLeft: "12px",
// //                     color: bgColor,
// //                     fontWeight: "bold",
// //                     fontSize: "20px",
// //                   }}
// //                 >
// //                   LESSON
// //                 </span>
// //               </div>
// //             )}
// //           </div>

// //           {/* Footer */}
// //           <div
// //             style={{
// //               position: "absolute",
// //               bottom: "40px",
// //               display: "flex",
// //               alignItems: "center",
// //               color: "white",
// //               fontSize: "18px",
// //               zIndex: "5",
// //             }}
// //           >
// //             <div
// //               style={{
// //                 padding: "10px 24px",
// //                 background: "rgba(255,255,255,0.15)",
// //                 borderRadius: "30px",
// //                 backdropFilter: "blur(10px)",
// //                 display: "flex",
// //                 alignItems: "center",
// //               }}
// //             >
// //               <span style={{ fontWeight: "bold" }}>pathgurus.com</span>
// //               <span style={{ margin: "0 10px" }}>•</span>
// //               <span>Inspiring Ideas Everyday</span>
// //             </div>
// //           </div>
// //         </div>
// //       ),
// //       {
// //         width: 1200,
// //         height: 630,
// //       }
// //     );
// //   } catch (error) {
// //     console.error("Error generating OG image:", error);
// //     return new Response("Failed to generate OG image", { status: 500 });
// //   }
// // }

// export async function GET(req: NextRequest) {
//   try {
//     const { searchParams } = new URL(req.url);

//     // Get dynamic parameters
//     const title = searchParams.get("title") || "Pathgurus Course";
//     const subtitle = searchParams.get("subtitle") || "";
//     const type = searchParams.get("type") || "course";
//     const level = searchParams.get("level") || "";

//     // Generate a random seed for this request (used for design variations)
//     const seed = Math.floor(Math.random() * 10);

//     // Create color theme based on course level
//     // Using Tailwind color palette
//     let bgColor = "#1d4ed8"; // blue-700 as primary default
//     let accentColor = "#3b82f6"; // blue-500
//     let gradientColor = "#60a5fa"; // blue-400

//     if (level === "beginner") {
//       bgColor = "#15803d"; // green-700
//       accentColor = "#22c55e"; // green-500
//       gradientColor = "#4ade80"; // green-400
//     } else if (level === "intermediate") {
//       bgColor = "#b45309"; // amber-700
//       accentColor = "#f59e0b"; // amber-500
//       gradientColor = "#fbbf24"; // amber-400
//     } else if (level === "advanced") {
//       bgColor = "#b91c1c"; // red-700
//       accentColor = "#ef4444"; // red-500
//       gradientColor = "#f87171"; // red-400
//     }

//     // Design variations based on seed
//     const patterns = [
//       // Circles pattern
//       `radial-gradient(circle at 25px 25px, ${accentColor}15 2%, transparent 0%),
//        radial-gradient(circle at 75px 75px, ${accentColor}20 2%, transparent 0%)`,
//       // Diagonal lines
//       `repeating-linear-gradient(45deg, ${accentColor}10, ${accentColor}10 10px, transparent 10px, transparent 20px)`,
//       // Dots grid
//       `radial-gradient(${accentColor}15 8%, transparent 0) 0 0,
//        radial-gradient(${accentColor}10 8%, transparent 0) 16px 16px`,
//       // Soft gradient
//       `linear-gradient(135deg, ${bgColor} 0%, ${gradientColor}50 100%)`,
//       // Hex pattern
//       `radial-gradient(${accentColor}20 20%, transparent 0) 0 0,
//        radial-gradient(${accentColor}15 20%, transparent 0) 50px 25px`,
//       // Wave pattern
//       `linear-gradient(45deg, ${accentColor}15 25%, transparent 25%, transparent 50%, ${accentColor}15 50%, ${accentColor}15 75%, transparent 75%, transparent)`,
//       // Mesh gradient
//       `radial-gradient(at 30% 20%, ${gradientColor}40 0px, transparent 50%),
//        radial-gradient(at 80% 80%, ${accentColor}30 0px, transparent 50%)`,
//       // Soft topography
//       `linear-gradient(0deg, ${bgColor} 0%, ${gradientColor}40 100%)`,
//       // Circuit-like pattern
//       `linear-gradient(0deg, ${accentColor}10 25%, transparent 25%) 0 0,
//        linear-gradient(0deg, transparent 75%, ${accentColor}10 75%) 0 0,
//        linear-gradient(90deg, ${accentColor}10 25%, transparent 25%) 0 0,
//        linear-gradient(90deg, transparent 75%, ${accentColor}10 75%) 0 0`,
//       // Soft glow
//       `radial-gradient(circle at 50% 50%, ${gradientColor}50 0%, ${bgColor} 70%)`,
//     ];

//     // Pick shapes based on seed
//     const shapes = [
//       // Circle pairs
//       [
//         { width: 600, height: 600, top: -300, right: -100, opacity: "30" },
//         { width: 400, height: 400, bottom: -200, left: -100, opacity: "20" },
//       ],
//       // Multiple circles
//       [
//         { width: 500, height: 500, top: -200, right: -50, opacity: "20" },
//         { width: 300, height: 300, bottom: -100, left: 100, opacity: "20" },
//         { width: 200, height: 200, top: 100, right: 100, opacity: "15" },
//       ],
//       // Diagonal shapes
//       [
//         {
//           width: 800,
//           height: 300,
//           top: -100,
//           right: -200,
//           opacity: "20",
//           borderRadius: "30%",
//         },
//         {
//           width: 600,
//           height: 200,
//           bottom: -50,
//           left: -100,
//           opacity: "15",
//           borderRadius: "40%",
//         },
//       ],
//       // Corner accents
//       [
//         {
//           width: 400,
//           height: 400,
//           top: -200,
//           right: -200,
//           opacity: "25",
//           borderRadius: "0",
//         },
//         {
//           width: 400,
//           height: 400,
//           bottom: -200,
//           left: -200,
//           opacity: "20",
//           borderRadius: "0",
//         },
//       ],
//       // Wave shapes
//       [
//         {
//           width: "100%",
//           height: 300,
//           bottom: -150,
//           left: 0,
//           opacity: "20",
//           borderRadius: "60% 60% 0 0",
//         },
//       ],
//       // Circle and square
//       [
//         {
//           width: 500,
//           height: 500,
//           top: -250,
//           right: -100,
//           opacity: "20",
//           borderRadius: "50%",
//         },
//         {
//           width: 300,
//           height: 300,
//           bottom: -100,
//           left: -50,
//           opacity: "15",
//           borderRadius: "0",
//         },
//       ],
//       // Diagonal bars
//       [
//         {
//           width: "150%",
//           height: 200,
//           top: -100,
//           right: -200,
//           opacity: "15",
//           borderRadius: "0",
//           transform: "rotate(-20deg)",
//         },
//         {
//           width: "150%",
//           height: 100,
//           bottom: 100,
//           left: -200,
//           opacity: "20",
//           borderRadius: "0",
//           transform: "rotate(-20deg)",
//         },
//       ],
//       // Corner circle
//       [
//         {
//           width: 800,
//           height: 800,
//           top: -400,
//           right: -400,
//           opacity: "15",
//           borderRadius: "50%",
//         },
//       ],
//       // Side bars
//       [
//         {
//           width: 100,
//           height: "100%",
//           top: 0,
//           right: 100,
//           opacity: "15",
//           borderRadius: "0",
//         },
//         {
//           width: 100,
//           height: "100%",
//           top: 0,
//           left: 100,
//           opacity: "10",
//           borderRadius: "0",
//         },
//       ],
//       // Accent corner
//       [
//         {
//           width: 300,
//           height: 300,
//           top: -50,
//           right: -50,
//           opacity: "25",
//           borderRadius: "0 0 0 100%",
//         },
//       ],
//     ];

//     // Choose design variation based on seed
//     const patternIndex = seed % patterns.length;
//     const shapeIndex = seed % shapes.length;
//     const selectedPattern = patterns[patternIndex];
//     const selectedShapes = shapes[shapeIndex];

//     // Randomize the title/content layout
//     const layoutVariations = [
//       { textAlign: "center", subtitleSize: 32 },
//       { textAlign: "left", subtitleSize: 30 },
//       { textAlign: "center", subtitleSize: 28 },
//       { textAlign: "right", subtitleSize: 30 },
//     ];

//     const selectedLayout = layoutVariations[seed % layoutVariations.length];

//     // Footer style variations
//     const footerStyles = [
//       { background: "rgba(255,255,255,0.15)", borderRadius: "30px" },
//       { background: accentColor, borderRadius: "4px" },
//       { background: "rgba(0,0,0,0.2)", borderRadius: "8px" },
//       { borderBottom: `2px solid ${accentColor}`, borderRadius: "0" },
//     ];

//     const footerStyle = footerStyles[seed % footerStyles.length];

//     return new ImageResponse(
//       (
//         <div
//           style={{
//             height: "100%",
//             width: "100%",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: "center",
//             backgroundColor: bgColor,
//             backgroundImage: selectedPattern,
//             backgroundSize: seed % 2 === 0 ? "100px 100px" : "200px 200px",
//             fontFamily: "Inter",
//             overflow: "hidden",
//             position: "relative",
//           }}
//         >
//           {/* Dynamic shapes in background */}
//           {selectedShapes.map((shape, i) => (
//             <div
//               key={i}
//               style={{
//                 position: "absolute",
//                 width: shape.width,
//                 height: shape.height,
//                 borderRadius: shape.borderRadius || "50%",
//                 background: `${accentColor}${shape.opacity}`,
//                 top: shape.top,
//                 right: shape.right,
//                 bottom: shape.bottom,
//                 left: shape.left,
//                 transform: shape.transform || "none",
//                 zIndex: "0",
//               }}
//             />
//           ))}

//           {/* Logo and branding */}
//           <div
//             style={{
//               position: "absolute",
//               top: "40px",
//               left: "40px",
//               display: "flex",
//               alignItems: "center",
//               zIndex: "5",
//             }}
//           >
//             <img
//               src={`${process.env.CLIENT_BASE_URL}/icons/logo.png`}
//               width="50"
//               height="50"
//               alt="Logo"
//             />
//             <div
//               style={{
//                 fontSize: 36,
//                 fontWeight: "bold",
//                 color: "white",
//                 marginLeft: "16px",
//               }}
//             >
//               Pathgurus
//             </div>
//           </div>

//           {/* Main content */}
//           <div
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems:
//                 selectedLayout.textAlign === "center"
//                   ? "center"
//                   : selectedLayout.textAlign === "right"
//                   ? "flex-end"
//                   : "flex-start",
//               justifyContent: "center",
//               zIndex: "5",
//               width: "85%",
//               maxWidth: "900px",
//             }}
//           >
//             {level && type === "course" && (
//               <div
//                 style={{
//                   fontSize: 20,
//                   color: "white",
//                   fontWeight: "bold",
//                   textTransform: "uppercase",
//                   letterSpacing: "0.15em",
//                   marginBottom: "16px",
//                   background: accentColor,
//                   padding: "8px 20px",
//                   borderRadius: seed % 2 === 0 ? "30px" : "4px",
//                   boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
//                 }}
//               >
//                 {level} LEVEL
//               </div>
//             )}

//             <div
//               style={{
//                 fontSize: 64,
//                 fontWeight: "bold",
//                 textAlign: selectedLayout.textAlign,
//                 color: "white",
//                 lineHeight: 1.2,
//                 marginBottom: subtitle ? "24px" : "0",
//                 textShadow: "0 2px 10px rgba(0,0,0,0.2)",
//                 width: "100%",
//               }}
//             >
//               {title}
//             </div>

//             {subtitle && (
//               <div
//                 style={{
//                   fontSize: selectedLayout.subtitleSize,
//                   color: "#f8fafc", // slate-50
//                   textAlign: selectedLayout.textAlign,
//                   maxWidth: "800px",
//                   lineHeight: 1.4,
//                   width: "100%",
//                 }}
//               >
//                 {subtitle}
//               </div>
//             )}

//             {type === "lesson" && (
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   marginTop: "32px",
//                   padding: "12px 24px",
//                   backgroundColor: seed % 2 === 0 ? "white" : accentColor,
//                   borderRadius: seed % 2 === 0 ? "30px" : "4px",
//                   boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
//                 }}
//               >
//                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
//                   <path
//                     d="M5 3L19 12L5 21V3Z"
//                     fill={seed % 2 === 0 ? bgColor : "white"}
//                     stroke={seed % 2 === 0 ? bgColor : "white"}
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />
//                 </svg>
//                 <span
//                   style={{
//                     marginLeft: "12px",
//                     color: seed % 2 === 0 ? bgColor : "white",
//                     fontWeight: "bold",
//                     fontSize: "20px",
//                   }}
//                 >
//                   LESSON
//                 </span>
//               </div>
//             )}
//           </div>

//           {/* Footer */}
//           <div
//             style={{
//               position: "absolute",
//               bottom: "40px",
//               display: "flex",
//               alignItems: "center",
//               color: "white",
//               fontSize: "18px",
//               zIndex: "5",
//             }}
//           >
//             <div
//               style={{
//                 padding: "10px 24px",
//                 ...footerStyle,
//                 display: "flex",
//                 alignItems: "center",
//               }}
//             >
//               <span style={{ fontWeight: "bold" }}>pathgurus.com</span>
//               <span style={{ margin: "0 10px" }}>•</span>
//               <span>Inspiring Ideas Everyday</span>
//             </div>
//           </div>
//         </div>
//       ),
//       {
//         width: 1200,
//         height: 630,
//       }
//     );
//   } catch (error) {
//     console.error("Error generating OG image:", error);
//     return new Response("Failed to generate OG image", { status: 500 });
//   }
// }
