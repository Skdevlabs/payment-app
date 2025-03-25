import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
  CardContent,
} from "./ui/card";

function Expiry() {
  return (
    <div className="flex justify-center">
      <Card className="w-[600px] max-w-lg rounded-2xl shadow-lg border-2 border-gray-300">
        <CardHeader className="flex flex-col items-center">
          <svg
            className="h-16 w-16 text-red-600 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01M12 5a7 7 0 110 14 7 7 0 010-14z"
            ></path>
          </svg>
          <CardTitle className="text-2xl font-semibold">
            Payment Details Expired
          </CardTitle>
          <CardDescription>
            <p className="text-gray-600 mt-2">
              The payment details for your transaction expired
            </p>
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          {/* Additional content can be added here if needed */}
        </CardContent>
      </Card>
    </div>
  );
}

export default Expiry;
