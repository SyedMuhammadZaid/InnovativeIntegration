"use client"

import { motion } from "framer-motion"

export default function CompanyHistorySection() {
    return (
        <section className="relative py-10! company-history">
            {/* Animated mesh background */}

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-5xl mx-auto text-center"
                >
                    <h2 className="section-first-heading text-white! mb-8">Our Company History</h2>

                    <div className="space-y-6 text-description text-gray-300! text-lg leading-relaxed">
                        <p>
                            Our story is built on a steadfast commitment to <span className="font-semibold text-cyan-400">trust and innovation</span>. Since our founding in 2007, we've remained true to a philosophy where success is measured by the strength of our long-term partnerships, not just revenue. This client-first approach has earned us the confidence of leading organizations across Pakistan's banking, energy, education, and healthcare sectors. By focusing on your success, we secure our own.
                        </p>

                        <p>
                            What sets Innovative Integration apart is our <span className="font-semibold text-cyan-400">engineering-first culture</span>, dedicated to relentless problem-solving. We transform complex challenges into seamless, high-performance solutions, driven by a team of highly certified and passionate professionals. Continuously investing in our people and technology ensures we stay ahead, architecting secure, mission-critical infrastructure that truly empowers your business for the future.
                        </p>

                        <p>
                            Our strong alliances with industry leaders like Cisco, Palo Alto, and NetApp underscore our commitment to delivering <span className="font-semibold text-cyan-400">best-in-class solutions</span>. Yet, it is the profound trust of our clients that truly defines our achievements and validates our work. This collaborative spirit, rooted in our core values of <span className="font-semibold text-cyan-400">honesty and accountability</span>, forms the bedrock of every successful project and partnership we undertake.
                        </p>

                        <p>
                            Today, our reach extends to pivotal sectors across Pakistan, with strategic offices in Karachi, Lahore, and Islamabad established directly by customer demand. This client-driven expansion fuels a sustainable 20–25% annual growth, largely thanks to repeat business and referrals from our satisfied partners. Our long-term approach means we form trusted partnerships, often leading clients to recommend us to international technology vendors.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
