import { Card, CardBody, Typography, Rating } from "@material-tailwind/react";

export function ReviewCard({ data }) {
  const { serviceFeedback, summary, consumerDisplayName, url } = data;

  return (
    <Card
      className="shadow-none ml-2 mr-2 mt-6 w-full mx-auto cursor-pointer hover:shadow-custom-blue transition duration-500 ease-in-out"
      onClick={() => {
        window.open(url, "_blank");
      }}
    >
      <CardBody>
        <Rating
          value={
            serviceFeedback.numericalScore ? serviceFeedback.numericalScore : 5
          }
          readonly
        />
        {summary && (
          <Typography variant="h6" color="blue-gray" className="mb-2">
            {summary.length < 50 ? summary : `${summary.slice(0, 46)} ...`}
          </Typography>
        )}
        <Typography variant="small">
          {serviceFeedback.consumerComment.length < 100
            ? serviceFeedback.consumerComment
            : `${serviceFeedback.consumerComment.slice(0, 96)} ...`}
        </Typography>
        <Typography variant="small" className="text-gray-500">
          {consumerDisplayName}&nbsp;- &nbsp;
          {new Date(serviceFeedback.createDate).toLocaleDateString()}
        </Typography>
      </CardBody>
    </Card>
  );
}
