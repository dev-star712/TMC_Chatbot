import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "antd";

const ReviewIndexScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const deleteValue = searchParams.get("delete");
    if (deleteValue === "success") toast.success("Deleted successfully");
  }, []);

  return (
    <div
      className="m-2 p-2 bg-white"
      style={{
        height: "50vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Button
        type="primary"
        size="large"
        onClick={() => navigate("/content/review/review")}
      >
        Create a Review
      </Button>
    </div>
  );
};

export default ReviewIndexScreen;
