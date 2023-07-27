import React, { useState, useEffect } from "react";
import { Navbar, Scanner } from "../components";
import { useStateContext } from "../context";
import { format } from "date-fns";

const CheckProducts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [info, setInfo] = useState();
  const [shipmentData, setShipmentData] = useState("");
  const [num, setNum] = useState(null);
  const { address, contract, Search } = useStateContext();

  const fetchproduct = async () => {
    setIsLoading(true);
    const data = await Search(num);
    setInfo(data);
    setIsLoading(false);
  };

  const handleScanResult = (result) => {
    setShipmentData(result);
    const parsedNum = parseInt(result);
    setNum(parsedNum);
  };

  useEffect(() => {
    if (num !== null) {
      fetchproduct();
    }
  }, [num]);

  return (
    <div>
      <Navbar />
      <Scanner onScanResult={handleScanResult} />
      {info && (
        <div>
          <h1 className="font-epilogue font-medium text-[35px] leading-22 text-white text-center mt-[20px] backdrop-brightness-50 rounded-[10px] sm:p-10 p-4">
            Product Repair History
          </h1>
          {info.map((state, index) => (
            <div
              key={index}
              className="font-epilogue font-medium text-[14px] leading-[22px] text-white mt-[30px] backdrop-brightness-50 rounded-[10px] sm:p-10 p-4"
            >
              <p>Modifier: {state.s_modifier}</p>
              {/* Convert Unix timestamp to IST */}
              <p>
                Date (IST):{" "}
                {format(new Date(state.date * 1000), "MMM dd, yyyy")}
              </p>
              <p>
                Time (IST): {format(new Date(state.date * 1000), "hh:mm aa")}
              </p>
              <p>Info: {state.info}</p>
              <p>Location: {state.location}</p>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CheckProducts;
