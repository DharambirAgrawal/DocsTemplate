'use client'
import { useState } from 'react'

export default function Privacy() {
  const [activeSection, setActiveSection] = useState('collection')

  const sections = [
    { id: 'collection', title: 'Information We Collect', content: "We collect various types of information to provide and improve our services:\n\n1. Personal Information: This includes your name, email address, and payment details when you create an account or make a purchase.\n\n2. Usage Data: We collect data on how you interact with our platform, including courses accessed, time spent on pages, and features used.\n\n3. Device Information: This includes your IP address, browser type, and operating system.\n\n4. Cookies and Similar Technologies: We use cookies to enhance your browsing experience and collect usage information." },
    { id: 'use', title: 'How We Use Your Information', content: "We use the collected information for various purposes:\n\n1. To provide and maintain our services\n2. To notify you about changes to our services\n3. To allow you to participate in interactive features of our platform\n4. To provide customer support\n5. To gather analysis or valuable information so that we can improve our services\n6. To monitor the usage of our services\n7. To detect, prevent and address technical issues\n8. To provide you with news, special offers and general information about other goods, services and events which we offer" },
    { id: 'security', title: 'Data Security', content: "We take the security of your data seriously and implement various measures to protect it:\n\n1. Encryption: All data transmission between your device and our servers is encrypted using SSL technology.\n\n2. Access Controls: We restrict access to personal information to employees, contractors, and agents who need to know that information in order to process it for us.\n\n3. Regular Audits: We conduct regular security audits and vulnerability assessments.\n\n4. Data Backups: We regularly backup your data to prevent data loss in case of unforeseen events.\n\n5. Incident Response Plan: We have a comprehensive plan in place to respond quickly to any potential data breaches or security incidents.\n\n6. Employee Training: Our staff undergoes regular training on data protection and security best practices." },
    { id: 'rights', title: 'Your Rights', content: "As a user of our platform, you have certain rights regarding your personal data:\n\n1. Right to Access: You can request a copy of the personal data we hold about you.\n\n2. Right to Rectification: You can ask us to correct any inaccurate or incomplete personal data.\n\n3. Right to Erasure: In certain circumstances, you can request that we delete your personal data.\n\n4. Right to Restrict Processing: You can ask us to restrict the processing of your personal data in specific cases.\n\n5. Right to Data Portability: You can request to receive your personal data in a structured, commonly used, and machine-readable format.\n\n6. Right to Object: You can object to our processing of your personal data for direct marketing purposes.\n\n7. Right to Withdraw Consent: If we rely on your consent to process your personal data, you have the right to withdraw that consent at any time.\n\nTo exercise any of these rights, please contact us using the information provided in the 'Contact Us' section." },
  ]

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center text-gray-800">
        Privacy Policy
      </h1>
      <div className="max-w-4xl mx-auto">
        <p className="text-lg mb-8 text-center text-gray-600">
          At Course & Blog, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information.
        </p>
        <div className="flex flex-wrap justify-center mb-8">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`m-2 px-4 py-2 rounded-full transition-all duration-300 ${
                activeSection === section.id
                  ? 'bg-blue-600 text-white shadow-lg transform -translate-y-1'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow'
              }`}
            >
              {section.title}
            </button>
          ))}
        </div>
        <div
          className="bg-white rounded-lg shadow-xl p-8 transition-all duration-500 ease-in-out"
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">{sections.find(s => s.id === activeSection)?.title}</h2>
          <p className="text-lg leading-relaxed text-gray-700 whitespace-pre-wrap">{sections.find(s => s.id === activeSection)?.content}</p>
        </div>
      </div>
    </div>
  )
}
