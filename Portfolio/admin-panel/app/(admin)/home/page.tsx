'use client';
import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Spin } from 'antd';
import {
    BsFillCalendar2EventFill,
    BsFillPersonBadgeFill
} from "react-icons/bs";
import { FaBook } from "react-icons/fa";
import { MdAutoStories, MdOutlineWork } from "react-icons/md";
import Link from 'next/link';
import { apiClient } from '@/Utils/apiClient';

const countersData = [
    {
        title: 'Events',
        count: 0,
        icon: BsFillCalendar2EventFill,
        gradient: 'from-blue-500 to-cyan-500',
        bgColor: 'bg-blue-50',
        iconColor: 'text-blue-600'
    },
    {
        title: 'Case Studies',
        count: 0,
        icon: FaBook,
        gradient: 'from-emerald-500 to-teal-500',
        bgColor: 'bg-emerald-50',
        iconColor: 'text-emerald-600'
    },
    {
        title: 'Blogs',
        count: 0,
        icon: MdAutoStories,
        gradient: 'from-purple-500 to-indigo-500',
        bgColor: 'bg-purple-50',
        iconColor: 'text-purple-600'
    },
    {
        title: 'Careers',
        count: 0,
        icon: BsFillPersonBadgeFill,
        gradient: 'from-orange-500 to-red-500',
        bgColor: 'bg-orange-50',
        iconColor: 'text-orange-600'
    },
    {
        title: 'Parent Projects',
        count: 0,
        icon: MdOutlineWork,
        gradient: 'from-pink-500 to-rose-500',
        bgColor: 'bg-pink-50',
        iconColor: 'text-pink-600'
    },
    {
        title: 'Sub Projects',
        count: 0,
        icon: MdOutlineWork,
        gradient: 'from-yellow-500 to-amber-500',
        bgColor: 'bg-yellow-50',
        iconColor: 'text-yellow-600'
    },
    {
        title: 'Projects',
        count: 0,
        icon: MdOutlineWork,
        gradient: 'from-violet-500 to-purple-500',
        bgColor: 'bg-violet-50',
        iconColor: 'text-violet-600'
    }
];

const getAllEvents = () => {
    return apiClient.get(`/event/getAllEvents`)
}

const getAllBlogs = () => {
    return apiClient.get(`/blog/getAllBlogs`);
}

const getAllCaseStudies = () => {
    return apiClient.get(`/casestudy/getAllCaseStudies`);
}

const getAllCareers = () => {
    return apiClient.get(`/career/getAllCareers`)
}

const getAllSubProjects = () => {
    return apiClient.get(`/project/sub-project/getAllSubProjects`)
}

const getAllProjects = () => {
    return apiClient.get(`/project/getAllProjects`)
}

export default function Home() {


    const [countersDataRecords, setCounterDataRecords] = useState(countersData);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                const [events, blogs, careers, caseStudies, projects, subProjects]: any = await Promise.all(
                    [getAllEvents(),
                    getAllBlogs(),
                    getAllCareers(),
                    getAllCaseStudies(),
                    getAllProjects(),
                    getAllSubProjects()]
                );

                let updatedRecords = countersDataRecords;
                for (let item of updatedRecords) {
                    switch (item.title) {
                        case 'Events':
                            item.count = events?.data?.events?.length
                            break;
                        case 'Blogs':
                            item.count = blogs?.data?.blogs?.length
                            break;
                        case 'Careers':
                            item.count = careers?.data?.length
                            break;
                        case 'Case Studies':
                            item.count = caseStudies?.data?.length
                            break;
                        case 'Parent Projects':
                            item.count = 6
                            break;
                        case 'Sub Projects':
                            item.count = subProjects?.data?.length
                            break;
                        case 'Projects':
                            item.count = projects?.data?.length
                            break;
                        default:
                            break;
                    }
                }
                setCounterDataRecords(updatedRecords)
            }
            catch (error) {
                console.log(error)
            }
            finally {
                setLoading(false)
            }
        })()
    }, [])

    console.log(countersDataRecords)

    return (
        <div className="flex flex-col gap-8 p-4">
            <Spin spinning={loading} fullscreen />
            <div className="flex items-center justify-between">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent pb-2">
                    Welcome to Innovative Integration Admin Panel!
                </h1>
            </div>

            <Row gutter={[24, 24]}>
                {countersDataRecords.map((counter, index) => {
                    const IconComponent = counter.icon;
                    return (
                        <Col xs={24} sm={12} md={8} lg={6} key={index}>
                            <Card
                                className={`
                  group relative overflow-hidden border-0 bg-white/60 backdrop-blur-sm 
                  hover:bg-white/80 transition-all duration-300 hover:scale-105 hover:-translate-y-1 
                  cursor-pointer shadow-lg hover:shadow-xl hover:shadow-black/10
                  before:absolute before:inset-0 before:bg-gradient-to-br before:${counter.gradient} 
                  before:opacity-0 hover:before:opacity-5 before:transition-opacity before:duration-300
                `}
                                bodyStyle={{ padding: '24px' }}
                            >
                                {/* Background decoration */}
                                <div className={`
                  absolute -top-4 -right-4 w-24 h-24 rounded-full opacity-10 
                  transition-all duration-300 group-hover:opacity-20 group-hover:scale-110
                  bg-gradient-to-br ${counter.gradient}
                `} />

                                {/* Content */}
                                <div className="relative z-10 flex items-center justify-between">
                                    <div className="flex-1">
                                        <div className={`
                      inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 
                      transition-all duration-300 group-hover:scale-110 ${counter.bgColor}
                    `}>
                                            <IconComponent className={`text-2xl ${counter.iconColor}`} />
                                        </div>

                                        <div className="space-y-1">
                                            <p className="text-3xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors">
                                                {counter.count.toLocaleString()}
                                            </p>
                                            <p className="text-sm font-medium text-gray-600 group-hover:text-gray-700 transition-colors">
                                                {counter.title}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Trend indicator */}
                                    <div className="flex flex-col items-end">
                                        <div className="px-2 py-1 rounded-full text-xs font-medium transition-all duration-300 group-hover:scale-105 bg-green-100 text-green-700">
                                            +12%
                                        </div>
                                        <span className="text-xs text-gray-500 mt-1">vs last month</span>
                                    </div>
                                </div>

                                {/* Bottom accent line */}
                                <div className={`
                  absolute bottom-0 left-0 h-1 w-0 group-hover:w-full 
                  transition-all duration-500 ease-out bg-gradient-to-r ${counter.gradient}
                `} />
                            </Card>
                        </Col>
                    );
                })}
            </Row>

            {/* quick actions */}
            <div className="">
                <Row gutter={[24, 24]}>
                    {/* Recent Activity Section */}

                    {/* Quick Actions Section */}
                    <Col xs={24} lg={24}>
                        <Card
                            className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                            bodyStyle={{ padding: '24px' }}
                        >
                            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-white"></div>
                                Quick Actions
                            </h3>
                            <div className="space-y-3">
                                {[
                                    { action: 'Add New Event', icon: '📅', color: 'hover:bg-white/20', link: '/events' },
                                    { action: 'Create Blog Post', icon: '✍️', color: 'hover:bg-white/20', link: '/blogs' },
                                    { action: 'Upload Case Study', icon: '📋', color: 'hover:bg-white/20', link: '/casestudies' },
                                    { action: 'Post New Career', icon: '🚀', color: 'hover:bg-white/20', link: '/careers' },
                                    { action: 'Add Project', icon: '💡', color: 'hover:bg-white/20', link: '/sub-projects' },
                                ].map((item, index) => (
                                    <Link href={item.link} style={{ color: 'black' }} key={index}>
                                        <button
                                            className={`w-full cursor-pointer p-3 rounded-lg bg-white/10 ${item.color} transition-all duration-200 text-left font-medium backdrop-blur-sm hover:scale-[1.02] hover:shadow-md flex items-center gap-3`}
                                        >
                                            <span className="text-lg">{item.icon}</span>
                                            {item.action}
                                        </button>
                                    </Link>
                                ))}
                            </div>

                            {/* Additional Quick Stats */}
                            <div className="mt-6 pt-4 border-t border-white/20">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="opacity-80">System Status</span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-green-400"></div>
                                        <span>All systems operational</span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>

        </div>
    );
}
