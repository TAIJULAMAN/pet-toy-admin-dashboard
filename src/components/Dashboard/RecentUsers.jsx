import { ConfigProvider, Modal, Table } from "antd";
import { useState } from "react";
import { MdArrowOutward } from "react-icons/md";

const RecentUsers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

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
  ];

  const columns = [
    { title: "No", dataIndex: "no", key: "no" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Phone Number", dataIndex: "phone", key: "phone" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Location", dataIndex: "location", key: "location" },
    {
      title: "Action",
      key: "action",
      render: () => (
        <button onClick={showModal}>
          <MdArrowOutward className="text-[#FF0000] w-8 h-8" />
        </button>
      ),
    },
  ];

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#FF0000",
              headerColor: "rgb(255,255,255)",
              cellFontSize: 20,
              // headerSplitColor: "rgb(19,194,194)",
            },
          },
        }}
      >
        {/* Wrap table in an overflow div for X-axis scrolling */}
        <div className="overflow-x-auto">
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={{ pageSize: 5 }}
            scroll={{ x: "max-content" }}
          />
        </div>

        {/* Modal */}
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
                className="bg-[#FF0000] text-white font-semibold w-1/3 py-2 px-5 rounded transition duration-200"
              >
                CONFIRM
              </button>
            </div>
          </div>
        </Modal>
      </ConfigProvider>
    </>
  );
};

export default RecentUsers;
