"use client";
import { Layout, Menu, MenuProps } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react'

const sideBarItems = ["events", "blogs", "casestudies", "careers", "projects"]

const menuItems = sideBarItems.map((item) => ({
    key: `/${item}`,
    label: item.charAt(0).toUpperCase() + item.slice(1),
}));

const CustomSider = ({ setIsBreakPointTrigger }: { setIsBreakPointTrigger: React.Dispatch<React.SetStateAction<boolean>> }) => {

    const router = useRouter();
    const pathname = usePathname();


    const onMenuClick = (info: any) => {
        router.replace(info.key);
    };

    return (
        <>
            <Sider
                width={250}
                style={{ position: 'fixed' }}
                className='fixed h-[100vh]'
                breakpoint="lg"
                onBreakpoint={(broken) => {
                    setIsBreakPointTrigger(broken)
                }}
                collapsedWidth="80px"
            >
                <Menu
                    mode="inline"
                    style={{ height: '100%', paddingTop:'10px' }}
                    items={menuItems}
                    onClick={onMenuClick}
                    selectedKeys={[pathname]} // highlight active route
                />
            </Sider>
        </>
    )
}

export default CustomSider