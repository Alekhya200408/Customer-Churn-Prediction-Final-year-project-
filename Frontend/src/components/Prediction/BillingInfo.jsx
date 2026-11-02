
import { useState } from "react";
import { CreditCard, ArrowLeft, ArrowRight } from "lucide-react";

const BillingInfo = ({ formData, updateFormData, nextStep, prevStep }) => {

  const [errors, setErrors] = useState({});

  const fields = [
    {
      name: "tenure",
      label: "Tenure (Months)",
      type: "number",
      placeholder: "Enter tenure (0-72)"
    },
    {
      name: "Contract",
      label: "Contract Type",
      type: "select",
      options: ["Month-to-month", "One year", "Two year"]
    },
    {
      name: "PaperlessBilling",
      label: "Paperless Billing",
      type: "select",
      options: ["Yes", "No"]
    },
    {
      name: "PaymentMethod",
      label: "Payment Method",
      type: "select",
      options: [
        "Electronic check",
        "Mailed check",
        "Bank transfer (automatic)",
        "Credit card (automatic)"
      ]
    },
    {
      name: "MonthlyCharges",
      label: "Monthly Charges",
      type: "number",
      placeholder: "Enter monthly charges"
    },
    {
      name: "TotalCharges",
      label: "Total Charges",
      type: "number",
      placeholder: "Enter total charges"
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    updateFormData({
      ...formData,
      [name]: value
    });

    setErrors((prev) => ({
      ...prev,
      [name]: ""
    }));
  };

  const handleNext = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (formData.tenure === "" || Number(formData.tenure) < 0 || Number(formData.tenure) > 72) {
      newErrors.tenure = "Enter tenure between 0 and 72 months";
    }

    if (!formData.Contract) {
      newErrors.Contract = "Please select a contract";
    }

    if (!formData.PaperlessBilling) {
      newErrors.PaperlessBilling = "Please select an option";
    }

    if (!formData.PaymentMethod) {
      newErrors.PaymentMethod = "Please select a payment method";
    }

    if (formData.MonthlyCharges === "" || Number(formData.MonthlyCharges) < 0) {
      newErrors.MonthlyCharges = "Enter valid monthly charges";
    }

    if (formData.TotalCharges === "" || Number(formData.TotalCharges) < 0) {
      newErrors.TotalCharges = "Enter valid total charges";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      nextStep();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">

      {/* Heading */}
      <div className="mb-8">

        <div className="flex items-center gap-3 mb-3">

          <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
            <CreditCard size={25} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Billing & Contract
            </h1>

            <p className="text-sm text-slate-500">
              Step 3 of 4 — Enter billing details
            </p>
          </div>

        </div>

        <div className="w-full bg-slate-200 h-2 rounded-full">
          <div className="w-3/4 bg-blue-600 h-2 rounded-full"></div>
        </div>

      </div>

      {/* Form */}
      <form
        onSubmit={handleNext}
        className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm"
      >

        <h2 className="text-lg font-semibold text-slate-800 mb-2">
          Customer Billing Details
        </h2>

        <p className="text-sm text-slate-500 mb-6">
          Provide the customer's subscription and payment information.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {fields.map((field) => (
            <div key={field.name}>

              <label className="block text-sm font-medium text-slate-700 mb-2">
                {field.label}
              </label>

              {field.type === "select" ? (
                <select
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select {field.label}</option>

                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="number"
                  name={field.name}
                  value={formData[field.name] ?? ""}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  min="0"
                  max={field.name === "tenure" ? "72" : undefined}
                  step={field.name === "tenure" ? "1" : "any"}
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}

              {errors[field.name] && (
                <p className="text-red-500 text-xs mt-1">
                  {errors[field.name]}
                </p>
              )}

            </div>
          ))}

        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-8">

          <button
            type="button"
            onClick={prevStep}
            className="flex items-center gap-2 border border-slate-300 text-slate-700 px-6 py-3 rounded-lg hover:bg-slate-100"
          >
            <ArrowLeft size={18} />
            Previous
          </button>

          <button
            type="submit"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            Review Details
            <ArrowRight size={18} />
          </button>

        </div>

      </form>

    </div>
  );
};

export default BillingInfo;
