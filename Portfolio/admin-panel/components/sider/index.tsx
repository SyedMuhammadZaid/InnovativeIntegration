"use client";
import { Layout, Menu, MenuProps } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const sideBarItems = ["events", "blogs", "casestudies", "careers", "projects"]

const items2: MenuProps['items'] = sideBarItems.map(
    (item, index) => {
        return {
            key: `${index}`,
            label: `${item}`,
            path: `/${item}`
        };
    },
);

const CustomSider = ({ setIsBreakPointTrigger }: { setIsBreakPointTrigger: React.Dispatch<React.SetStateAction<boolean>> }) => {

    const router = useRouter();
    const menuItemClickHandler = (item: any) => {
        router.replace(item?.item?.props?.path)
    }

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
                    style={{ height: '100%' }}
                    items={items2}
                    onClick={menuItemClickHandler}
                />
            </Sider>
        </>
    )
}

export default CustomSider