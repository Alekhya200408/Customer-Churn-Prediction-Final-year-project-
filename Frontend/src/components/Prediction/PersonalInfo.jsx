
import { User, ArrowRight } from "lucide-react";

const PersonalInfo = ({ formData, updateFormData, nextStep }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;

    updateFormData({
      ...formData,
      [name]: value
    });
  };

  const handleNext = (e) => {
    e.preventDefault();

    if (!formData.customerName.trim()) {
      alert("Please enter the customer name");
      return;
    }

    nextStep();
  };

  return (
    <div className="max-w-4xl mx-auto">

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
            <User size={25} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Personal Information
            </h1>

            <p className="text-sm text-slate-500">
              Step 1 of 4 — Enter basic customer details
            </p>
          </div>
        </div>

        <div className="w-full bg-slate-200 h-2 rounded-full">
          <div className="w-1/4 bg-blue-600 h-2 rounded-full"></div>
        </div>
      </div>

      <form
        onSubmit={handleNext}
        className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm"
      >

        <h2 className="text-lg font-semibold text-slate-800 mb-6">
          Customer Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Customer Name */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Customer Name
            </label>

            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              placeholder="Enter customer name"
              className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Gender
            </label>

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Senior Citizen */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Senior Citizen
            </label>

            <select
              name="SeniorCitizen"
              value={formData.SeniorCitizen}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Option</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </div>

          {/* Partner */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Has Partner?
            </label>

            <select
              name="Partner"
              value={formData.Partner}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {/* Dependents */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Has Dependents?
            </label>

            <select
              name="Dependents"
              value={formData.Dependents}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

        </div>

        <div className="flex justify-end mt-8">
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

export default PersonalInfo;
