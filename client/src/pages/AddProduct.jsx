import React, { useState, useEffect } from "react";
import { FormField, CustomButton, Loader, Navbar } from "../components";
import { useNavigate } from "react-router-dom";
import QrCode from "qrcode";
import { useStateContext } from "../context";

const AddProduct = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { createnewItem, contract, address, connect } = useStateContext();

  const [qrData, setQrData] = useState(null);
  const [url, setUrl] = useState("");

  const [form, setForm] = useState({
    pname: "",
    category: "",
    image: "",
    description: "",
    location: "",
  });

  const generateQR = async () => {
    try {
      const response = await QrCode.toDataURL(qrData);
      setUrl(response);
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    if (qrData) {
      generateQR(qrData);
    }
  }, [qrData]);

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };
  const handleSubmit = async (e) => {
    connect();
    e.preventDefault();
    setIsLoading(true);
    const data = await createnewItem({
      ...form,
    });
    console.log(data);
    const num = data.receipt.events[0].args.index;
    const numAsString = num.toString();
    setQrData(numAsString);
    setIsLoading(false);
  };
  return (
    <div>
      <Navbar />
      <div className="mt-[30px] backdrop-brightness-50 flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
        {isLoading && <Loader />}

        <form
          onSubmit={handleSubmit}
          className="w-full mt-[65px] flex flex-col gap-[30px]"
        >
          <div className="flex flex-wrap gap-[40px]">
            <FormField
              labelName="Product Name *"
              placeholder="Iphone6"
              inputType="text"
              value={form.pname}
              handleChange={(e) => handleFormFieldChange("pname", e)}
            />

            <FormField
              labelName="Product Category *"
              placeholder="Mobile"
              inputType="text"
              value={form.category}
              handleChange={(e) => handleFormFieldChange("category", e)}
            />

            <FormField
              labelName="Product Description *"
              placeholder="Tell about the product"
              inputType="text"
              value={form.description}
              handleChange={(e) => handleFormFieldChange("description", e)}
            />

            <FormField
              labelName="Image URL *"
              placeholder="Url here"
              inputType="url"
              value={form.image}
              handleChange={(e) => handleFormFieldChange("image", e)}
            />
            <FormField
              labelName="Location *"
              placeholder="location"
              inputType="text"
              value={form.location}
              handleChange={(e) => handleFormFieldChange("location", e)}
            />
          </div>

          <div className="flex justify-center items-center mt-[26px] ">
            {
              <CustomButton
                btnType="submit"
                title="Register Product"
                styles="dark:bg-black-600 dark:hover:bg-black-700 dark:focus:ring-black-800"
              />
            }
          </div>
        </form>
        {qrData && (
          <div className="mt-[26px]">
            <span className="font-epilogue font-medium text-[14px] leading-[22px] text-white ">
              Product Registered Successfully{" "}
            </span>
            <div className="flex justify-center items-center mt-[26px] ">
              <img src={url} alt="qrcode" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddProduct;
