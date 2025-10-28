import { ConfigProvider, Table } from "antd";
import dayjs from "dayjs";
import { useGetAllUsersQuery } from "../../Redux/api/user/userApi";
import { useMemo } from "react";

export default function RecentUsers() {
  const { data: usersData, isLoading } = useGetAllUsersQuery();
  console.log("usersData from user page", usersData);

  const list = useMemo(() => {
    const raw = usersData?.data?.all_users || [];
    return Array.isArray(raw) ? raw : [];
  }, [usersData]);

  const dataSource =
    list?.slice(0, 5)?.map((user, index) => ({
      key: user?._id || user?.id || index,
      no: index + 1,
      name: user?.name,
      email: user?.email,
      phone: user?.phoneNumber || "N/A",
      location: user?.location || "N/A",
      date: dayjs(user.createdAt).format("DD/MM/YYYY"),
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
  ];

  return (
    <div className="my-5">
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
          pagination={false}
          scroll={{ x: "max-content" }}
        />
      </ConfigProvider>
    </div>
  );
}
