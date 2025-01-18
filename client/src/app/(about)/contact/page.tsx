import { contact } from "@/lib/data";
import Link from "next/link";
export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center text-gray-800">
        Contact Us
      </h1>
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12">
        <div className="flex-1 bg-white rounded-lg shadow-xl p-8 transition-all duration-300 hover:shadow-2xl">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Get in Touch
          </h2>
          <p className="mb-6 text-gray-600">
            We'd love to hear from you. Whether you have a question about our
            courses, blog content, or just want to say hello, we're here to
            help.
          </p>
          <div className="space-y-4">
            
            <div className="flex items-center ">
              <span className="w-6 h-6 text-blue-600 mr-2">

              <contact.email.icon />
              </span>
              <span className="text-gray-700">{contact.email.value}</span>
            </div>
            <div className="flex items-center">
            <span className="w-6 h-6 text-blue-600 mr-2">
            
                <contact.phone.icon/>
            </span>
              <span className="text-gray-700">{contact.phone.value}</span>
            </div>
            {/* <div className="flex items-center">
              <svg
                className="w-6 h-6 text-blue-600 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="text-gray-700">
                123 Education St, Learning City, 12345
              </span>
            </div> */}
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Follow Us
            </h3>
            <div className="flex space-x-4">
              {contact.social.map((social) => (
              
                  <Link
                    href={social.link}
                    className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
                    key={social.name}
                  >
                  <social.icon className=" h-6 w-6" />
                </Link>
             
              ))}
             
            </div>
          </div>
        </div>
        <div className="flex-1">
          <form className="bg-white rounded-lg shadow-xl p-8 transition-all duration-300 hover:shadow-2xl">
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 transform hover:scale-105"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
