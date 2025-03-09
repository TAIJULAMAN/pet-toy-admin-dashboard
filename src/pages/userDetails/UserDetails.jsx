import { ConfigProvider, Modal, Table } from "antd";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { MdArrowOutward } from "react-icons/md";

function UserDetails() {
  // const [toggle, setToggle] = useState(false);
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
          <MdArrowOutward className="text-[#FF0000] w-10 h-10" />
        </button>
      ),
    },
  ];

  return (
    <div>
      <div className="my-5 md:my-10 flex justify-end items-end">
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
              colorPrimaryBorder: "#FF0000",
              colorBorder: "#FF0000",
              colorPrimaryHover: "#FF0000",
              colorBgTextActive: "rgb(19,194,194)",
              colorTextDisabled: "rgb(19,194,194)",
              colorTextPlaceholder: "#FF0000",
              itemActiveBgDisabled: "#FF0000",
              colorPrimary: "#FF0000",
            },
            Table: {
              headerBg: "#FF0000",
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
          <div className="flex flex-col justify-center items-center py-10">
            <h1 className="text-3xl text-center text-[#FF0000]">
              Are you sure!
            </h1>
            <p className="text-xl text-center mt-5">Do you want to block this user profile?</p>
            <div className="text-center py-5 w-full">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-[#FF0000] text-white font-semibold w-1/3 py-3 px-5 rounded-lg"
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
