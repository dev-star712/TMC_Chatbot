import { Tabs, Col, Row, Input, Button, Checkbox } from "antd";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  usePublishMutation,
  useLoadMutation,
  useTrainPageMutation,
} from "../slices/contentApiSlice";
import ImageUpload from "../components/ImageUpload";

const { TextArea } = Input;

const onChange = (key) => {
  console.log(key);
};

const HomeHeroContentDetailScreen = ({ pageId }) => {
  const [title, setTitle] = useState("");
  const [images, setImages] = useState([]);
  const [image_alt_text, setImageAltText] = useState("");
  const [video_url, setVideoUrl] = useState("");
  const [banner_subheading, setBannerSubheading] = useState("");
  const [banner_text, setBannerText] = useState("");
  const [meta_title, setMetaTitle] = useState("");
  const [meta_description, setMetaDescription] = useState("");
  const [bot, setBot] = useState(false);

  const [publish] = usePublishMutation();
  const [load] = useLoadMutation();
  const [trainPage] = useTrainPageMutation();

  const init = async () => {
    try {
      const res = await load({ pageId });
      console.log(res);
      if (res.error) {
        throw new Error(res.error.data.message);
      } else {
        setTitle(res.data.title || "");
        setImages(
          res.data.image ? [{ response: res.data.image, status: "done" }] : []
        );
        setImageAltText(res.data.image_alt_text || "");
        setVideoUrl(res.data.video_url || "");
        setBannerSubheading(res.data.banner_subheading || "");
        setBannerText(res.data.banner_text || "");
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
  }, []);

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
                <strong>Image</strong>
                <strong style={{ color: "red" }}>*</strong>
              </Col>
              <Col span={12}>
                <ImageUpload
                  count={1}
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
                <strong>Image Alt Text</strong>
                <p>Text that describes the image</p>
              </Col>
              <Col span={12}>
                <Input
                  showCount
                  value={image_alt_text}
                  onChange={(e) => setImageAltText(e.target.value)}
                />
              </Col>
            </Row>
            <Row className="mb-4" gutter={[24, 0]}>
              <Col span={3}>
                <strong>Video URL</strong>
              </Col>
              <Col span={12}>
                <Input
                  value={video_url}
                  onChange={(e) => setVideoUrl(e.target.value)}
                />
              </Col>
            </Row>
            <Row className="mb-4" gutter={[24, 0]}>
              <Col span={3}>
                <strong>Banner Subheading</strong>
              </Col>
              <Col span={12}>
                <Input
                  showCount
                  value={banner_subheading}
                  onChange={(e) => setBannerSubheading(e.target.value)}
                />
              </Col>
            </Row>
            <Row className="mb-4" gutter={[24, 0]}>
              <Col span={3}>
                <strong>Banner Text</strong>
                <p>Optional text that may be shown on top of the banner</p>
              </Col>
              <Col span={12}>
                <TextArea
                  showCount
                  style={{ height: 120 }}
                  value={banner_text}
                  onChange={(e) => setBannerText(e.target.value)}
                />
              </Col>
            </Row>
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
      <Row justify="space-between" align="middle">
        <Col span={15}>
          <h1>Home Hero Content</h1>
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
                const urlPattern = /^(https):\/\/[^ "]+$/;
                if (video_url && !urlPattern.test(video_url)) {
                  throw new Error("Invalid URL format");
                }
                const imgs = images.filter((image) => image.status === "done");
                if (imgs.length === 0) {
                  throw new Error("Upload an image");
                }
                const res = await publish({
                  data: {
                    title,
                    image: imgs[0].response,
                    image_alt_text,
                    video_url,
                    banner_subheading,
                    banner_text,
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
        onChange={onChange}
        className="p-2 bg-white"
      />
    </div>
  );
};

HomeHeroContentDetailScreen.propTypes = {
  pageId: PropTypes.string.isRequired,
};

export default HomeHeroContentDetailScreen;
