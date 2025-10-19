'use client';
import { useState } from "react";
import { Layout } from "antd";
import { CustomHeader, CustomSider } from '@/components';
import { Content, Footer } from "antd/es/layout/layout";
import { useRouter } from "next/navigation";

export default function Home(
    {
        children,
    }: Readonly<{
        children: React.ReactNode;
    }>
) {

    const [isBreakPointTrigger, setIsBreakPointTrigger] = useState(false);
    const router = useRouter()

    const logoutHandler = () => {
        localStorage.removeItem("token");
        router.replace("/login");
    }

    return (
        <Layout>
            <CustomHeader logoutHandler={logoutHandler} />
            <Layout>
                <CustomSider setIsBreakPointTrigger={setIsBreakPointTrigger} />
                <Content style={{ marginLeft: `${isBreakPointTrigger ? "80px" : "240px"}`, overflow: 'auto' }} className="px-6 py-4 min-h-screen bg-gray-100">
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
}
