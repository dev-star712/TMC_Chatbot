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
const items = [
  (pageId, state) => {
    return {
      key: "1",
      label: "Content",
      children: (
        <div className="m-2 bg-white">
          <Row className="mb-4" gutter={[24, 0]}>
            <Col span={3}>
              <strong>Image</strong>
              <strong style={{ color: "red" }}>*</strong>
              <p>Number of images should be between 1~4</p>
            </Col>
            <Col span={12}>
              <ImageUpload
                count={4}
                aspect={{ width: 712, height: 510 }}
                pageId={pageId}
                files={
                  state.images.length
                    ? state.images.map((image, index) => {
                        return {
                          uid: `-${index + 1}`,
                          name: image.response,
                          response: image.response,
                          status: image.status,
                          url: `/public/image/${image.response}`,
                        };
                      })
                    : []
                }
                setImages={state.setImages}
              />
            </Col>
          </Row>
          <Row className="mb-4" gutter={[24, 0]}>
            <Col span={3}>
              <strong>Banner Paragraph (1)</strong>
              <strong style={{ color: "red" }}>*</strong>
            </Col>
            <Col span={12}>
              <TextArea
                showCount
                value={state.banner_paragraph1}
                onChange={(e) => state.setBannerParagraph1(e.target.value)}
                style={{ height: 120 }}
              />
            </Col>
          </Row>
          <Row className="mb-4" gutter={[24, 0]}>
            <Col span={3}>
              <strong>Banner Paragraph (2)</strong>
            </Col>
            <Col span={12}>
              <TextArea
                showCount
                value={state.banner_paragraph2}
                onChange={(e) => state.setBannerParagraph2(e.target.value)}
                style={{ height: 120 }}
              />
            </Col>
          </Row>
        </div>
      ),
    };
  },
];

const AboutUsHomeBannersDetailScreen = ({ pageId }) => {
  const [images, setImages] = useState([]);
  const [banner_paragraph1, setBannerParagraph1] = useState("");
  const [banner_paragraph2, setBannerParagraph2] = useState("");
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
        setImages(
          res.data.image
            ? res.data.image.map((img) => {
                return { response: img, status: "done" };
              })
            : []
        );
        setBannerParagraph1(res.data.banner_paragraph1 || "");
        setBannerParagraph2(res.data.banner_paragraph2 || "");
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-2">
      <Row justify="space-between" align="middle">
        <Col span={15}>
          <h1>About Us Home Banners</h1>
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
                if (banner_paragraph1.trim().length === 0) {
                  throw new Error("Input the first paragraph");
                }
                const imgs = images.filter((image) => image.status === "done");
                if (imgs.length === 0) {
                  throw new Error("Upload one or more images");
                } else if (imgs.length > 4) {
                  throw new Error("You can upload up to 4 images");
                }
                const res = await publish({
                  data: {
                    image: imgs.map((img) => img.response),
                    banner_paragraph1,
                    banner_paragraph2,
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
        items={items.map((item) =>
          item(pageId, {
            images,
            setImages,
            banner_paragraph1,
            setBannerParagraph1,
            banner_paragraph2,
            setBannerParagraph2,
          })
        )}
        onChange={onChange}
        className="p-2 bg-white"
      />
    </div>
  );
};

AboutUsHomeBannersDetailScreen.propTypes = {
  pageId: PropTypes.string.isRequired,
};

export default AboutUsHomeBannersDetailScreen;
