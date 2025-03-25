import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
  CardContent,
} from "./ui/card";
import {
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Select } from "./ui/select";
import { useQuery } from "react-query";
import { getQuoteData, getQuoteDataForCoin } from "../api/service";
import { QuoteResponseData } from "../utils/types";
import { useState } from "react";
import { timeLeftOnQuoteAtom } from "@/jotai/atoms";
import { useAtomValue, useSetAtom, useAtom } from "jotai";
import { CountdownAccept } from "./CountdownAccept";

function AcceptQuote() {
  const params = useParams();
  const uuid = params.uuid;
  const navigate = useNavigate();
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const setTimeLeftOnQuote = useAtom(timeLeftOnQuoteAtom);

  const {
    data: quoteData,
    // error: quoteFetchError,
    // isLoading: isQuoteDataLoading,
    refetch: refetchQuoteData,
  } = useQuery<QuoteResponseData>({
    queryKey: ["getQuoteData", uuid],
    queryFn: () => getQuoteData(uuid),
  });

  const {
    data: quoteDataForCoin,
    // error: quoteFetchError,
    // isLoading: isQuoteDataLoading,
  } = useQuery<QuoteResponseData>({
    queryKey: ["getQuoteDataForCoin", selectedCurrency, uuid],
    queryFn: () => getQuoteDataForCoin(selectedCurrency, uuid),
    enabled: !!selectedCurrency,
  });

  const handleConfirmClick = () => {
    navigate(`/payin/${uuid}/pay`);
  };

  return (
    <Card className="w-[380px] max-w-sm rounded-2xl shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">
          {quoteData?.merchantDisplayName}
        </CardTitle>
        <CardDescription>
          <div className="mt-4">
            <Label className="text-lg justify-center font-medium">
              200 EUR
            </Label>
            <p className="mt-4 text-sm text-gray-600">
              For reference number: {quoteData?.reference}
            </p>
          </div>
        </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-6">
        {/* Payment Method Section */}
        <div>
          <Select
            defaultValue="BTC"
            onValueChange={(value) => setSelectedCurrency(value)}
          >
            <Label className="ml-4 text-sm text-gray-700">Pay With</Label>
            <SelectTrigger className="w-full mt-2 border-gray-300">
              <SelectValue placeholder="Select a payment method" />
            </SelectTrigger>
            <SelectContent className="absolute z-50 bg-white shadow-lg">
              <SelectItem value="BTC">BTC</SelectItem>
              <SelectItem value="ETH">ETH</SelectItem>
              <SelectItem value="LTC">LTC</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {quoteDataForCoin && (
          <>
            {/* Amount Due Section */}
            <div className="border-t border-gray-300 pt-2 flex items-center justify-between">
              <p className="text-sm text-gray-700">Amount Due</p>
              <p className="text-sm font-semibold">
                {quoteDataForCoin?.paidCurrency?.amount}{" "}
                {quoteDataForCoin?.paidCurrency?.currency}
              </p>
            </div>

            {/* Quoted Price Expiry Section */}
            <div className="border-t border-b border-gray-300 py-2 flex items-center justify-between">
              <p className="text-sm text-gray-700">
                Quoted price expires in
                <CountdownAccept refetch={refetchQuoteData} />
              </p>
            </div>

            {/* Confirm Button */}
            <Button
              className="mt-4 w-full !bg-blue-700 text-white hover:bg-blue-600 active:bg-blue-800"
              onClick={handleConfirmClick}
            >
              Confirm
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default AcceptQuote;
