import { timeLeftToPayAtom } from "../jotai/atoms";
import { useSetAtom } from "jotai";
import { CountdownPay } from "./CountdownPay";
import { QRCodeSVG } from "qrcode.react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
  CardContent,
} from "./ui/card";
import { Label } from "./ui/label";
import { useQuery } from "react-query";
import { getAcceptQuoteData } from "../api/service";
import { AcceptQuoteResponseData } from "../utils/types";
import { useParams } from "react-router-dom";

function truncateAddress(address: string): string {
  if (!address || typeof address !== "string") return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function PayQuote() {
  const params = useParams();
  const uuid = params.uuid;
  const setTimeLeftToPay = useSetAtom(timeLeftToPayAtom);

  const { data: acceptQuoteData } = useQuery<AcceptQuoteResponseData>({
    queryKey: ["getAcceptQuoteData", uuid],
    queryFn: () => getAcceptQuoteData(uuid),
    onSuccess: (data: AcceptQuoteResponseData) => {
      setTimeLeftToPay(new Date(data.expiryDate).getTime());
    },
  });

  if (!acceptQuoteData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center">
      <Card className="w-[600px] max-w-lg rounded-2xl shadow-lg border-2 border-gray-300">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            <p>Pay with {acceptQuoteData.paidCurrency.currency}</p>
          </CardTitle>
          <CardDescription>
            <div className="mt-4">
              <Label className="text-lg justify-center font-medium">
                {`To complete this payment, send the amount due to the ${acceptQuoteData.paidCurrency.currency} address provided below`}
              </Label>
            </div>
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-6">
          {/* Amount Due and Copy Button in One Line */}
          <div className="flex items-center justify-between pr-2 border-t border-gray-300 pt-3 pb-0">
            <p className="text-sm text-gray-600">Amount Due:</p>
            <div>
              <p className="text-sm font-medium">
                {acceptQuoteData.paidCurrency.amount}

                <CopyToClipboard
                  text={acceptQuoteData.paidCurrency.amount?.toString()}
                >
                  <button className="text-blue-600 hover:underline ml-2">
                    Copy
                  </button>
                </CopyToClipboard>
              </p>
            </div>
          </div>

          {/* Currency Address, Address, and Copy Button in One Line */}
          <div className="flex items-center justify-between pr-2 border-t border-b border-gray-300 pt-3 pb-3">
            <p className="text-sm text-gray-600">
              {" "}
              {`${acceptQuoteData.paidCurrency.currency} Address:`}
            </p>
            <div className="flex items-center truncate space-x-2">
              <p className="text-sm font-medium">
                {truncateAddress(acceptQuoteData.address.address)}
                <CopyToClipboard text={acceptQuoteData.address.address}>
                  <button className="text-blue-600 hover:underline ml-2">
                    Copy
                  </button>
                </CopyToClipboard>
              </p>
            </div>
          </div>

          {/* Centered QR Code */}
          <div className="flex justify-center">
            <QRCodeSVG value={acceptQuoteData.address.address} size={256} />
          </div>

          {/* Time Left to Pay and Countdown in One Line */}
          <div className="flex items-center justify-between pr-2 border-t border-b border-gray-300 pt-3 pb-3">
            <p className="text-sm text-gray-700">Time left to pay</p>
            <CountdownPay />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default PayQuote;
