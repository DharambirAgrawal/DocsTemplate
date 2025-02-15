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
      name: "Dr. Emily Chen",
      role: "Founder & CEO",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      name: "Prof. James Wilson",
      role: "Lead Instructor, Computer Science",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      name: "Sarah Lopez",
      role: "Lead Instructor, Design",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      name: "Michael Thompson",
      role: "Head of Content",
      image: "/placeholder.svg?height=150&width=150",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center text-gray-800">
        About Us
      </h1>

      <div className="max-w-4xl mx-auto">
        {/* Mission Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-blue-600">Our Mission</h2>
          <div className="bg-white rounded-lg shadow-xl p-8">
            <p className="text-lg leading-relaxed text-gray-700">
              At Course & Blog, our mission is to democratize education and
              empower learners worldwide. We believe that knowledge should be
              accessible to everyone, regardless of their background or
              location. Through our cutting-edge online courses and insightful
              blog content, we aim to bridge the gap between traditional
              education and the rapidly evolving needs of the modern workforce.
              Our commitment to excellence, innovation, and continuous learning
              drives us to provide high-quality, relevant, and engaging
              educational experiences that inspire personal and professional
              growth.
            </p>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-blue-600">Our Team</h2>
          <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
            <p className="text-lg leading-relaxed text-gray-700">
              Our diverse team of experts brings together decades of experience
              in education, technology, and content creation. Led by our
              visionary founder, Dr. Emily Chen, our staff includes
              award-winning educators, industry veterans, and passionate young
              innovators.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
              Founded in 2018 by Dr. Emily Chen, Course & Blog started as a
              small passion project with just five online courses. Within a
              year, our user base grew to over 10,000 students, and we expanded
              our offering to 20 courses. In 2020, we launched our blog, which
              quickly became a go-to resource for educational insights and
              career advice. By 2022, we had partnered with leading tech
              companies to offer specialized certification programs. Today, we
              serve over 500,000 learners globally, offering 100+ courses across
              various disciplines, and our blog reaches millions of readers
              monthly.
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Blogs Offered", value: "100+" },
            { title: "Active Learners", value: "500,000+" },
            { title: "Countries Reached", value: "150+" },
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
