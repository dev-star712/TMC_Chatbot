import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import {
  Col,
  Row,
  Input,
  Button,
  Table,
  Space,
  Checkbox,
  Popconfirm,
  Divider,
  Select,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SaveOutlined,
  CloseOutlined,
  FileAddOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  useUpsertKnowledgeItemMutation,
  useDeleteKnowledgeItemMutation,
  useGetAllKnowledgeItemMutation,
  useTrainKnowledgeItemMutation,
} from "../slices/contentApiSlice";

const { TextArea } = Input;
let index = 0;

const KnowledgeBaseScreen = () => {
  const [upsertKnowledgeItem] = useUpsertKnowledgeItemMutation();
  const [deleteKnowledgeItem] = useDeleteKnowledgeItemMutation();
  const [getAllKnowledgeItem] = useGetAllKnowledgeItemMutation();
  const [trainKnowledgeItem] = useTrainKnowledgeItemMutation();

  const [knowledgeitems, setKnowledgeItems] = useState([]);
  const [add_editable, setAddEditable] = useState(true);
  const [knowledgeitemUnderChange, setKnowledgeItemUnderChange] =
    useState(null);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");

  const inputRef = useRef(null);

  const onCategoryChange = (event) => {
    setCategory(event.target.value);
  };
  const addCategory = (e) => {
    e.preventDefault();
    if (["blog", "teammember"].includes(category.toLowerCase())) {
      toast.error(
        "This category is not available for additional knowledge base."
      );
    } else if (
      categories
        .map((category) => category.toLowerCase())
        .includes(category.toLowerCase())
    ) {
      toast.error("That category already exists.");
    } else {
      setCategories([...categories, category || `New category ${index++}`]);
      setCategory("");
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  };

  const [pagination, setPagination] = useState({
    current: 1,
    position: ["bottomRight"],
    pageSize: 5,
  });

  useEffect(() => {
    setAddEditable(
      knowledgeitems.filter((knowledgeitem) => knowledgeitem.action === "edit")
        .length === 0
    );
    if (
      knowledgeitems.length > 0 &&
      knowledgeitems[knowledgeitems.length - 1]._id === "999999"
    ) {
      console.log(
        "----",
        Math.ceil(knowledgeitems.length / pagination.pageSize)
      );
      const temp = { ...pagination };
      temp.current = Math.ceil(knowledgeitems.length / pagination.pageSize);
      setPagination(temp);
    }
  }, [knowledgeitems]);

  const init = async () => {
    try {
      const res = await getAllKnowledgeItem();
      if (res.error) {
        throw new Error(res.error.data.message);
      } else {
        setKnowledgeItems(
          res.data.knowledgeitems.map((knowledgeitem) => {
            return {
              _id: knowledgeitem._id,
              category: knowledgeitem.category,
              text: knowledgeitem.text,
              bot: knowledgeitem.bot,
              action: "none",
            };
          }) || []
        );
        setCategories([
          ...new Set(res.data.knowledgeitems.map((obj) => obj.category)),
        ]);
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
          Category<strong style={{ color: "red" }}>*</strong>
        </>
      ),
      dataIndex: "category",
      key: "category",
      width: "15%",
      render: (_, record) =>
        record.action === "none" ? (
          <>{_.length < 30 ? _ : `${_.slice(0, 27)}...`}</>
        ) : (
          <Select
            value={_}
            onChange={(e) => {
              setKnowledgeItems(
                knowledgeitems.map((knowledgeitem) => {
                  if (knowledgeitem._id === record._id) {
                    const temp = { ...knowledgeitem };
                    temp.category = e;
                    return temp;
                  }
                  return knowledgeitem;
                })
              );
            }}
            style={{
              width: 300,
            }}
            dropdownRender={(menu) => (
              <>
                {menu}
                <Divider
                  style={{
                    margin: "8px 0",
                  }}
                />
                <Space
                  style={{
                    padding: "0 8px 4px",
                  }}
                >
                  <Input
                    placeholder="Please enter item"
                    ref={inputRef}
                    value={category}
                    onChange={onCategoryChange}
                    onKeyDown={(e) => e.stopPropagation()}
                  />
                  <Button
                    type="text"
                    icon={<PlusOutlined />}
                    onClick={addCategory}
                  >
                    Add category
                  </Button>
                </Space>
              </>
            )}
            options={categories.map((category) => ({
              label: category,
              value: category,
            }))}
          />
        ),
    },
    {
      title: (
        <>
          Text<strong style={{ color: "red" }}>*</strong>
        </>
      ),
      dataIndex: "text",
      key: "text",
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
              setKnowledgeItems(
                knowledgeitems.map((knowledgeitem) => {
                  if (knowledgeitem._id === record._id) {
                    const temp = { ...knowledgeitem };
                    temp.text = e.target.value;
                    return temp;
                  }
                  return knowledgeitem;
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
                      const res = await trainKnowledgeItem({
                        bot: !record.bot,
                        knowledgeitemId: record._id,
                      });
                      if (res.error) {
                        throw new Error(res.error.data.message);
                      }
                      setKnowledgeItems(
                        knowledgeitems.map((knowledgeitem) => {
                          if (knowledgeitem._id === record._id) {
                            const temp = { ...knowledgeitem };
                            temp.bot = !temp.bot;
                            return temp;
                          }
                          return knowledgeitem;
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
                    setKnowledgeItemUnderChange(record);

                    setKnowledgeItems(
                      knowledgeitems.map((knowledgeitem) => {
                        if (knowledgeitem._id === record._id) {
                          const temp = { ...knowledgeitem };
                          temp.action = "edit";
                          return temp;
                        }
                        return knowledgeitem;
                      })
                    );
                  }}
                />
                <Popconfirm
                  title="Are you sure you want remove this item?"
                  onConfirm={async () => {
                    try {
                      const res = await deleteKnowledgeItem({
                        knowledgeitemId: record._id,
                      });

                      console.log(res);
                      if (res.error) {
                        throw new Error(res.error.data.message);
                      }

                      const index = knowledgeitems.findIndex(
                        (obj) => obj._id === res.data.knowledgeitem._id
                      );
                      setKnowledgeItems([
                        ...knowledgeitems.slice(0, index),
                        ...knowledgeitems.slice(index + 1),
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
              </>
            ) : (
              <>
                <Button
                  shape="circle"
                  icon={<SaveOutlined />}
                  type="primary"
                  onClick={async () => {
                    try {
                      if (record.category.trim().length === 0) {
                        throw new Error("Input the category");
                      }
                      if (record.text.trim().length === 0) {
                        throw new Error("Input the text");
                      }

                      const res = await upsertKnowledgeItem({
                        knowledgeitemId:
                          record._id === "999999"
                            ? "knowledgeitem"
                            : record._id,
                        data: {
                          category: record.category,
                          text: record.text,
                        },
                      });

                      console.log(res);
                      if (res.error) {
                        throw new Error(res.error.data.message);
                      }

                      setKnowledgeItems(
                        knowledgeitems.map((knowledgeitem) => {
                          if (knowledgeitem._id === record._id) {
                            const temp = { ...knowledgeitem };
                            temp.action = "none";
                            if (record._id === "999999")
                              temp._id = res.data.knowledgeitemId;
                            return temp;
                          }
                          return knowledgeitem;
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
                    setKnowledgeItems(
                      record._id !== "999999"
                        ? knowledgeitems.map((knowledgeitem) => {
                            if (knowledgeitem._id === record._id) {
                              return knowledgeitemUnderChange;
                            }
                            return knowledgeitem;
                          })
                        : knowledgeitems.filter(
                            (knowledgeitem) => knowledgeitem._id !== "999999"
                          )
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
          <h1>Additional Bot Knowledge Base</h1>
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
            icon={<FileAddOutlined />}
            disabled={!add_editable}
            onClick={() => {
              setKnowledgeItems([
                ...knowledgeitems,
                {
                  _id: "999999",
                  category: "",
                  text: "",
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
          dataSource={knowledgeitems}
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
