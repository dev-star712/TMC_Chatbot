import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  CaretDownFilled,
  ClusterOutlined,
  FileOutlined,
  FileFilled,
  FolderOutlined,
  TeamOutlined,
  DatabaseOutlined,
  AppstoreOutlined,
  UserOutlined
} from "@ant-design/icons";
import { Layout, Tree } from "antd";
import HeaderBar from "./components/Header";
import {
  useGetAllNewsMutation,
  useGetAllReviewMutation,
  useGetAllVideoMutation,
  useLoadAllMutation,
} from "./slices/contentApiSlice";

const { Content, Sider } = Layout;

const App = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();

  const [news, setNews] = useState([]);
  const [review, setReview] = useState([]);
  const [video, setVideo] = useState([]);
  const [contents, setContents] = useState([]);

  const [getAllNews] = useGetAllNewsMutation();
  const [getAllReview] = useGetAllReviewMutation();
  const [getAllVideo] = useGetAllVideoMutation();
  const [loadAll] = useLoadAllMutation();

  useEffect(() => {
    async function fetchData() {
      const result_news = await getAllNews();
      setNews(result_news.data.articles);

      const result_review = await getAllReview();
      setReview(result_review.data.articles);

      const result_video = await getAllVideo();
      setVideo(result_video.data.articles);

      const result_contents = await loadAll();
      setContents(result_contents.data.contents);
    }
    fetchData();
  }, []);

  let treeData = [
    {
      title: "Pages",
      key: "0",
      icon: <ClusterOutlined />,
      children: [
        ...[
          {
            title: "Home",
            key: "0-0",
            icon: <FolderOutlined />,
            children: [
              {
                title: "Home Hero Content",
                key: "0-0-0",
                icon: ({ selected }) =>
                  selected ? <FileFilled /> : <FileOutlined />,
              },
              {
                title: "About Us Home Banners",
                key: "0-0-1",
                icon: ({ selected }) =>
                  selected ? <FileFilled /> : <FileOutlined />,
              },
            ],
          },
        ],
        ...contents.map((content) => {
          return {
            title:
              content.title.length < 26
                ? content.title
                : `${content.title.slice(0, 23)}...`,
            key: `0-${content.page}`,
            icon: <FolderOutlined />,
            children: [
              {
                title:
                  `${content.title} Content`.length < 23
                    ? `${content.title} Content`
                    : `${`${content.title} Content`.slice(0, 20)}...`,
                key: `0-${content.page}-0`,
                icon: ({ selected }) =>
                  selected ? <FileFilled /> : <FileOutlined />,
              },
            ],
          };
        }),
      ],
    },
    {
      title: "Motoring Hub Content",
      key: "1",
      icon: <AppstoreOutlined />,
      children: [
        {
          title: "News (+)",
          key: "1-0",
          icon: <FolderOutlined />,
          children: news.map((_news) => {
            return {
              title:
                _news.title.length < 23
                  ? _news.title
                  : `${_news.title.slice(0, 20)}...`,
              key: `news/${_news._id}`,
              icon: ({ selected }) =>
                selected ? <FileFilled /> : <FileOutlined />,
            };
          }),
        },
        {
          title: "Reviews (+)",
          key: "1-1",
          icon: <FolderOutlined />,
          children: review.map((_review) => {
            return {
              title:
                _review.title.length < 23
                  ? _review.title
                  : `${_review.title.slice(0, 20)}...`,
              key: `review/${_review._id}`,
              icon: ({ selected }) =>
                selected ? <FileFilled /> : <FileOutlined />,
            };
          }),
        },
        {
          title: "Videos (+)",
          key: "1-2",
          icon: <FolderOutlined />,
          children: video.map((_video) => {
            return {
              title:
                _video.title.length < 23
                  ? _video.title
                  : `${_video.title.slice(0, 20)}...`,
              key: `video/${_video._id}`,
              icon: ({ selected }) =>
                selected ? <FileFilled /> : <FileOutlined />,
            };
          }),
        },
      ],
    },
    {
      title: "Meet The Team",
      key: "2",
      icon: <TeamOutlined />,
    },
    {
      title: "Additional Bot Knowledge Base",
      key: "3",
      icon: <DatabaseOutlined />,
    }
  ];
  if(userInfo && userInfo.super == true)
    treeData.push(
      {
        title: "User Management",
        key: "4",
        icon: <UserOutlined />,
      })

  return (
    <>
      <HeaderBar />
      <ToastContainer />
      <Layout
        style={{
          minHeight: "calc(100vh - 56px)",
        }}
      >
        {location.pathname.startsWith("/content") && (
          <Sider
            theme="light"
            width={300}
            className="pt-3"
            style={{ overflowY: "auto", maxHeight: "calc(100vh - 56px)" }}
          >
            <Tree
              showIcon
              defaultExpandAll
              defaultSelectedKeys={["0"]}
              switcherIcon={<CaretDownFilled />}
              treeData={treeData}
              onSelect={(selectedKeys) => {
                if (selectedKeys[0]) navigate(`/content/${selectedKeys[0]}`);
              }}
            />
          </Sider>
        )}
        <Content style={{ overflowY: "auto", maxHeight: "calc(100vh - 56px)" }}>
          <Outlet />
        </Content>
      </Layout>
    </>
  );
};

export default App;
