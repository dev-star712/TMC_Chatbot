import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const getImageDimensions = async (file) => {
  try {
    const base64Data = await getBase64(file);
    const img = new Image();

    img.src = base64Data;

    await new Promise((resolve) => {
      img.onload = resolve;
    });

    const width = img.naturalWidth;
    const height = img.naturalHeight;

    return { width, height };
  } catch (error) {
    console.error("Error getting image dimensions:", error);
    return null;
  }
};

const ImageUpload = ({ count, aspect, pageId, files, setImages }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [correctImageRatio, setCorrectImageRatio] = useState(false);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    setFileList(files);
  }, [files]);

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = ({ fileList: newFileList }) => {
    console.log("new", newFileList);
    if (newFileList.every((element) => element.response)) {
      console.log(newFileList);
      setImages(newFileList);
    }
    setFileList(newFileList);
  };
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );
  return (
    <>
      {aspect ? (
        <ImgCrop
          rotationSlider
          aspect={aspect.width / aspect.height}
          modalTitle={
            <>
              We recommend that you choose an image with a rate of{" "}
              {aspect.width}:{aspect.height}.{" "}
              {correctImageRatio ? (
                <strong>This image is perfect!</strong>
              ) : (
                <strong>
                  You can resize this image{" "}
                  <a
                    href="https://imageresizer.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    here
                  </a>
                </strong>
              )}
            </>
          }
          fillColor={"transparent"}
          minZoom={0.1}
          maxZoom={3}
          quality={1}
          showReset
          beforeCrop={async (file) => {
            const dimensions = await getImageDimensions(file);
            setCorrectImageRatio(
              dimensions.width === aspect.width &&
                dimensions.height === aspect.height
            );
          }}
        >
          <Upload
            action={`/api/file/uploads?page=${pageId}`}
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            withCredentials={true}
          >
            {fileList.length >= count ? null : uploadButton}
          </Upload>
        </ImgCrop>
      ) : (
        <Upload
          action={`/api/file/uploads?page=${pageId}`}
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          withCredentials={true}
        >
          {fileList.length >= count ? null : uploadButton}
        </Upload>
      )}
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt="example"
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal>
    </>
  );
};

ImageUpload.propTypes = {
  pageId: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  aspect: PropTypes.object.isRequired,
  files: PropTypes.arrayOf(PropTypes.object).isRequired,
  setImages: PropTypes.func.isRequired,
};

export default ImageUpload;
