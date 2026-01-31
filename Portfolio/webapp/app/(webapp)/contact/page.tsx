'use client';
import Banner from "@/components/shared/banner/banner";
import { motion } from "framer-motion";
import contactCall from "@/assets/images/contactCall.png"
import contactEmail from "@/assets/images/contactEmail.png"
import contactLocation from "@/assets/images/contactLocation.png"
import Image from "next/image";
import { Button, Form, Input, Select } from "antd";
import PrimaryButton from "@/components/shared/button/primaryButton/primaryButton";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import CtaSection from "@/components/shared/cta-banner/cta_Banner";
import AwardsSection from "@/components/shared/awards/awards";
import { FiArrowRight, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import dynamic from "next/dynamic";
import emailjs from "emailjs-com";
import useMessage from "@/utils/hooks/useMessage";
import { useState } from "react";

const LeafletMap = dynamic(() => import("@/components/shared/map/map"), {
    ssr: false,
});


export const sendContactEmail = async (data: any) => {
    const templateParams = {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phoneNo: data.phoneNo,
        message: data.message,
    };

    try {
        await emailjs.send(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID_CONTACT!,
            process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_CONTACT!,
            templateParams,
            process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY_CONTACT!
        );

        console.log("Contact email sent successfully!");
    } catch (error) {
        console.log("Contact email error:", error);
    }
};


const prefixSelector = (
    <Form.Item name="prefix" noStyle>
        <Select
            style={{ width: 70 }}
            defaultValue={'+92'}
            options={[
                { label: '+92', value: '+92' },
            ]}
        />
    </Form.Item>
);

export default function ContactUs() {

    const [form] = Form.useForm();
    const { successMsg, errorMsg, contextHolder } = useMessage();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values: any) => {
        try {
            setLoading(true)
            await sendContactEmail({
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                phoneNo: values.phoneNo,
                message: values.message,
            });
            successMsg("Thanks for contacting! We'll reach out to you shortly");
            form.resetFields();
        } catch (err) {
            console.error(err);
        } finally{
            setLoading(false);
        }
    };


    const contactInfo = [
        {
            icon: <FiPhone className="w-8 h-8" />,
            title: "Support 24/7",
            details: ["Tel: +92-21-32200013", "Fax: +92-21-32314451"],
        },
        {
            icon: <FiMail className="w-8 h-8" />,
            title: "For More Information",
            details: ["info@innovativeintegration.net", "www.innovativeintegration.net"],
        },
        {
            icon: <FiMapPin className="w-8 h-8" />,
            title: "Karachi Address",
            details: [
                "B-103 1st Floor Fortune Towers Plot No. 43 1-A Main, Shahrah-e-Faisal Block 6 P.E.C.H.S., Karachi, 75400, Pakistan",
            ],
        },
        {
            icon: <FiMapPin className="w-8 h-8" />,
            title: "Lahore Address",
            details: [
                "24, 1st Floor, Al Hafeez View, 67/D-1, Gulberg III Lahore-54000",
            ],
        },
        {
            icon: <FiMapPin className="w-8 h-8" />,
            title: "Islamabad Address",
            details: [
                "305, 3rd Floor, Emirates Tower, M-13, F-7 Markaz, Islamabad, 44000",
            ],
        },
    ]


    return (
        <section className="flex flex-col gap-3 justify-start min-h-screen bg-[#F2F2F5]">
            {contextHolder}
            <Banner title="Contact Us" content="Stay ahead of tomorrow's cyber security threats with the right tools from innovative integration." />
            <section className="container mx-auto px-4 md:py-11! flex flex-col gap-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center flex flex-col justify-center items-center"
                >
                    <span className="about-section">GET IN TOUCH</span>
                    <div className='flex justify-start flex-wrap'>
                        <h2 className='section-first-heading leading-9!'>
                            Do you have questions? <br />
                            <span className='section-second-heading'> ask us anytime</span>
                        </h2>
                    </div>
                </motion.div>

                {/* Contact Info Cards - Responsive Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4"
                >
                    {contactInfo.map((info, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -5, scale: 1.02 }}
                            className="relative primary-linear-gradient rounded-2xl p-6 md:p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-300"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -z-0" />
                            <div className="relative z-10">
                                <div className="mb-4 text-cyan-100">{info.icon}</div>
                                <h3 className="text-lg font-semibold mb-3">{info.title}</h3>
                                <div className="flex flex-col gap-2 text-sm text-cyan-50">
                                    {info.details.map((detail, idx) => (
                                        <span key={idx} className="leading-relaxed">
                                            {detail}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="relative primary-linear-gradient rounded-2xl p-6 md:p-12 shadow-2xl overflow-hidden mb-4"
                >
                    <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
                    <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl" />

                    <div className="relative z-10">
                        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">Get in touch with us</h2>
                        <Form form={form} name="contactForm" layout="vertical" onFinish={onFinish} className="max-w-4xl mx-auto">
                            {/* Name Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                <Form.Item
                                    name="firstName"
                                    rules={[{ required: true, message: "Please input your first name!" }]}
                                    className="mb-4"
                                >
                                    <Input
                                        placeholder="First Name"
                                        className="h-12 rounded-lg bg-white/10 border-white/20 text-white placeholder:text-gray-300 hover:bg-white/15 focus:bg-white/20 transition-all"
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="lastName"
                                    rules={[{ required: true, message: "Please input your last name!" }]}
                                    className="mb-4"
                                >
                                    <Input
                                        placeholder="Last Name"
                                        className="h-12 rounded-lg bg-white/10 border-white/20 text-white placeholder:text-gray-300 hover:bg-white/15 focus:bg-white/20 transition-all"
                                    />
                                </Form.Item>
                            </div>

                            {/* Email & Phone Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                <Form.Item
                                    name="email"
                                    rules={[
                                        { type: "email", message: "Please enter a valid email!" },
                                        { required: true, message: "Please input your email!" },
                                    ]}
                                    className="mb-4"
                                >
                                    <Input
                                        placeholder="Email Address"
                                        className="h-12 rounded-lg bg-white/10 border-white/20 text-white placeholder:text-gray-300 hover:bg-white/15 focus:bg-white/20 transition-all"
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="phoneNo"
                                    rules={[{ required: true, message: "Please input your phone number!" }]}
                                    className="mb-4"
                                >
                                    <Input
                                        placeholder="Phone Number"
                                        className="h-12 rounded-lg bg-white/10 border-white/20 text-white placeholder:text-gray-300 hover:bg-white/15 focus:bg-white/20 transition-all"
                                    />
                                </Form.Item>
                            </div>

                            {/* Message Field */}
                            <Form.Item
                                name="message"
                                rules={[{ required: true, message: "Please input your message!" }]}
                                className="mb-6"
                            >
                                <Input.TextArea
                                    rows={5}
                                    placeholder="Write your message here..."
                                    maxLength={500}
                                    showCount
                                    className="rounded-lg bg-white/10 border-white/20 text-white placeholder:text-gray-300 hover:bg-white/15 focus:bg-white/20 transition-all"
                                />
                            </Form.Item>

                            {/* Submit Button */}
                            <div className="flex items-center justify-center">
                                <Button
                                    // whileHover={{ scale: 1.05 }}
                                    // whileTap={{ scale: 0.95 }}
                                    loading={loading}
                                    htmlType="submit"
                                    className="inline-flex items-center gap-2 px-8 py-10 bg-white! text-blue-900! font-semibold rounded-lg hover:bg-cyan-50 transition-all duration-300 shadow-lg hover:shadow-xl h-14! w-2/4"
                                >
                                    Send Message
                                    <FiArrowRight className="w-5 h-5" />
                                </Button>
                            </div>
                        </Form>
                    </div>
                </motion.div>

                {/* Map Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl"
                >
                    <LeafletMap lat={24.86171} lng={67.06609} />
                </motion.div>

                {/* CTA Section */}
                <div className="mb-4">
                    <CtaSection title="Proactive Protection. Unwavering Support. Your Digital Security, Solved." />
                </div>
            </section>
        </section>
    )
}