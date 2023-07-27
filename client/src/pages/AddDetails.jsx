import React, { useState, useEffect } from "react";
import {
  Scanner,
  FormField,
  CustomButton,
  Navbar,
  Loader,
} from "../components";
import { useStateContext } from "../context";

const AddDetails = () => {
  const [shipmentData, setShipmentData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [num, setNum] = useState(0);

  const { addShimpmentInfo, contract, address } = useStateContext();

  const [form, setForm] = useState({
    description: "",
    location: "",
  });

  const handleScanResult = (result) => {
    setShipmentData(result);
    const parsedNum = parseInt(result);
    setNum(parsedNum);
  };

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = await addShimpmentInfo(num, {
      ...form,
    });

    setIsLoading(false);

    console.log(form);
  };

  return (
    <div>
      <Navbar />
      {<Scanner onScanResult={handleScanResult} />}
      {shipmentData && (
        <div className="mt-[30px] backdrop-brightness-50 flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
          {isLoading && <Loader />}

          <form
            onSubmit={handleSubmit}
            className="w-full mt-[65px] flex flex-col gap-[30px]"
          >
            <span className="font-epilogue font-medium text-[14px] leading-[22px] text-white ">
              You are updating repair details for product ID -{num}
            </span>
            <div className="flex flex-col justify-center items-center ">
              <FormField
                labelName="Repair Description *"
                placeholder="Update info"
                inputType="text"
                value={form.description}
                handleChange={(e) => handleFormFieldChange("description", e)}
              />
              <FormField
                labelName="Location *"
                placeholder="Apple store"
                inputType="text"
                value={form.location}
                handleChange={(e) => handleFormFieldChange("location", e)}
              />
            </div>
            <div className="flex flex-row gap-[50px]">
              <div className="flex justify-center items-center mt-[26px]">
                <CustomButton
                  btnType="submit"
                  title="Update Details"
                  styles="dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                />
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddDetails;
