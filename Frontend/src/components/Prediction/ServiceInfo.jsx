
import { useState } from "react";
import { Wifi, ArrowLeft, ArrowRight } from "lucide-react";

const ServicesInfo = ({ formData, updateFormData, nextStep, prevStep }) => {

  const [errors, setErrors] = useState({});

  const services = [
    {
      name: "PhoneService",
      label: "Phone Service",
      options: ["Yes", "No"]
    },
    {
      name: "MultipleLines",
      label: "Multiple Lines",
      options: ["Yes", "No", "No phone service"]
    },
    {
      name: "InternetService",
      label: "Internet Service",
      options: ["DSL", "Fiber optic", "No internet Service"]
    },
    {
      name: "OnlineSecurity",
      label: "Online Security",
      options: ["Yes", "No", "No internet Service"]
    },
    {
      name: "OnlineBackup",
      label: "Online Backup",
      options: ["Yes", "No", "No internet Service"]
    },
    {
      name: "DeviceProtection",
      label: "Device Protection",
      options: ["Yes", "No", "No internet Service"]
    },
    {
      name: "TechSupport",
      label: "Tech Support",
      options: ["Yes", "No", "No internet Service"]
    },
    {
      name: "StreamingTV",
      label: "Streaming TV",
      options: ["Yes", "No", "No internet Service"]
    },
    {
      name: "StreamingMovies",
      label: "Streaming Movies",
      options: ["Yes", "No", "No internet Service"]
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

    services.forEach((service) => {
      if (!formData[service.name]) {
        newErrors[service.name] = "Please select an option";
      }
    });

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
            <Wifi size={25} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Services Information
            </h1>

            <p className="text-sm text-slate-500">
              Step 2 of 4 — Select customer services
            </p>
          </div>

        </div>

        {/* Progress */}
        <div className="w-full bg-slate-200 h-2 rounded-full">
          <div className="w-2/4 bg-blue-600 h-2 rounded-full"></div>
        </div>

      </div>

      {/* Form */}
      <form
        onSubmit={handleNext}
        className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm"
      >

        <h2 className="text-lg font-semibold text-slate-800 mb-2">
          Customer Services
        </h2>

        <p className="text-sm text-slate-500 mb-6">
          Select the services currently used by this customer.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {services.map((service) => (
            <div key={service.name}>

              <label className="block text-sm font-medium text-slate-700 mb-2">
                {service.label}
              </label>

              <select
                name={service.name}
                value={formData[service.name] || ""}
                onChange={handleChange}
                className={`w-full border rounded-lg px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors[service.name]
                    ? "border-red-500"
                    : "border-slate-300"
                }`}
              >

                <option value="">
                  Select {service.label}
                </option>

                {service.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}

              </select>

              {errors[service.name] && (
                <p className="text-red-500 text-xs mt-1">
                  {errors[service.name]}
                </p>
              )}

            </div>
          ))}

        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">

          <button
            type="button"
            onClick={prevStep}
            className="flex items-center gap-2 border border-slate-300 text-slate-700 px-6 py-3 rounded-lg hover:bg-slate-100 transition"
          >
            <ArrowLeft size={18} />
            Previous
          </button>

          <button
            type="submit"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
          >
            Next Step
            <ArrowRight size={18} />
          </button>

        </div>

      </form>

    </div>
  );
};

export default ServicesInfo;
