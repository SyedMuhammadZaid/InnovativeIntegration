import { Layout } from 'antd';
import { Header } from 'antd/es/layout/layout';
import React from 'react'
import logo from '../../assets/images/logo.png'
import Image from 'next/image';
import Link from 'next/link';


const CustomHeader = () => {
  return (
    <Header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        background: '#3797BC'
      }}
    >
      <div className="demo-logo">
        <Link href={'/'}>
          <Image
            src={logo}
            alt="logo"
            width={200}
            height={100}
            className="w-[150px] h-[55px] mb-1 cursor-pointer"
          />
        </Link>
      </div>
    </Header>
  )
}

export default CustomHeader