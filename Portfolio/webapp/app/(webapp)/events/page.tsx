'use client';
import Banner from "@/components/shared/banner/banner";
import { useLoader } from "@/components/shared/loadingContext/loaderContext";
import { createEventRegister, getCompletedEvents, getEvents, getUpcomingEvents } from "@/utils/apis/event";
import Image from "next/image";
import { useEffect, useState } from "react"
import eventThumbnail from "@/assets/images/eventThumbnail.png";
import { motion } from "framer-motion";
import { MdLocationOn } from "react-icons/md";
import SecondaryButton from "@/components/shared/button/secondaryButton/secondaryButton";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { IoChevronBackCircle } from "react-icons/io5";
import { IoChevronForwardCircle } from "react-icons/io5";
import dayjs from "dayjs";
import { Form, Modal, FormItemProps, Input, Select } from "antd";
import PrimaryButton from "@/components/shared/button/primaryButton/primaryButton";
import useMessage from "@/utils/hooks/useMessage";
import CustomPagination from "@/components/shared/pagination/pagination";
import { FaArrowAltCircleRight } from "react-icons/fa";
import Link from "next/link";
import project2 from "@/assets/images/project-2.png"
import emailjs from "emailjs-com";


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

const sendEventEmail = async (data: any) => {
    const templateParams = {
        user_name: data.name,
        user_email: data.email,
        event_title: data.title,
        event_description: data.description,
        event_location: data.location,
        event_date: data.date,
        event_time: data.time,
    };

    try {
        await emailjs.send(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_0489bma",
            process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_2jmqb2c",
            templateParams,
            process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "JCB0PpUkcLxufJh9Z"
        );
        console.log("Email sent successfully!");
    }
    catch (error) {
        console.log("Email sending error:", error);
    }
};

export default function Events() {

    const [events, setEvents] = useState<any[]>([]);
    const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<any>(null);
    const [filters, setFilters] = useState({
        total: 0,
        limit: 6,
        current: 1,
        offset: 0
    });

    const { showLoader, hideLoader } = useLoader();
    const { successMsg, errorMsg, contextHolder } = useMessage();
    const [form] = Form.useForm();

    console.log(events);

    // getting upcoming events.
    useEffect(() => {
        (async () => {
            try {
                showLoader()
                let upcomingEvents: any = await getUpcomingEvents();
                if (upcomingEvents?.success) {
                    setUpcomingEvents(upcomingEvents?.data);
                }
            } catch (error) {
                console.log(error)
            }
            finally {
                hideLoader()
            }
        })()
    }, [])

    // getting all events except upcoming.
    useEffect(() => {
        (async () => {
            try {
                showLoader()
                let allEvents: any = await getCompletedEvents({ limit: filters.limit, offset: filters.offset });
                if (allEvents?.success) {
                    const allEventsExceptUpcoming = allEvents?.data?.events?.filter((item: any) => item?.status !== 'UPCOMING');
                    setEvents(allEventsExceptUpcoming);
                    setFilters({ ...filters, total: allEventsExceptUpcoming?.count });
                }
            } catch (error) {
                console.log(error)
            }
            finally {
                hideLoader()
            }
        })()
    }, [filters.offset])

    const paginationChangeHandler = (page: number, pageSize: number) => {
        let offset = (page - 1) * filters.limit;
        setFilters({ ...filters, current: page, offset })
    }

    const navigateBackHandler = () => {
        if (activeIndex == 0) return
        setActiveIndex(prev => prev - 1)
    }

    const navigateForwardHandler = () => {
        if (activeIndex == upcomingEvents?.length - 1) return
        setActiveIndex(prev => prev + 1)
    }

    const registerHandler = (event: any) => {
        setModalOpen(true);
        setSelectedEvent(event);
    }

    const onFinish = async () => {
        const currentValues = form.getFieldsValue();
        const { firstName, lastName, email, phoneNo } = currentValues;
        const payload = {
            firstName,
            lastName,
            email,
            phoneNo,
            eventId: selectedEvent?.id
        }

        if (!firstName || !lastName || !email || !phoneNo) {
            form.submit();
            return
        }
        try {
            showLoader()
            let res: any = await createEventRegister(payload);
            if (res?.success) {
                successMsg("Thanks for Registering, You will receive an email shortly!");
                await sendEventEmail({
                    name: firstName,
                    email: email,
                    title: selectedEvent?.title,
                    description: selectedEvent?.description,
                    location: selectedEvent?.location,
                    date: `${dayjs(selectedEvent?.eventDate)?.format("MMMM") + '-' + dayjs(selectedEvent?.eventDate)?.format("DD")}`,
                    time: `${dayjs(selectedEvent?.eventTime)?.format("hh") + ":" + dayjs(selectedEvent?.eventTime).format("mm") + " " + dayjs(selectedEvent?.eventTime)?.format("A")}`
                }
                )
            }
        }
        catch (error: any) {
            console.log(error?.response?.data?.error);
            errorMsg(error?.response?.data?.error);
        }
        finally {
            hideLoader();
            setModalOpen(false);
            form.resetFields();
        }
    }

    return (

        <section className="flex flex-col gap-3 justify-start min-h-screen bg-[#F2F2F5]">
            {contextHolder}
            <Banner title="Innovate With Us. Join Our Events" content="Our mission goes beyond providing top-notch security services. It's about inspiring change and connecting with our community. Join our exclusive events to engage with experts, explore cutting-edge solutions, and network with peers." />
            <section className="container py-6! flex flex-col gap-8">
                {
                    upcomingEvents?.length > 0 &&
                    <div className="flex flex-col gap-3 p-3">
                        {
                            upcomingEvents?.map((upcomingEvent, index) => {
                                if (index == activeIndex) {
                                    return (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.1 }}
                                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-fit mx-auto sm:mx-0"
                                        >
                                            <div className="relative col-span-1">
                                                <Image src={eventThumbnail} alt="eventThumbnail" width={500} height={500} className="w-[420px] h-[420px] object-center object-cover rounded-xl cursor-pointer" />
                                                <div className="absolute bottom-0 left-0">
                                                    <motion.div
                                                        key={upcomingEvent?.id}
                                                        initial={{ opacity: 0, y: 30 }}
                                                        whileInView={{ opacity: 1, y: 0 }}
                                                        whileHover={{ y: -6 }}
                                                        viewport={{ once: true }}
                                                        transition={{ delay: 0.1 }}
                                                        className="flex flex-col md:flex-row items-start md:items-center gap-4 p-5"
                                                    >
                                                        {/* date */}
                                                        <div className="bg-white rounded-md events-card-shadow flex flex-col px-6 py-4 cursor-pointer">
                                                            <span className="font-semibold text-lg">{dayjs(upcomingEvent?.eventDate)?.format("MMMM")}</span>
                                                            <span className="font-semibold text-lg">{dayjs(upcomingEvent?.eventDate)?.format("DD")}</span>
                                                            <span className="font-semibold text-lg">{dayjs(upcomingEvent?.eventTime)?.format("hh") + ":" + dayjs(upcomingEvent?.eventTime).format("mm") + " " + dayjs(upcomingEvent?.eventTime)?.format("A")}</span>
                                                        </div>
                                                    </motion.div>
                                                </div>
                                            </div>
                                            <div className="col-span-1 lg:col-span-2 primary-linear-gradient p-6 rounded-xl">
                                                <div className="flex flex-col gap-4 w-full text-white justify-start items-start h-full">
                                                    <p className="font-semibold text-sm tracking-wider">IGNITE YOUR PASSION</p>
                                                    <span className="text-3xl font-semibold">{upcomingEvent?.title}</span>
                                                    <p className="text-sm w-full h-[150px] overflow-y-auto">
                                                        {upcomingEvent?.description}
                                                    </p>
                                                    {/* info */}
                                                    <div className="mt-auto self-start flex flex-col gap-3 w-full">
                                                        <div className="flex flex-col text-white w-full">
                                                            <span className="text-sm flex items-center gap-2 w-full">
                                                                <MdLocationOn size={20} />
                                                                {upcomingEvent?.location}
                                                            </span>
                                                        </div>
                                                        <SecondaryButton
                                                            text='Register Now'
                                                            onClick={() => registerHandler(upcomingEvent)}
                                                            className='secondary-btn w-fit'
                                                            icon={<IoIosArrowDroprightCircle size={18} className='mt-1' />}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                        </motion.div>
                                    )
                                }
                            })
                        }

                        <div className="w-full flex items-center justify-center gap-4">
                            <IoChevronBackCircle onClick={navigateBackHandler} size={30} className="primary-text-color smooth-scaling-icon cursor-pointer" />
                            <IoChevronForwardCircle onClick={navigateForwardHandler} size={30} className="primary-text-color smooth-scaling-icon cursor-pointer" />
                        </div>
                    </div>
                }
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className='flex flex-col justify-center md:items-start items-center text-center flex-wrap'>
                        <span className="about-section">EVENTS</span>
                        <h2 className='section-first-heading leading-9!'>
                            Explore Our Latest Events
                        </h2>
                    </div>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4  mx-auto sm:mx-0 gap-6">
                    {
                        events.map((event, index) => {
                            if (event?.status !== 'CANCELLED') {
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        whileHover={{ y: -10 }}
                                        transition={{ delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        className="cursor-pointer"
                                    >
                                        <Link href={`/events/${String(event?.id)}`}>
                                            <div className="relative w-[300px] md:w-[250px] h-[300px]">
                                                <div className="absolute top-0 left-0 w-full h-full z-10">
                                                    <Image src={project2 || `${process.env.NEXT_PUBLIC_IMAGE_URL_PREFIX}${event?.imageUrl}`} alt="eventImg" width={400} height={400} className="w-full h-full rounded-2xl" />
                                                </div>

                                                <div className="absolute w-full h-full z-20 blogcard-layer opacity-30 rounded-2xl object-cover" />

                                                <div className="absolute top-0 left-0 z-40 p-3 text-white">
                                                    {dayjs(event?.eventDate)?.format('MMM DD, YYYY')}
                                                </div>

                                                <div className="rounded-bl-2xl rounded-br-2xl z-30 absolute bottom-0 p-3 flex flex-col gap-2 items-center justify-between w-full bg-black/50">
                                                    {/* bg-black/50 → black with 50% opacity but text remains crisp */}

                                                    <div className="w-full flex items-center justify-between z-50">
                                                        <p className="text-white max-w-[180px] truncate">
                                                            {event?.title}
                                                        </p>

                                                        <FaArrowAltCircleRight size={22} className="text-white" />
                                                    </div>

                                                    <div className="w-full z-50">
                                                        <p className="text-gray-200 text-sm line-clamp-2">
                                                            {event?.description}
                                                        </p>
                                                    </div>
                                                </div>

                                            </div>
                                        </Link>
                                    </motion.div>
                                )
                            }
                        })
                    }
                </div>
                <div>
                    {
                        events?.length > 0 &&
                        <CustomPagination
                            current={filters.current}
                            total={filters.total}
                            pageSize={filters.limit}
                            paginationChange={paginationChangeHandler}
                        />
                    }
                </div>
            </section>

            <Modal
                title="Event Registration Form"
                open={modalOpen}
                centered
                onCancel={() => setModalOpen(false)}
                footer={false}
                destroyOnHidden={true}
            >
                <div className='flex flex-col gap-3'>
                    <span className='text-2xl primary-text-color'> {selectedEvent?.title}</span>
                    <Form
                        form={form}

                        name="eventRegistration" layout="vertical" className="flex flex-col gap-0">
                        <div className="grid grid-cols-2 gap-3">
                            <Form.Item
                                name="firstName"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your First Name!',
                                    },
                                ]}
                            >
                                <Input placeholder="first name" />
                            </Form.Item>
                            <Form.Item
                                name="lastName"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Last Name!',
                                    },
                                ]}
                            >
                                <Input placeholder="last name" />
                            </Form.Item>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <Form.Item
                                name="email"
                                rules={[
                                    {
                                        type: 'email',
                                        message: 'The input is not valid E-mail!',
                                    },
                                    {
                                        required: true,
                                        message: 'Please input your E-mail!',
                                    },
                                ]}
                            >
                                <Input placeholder="email" />
                            </Form.Item>
                            <Form.Item
                                name="phoneNo"
                                rules={[{ required: true, message: 'Please input your phone number!' }]}

                            >
                                <Input placeholder="phone number" addonBefore={prefixSelector} style={{ width: '100%' }} />
                            </Form.Item>
                        </div>

                        <PrimaryButton
                            text='Submit'
                            className='w-fit primary-btn inline-flex!'
                            onClick={() => onFinish()}
                            icon={<IoIosArrowDroprightCircle size={18} className='mt-1' />}
                        />
                    </Form>
                </div>
            </Modal>
        </section >
    )
}