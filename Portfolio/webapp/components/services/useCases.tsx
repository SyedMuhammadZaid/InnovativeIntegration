"use client"

import { motion } from "framer-motion"
import { FiDollarSign, FiLayers, FiWifi } from "react-icons/fi"
import Image from "next/image"
import { useEffect, useState } from "react"
import useCase from "@/assets/images/useCases.png"
const useCases = [
  {
    icon: FiDollarSign,
    title: "Financial Services",
    description:
      "Financial institutions are sensitive to attacks by enforcing strict parameter detection and application-level controls to comply with industry regulations.",
  },
  {
    icon: FiLayers,
    title: "Large Enterprises",
    description:
      "Manage and secure a user-distributed network by gaining complete visibility into user activity and application traffic, ensuring consistent security across all locations.",
  },
  {
    icon: FiWifi,
    title: "Telco & ISP Providers",
    description:
      "Service providers safely achieve high-performance NGFWs that can inspect encrypted traffic and block threats without compromising network speed or subscriber experience.",
  },
]

const icons = [FiDollarSign, FiLayers, FiWifi];

export default function UseCasesSection({ content }: { content: any }) {

  const [modifedContent, setModifiedContent] = useState<any[]>([])

  useEffect(() => {
    if (content) {
      const useCases: any = []
      content?.forEach((item: any, index: any) => useCases.push(
        {
          ...item,
          icon: icons[index]
        }
      ));
      setModifiedContent(useCases)
    }
  }, [content]);

  return (
    <div className="flex flex-col gap-3">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="section-first-heading"
      >
        Industry Use Cases
      </motion.h2>

      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left side - Use case cards */}
        <div className="space-y-6">
          {modifedContent.map((useCase, index) => (
            <motion.div
              key={useCase?.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 primary-linear-gradient rounded-lg flex items-center justify-center">
                    <useCase.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{useCase.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{useCase.content}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right side - Image */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl"
        >
          <Image src={useCase} alt="Industry Use Cases" fill className="object-cover" />
        </motion.div>
      </div>
    </div>
  )
}
