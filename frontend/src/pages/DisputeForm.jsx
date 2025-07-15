import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axiosInstance from "../components/AxiosInstance";
import { toast } from "sonner";
import SkeletonLoader from "../components/skeletonLoader";

export default function DisputeForm() {
  const topRef = useRef(null);

  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    cityStateZip: "",
    phone: "",
    dob: "",
    ssn: "",
    selectedLetterType: "Verification Dispute Letter",
    creditBureau: "Equifax",
    notaryLanguage: true,
    saveToHistory: true,
    creditors: [{ name: "", accountNumber: "" }],
  });

  const [loading, setLoading] = useState(true); // initially true

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    document.documentElement.classList.toggle("dark", theme === "dark");

    // Simulate initial page load delay
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timeout);
  }, []);

  const validateForm = () => {
    const requiredFields = [
      "fullName",
      "address",
      "cityStateZip",
      "phone",
      "dob",
      "ssn",
    ];
    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.warning(`⚠️ ${field} is required`);
        return false;
      }
    }
    const invalidCreditor = formData.creditors.some(
      (c) => !c.name || !c.accountNumber
    );
    if (invalidCreditor) {
      toast.warning("⚠️ Each creditor must have both name and account number.");
      return false;
    }
    return true;
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreditorChange = (index, field, value) => {
    const updated = [...formData.creditors];
    updated[index][field] = value;
    setFormData({ ...formData, creditors: updated });
  };

  const handleAddCreditor = () => {
    setFormData({
      ...formData,
      creditors: [...formData.creditors, { name: "", accountNumber: "" }],
    });
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      toast.info("⏳ Generating your letter...");
      const token = localStorage.getItem("token");

      const res = await axiosInstance.post("/dispute/create", formData, {
        responseType: "blob",
        headers: { Authorization: `Bearer ${token}` },
      });

      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Metro2-Dispute-Letter.pdf";
      a.click();
      window.URL.revokeObjectURL(url);

      toast.success("✅ Letter generated & downloaded");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("❌ Generate letter error:", err);
      toast.error("❌ Failed to generate letter: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      ref={topRef}
      className="p-6 mt-6 max-w-2xl mx-auto bg-white dark:bg-gray-900 text-black dark:text-white shadow-md rounded-lg space-y-4"
    >
      <h2 className="text-xl font-semibold mb-2">
        Generate Metro-2 Dispute Letter
      </h2>

      {loading ? (
        <SkeletonLoader variant="payment" />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <Input
              placeholder="Full Name *"
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
            />
            <Input
              placeholder="Phone *"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <Input
              placeholder="Address *"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
            />
            <Input
              placeholder="City, State, ZIP *"
              value={formData.cityStateZip}
              onChange={(e) => handleChange("cityStateZip", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <Input
              placeholder="DOB (MM/DD/YYYY) *"
              value={formData.dob}
              onChange={(e) => handleChange("dob", e.target.value)}
            />
            <Input
              placeholder="SSN (###-##-####) *"
              value={formData.ssn}
              onChange={(e) => handleChange("ssn", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <label className="block font-medium mt-2">Letter Type</label>
              <select
                className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
                value={formData.selectedLetterType}
                onChange={(e) =>
                  handleChange("selectedLetterType", e.target.value)
                }
              >
                <option>Verification Dispute Letter</option>
                <option>Deletion Request</option>
                <option>Reinvestigation Demand</option>
              </select>
            </div>

            <div>
              <label className="block font-medium mt-2">Credit Bureau</label>
              <select
                className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
                value={formData.creditBureau}
                onChange={(e) => handleChange("creditBureau", e.target.value)}
              >
                <option>Equifax</option>
                <option>Experian</option>
                <option>TransUnion</option>
              </select>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <label className="block font-medium">Creditors</label>
            {formData.creditors.map((creditor, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <Input
                  placeholder="Creditor Name *"
                  value={creditor.name}
                  onChange={(e) =>
                    handleCreditorChange(idx, "name", e.target.value)
                  }
                />
                <Input
                  placeholder="Account Number *"
                  value={creditor.accountNumber}
                  onChange={(e) =>
                    handleCreditorChange(idx, "accountNumber", e.target.value)
                  }
                />
              </div>
            ))}
            <Button variant="secondary" onClick={handleAddCreditor}>
              + Add Another Account
            </Button>
          </div>

          <div className="flex items-center space-x-2 mt-2">
            <input
              type="checkbox"
              checked={formData.notaryLanguage}
              onChange={(e) => handleChange("notaryLanguage", e.target.checked)}
            />
            <label className="text-sm font-medium">
              Include Notary Language
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.saveToHistory}
              onChange={(e) => handleChange("saveToHistory", e.target.checked)}
            />
            <label className="text-sm font-medium">Save to History</label>
          </div>

          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Generating..." : "Generate & Download Letter"}
          </Button>
        </>
      )}
    </div>
  );
}
