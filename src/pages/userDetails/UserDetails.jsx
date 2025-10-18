import { ConfigProvider, Modal, Table } from "antd";
import { useState, useMemo } from "react";
import { IoSearch } from "react-icons/io5";
import { MdBlockFlipped } from "react-icons/md";
import dayjs from "dayjs";
import { useBlockUserMutation, useGetAllUsersQuery } from "../../Redux/api/user/userApi";

export default function UserDetails() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const { data: usersData, isLoading } = useGetAllUsersQuery();
  const [blockUser, { isLoading: isBlocking }] = useBlockUserMutation();
  console.log("usersData from user page", usersData);

  const list = useMemo(() => {
    const raw = usersData?.data?.all_users || [];
    return Array.isArray(raw) ? raw : [];
  }, [usersData]);

  const total = usersData?.data?.meta?.total || 0;

  const dataSource =
    list?.map((user, index) => ({
      key: user?._id || user?.id || index,
      no: index + 1,
      name: user?.name,
      email: user?.email,
      phone: user?.phoneNumber || "N/A",
      location: user?.location || "N/A",
      date: dayjs(user.createdAt).format("DD/MM/YYYY"),
      // Backend returns strings: 'blocked' or 'isProgress'
      status:
        typeof user?.status === "boolean"
          ? user.status
          : String(user?.status).toLowerCase() === "blocked",
      _raw: user,
    })) || [];

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
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (val) => (
        <span
          className={
            val
              ? "px-3 py-1 rounded-full text-white bg-red-500 text-xs"
              : "px-3 py-1 rounded-full text-white bg-green-500 text-xs"
          }
        >
          {val ? "blocked" : "isProgress"}
        </span>
      ),
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <button
          className=""
          onClick={() => {
            setSelectedUser(record?._raw || null);
            setIsModalOpen(true);
          }}
        >
          <MdBlockFlipped className="text-[#FF0000] w-10 h-10" />
        </button>
      ),
    },
  ];

  return (
    <div>
      <div className="my-5 flex justify-end items-end">
        <div className="relative w-full sm:w-[300px] ">
          <input
            type="text"
            placeholder="Search..."
            className="border border-[#e5eaf2] py-3 pl-12 pr-[65px] outline-none w-full rounded-md"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
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
              activeBorderColor: "#FF0000",
            },
            Pagination: {
              colorPrimaryBorder: "#FF0000",
              colorBorder: "#FF0000",
              colorPrimaryHover: "#FF0000",
              colorTextPlaceholder: "#FF0000",
              itemActiveBgDisabled: "#FF0000",
              colorPrimary: "#FF0000",
            },
            Table: {
              headerBg: "#FF0000",
              headerColor: "rgb(255,255,255)",
              cellFontSize: 16,
              headerSplitColor: "#FF0000",
            },
          },
        }}
      >
        <Table
          dataSource={dataSource}
          columns={columns}
          loading={isLoading}
          pagination={{
            current: page,
            pageSize: limit,
            total: total,
            onChange: (p, ps) => {
              setPage(p);
              setLimit(ps);
            },
          }}
          scroll={{ x: "max-content" }}
        />
        <Modal
          open={isModalOpen}
          centered
          onCancel={() => {
            setIsModalOpen(false);
            setSelectedUser(null);
          }}
          footer={null}
        >
          <div className="flex flex-col justify-center items-center py-10">
            <h1 className="text-3xl text-center text-[#FF0000]">
              Are you sure!
            </h1>
            <p className="text-xl text-center mt-5">
              {(() => {
                const s =
                  typeof selectedUser?.status === "boolean"
                    ? selectedUser.status
                    : String(selectedUser?.status).toLowerCase() === "blocked";
                // Backend: status=true (blocked), status=false (isProgress)
                return s
                  ? "Do you want to isProgress this user profile?"
                  : "Do you want to block this user profile?";
              })()}
            </p>
            <div className="text-center py-5 w-full">
              <button
                disabled={isBlocking}
                onClick={async () => {
                  if (!selectedUser) return;
                  const id = selectedUser._id || selectedUser.id;
                  const current =
                    typeof selectedUser?.status === "boolean"
                      ? selectedUser.status
                      : String(selectedUser?.status).toLowerCase() === "blocked";
                  try {
                    const nextStatus = current ? "isProgress" : "blocked";
                    await blockUser({ id, status: nextStatus }).unwrap();
                  } catch (e) {
                    // noop
                  } finally {
                    setIsModalOpen(false);
                    setSelectedUser(null);
                  }
                }}
                className="bg-[#FF0000] text-white font-semibold w-1/3 py-3 px-5 rounded-lg"
              >
                {isBlocking
                  ? "Processing..."
                  : (() => {
                      const s =
                        typeof selectedUser?.status === "boolean"
                          ? selectedUser.status
                          : String(selectedUser?.status).toLowerCase() === "blocked";
                      // If currently blocked => show Unblock, else Block
                      return s ? "Unblock" : "Block";
                    })()}
              </button>
            </div>
          </div>
        </Modal>
      </ConfigProvider>
    </div>
  );
}
