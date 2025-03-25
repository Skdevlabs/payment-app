import {
  selectedCurrencyAtom,
  amountDueAtom,
  cryptoAddressAtom,
  timeLeftToPayAtom,
} from "../jotai/atoms";
import { useAtomValue } from "jotai";
import { CountdownPay } from "./CountdownPay";
import { useCountdown } from "../hooks/useCountdownHook";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

function truncateAddress(address) {
  if (address.length <= 12) return address;
  return `${address.slice(0, 7)}...${address.slice(-5)}`;
}

function PayQuote() {
  const selectedCurrency = useAtomValue(selectedCurrencyAtom);
  const amountDue = useAtomValue(amountDueAtom);
  const cryptoAddress = useAtomValue(cryptoAddressAtom);
  //   let timeLeft = useAtomValue(timeLeftAtom);
  const params = useParams();
  const uuid = params.uuid;

  const {
    data: acceptQuoteData,
    // error: quoteFetchError,
    // isLoading: isQuoteDataLoading,
  } = useQuery<AcceptQuoteResponseData>({
    queryKey: ["getAcceptQuoteData", uuid],
    queryFn: () => getAcceptQuoteData(uuid),
  });

  console.log("acceptQuoteData", acceptQuoteData);

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

          <div className="flex items-center justify-between pr-2 border-t border-b border-gray-300 pt-3 pb-3">
            <p className="text-sm text-gray-700">
              Time left to pay
              <CountdownPay />
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default PayQuote;
