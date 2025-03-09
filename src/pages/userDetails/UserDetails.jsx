import { ConfigProvider, Modal, Table } from "antd";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { MdArrowOutward } from "react-icons/md";

function UserDetails() {
  const [toggle, setToggle] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const dataSource = [
    {
      key: "1",
      no: "1",
      name: "Mr. Raju",
      date: "12/02/2025",
      phone: "+880 1340560614",
      email: "mrraju@gmail.com",
      location: "Banasree, Dhaka, Bangladesh",
    },
    {
      key: "2",
      no: "2",
      name: "Mr. Raju",
      date: "12/02/2025",
      phone: "+880 1340560614",
      email: "mrraju@gmail.com",
      location: "Banasree, Dhaka, Bangladesh",
    },
    {
      key: "3",
      no: "3",
      name: "Mr. Raju",
      date: "12/02/2025",
      phone: "+880 1340560614",
      email: "mrraju@gmail.com",
      location: "Banasree, Dhaka, Bangladesh",
    },
    {
      key: "4",
      no: "4",
      name: "Mr. Raju",
      date: "12/02/2025",
      phone: "+880 1340560614",
      email: "mrraju@gmail.com",
      location: "Banasree, Dhaka, Bangladesh",
    },
    {
      key: "5",
      no: "5",
      name: "Mr. Raju",
      date: "12/02/2025",
      phone: "+880 1340560614",
      email: "mrraju@gmail.com",
      location: "Banasree, Dhaka, Bangladesh",
    },
    {
      key: "6",
      no: "6",
      name: "Mr. Raju",
      date: "12/02/2025",
      phone: "+880 1340560614",
      email: "mrraju@gmail.com",
      location: "Banasree, Dhaka, Bangladesh",
    },
    {
      key: "7",
      no: "7",
      name: "Mr. Raju",
      date: "12/02/2025",
      phone: "+880 1340560614",
      email: "mrraju@gmail.com",
      location: "Banasree, Dhaka, Bangladesh",
    },
    {
      key: "8",
      no: "8",
      name: "Mr. Raju",
      date: "12/02/2025",
      phone: "+880 1340560614",
      email: "mrraju@gmail.com",
      location: "Banasree, Dhaka, Bangladesh",
    },
    {
      key: "9",
      no: "9",
      name: "Mr. Raju",
      date: "12/02/2025",
      phone: "+880 1340560614",
      email: "mrraju@gmail.com",
      location: "Banasree, Dhaka, Bangladesh",
    },
    {
      key: "10",
      no: "10",
      name: "Mr. Raju",
      date: "12/02/2025",
      phone: "+880 1340560614",
      email: "mrraju@gmail.com",
      location: "Banasree, Dhaka, Bangladesh",
    },
  ];
  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <button className="" onClick={showModal}>
          <MdArrowOutward className="text-[#4289FF] w-10 h-10" />
        </button>
      ),
    },
  ];

  return (
    <div>
      <div className="my-5 md:my-10 flex flex-col md:flex-row gap-5 justify-between items-center">
        <div className="flex gap-5">
          <div className="flex items-center gap-[10px]">
            <div
              className={` w-[25px] h-[25px] border border-[#00C0B5]  rounded-full flex items-center justify-center cursor-pointer `}
              onClick={() => setToggle(!toggle)}
            >
              <div
                className={`${
                  toggle
                    ? "bg-[#00C0B5] scale-[1]"
                    : "bg-transparent scale-[0.7]"
                } w-[25px] h-[25px] transition-all duration-200 rounded-full `}
              ></div>
            </div>
            <p
              className="text-[1.2rem] font-bold text-text cursor-pointer"
              onClick={() => setToggle(!toggle)}
            >
              All User
            </p>
          </div>
          <div className="flex items-center gap-[10px]">
            <div
              className={` w-[25px] h-[25px] border border-[#00C0B5]  rounded-full flex items-center justify-center cursor-pointer `}
              onClick={() => setToggle(!toggle)}
            >
              <div
                className={`${
                  toggle
                    ? "bg-[#00C0B5] scale-[1]"
                    : "bg-transparent scale-[0.7]"
                } w-[25px] h-[25px] transition-all duration-200 rounded-full `}
              ></div>
            </div>
            <p
              className="text-[1.2rem] font-bold text-text cursor-pointer"
              onClick={() => setToggle(!toggle)}
            >
              Service Provider
            </p>
          </div>
        </div>
        <div className="relative w-full sm:w-[300px] mt-5 md:mt-0 lg:mt-0">
          <input
            type="text"
            placeholder="Search..."
            className="border border-[#e5eaf2] py-3 pl-12 pr-[65px] outline-none w-full rounded-md"
          />
          <span className=" text-gray-500 absolute top-0 left-0 h-full px-5 flex items-center justify-center rounded-r-md cursor-pointer">
            <IoSearch className="text-[1.3rem]" />
          </span>
        </div>
      </div>
      <ConfigProvider
        theme={{
          components: {
            InputNumber: {
              activeBorderColor: "rgb(19,194,194)",
            },
            Pagination: {
              colorPrimaryBorder: "rgb(19,194,194)",
              colorBorder: "rgb(19,194,194)",
              colorPrimaryHover: "rgb(19,194,194)",
              colorBgTextActive: "rgb(19,194,194)",
              colorTextDisabled: "rgb(19,194,194)",
              colorTextPlaceholder: "rgb(19,194,194)",
              itemActiveBgDisabled: "rgb(255,255,255)",
              colorPrimary: "rgb(19,194,194)",
            },
            Table: {
              headerBg: "rgb(19,194,194)",
              headerColor: "rgb(255,255,255)",
              cellFontSize: 20,
              headerSplitColor: "rgb(19,194,194)",
            },
          },
        }}
      >
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{ pageSize: 5 }}
          scroll={{ x: "max-content" }}
        />
        <Modal
          open={isModalOpen}
          centered
          onCancel={handleCancel}
          footer={null}
        >
          <div className="flex flex-col justify-center items-center p-5">
            <h1 className="text-xl text-center text-[#00C0B5]">
              Are you sure !
            </h1>
            <p>Do you want to Block your Users profile ?</p>
            <div className="text-center py-5">
              <button
                onClick={handleOk}
                className="bg-[#00c0b5] text-white font-semibold w-full py-2 px-5 rounded transition duration-200"
              >
                CONFIRM
              </button>
            </div>
          </div>
        </Modal>
      </ConfigProvider>
    </div>
  );
}

export default UserDetails;
