import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Col,
  Row,
  Input,
  Button,
  Table,
  Space,
  Popconfirm,
  Checkbox,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SaveOutlined,
  CloseOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";
import ImageUpload from "../components/ImageUpload";
import {
  useUpsertMemberMutation,
  useDeleteMemberMutation,
  useGetAllMemberMutation,
  useTrainMemberMutation,
} from "../slices/contentApiSlice";

const { TextArea } = Input;

const TeamDetailScreen = ({ pageId }) => {
  const [upsertMember] = useUpsertMemberMutation();
  const [deleteMember] = useDeleteMemberMutation();
  const [getAllMember] = useGetAllMemberMutation();
  const [trainMember] = useTrainMemberMutation();

  const [members, setMembers] = useState([]);
  const [add_editable, setAddEditable] = useState(true);
  const [memberUnderChange, setMemberUnderChange] = useState(null);

  const [pagination, setPagination] = useState({
    current: 1,
    position: ["bottomRight"],
    pageSize: 5,
  });

  useEffect(() => {
    setAddEditable(
      members.filter((member) => member.action === "edit").length === 0
    );
    if (members.length > 0 && members[members.length - 1]._id === "999999") {
      console.log("----", Math.ceil(members.length / pagination.pageSize));
      const temp = { ...pagination };
      temp.current = Math.ceil(members.length / pagination.pageSize);
      setPagination(temp);
    }
  }, [members]);

  const init = async () => {
    try {
      const res = await getAllMember();
      if (res.error) {
        throw new Error(res.error.data.message);
      } else {
        setMembers(
          res.data.members.map((member) => {
            return {
              _id: member._id,
              image: member.image
                ? [{ response: member.image, status: "done" }]
                : [],
              name: member.name,
              role: member.role,
              bio: member.bio,
              order: member.order,
              bot: member.bot,
              action: "none",
            };
          }) || []
        );
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
          Photo<strong style={{ color: "red" }}>*</strong>
        </>
      ),
      key: "image",
      dataIndex: "image",
      width: "110px",
      render: (_, record) => {
        return record.action === "none" ? (
          <img
            src={`/public/image/${_[0] ? _[0].response : "logo.svg"}`}
            alt={record.name || "logo.svg"}
            className="ant-upload-list-item-image"
            style={{
              width: "100px",
              height: "100px",
            }}
          />
        ) : (
          <ImageUpload
            count={1}
            aspect={{
              width: 296,
              height: 297,
            }}
            pageId={pageId}
            files={_.map((img, index) => {
              return {
                uid: `-${index + 1}`,
                name: img.response,
                response: img.response,
                status: img.status,
                url: `/public/image/${img.response}`,
              };
            })}
            setImages={(e) => {
              setMembers(
                members.map((member) => {
                  if (member._id === record._id) {
                    const temp = { ...member };
                    temp.image = e;
                    return temp;
                  }
                  return member;
                })
              );
            }}
          />
        );
      },
    },
    {
      title: (
        <>
          Name<strong style={{ color: "red" }}>*</strong>
        </>
      ),
      dataIndex: "name",
      key: "name",
      width: "10%",
      render: (_, record) =>
        record.action === "none" ? (
          <>{_.length < 16 ? _ : `${_.slice(0, 13)}...`}</>
        ) : (
          <Input
            value={_}
            onChange={(e) => {
              setMembers(
                members.map((member) => {
                  if (member._id === record._id) {
                    const temp = { ...member };
                    temp.name = e.target.value;
                    return temp;
                  }
                  return member;
                })
              );
            }}
          />
        ),
    },
    {
      title: (
        <>
          Role<strong style={{ color: "red" }}>*</strong>
        </>
      ),
      dataIndex: "role",
      key: "role",
      width: "15%",
      render: (_, record) =>
        record.action === "none" ? (
          <>{_.length < 30 ? _ : `${_.slice(0, 27)}...`}</>
        ) : (
          <Input
            value={_}
            onChange={(e) => {
              setMembers(
                members.map((member) => {
                  if (member._id === record._id) {
                    const temp = { ...member };
                    temp.role = e.target.value;
                    return temp;
                  }
                  return member;
                })
              );
            }}
          />
        ),
    },
    {
      title: (
        <>
          Bio<strong style={{ color: "red" }}>*</strong>
        </>
      ),
      dataIndex: "bio",
      key: "bio",
      render: (_, record) =>
        record.action === "none" ? (
          <>
            {(_.length < 300 ? _ : `${_.slice(0, 300)}...`)
              .split("\n")
              .map((line, i) => (
                <div style={{ marginBottom: "3px" }} key={i}>
                  {line}
                </div>
              ))}
          </>
        ) : (
          <TextArea
            style={{
              minHeight: "110px",
            }}
            value={_}
            onChange={(e) => {
              setMembers(
                members.map((member) => {
                  if (member._id === record._id) {
                    const temp = { ...member };
                    temp.bio = e.target.value;
                    return temp;
                  }
                  return member;
                })
              );
            }}
          />
        ),
    },
    {
      title: "Action",
      key: "action",
      width: "120px",
      render: (_, record) => {
        return (
          <Space size="middle">
            {record.action === "none" ? (
              <>
                <Checkbox
                  checked={record.bot}
                  onClick={async () => {
                    try {
                      const res = await trainMember({
                        bot: !record.bot,
                        memberId: record._id,
                      });
                      if (res.error) {
                        throw new Error(res.error.data.message);
                      }
                      setMembers(
                        members.map((member) => {
                          if (member._id === record._id) {
                            const temp = { ...member };
                            temp.bot = !temp.bot;
                            return temp;
                          }
                          return member;
                        })
                      );
                    } catch (error) {
                      console.error("err", error);
                      toast.error(
                        error.data ? error.data.message : error.message
                      );
                    }
                  }}
                >
                  Bot
                </Checkbox>
                <Button
                  shape="circle"
                  icon={<EditOutlined />}
                  disabled={!add_editable}
                  onClick={() => {
                    setMemberUnderChange(record);

                    setMembers(
                      members.map((member) => {
                        if (member._id === record._id) {
                          const temp = { ...member };
                          temp.action = "edit";
                          return temp;
                        }
                        return member;
                      })
                    );
                  }}
                />
                <Popconfirm
                  title="Are you sure you want to delete this member?"
                  onConfirm={async () => {
                    try {
                      const res = await deleteMember({ memberId: record._id });

                      console.log(res);
                      if (res.error) {
                        throw new Error(res.error.data.message);
                      }

                      const index = members.findIndex(
                        (obj) => obj._id === res.data.member._id
                      );
                      setMembers([
                        ...members.slice(0, index),
                        ...members.slice(index + 1),
                      ]);

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
                <Popconfirm
                  title="Insert a new member above?"
                  onConfirm={() => {
                    const index = members.findIndex(
                      (obj) => obj._id === record._id
                    );
                    setMembers([
                      ...members.slice(0, index),
                      {
                        _id: "999999",
                        image: [],
                        name: "",
                        role: "",
                        bio: "",
                        order:
                          index > 0
                            ? (members[index - 1].order +
                                members[index].order) /
                              2
                            : members[index].order - 1,
                        action: "edit",
                      },
                      ...members.slice(index),
                    ]);
                  }}
                >
                  <Button
                    shape="circle"
                    type="primary"
                    icon={<UserAddOutlined />}
                    disabled={!add_editable}
                  />
                </Popconfirm>
              </>
            ) : (
              <>
                <Button
                  shape="circle"
                  icon={<SaveOutlined />}
                  type="primary"
                  onClick={async () => {
                    try {
                      const imgs = record.image.filter(
                        (image) => image.status === "done"
                      );
                      if (imgs.length === 0) {
                        throw new Error("Upload an image");
                      }
                      if (record.name.trim().length === 0) {
                        throw new Error("Input the name");
                      }
                      if (record.role.trim().length === 0) {
                        throw new Error("Input the role");
                      }
                      if (record.bio.trim().length === 0) {
                        throw new Error("Input the bio");
                      }

                      const res = await upsertMember({
                        memberId:
                          record._id === "999999" ? "member" : record._id,
                        data: {
                          image: imgs[0].response,
                          name: record.name,
                          role: record.role,
                          bio: record.bio,
                          order: record.order,
                        },
                      });

                      console.log(res);
                      if (res.error) {
                        throw new Error(res.error.data.message);
                      }

                      setMembers(
                        members.map((member) => {
                          if (member._id === record._id) {
                            const temp = { ...member };
                            temp.action = "none";
                            if (record._id === "999999")
                              temp._id = res.data.memberId;
                            return temp;
                          }
                          return member;
                        })
                      );

                      toast.success(res.data.message);
                    } catch (error) {
                      console.error("err", error);
                      toast.error(
                        error.data ? error.data.message : error.message
                      );
                    }
                  }}
                />
                <Button
                  shape="circle"
                  icon={<CloseOutlined />}
                  onClick={() => {
                    setMembers(
                      record._id !== "999999"
                        ? members.map((member) => {
                            if (member._id === record._id) {
                              return memberUnderChange;
                            }
                            return member;
                          })
                        : members.filter((member) => member._id !== "999999")
                    );
                  }}
                />
              </>
            )}
          </Space>
        );
      },
    },
  ];

  return (
    <div className="p-2">
      <Row justify="space-between" align="middle">
        <Col span={19}>
          <h1>Meet The Team</h1>
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
          <Button
            type="primary"
            shape="circle"
            icon={<UserAddOutlined />}
            disabled={!add_editable}
            onClick={() => {
              setMembers([
                ...members,
                {
                  _id: "999999",
                  image: [],
                  name: "",
                  role: "",
                  bio: "",
                  order:
                    members.length > 0
                      ? members[members.length - 1].order + 1
                      : 0,
                  action: "edit",
                },
              ]);
            }}
          />
        </Col>
      </Row>
      <hr />
      <div className="m-2 p-2 bg-white">
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

TeamDetailScreen.propTypes = {
  pageId: PropTypes.string.isRequired,
};

export default TeamDetailScreen;
