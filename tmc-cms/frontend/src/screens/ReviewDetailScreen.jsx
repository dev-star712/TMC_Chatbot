import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Tabs,
  Col,
  Row,
  Input,
  Button,
  DatePicker,
  Switch,
  Radio,
  Space,
  Checkbox,
  Popconfirm,
} from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {
  CheckOutlined,
  CloseOutlined,
  SaveOutlined,
  DeleteOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageUpload from "../components/ImageUpload";
import {
  usePublishReviewMutation,
  useLoadArticleMutation,
  useGetCategoryMutation,
  useDeleteArticleMutation,
  useTrainArticleMutation,
} from "../slices/contentApiSlice";
import htmlEditButton from "quill-html-edit-button";

const { TextArea } = Input;
dayjs.extend(customParseFormat);

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
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

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

const ReviewDetailScreen = () => {
  const { pageId } = useParams();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [canonical_url, setCanonicalUrl] = useState("");
  const [date, setDate] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [featured, setFeatured] = useState(false);
  const [category, setCategory] = useState("more");
  const [categories, setCategories] = useState([]);
  const [content, setContent] = useState("");

  const [meta_title, setMetaTitle] = useState("");
  const [meta_description, setMetaDescription] = useState("");

  const [bot, setBot] = useState(false);

  const [newCategory, setNewCategory] = useState("");

  const [publishReview] = usePublishReviewMutation();
  const [loadArticle] = useLoadArticleMutation();
  const [getCategory] = useGetCategoryMutation();
  const [deleteArticle] = useDeleteArticleMutation();
  const [trainArticle] = useTrainArticleMutation();

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
      const res = await loadArticle({ pageId });
      console.log(res);
      if (res.error) {
        throw new Error(res.error.data.message);
      } else {
        setImages(
          res.data.article.image
            ? [{ response: res.data.article.image, status: "done" }]
            : []
        );
        setTitle(res.data.article.title || "");
        setUrl(res.data.article.url || "");
        setCanonicalUrl(res.data.article.canonical_url || "");
        setDate(res.data.article.date || "");
        setSynopsis(res.data.article.synopsis || "");
        setFeatured(res.data.article.featured || false);
        setCategory(res.data.article.category || "more");
        setContent(res.data.article.content || "");

        setMetaTitle(res.data.article.meta_title || "");
        setMetaDescription(res.data.article.meta_description || "");

        setBot(res.data.article.bot || false);
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

  const getCategories = async () => {
    try {
      const res = await getCategory({ type: "review" });
      console.log(res);
      if (res.error) {
        throw new Error(res.error.data.message);
      } else {
        setCategories(res.data.categories);
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
    console.log(pageId);
    getCategories();
    if (pageId && pageId !== "review") {
      init();
    }
  }, [pageId]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const newValue = searchParams.get("new");
    if (newValue === "success") toast.success("Published successfully");
  }, []);

  const items = [
    (pageId) => {
      return {
        key: "1",
        label: "Key Info",
        children: (
          <div className="m-2 bg-white">
            <Row className="mb-4" gutter={[24, 0]}>
              <Col span={3}>
                <strong>Title</strong>
                <strong style={{ color: "red" }}>*</strong>
                <p>
                  The main title of the article, used on list and details pages
                </p>
              </Col>
              <Col span={12}>
                <Input
                  showCount
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Col>
            </Row>
            <Row className="mb-4" gutter={[24, 0]}>
              <Col span={3}>
                <strong>Url (unique)</strong>
                <strong style={{ color: "red" }}>*</strong>
                <p>The url for the article, used on website</p>
              </Col>
              <Col span={12}>
                <Input
                  showCount
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="/the-article-from-tmc"
                />
              </Col>
            </Row>
            <Row className="mb-4" gutter={[24, 0]}>
              <Col span={3}>
                <strong>Published Date</strong>
                <strong style={{ color: "red" }}>*</strong>
                <p>
                  The date to show on the review article. Review articles are
                  ordered by this property on list pages
                </p>
              </Col>
              <Col span={12}>
                <DatePicker
                  value={date ? dayjs(date, "YYYY/MM/DD") : null}
                  format={"YYYY/MM/DD"}
                  onChange={(date, dateString) => {
                    console.log(dateString);
                    setDate(dateString);
                  }}
                />
              </Col>
            </Row>
            <Row className="mb-4" gutter={[24, 0]}>
              <Col span={3}>
                <strong>Synopsis</strong>
                <strong style={{ color: "red" }}>*</strong>
                <p>Used when displaying article within list pages</p>
              </Col>
              <Col span={12}>
                <TextArea
                  showCount
                  style={{ height: 120 }}
                  value={synopsis}
                  onChange={(e) => setSynopsis(e.target.value)}
                />
              </Col>
            </Row>
            <Row className="mb-4" gutter={[24, 0]}>
              <Col span={3}>
                <strong>Image</strong>
                <strong style={{ color: "red" }}>*</strong>
                <p>
                  This is used as the primary image of the article, and on the
                  list page
                </p>
              </Col>
              <Col span={12}>
                <ImageUpload
                  count={1}
                  // aspect={{ width: 330, height: 252 }}
                  pageId={pageId}
                  files={
                    images.length
                      ? images.map((img, index) => {
                          return {
                            uid: `-${index + 1}`,
                            name: img.response,
                            response: img.response,
                            status: img.status,
                            url: `/public/image/${img.response}`,
                          };
                        })
                      : []
                  }
                  setImages={setImages}
                />
              </Col>
            </Row>
            <Row className="mb-4" gutter={[24, 0]}>
              <Col span={3}>
                <strong>Featured</strong>
              </Col>
              <Col span={3}>
                <Switch
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                  defaultChecked={false}
                  onChange={(e) => {
                    setFeatured(e);
                  }}
                  value={featured}
                />
              </Col>
            </Row>
            <Row className="mb-4" gutter={[24, 0]}>
              <Col span={3}>
                <strong>Category</strong>
                {category === "more" && (
                  <strong style={{ color: "red" }}>*</strong>
                )}
              </Col>
              <Col span={12}>
                <Radio.Group
                  onChange={(e) => {
                    console.log(e.target.value);
                    setCategory(e.target.value);
                  }}
                  value={category}
                >
                  <Space direction="vertical">
                    <Radio value={"more"}>
                      More...
                      {category === "more" ? (
                        <Input
                          style={{
                            width: 100,
                            marginLeft: 10,
                          }}
                          value={newCategory}
                          onChange={(e) => {
                            setNewCategory(e.target.value);
                          }}
                        />
                      ) : null}
                    </Radio>
                    {categories.map((cateogry) => (
                      <Radio value={cateogry._id} key={cateogry._id}>
                        {cateogry.name}
                      </Radio>
                    ))}
                  </Space>
                </Radio.Group>
              </Col>
            </Row>
          </div>
        ),
      };
    },
    () => {
      return {
        key: "2",
        label: "Content",
        children: (
          <div className="m-2 bg-white">
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
        key: "3",
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
            <Row className="mb-4" gutter={[24, 0]}>
              <Col span={3}>
                <strong>Canonical Url</strong>
                <p>Include a path from root, eg /news/some-article/</p>
              </Col>
              <Col span={12}>
                <Input
                  showCount
                  value={canonical_url}
                  onChange={(e) => setCanonicalUrl(e.target.value)}
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
          <h1>[{title ? title : "Untitled"}]</h1>
        </Col>
        <Col span={1} />
        <Col span={8} align="middle">
          {pageId && pageId !== "review" && (
            <Checkbox
              style={{ marginRight: "5px" }}
              checked={bot}
              onClick={async () => {
                try {
                  const res = await trainArticle({ bot: !bot, pageId });
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
          )}
          <Button
            style={{ marginRight: "5px" }}
            shape="circle"
            icon={<ReloadOutlined />}
            onClick={() => {
              if (pageId !== "review") {
                init();
              } else {
                setImages([]);
                setTitle("");
                setUrl("");
                setCanonicalUrl("");
                setDate("");
                setSynopsis("");
                setFeatured(false);
                setCategory("more");
                setContent("");
                setNewCategory("");
                setMetaTitle("");
                setMetaDescription("");
                setBot(false);
              }
            }}
          />
          {pageId && pageId !== "review" && (
            <Popconfirm
              title="Are you sure you want delete this?"
              onConfirm={async () => {
                try {
                  const res = await deleteArticle({
                    pageId,
                  });

                  console.log(res);
                  if (res.error) {
                    throw new Error(res.error.data.message);
                  }

                  navigate(`/content/1-1?delete=success`);
                  window.location.reload();
                } catch (error) {
                  console.error("err", error);
                  toast.error(error.data ? error.data.message : error.message);
                }
              }}
            >
              <Button
                style={{ marginRight: "5px" }}
                shape="circle"
                icon={<DeleteOutlined />}
                danger
              />
            </Popconfirm>
          )}
          <Button
            shape="circle"
            icon={<SaveOutlined />}
            onClick={async () => {
              try {
                const imgs = images.filter((image) => image.status === "done");
                if (imgs.length === 0) {
                  throw new Error("Upload an image");
                }
                if (title.trim().length === 0) {
                  throw new Error("Input the Title");
                }

                if (!date) {
                  throw new Error("Input the Published Date");
                }

                if (synopsis.trim().length === 0) {
                  throw new Error("Input the Synopsis");
                }

                const articleUrlPattern = /^\/([A-Za-z0-9_-]+)$/;
                if (!url) {
                  throw new Error("Input the URL for the article");
                } else if (!articleUrlPattern.test(url)) {
                  throw new Error("Invalid URL format");
                }

                if (category === "more" && newCategory.trim().length === 0) {
                  throw new Error("Input the Category");
                }

                const res = await publishReview({
                  data: {
                    image: imgs[0].response,
                    title,
                    url,
                    date,
                    synopsis,
                    featured,
                    category: category === "more" ? newCategory : category,
                    content,
                    meta_title,
                    meta_description,
                    canonical_url,
                  },
                  pageId,
                });
                console.log(res);
                if (res.error) {
                  throw new Error(res.error.data.message);
                }

                if (pageId === "review" && res.data.pageId) {
                  navigate(`/content/review/${res.data.pageId}?new=success`);
                  window.location.reload();
                }
                toast.success(res.data.message);
              } catch (error) {
                console.error("err", error);
                toast.error(error.data ? error.data.message : error.message);
              }
            }}
          />
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

export default ReviewDetailScreen;
