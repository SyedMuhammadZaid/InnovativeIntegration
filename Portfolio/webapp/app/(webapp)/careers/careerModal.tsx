"use client";

import { Modal, Input, Upload, Button, Form } from "antd";
import { UploadOutlined, CloseOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { useState } from "react";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import PrimaryButton from "@/components/shared/button/primaryButton/primaryButton";
import emailjs from "emailjs-com";

interface Props {
    open: boolean;
    onClose: () => void;
    role: string;                 // e.g. "Accounts Manager"
    department: string;           // e.g. "Sales & Marketing"
    qualification: string;        // e.g. "BCS, MCS Preferably MBA"
}

export const sendCareerEmail = async (data: any) => {
    const templateParams = {
        first_name: data.firstName,
        last_name: data.lastName,
        message: data.message,
        resume_file: data.resumeBase64,   // base64 file
    };
    try {
        await emailjs.send(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_0489bma",
            process.env.NEXT_PUBLIC_EMAILJS_CAREER_TEMPLATE_ID! || "",
            templateParams,
            process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "JCB0PpUkcLxufJh9Z"
        );
        console.log("Career email sent successfully!");
    }
    catch (error) {
        console.log("Career email sending error:", error);
    }
};

export default function CareerApplicationModal({
    open,
    onClose,
    role,
    department,
    qualification,
}: Props) {

    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const handleFinish = async (values: any) => {
        setLoading(true);

        const fileObj = values.cv[0].originFileObj;

        const toBase64 = (file: File) =>
            new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = (error) => reject(error);
            });

        const resumeBase64 = await toBase64(fileObj);

        const payload = {
            firstName: values.firstName,
            lastName: values.lastName,
            message: values.message,
            resumeBase64,
        };

        // ⬅ Now send email
        await sendCareerEmail(payload);

        setLoading(false);
        form.resetFields();
        onClose();
    };


    const validateFile = (_: any, value: any) => {
        if (!value || value.length === 0) {
            return Promise.reject("CV is required");
        }

        const file = value[0].originFileObj;

        const allowed = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];

        if (!allowed.includes(file.type)) {
            return Promise.reject("Only PDF or Word files are allowed.");
        }

        return Promise.resolve();
    };

    return (
        <Modal
            open={open}
            footer={null}
            closeIcon={false}
            onCancel={onClose}
            centered
            width={750}
            className="p-0"
        >
            {/* Animation Wrapper */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
                className="relative"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute right-3 top-3 text-gray-500 hover:text-black"
                >
                    <CloseOutlined />
                </button>

                {/* Header */}
                <div className="mb-4">
                    <h2 className="text-xl font-semibold">{role}</h2>
                    <p className="text-sm text-blue-500">{department}</p>
                    <p className="text-sm text-gray-600">{qualification}</p>
                </div>

                {/* Form */}
                {/* FORM */}
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleFinish}
                    className="mt-4"
                >
                    <div className="grid grid-cols-2 gap-4">
                        <Form.Item
                            name="firstName"
                            rules={[{ required: true, message: "First name is required" }]}
                        >
                            <Input placeholder="First Name" size="large" />
                        </Form.Item>

                        <Form.Item
                            name="lastName"
                            rules={[{ required: true, message: "Last name is required" }]}
                        >
                            <Input placeholder="Last Name" size="large" />
                        </Form.Item>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-3">
                        <Form.Item
                            name="cv"
                            valuePropName="fileList"
                            getValueFromEvent={(e) => e.fileList}
                            rules={[{ validator: validateFile }]}
                        >
                            <Upload
                                beforeUpload={() => false}
                                accept=".pdf,.doc,.docx"
                                maxCount={1}
                            >
                                <Button
                                    icon={<UploadOutlined />}
                                    className="w-full h-[50px] flex items-center justify-center bg-[#0857B4] text-white rounded-lg"
                                >
                                    Upload CV
                                </Button>
                            </Upload>
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
                            className="rounded-xl"
                        />
                    </Form.Item>

                    {/* Submit Button */}
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
    );
}
