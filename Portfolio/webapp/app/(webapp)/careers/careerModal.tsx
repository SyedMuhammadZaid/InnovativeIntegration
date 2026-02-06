"use client";

import { Modal, Input, Upload, Button, Form } from "antd";
import { UploadOutlined, CloseOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { useState } from "react";
import emailjs from "emailjs-com";
import useMessage from "@/utils/hooks/useMessage";

interface Props {
    open: boolean;
    onClose: () => void;
    role: string;
    department: string;
    qualification: string;
}

export default function CareerApplicationModal({
    open,
    onClose,
    role,
    department,
    qualification,
}: Props) {
    const [loading, setLoading] = useState(false);
    const { successMsg, errorMsg, contextHolder } = useMessage();

    const [form] = Form.useForm();

    // Send email using sendForm
    const handleFinish = async () => {
        setLoading(true);

        try {
            const formElement = document.getElementById("career-form") as HTMLFormElement;
            await emailjs.sendForm(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID_CAREERS!,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_CAREERS!,
                formElement,
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY_CAREERS!
            );

            successMsg("Thanks for applying! You will receive an email shortly.");
            form.resetFields();
            onClose();
        } catch (error) {
            console.error(error);
            errorMsg("Something went wrong. Please try again.");
        }

        setLoading(false);
    };

    return (
        <div>
            {contextHolder}
            <Modal
                open={open}
                footer={null}
                closeIcon={false}
                onCancel={onClose}
                centered
                width={750}
                className="p-0"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.25 }}
                    className="relative"
                >
                    <button
                        onClick={onClose}
                        className="absolute right-3 top-3 text-gray-500 hover:text-black"
                    >
                        <CloseOutlined />
                    </button>

                    <div className="mb-4">
                        <h2 className="text-xl font-semibold">{role}</h2>
                        <p className="text-sm text-blue-500">{department}</p>
                        <p className="text-sm text-gray-600">{qualification}</p>
                    </div>

                    {/* FORM */}
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleFinish}
                        className="mt-4"
                        id="career-form"
                    >
                        {/* Hidden inputs for role and department */}
                        <input type="hidden" name="role" value={role} />
                        <input type="hidden" name="department" value={department} />

                        {/* First Name / Last Name / Email / Message / Resume */}
                        <div className="grid grid-cols-2 gap-4">
                            <Form.Item
                                name="first_name"
                                rules={[{ required: true, message: "First name is required" }]}
                            >
                                <Input name="first_name" placeholder="First Name" size="large" />
                            </Form.Item>

                            <Form.Item
                                name="last_name"
                                rules={[{ required: true, message: "Last name is required" }]}
                            >
                                <Input name="last_name" placeholder="Last Name" size="large" />
                            </Form.Item>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-3">
                            <Form.Item
                                name="email"
                                rules={[{ required: true, message: "Email is required" }]}
                            >
                                <Input type="email" name="email" placeholder="Email" size="large" />
                            </Form.Item>

                            <Form.Item
                                name="resumeUrl"
                                rules={[
                                    { required: true, message: "Resume URL is required" },
                                    {
                                        validator: (_, value) => {
                                            if (!value) return Promise.reject("Resume URL is required");

                                            try {
                                                new URL(value.trim());
                                                return Promise.resolve();
                                            } catch {
                                                return Promise.reject("Enter a valid URL");
                                            }
                                        }
                                    }
                                ]}
                            >
                                <Input
                                    name="resumeUrl"   // ✅ IMPORTANT
                                    placeholder="Paste Resume URL (Google Drive, Dropbox, Portfolio, etc.)"
                                    size="large"
                                    onBlur={(e) => {
                                        form.setFieldsValue({ resumeUrl: e.target.value.trim() });
                                    }}
                                />

                                <small className="text-xs text-gray-500 mt-1">
                                    Paste a public Google Drive / Dropbox / Portfolio resume link
                                </small>
                            </Form.Item>

                        </div>

                        <Form.Item
                            name="message"
                            rules={[{ required: true, message: "Please enter a message" }]}
                            className="mt-3"
                        >
                            <Input.TextArea
                                placeholder="Why you want to join us."
                                rows={4}
                                name="message"
                                className="rounded-xl"
                            />

                        </Form.Item>


                        <div className="mt-6 flex justify-start">
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                                className="!bg-[#0857B4] !h-10 !px-6 rounded-full text-white"
                            >
                                Submit ➤
                            </Button>
                        </div>
                    </Form>

                </motion.div>
            </Modal>
        </div>
    );
}
