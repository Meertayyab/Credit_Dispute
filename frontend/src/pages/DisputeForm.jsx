// import { useEffect, useRef, useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { Calendar } from "@/components/ui/calendar";
// import { CalendarIcon } from "lucide-react";
// import { format } from "date-fns";
// import { cn } from "@/lib/utils";
// import axiosInstance from "../components/AxiosInstance";
// import { toast } from "sonner";

// export default function DisputeForm() {
//   const topRef = useRef(null);

//   const [formData, setFormData] = useState({
//     fullName: "",
//     address: "",
//     cityStateZip: "",
//     phone: "",
//     dob: "",
//     ssn: "",
//     selectedLetterType: "Verification Dispute Letter",
//     creditBureau: "Equifax",
//     notaryLanguage: true,
//     saveToHistory: true,
//     creditors: [{ name: "", accountNumber: "" }],
//   });

//   const [dobDate, setDobDate] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const theme = localStorage.getItem("theme");
//     document.documentElement.classList.toggle("dark", theme === "dark");
//   }, []);

//   const validateForm = () => {
//     const requiredFields = [
//       "fullName",
//       "address",
//       "cityStateZip",
//       "phone",
//       "dob",
//       "ssn",
//     ];
//     for (const field of requiredFields) {
//       if (!formData[field]) {
//         toast.warning(`⚠️ ${field} is required`);
//         return false;
//       }
//     }

//     if (!dobDate) {
//       toast.warning("⚠️ Date of Birth is required");
//       return false;
//     }

//     const invalidCreditor = formData.creditors.some(
//       (c) => !c.name || !c.accountNumber
//     );
//     if (invalidCreditor) {
//       toast.warning("⚠️ Each creditor must have both name and account number.");
//       return false;
//     }

//     return true;
//   };

//   const handleChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleDateChange = (date) => {
//     setDobDate(date);
//     if (date) {
//       const formattedDate = format(date, "MM/dd/yyyy");
//       setFormData((prev) => ({ ...prev, dob: formattedDate }));
//     } else {
//       setFormData((prev) => ({ ...prev, dob: "" }));
//     }
//   };

//   const handleCreditorChange = (index, field, value) => {
//     const updated = [...formData.creditors];
//     updated[index][field] = value;
//     setFormData({ ...formData, creditors: updated });
//   };

//   const handleAddCreditor = () => {
//     setFormData({
//       ...formData,
//       creditors: [...formData.creditors, { name: "", accountNumber: "" }],
//     });
//   };

//   const handleSubmit = async () => {
//     if (!validateForm()) return;

//     try {
//       setLoading(true);
//       toast.info("⏳ Generating your letter...");
//       const token = localStorage.getItem("token");

//       const res = await axiosInstance.post("/dispute/create", formData, {
//         responseType: "blob",
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const blob = new Blob([res.data], { type: "application/pdf" });
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = "Metro2-Dispute-Letter.pdf";
//       a.click();
//       window.URL.revokeObjectURL(url);

//       toast.success("✅ Letter generated & downloaded");
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     } catch (err) {
//       console.error("❌ Generate letter error:", err);
//       toast.error("❌ Failed to generate letter: " + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       ref={topRef}
//       className="p-6 mt-6 max-w-2xl mx-auto bg-white dark:bg-gray-900 text-black dark:text-white shadow-md rounded-lg space-y-4"
//     >
//       <h2 className="text-xl font-semibold mb-2">
//         Generate Metro-2 Dispute Letter
//       </h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
//         <Input
//           placeholder="Full Name *"
//           value={formData.fullName}
//           onChange={(e) => handleChange("fullName", e.target.value)}
//         />
//         <Input
//           placeholder="Phone *"
//           value={formData.phone}
//           onChange={(e) => handleChange("phone", e.target.value)}
//         />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
//         <Input
//           placeholder="Address *"
//           value={formData.address}
//           onChange={(e) => handleChange("address", e.target.value)}
//         />
//         <Input
//           placeholder="City, State, ZIP *"
//           value={formData.cityStateZip}
//           onChange={(e) => handleChange("cityStateZip", e.target.value)}
//         />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
//         <Popover>
//           <PopoverTrigger asChild>
//             <Button
//               variant={"outline"}
//               className={cn(
//                 "w-full justify-start text-left font-normal",
//                 !dobDate && "text-muted-foreground"
//               )}
//             >
//               <CalendarIcon className="mr-2 h-4 w-4" />
//               {dobDate ? (
//                 format(dobDate, "MM/dd/yyyy")
//               ) : (
//                 <span>Date of Birth *</span>
//               )}
//             </Button>
//           </PopoverTrigger>
//           <PopoverContent className="w-auto p-0">
//             <Calendar
//               mode="single"
//               selected={dobDate}
//               onSelect={handleDateChange}
//               disabled={(date) =>
//                 date > new Date() || date < new Date("1900-01-01")
//               }
//               initialFocus
//               showOutsideDays={false}
//               captionLayout="dropdown-buttons"
//               fromYear={1900}
//               toYear={new Date().getFullYear()}
//               classNames={{
//                 months:
//                   "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
//                 month: "space-y-4",
//                 caption: "flex justify-center pt-1 relative items-center",
//                 caption_label: "text-sm font-medium",
//                 caption_dropdowns: "flex justify-center gap-1",
//                 nav: "space-x-1 flex items-center",
//                 nav_button:
//                   "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
//                 nav_button_previous: "absolute left-1",
//                 nav_button_next: "absolute right-1",
//                 table: "w-full border-collapse space-y-1",
//                 head_row: "flex",
//                 head_cell:
//                   "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
//                 row: "flex w-full mt-2",
//                 cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
//                 day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
//                 day_range_end: "day-range-end",
//                 day_selected:
//                   "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
//                 day_today: "bg-accent text-accent-foreground",
//                 day_outside:
//                   "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
//                 day_disabled: "text-muted-foreground opacity-50",
//                 day_range_middle:
//                   "aria-selected:bg-accent aria-selected:text-accent-foreground",
//                 day_hidden: "invisible",
//               }}
//             />
//           </PopoverContent>
//         </Popover>
//         <Input
//           placeholder="SSN (###-##-####) *"
//           value={formData.ssn}
//           onChange={(e) => handleChange("ssn", e.target.value)}
//         />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
//         <div>
//           <label className="block font-medium mt-2">Letter Type</label>
//           <select
//             className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
//             value={formData.selectedLetterType}
//             onChange={(e) => handleChange("selectedLetterType", e.target.value)}
//           >
//             <option>Verification Dispute Letter</option>
//             <option>Deletion Request</option>
//             <option>Reinvestigation Demand</option>
//           </select>
//         </div>

//         <div>
//           <label className="block font-medium mt-2">Credit Bureau</label>
//           <select
//             className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
//             value={formData.creditBureau}
//             onChange={(e) => handleChange("creditBureau", e.target.value)}
//           >
//             <option>Equifax</option>
//             <option>Experian</option>
//             <option>TransUnion</option>
//           </select>
//         </div>
//       </div>

//       <div className="mt-4 space-y-2">
//         <label className="block font-medium">Creditors</label>
//         {formData.creditors.map((creditor, idx) => (
//           <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-2">
//             <Input
//               placeholder="Creditor Name *"
//               value={creditor.name}
//               onChange={(e) =>
//                 handleCreditorChange(idx, "name", e.target.value)
//               }
//             />
//             <Input
//               placeholder="Account Number *"
//               value={creditor.accountNumber}
//               onChange={(e) =>
//                 handleCreditorChange(idx, "accountNumber", e.target.value)
//               }
//             />
//           </div>
//         ))}
//         <Button variant="secondary" onClick={handleAddCreditor}>
//           + Add Another Account
//         </Button>
//       </div>

//       <div className="flex items-center space-x-2 mt-2">
//         <input
//           type="checkbox"
//           checked={formData.notaryLanguage}
//           onChange={(e) => handleChange("notaryLanguage", e.target.checked)}
//         />
//         <label className="text-sm font-medium">Include Notary Language</label>
//       </div>

//       <div className="flex items-center space-x-2">
//         <input
//           type="checkbox"
//           checked={formData.saveToHistory}
//           onChange={(e) => handleChange("saveToHistory", e.target.checked)}
//         />
//         <label className="text-sm font-medium">Save to History</label>
//       </div>

//       <Button onClick={handleSubmit} disabled={loading}>
//         {loading ? "Generating..." : "Generate & Download Letter"}
//       </Button>
//     </div>
//   );
// }


import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axiosInstance from "../components/AxiosInstance";
import { toast } from "sonner";
import { DatePicker } from "@/components/ui/date-picker";
import { format } from "date-fns";

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

  const [dobDate, setDobDate] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    document.documentElement.classList.toggle("dark", theme === "dark");
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

    if (!dobDate) {
      toast.warning("⚠️ Date of Birth is required");
      return false;
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

  const handleDateChange = (date) => {
    setDobDate(date);
    if (date) {
      const formattedDate = format(date, "MM/dd/yyyy");
      setFormData((prev) => ({ ...prev, dob: formattedDate }));
    } else {
      setFormData((prev) => ({ ...prev, dob: "" }));
    }
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
        <DatePicker value={dobDate} onChange={handleDateChange} />
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
            onChange={(e) => handleChange("selectedLetterType", e.target.value)}
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
        <label className="text-sm font-medium">Include Notary Language</label>
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
    </div>
  );
}
