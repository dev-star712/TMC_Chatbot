import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { Tabs, Col, Row, Input, Button, Checkbox } from "antd";

import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  usePublishMutation,
  useLoadMutation,
  useTrainPageMutation,
} from "../slices/contentApiSlice";

import htmlEditButton from "quill-html-edit-button";

const { TextArea } = Input;

class DividerBlot extends Quill.import("blots/block") {
  static create(value) {
    let node = super.create(value);
    node.style.height = "2px";
    node.style.backgroundColor = "black";
    return node;
  }
}

DividerBlot.blotName = "divider";
DividerBlot.tagName = "div";
Quill.register(DividerBlot);

Quill.register({
  "modules/htmlEditButton": htmlEditButton
})

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ divider: true }],
    [{ header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["link", "image", "video"],

    ["clean"], // remove formatting button
  ],
  htmlEditButton: {}
};

const formats = [
  "header",
  "background",
  "script",
  "font",
  "size",
  "code",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "align",
  "direction",
  "code-block",
  "link",
  "image",
  "video",
  "color",
  "divider",
];

const ContentScreen = ({ pageId, name }) => {
  const [content, setContent] = useState("");

  const [title, setTitle] = useState("");

  const [meta_title, setMetaTitle] = useState("");
  const [meta_description, setMetaDescription] = useState("");

  const [bot, setBot] = useState(false);

  const [publish] = usePublishMutation();
  const [load] = useLoadMutation();
  const [trainPage] = useTrainPageMutation();

  const [hrStyle, setHrStyle] = useState();
  useEffect(() => {
    setHrStyle(`
    .ql-divider::before {
      content: url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2050%202'%3E%3Cline%20x1='0'%20y1='1'%20x2='50'%20y2='1'%20stroke='black'%20stroke-width='2'%20/%3E%3C/svg%3E");
    }
    `);
  }, []);

  const init = async () => {
    try {
      const res = await load({ pageId });
      console.log(res);
      if (res.error) {
        throw new Error(res.error.data.message);
      } else {
        setContent(res.data.content || "");

        setTitle(res.data.title || "");

        setMetaTitle(res.data.meta_title || "");
        setMetaDescription(res.data.meta_description || "");

        setBot(res.data.bot || false);
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
  }, [pageId]);

  const items = [
    () => {
      return {
        key: "1",
        label: "Content",
        children: (
          <div className="m-2 bg-white">
            <Row className="mb-4" gutter={[24, 0]}>
              <Col span={3}>
                <strong>Title</strong>
                <strong style={{ color: "red" }}>*</strong>
                <p>This is used as the title in the page</p>
              </Col>
              <Col span={12}>
                <Input
                  showCount
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Col>
            </Row>
            <ReactQuill
              theme="snow"
              modules={modules}
              formats={formats}
              value={content}
              onChange={setContent}
              style={{
                minHeight: "30vh",
              }}
            ></ReactQuill>
          </div>
        ),
      };
    },
    () => {
      return {
        key: "2",
        label: "SEO",
        children: (
          <div className="m-2 bg-white">
            <Row className="mb-4" gutter={[24, 0]}>
              <Col span={3}>
                <strong>Meta Title</strong>
                <strong style={{ color: "orange" }}>*</strong>
                <p>
                  The ideal meta title should contain between 20 and 70
                  characters - spaces included
                </p>
              </Col>
              <Col span={12}>
                <Input
                  showCount
                  value={meta_title}
                  onChange={(e) => setMetaTitle(e.target.value)}
                />
              </Col>
            </Row>
            <Row className="mb-4" gutter={[24, 0]}>
              <Col span={3}>
                <strong>Meta Description</strong>
                <strong style={{ color: "orange" }}>*</strong>
                <p>
                  The ideal meta description should contain between 70 and 160
                  characters - spaces included
                </p>
              </Col>
              <Col span={12}>
                <TextArea
                  showCount
                  style={{ height: 120 }}
                  value={meta_description}
                  onChange={(e) => setMetaDescription(e.target.value)}
                />
              </Col>
            </Row>
          </div>
        ),
      };
    },
  ];

  return (
    <div className="p-2">
      <style>{hrStyle}</style>
      <Row justify="space-between" align="middle">
        <Col span={15}>
          <h1>{name} Content</h1>
        </Col>
        <Col span={1} />
        <Col span={8} align="middle">
          <Checkbox
            style={{ marginRight: "5px" }}
            checked={bot}
            onClick={async () => {
              try {
                const res = await trainPage({ bot: !bot, pageId });
                if (res.error) {
                  throw new Error(res.error.data.message);
                }
                setBot(!bot);
              } catch (error) {
                console.error("err", error);
                toast.error(error.data ? error.data.message : error.message);
              }
            }}
          >
            Bot
          </Checkbox>
          <Button style={{ marginRight: "5px" }} onClick={init}>
            Clear
          </Button>
          <Button
            type="primary"
            onClick={async () => {
              try {
                if (title.trim().length === 0) {
                  throw new Error("Input the Title");
                }
                const res = await publish({
                  data: {
                    content,
                    title,
                    meta_title,
                    meta_description,
                  },
                  pageId,
                });
                console.log(res);
                if (res.error) {
                  throw new Error(res.error.data.message);
                }
                toast.success(res.data.message);
              } catch (error) {
                console.error("err", error);
                toast.error(error.data ? error.data.message : error.message);
              }
            }}
          >
            Publish
          </Button>
        </Col>
      </Row>
      <hr />
      <Tabs
        defaultActiveKey="1"
        items={items.map((item) => item(pageId))}
        className="p-2 bg-white"
      />
    </div>
  );
};

ContentScreen.propTypes = {
  pageId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default ContentScreen;
