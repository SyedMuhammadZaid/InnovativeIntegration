import Image from "next/image";
import logo from '../assets/images/logo.png'
import { BsFillCalendar2EventFill } from "react-icons/bs";
import { FaBook } from "react-icons/fa";
import { MdAutoStories } from "react-icons/md";
import { BsFillPersonBadgeFill } from "react-icons/bs";
import moment from "moment";
import { Col, Row } from "antd";
import { MdOutlineWork } from "react-icons/md";



export default function Home() {
  return (
    <div className="flex flex-col gap-8 min-h-screen">
      <div className="flex items-center justify-between">
        <h1 className="primary-heading">Welcome to Innovative Integration Admin Panel !</h1>
      </div>
      <Row className="gap-6">
        <Col xs={7} className="cursor-pointer px-5 py-6 rounded-md bg-white card-box-shadow hover:scale-105 transition-all ease-in-out delay-150 duration-200">
          <div className="flex items-center gap-5 justify-center">
            <BsFillCalendar2EventFill size={35} color="#3797BC" />
            <p className="text-2xl font-bold">20</p>
            <span className="text-lg font-semibold">Events</span>
          </div>
        </Col>

        <Col xs={7} className="cursor-pointer px-6 py-4 rounded-md bg-white card-box-shadow hover:scale-105 transition-all ease-in-out delay-150 duration-200">
          <div className="flex items-center gap-5 justify-center pt-2">
            <FaBook size={35} color="#3797BC" />
            <p className="text-2xl font-bold">20</p>
            <span className="text-lg font-semibold">Case Studies</span>
          </div>
        </Col>

        <Col xs={7} className="cursor-pointer px-5 py-6 rounded-md bg-white card-box-shadow hover:scale-105 transition-all ease-in-out delay-150 duration-200">
          <div className="flex items-center gap-5 justify-center">
            <MdAutoStories size={35} color="#3797BC" />
            <p className="text-2xl font-bold">20</p>
            <span className="text-lg font-semibold text-nowrap">Blogs</span>
          </div>
        </Col>

        <Col xs={7} className="cursor-pointer px-5 py-6 rounded-md bg-white card-box-shadow hover:scale-105 transition-all ease-in-out delay-150 duration-200">
          <div className="flex items-center gap-5 justify-center">
            <BsFillPersonBadgeFill size={35} color="#3797BC" />
            <p className="text-2xl font-bold">20</p>
            <span className="text-lg font-semibold text-nowrap">Careers</span>
          </div>
        </Col>

        <Col xs={7} className="cursor-pointer px-5 py-6 rounded-md bg-white card-box-shadow hover:scale-105 transition-all ease-in-out delay-150 duration-200">
          <div className="flex items-center gap-5 justify-center">
            <MdOutlineWork size={35} color="#3797BC" />
            <p className="text-2xl font-bold">20</p>
            <span className="text-lg font-semibold text-nowrap">Parent Projects</span>
          </div>
        </Col>

        <Col xs={7} className="cursor-pointer px-5 py-6 rounded-md bg-white card-box-shadow hover:scale-105 transition-all ease-in-out delay-150 duration-200">
          <div className="flex items-center gap-5 justify-center">
            <MdOutlineWork size={35} color="#3797BC" />
            <p className="text-2xl font-bold">20</p>
            <span className="text-lg font-semibold text-nowrap">Sub Projects</span>
          </div>
        </Col>

        <Col xs={7} className="cursor-pointer px-5 py-6 rounded-md bg-white card-box-shadow hover:scale-105 transition-all ease-in-out delay-150 duration-200">
          <div className="flex items-center gap-5 justify-center">
            <MdOutlineWork size={35} color="#3797BC" />
            <p className="text-2xl font-bold">20</p>
            <span className="text-lg font-semibold text-nowrap">Projects</span>
          </div>
        </Col>
      </Row>
    </div>
  );
}
