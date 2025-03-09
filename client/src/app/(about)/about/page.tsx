// import Image from "next/image";
// import { Metadata } from "next";
// import { aboutUsMetadata } from "../metaData";

// interface TeamMember {
//   name: string;
//   role: string;
//   image: string;
// }

// export const metadata: Metadata = aboutUsMetadata;

// export default function About() {
//   const teamMembers: TeamMember[] = [
//     {
//       name: "Dharambir Agrawal",
//       role: "Founder & Developer",
//       image: "/teams/Dharambir.jpg",
//     },
//   ];

//   return (
//     <div className="container mx-auto px-4 py-16">
//       <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center text-gray-800">
//         About Us
//       </h1>

//       <div className="max-w-4xl mx-auto">
//         {/* Mission Section */}
//         <section className="mb-16">
//           <h2 className="text-3xl font-bold mb-6 text-blue-600">Our Mission</h2>
//           <div className="bg-white rounded-lg shadow-xl p-8">
//             <p className="text-lg leading-relaxed text-gray-700">
//               At Course & Blog, our mission is to democratize education and
//               empower learners worldwide. We believe that knowledge should be
//               accessible to everyone, regardless of their background or
//               location. Through our cutting-edge online courses and insightful
//               blog content, we aim to bridge the gap between traditional
//               education and the rapidly evolving needs of the modern workforce.
//               Our commitment to excellence, innovation, and continuous learning
//               drives us to provide high-quality, relevant, and engaging
//               educational experiences that inspire personal and professional
//               growth.
//             </p>
//           </div>
//         </section>

//         {/* Team Section */}
//         <section className="mb-16">
//           <h2 className="text-3xl font-bold mb-6 text-blue-600">Our Team</h2>
//           <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
//             <p className="text-lg leading-relaxed text-gray-700">
//               Our diverse team of experts brings together decades of experience
//               in education, technology, and content creation. Led by our
//               visionary founder, Dr. Emily Chen, our staff includes
//               award-winning educators, industry veterans, and passionate young
//               innovators.
//             </p>
//           </div>

//           <div className="flex flex-wrap justify-center gap-8">
//             {teamMembers.map((member) => (
//               <div
//                 key={member.name}
//                 className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 text-center"
//               >
//                 <Image
//                   src={member.image}
//                   alt={member.name}
//                   width={150}
//                   height={150}
//                   className="rounded-full mx-auto mb-4"
//                 />
//                 <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
//                 <p className="text-gray-600">{member.role}</p>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* History Section */}
//         <section className="mb-16">
//           <h2 className="text-3xl font-bold mb-6 text-blue-600">Our History</h2>
//           <div className="bg-white rounded-lg shadow-xl p-8">
//             <p className="text-lg leading-relaxed text-gray-700">
//               Course & Blog was founded in 2025 by Dharambir Agrawal with a
//               vision to revolutionize the way people learn and access
//               information. Starting as a small initiative, it quickly grew into
//               a global platform, thanks to its innovative approach and
//               commitment to quality education. Dharambir's passion for teaching
//               and technology drove the creation of a space where learners from
//               all walks of life could come together to gain knowledge and
//               skills. Over the years, Course & Blog has expanded its offerings,
//               reaching thousands of learners worldwide and making a significant
//               impact on the education landscape.
//             </p>
//           </div>
//         </section>

//         {/* Stats Section */}
//         <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {[
//             { title: "Blogs Offered", value: "100+" },
//             { title: "Active Learners", value: "5000+" },
//             { title: "Countries Reached", value: "10+" },
//           ].map((stat) => (
//             <div
//               key={stat.title}
//               className="bg-blue-600 text-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
//             >
//               <h3 className="text-2xl font-bold mb-2">{stat.value}</h3>
//               <p className="text-lg">{stat.title}</p>
//             </div>
//           ))}
//         </section>
//       </div>
//     </div>
//   );
// }

import Image from "next/image";
import { Metadata } from "next";
import { aboutUsMetadata } from "../metaData";

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

export const metadata: Metadata = aboutUsMetadata;

export default function About() {
  const teamMembers: TeamMember[] = [
    {
      name: "Dharambir Agrawal",
      role: "Founder & Developer",
      image: "/teams/Dharambir.jpg",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center text-gray-800">
        About Pathgurus
      </h1>

      <div className="max-w-4xl mx-auto">
        {/* Mission Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-blue-600">Our Mission</h2>
          <div className="bg-white rounded-lg shadow-xl p-8">
            <p className="text-lg leading-relaxed text-gray-700">
              At Pathgurus, our mission is to democratize education and empower
              learners worldwide. We believe that knowledge should be accessible
              to everyone, regardless of their background or location. Through
              our innovative online courses and insightful blog content, we aim
              to bridge the gap between traditional education and the evolving
              needs of the modern workforce. Our commitment to excellence,
              innovation, and continuous learning drives us to provide
              high-quality, relevant, and engaging educational experiences that
              inspire both personal and professional growth.
            </p>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-blue-600">Our Team</h2>
          <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
            <p className="text-lg leading-relaxed text-gray-700">
              Our team is made up of passionate experts in education,
              technology, and content creation. Led by our visionary founder,
              Dharambir Agrawal, our dedicated staff includes experienced
              educators, industry veterans, and young innovators, all committed
              to revolutionizing the way people learn and grow.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 text-center"
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  width={150}
                  height={150}
                  className="rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* History Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-blue-600">Our History</h2>
          <div className="bg-white rounded-lg shadow-xl p-8">
            <p className="text-lg leading-relaxed text-gray-700">
              Pathgurus was founded in 2025 by Dharambir Agrawal with a vision
              to revolutionize the way people learn and access information. From
              a small initiative, it quickly grew into a global platform, thanks
              to its innovative approach and commitment to high-quality
              education. Dharambir's passion for teaching and technology drove
              the creation of a space where learners from all walks of life
              could come together to gain knowledge and skills. Over the years,
              Pathgurus has expanded its offerings, reaching thousands of
              learners worldwide and making a lasting impact on the education
              landscape.
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Courses Offered", value: "100+" },
            { title: "Active Learners", value: "5000+" },
            { title: "Countries Reached", value: "10+" },
          ].map((stat) => (
            <div
              key={stat.title}
              className="bg-blue-600 text-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
            >
              <h3 className="text-2xl font-bold mb-2">{stat.value}</h3>
              <p className="text-lg">{stat.title}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
