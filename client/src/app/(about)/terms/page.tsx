'use client'
import { useState } from 'react'

export default function Terms() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const sections = [
    { id: 'use', title: 'Use of Services', content: "By accessing or using Course & Blog, you agree to use our services only for lawful purposes and in accordance with these Terms. You must not use our services:\n\n1. In any way that violates any applicable federal, state, local, or international law or regulation.\n2. To transmit, or procure the sending of, any advertising or promotional material, including any \"junk mail,\" \"chain letter,\" \"spam,\" or any other similar solicitation.\n3. To impersonate or attempt to impersonate Course & Blog, a Course & Blog employee, another user, or any other person or entity.\n4. To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Services, or which, as determined by us, may harm Course & Blog or users of the Services or expose them to liability." },
    { id: 'accounts', title: 'User Accounts', content: "When you create an account with us, you must provide accurate, complete, and up-to-date information. You are solely responsible for:\n\n1. Maintaining the confidentiality of your account and password.\n2. Restricting access to your computer or mobile device.\n3. All activities that occur under your account or password.\n\nYou agree to notify us immediately of any unauthorized access to or use of your username or password or any other breach of security. You also agree to ensure that you exit from your account at the end of each session.\n\nWe reserve the right to disable any user account at any time in our sole discretion for any or no reason, including if, in our opinion, you have violated any provision of these Terms." },
    { id: 'ip', title: 'Intellectual Property', content: "The Service and its original content, features, and functionality are and will remain the exclusive property of Course & Blog and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Course & Blog.\n\nYou acknowledge and agree that any feedback, comments, or suggestions you may provide regarding Course & Blog, or the Services are entirely voluntary and we will be free to use such feedback, comments or suggestions as we see fit and without any obligation to you." },
    { id: 'liability', title: 'Limitation of Liability', content: "In no event will Course & Blog, its affiliates, or their licensors, service providers, employees, agents, officers, or directors be liable for damages of any kind, under any legal theory, arising out of or in connection with your use, or inability to use, the Services, any websites linked to it, any content on the Services or such other websites or any services or items obtained through the Services or such other websites, including any direct, indirect, special, incidental, consequential, or punitive damages, including but not limited to, personal injury, pain and suffering, emotional distress, loss of revenue, loss of profits, loss of business or anticipated savings, loss of use, loss of goodwill, loss of data, and whether caused by tort (including negligence), breach of contract or otherwise, even if foreseeable.\n\nSome jurisdictions do not allow the exclusion or limitation of liability for consequential or incidental damages, so the above limitation may not apply to you." },
    { id: 'changes', title: 'Changes to Terms', content: "We may revise and update these Terms from time to time in our sole discretion. All changes are effective immediately when we post them, and apply to all access to and use of the Services thereafter.\n\nYour continued use of the Services following the posting of revised Terms means that you accept and agree to the changes. You are expected to check this page frequently so you are aware of any changes, as they are binding on you.\n\nWe will make reasonable efforts to notify you of any significant changes to these Terms. However, it remains your responsibility to review these Terms periodically for any updates or changes." },
  ]

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center text-gray-800">
        Terms of Service
      </h1>
      <div className="max-w-4xl mx-auto">
        <p className="text-lg mb-8 text-center text-gray-600">
          Welcome to Course & Blog. By using our website and services, you agree to comply with and be bound by the following terms and conditions.
        </p>
        <div className="space-y-4">
          {sections.map((section) => (
            <div 
              key={section.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out"
            >
              <button
                onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                className="w-full text-left px-6 py-4 flex justify-between items-center focus:outline-none hover:bg-gray-50 transition-colors duration-300"
              >
                <h2 className="text-xl font-semibold text-gray-800">{section.title}</h2>
                <svg
                  className={`w-6 h-6 transform transition-transform duration-300 ${
                    expandedSection === section.id ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expandedSection === section.id && (
                <div
                  className="px-6 py-4 bg-gray-50 text-gray-700 transition-all duration-300 ease-in-out"
                >
                  <p className="text-base leading-relaxed whitespace-pre-wrap">{section.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

