import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Col,
  Row,
  Button,
  Table,
  Space,
  Checkbox,
  Popconfirm,
} from "antd";
import {
  DeleteOutlined
} from "@ant-design/icons";
import {
  useGetAllAdminMutation,
  useToggleAllowedAdminMutation,
  useDeleteAdminMutation
} from "../slices/contentApiSlice";

const KnowledgeBaseScreen = () => {
  const [getAllAdmin] = useGetAllAdminMutation();
  const [toggleAllowedAdmin] = useToggleAllowedAdminMutation();
  const [deleteAdmin] = useDeleteAdminMutation();

  const [members, setMembers] = useState([]);

  const [pagination, setPagination] = useState({
    current: 1,
    position: ["bottomRight"],
    pageSize: 10,
  });

  const init = async () => {
    try {
      const res = await getAllAdmin();
      if (res.error) {
        throw new Error(res.error.data.message);
      } else {
        setMembers(res.data.members);
      }
      if (res.error) {
        throw new Error(res.error.data.message);
      }
      toast.success(res.data.message);
    } catch (error) {
      console.error("err", error);
      toast.error(error.data ? error.data.message : error.message);
    }
  };

  useEffect(() => {
    init();
  }, []);

  const columns = [
    {
      title: (
        <>
          Name<strong style={{ color: "red" }}>*</strong>
        </>
      ),
      dataIndex: "name",
      key: "name"
    },
    {
      title: (
        <>
          Email<strong style={{ color: "red" }}>*</strong>
        </>
      ),
      dataIndex: "email",
      key: "email"
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        return (
          <Space size="middle">
              <>
                <Checkbox
                  checked={record.allowed}
                  onClick={async () => {
                    try {
                      const res = await toggleAllowedAdmin({
                        id: record._id,
                        allowed: !record.allowed
                      });
                      init()
                      toast.success(res.data.message);
                    } catch (error) {
                      console.error("err", error);
                      toast.error(
                        error.data ? error.data.message : error.message
                      );
                    }
                  }}
                >
                  Allowed
                </Checkbox>
                <Popconfirm
                  title="Are you sure you want remove this user?"
                  onConfirm={async () => {
                    try {
                      const res = await deleteAdmin({
                        id: record._id
                      });
                      init()
                      toast.success(res.data.message);
                    } catch (error) {
                      console.error("err", error);
                      toast.error(
                        error.data ? error.data.message : error.message
                      );
                    }
                  }}
                >
                  <Button shape="circle" icon={<DeleteOutlined />} danger />
                </Popconfirm>
              </>
          </Space>
        );
      },
    },
  ];

  return (
    <div className="p-2">
      <Row justify="space-between" align="middle">
        <Col span={19}>
          <h1>User Management</h1>
        </Col>
        <Col span={2} />
        <Col
          span={3}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
        </Col>
      </Row>
      <hr />
      <div className="m-4 p-2 bg-white">
        <Table
          columns={columns}
          dataSource={members}
          pagination={pagination}
          onChange={(pagination) => {
            setPagination(pagination);
          }}
        />
      </div>
    </div>
  );
};

export default KnowledgeBaseScreen;
