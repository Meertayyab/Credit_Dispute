
import  { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import axiosInstance from "../components/AxiosInstance";


export default function ManageProfileForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    ssn: "",
    phone: "",
    streetAddress: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    email: "",
    portalUsername: "",
    portalPassword: "",
    notes: "",
    creditReportMonitoringSite: "",
    creditReportHtml: "",
    mfsnUsername: "",
    mfsnPassword: "",
    mfsnDetails: "",
    reportTypes: [],
  });

  const [files, setFiles] = useState({
    photoId: null,
    ssnProof: null,
    addressProof: null,
    otherDocs: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    if (name === "otherDocs") {
      setFiles((prev) => ({ ...prev, [name]: Array.from(selectedFiles) }));
    } else {
      setFiles((prev) => ({ ...prev, [name]: selectedFiles[0] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => payload.append(`${key}[]`, v));
      } else {
        payload.append(key, value);
      }
    });

    if (files.photoId) payload.append("photoId", files.photoId);
    if (files.ssnProof) payload.append("ssnProof", files.ssnProof);
    if (files.addressProof) payload.append("addressProof", files.addressProof);
    files.otherDocs.forEach((doc) => payload.append("otherDocs", doc));

    try {
      const res = await axiosInstance.post("/profiles/add", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("✅ Profile created successfully!");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to create profile");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div className="grid grid-cols-2 gap-4">
        <Input name="firstName" placeholder="First Name" onChange={handleChange} />
        <Input name="lastName" placeholder="Last Name" onChange={handleChange} />
        <Input name="dob" placeholder="Date of Birth" type="date" onChange={handleChange} />
        <Input name="ssn" placeholder="Social Security Number" onChange={handleChange} />
        <Input name="phone" placeholder="Phone" onChange={handleChange} />
        <Input name="streetAddress" placeholder="Street Address" onChange={handleChange} />
        <Input name="city" placeholder="City" onChange={handleChange} />
        <Select name="state" onValueChange={(value) => setFormData((prev) => ({ ...prev, state: value }))}>
          <SelectTrigger>
            <SelectValue placeholder="Select a State" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="CA">California</SelectItem>
            <SelectItem value="NY">New York</SelectItem>
            <SelectItem value="TX">Texas</SelectItem>
          </SelectContent>
        </Select>
        <Input name="zip" placeholder="Zip" onChange={handleChange} />
        <Input name="country" placeholder="Country" onChange={handleChange} />
        <Input name="email" placeholder="Email Address" onChange={handleChange} />
        <Input name="portalUsername" placeholder="Client Portal Username" onChange={handleChange} />
        <Input name="portalPassword" placeholder="Client Portal Password" onChange={handleChange} />
        <Textarea name="notes" placeholder="Notes" onChange={handleChange} />
        <Input name="creditReportMonitoringSite" placeholder="Credit Report Monitoring Site" onChange={handleChange} />
        <Textarea name="creditReportHtml" placeholder="Manually Entered Credit Report HTML" onChange={handleChange} />
        <Input name="mfsnUsername" placeholder="MFSN Username" onChange={handleChange} />
        <Input name="mfsnPassword" placeholder="MFSN Password" onChange={handleChange} />
        <Textarea name="mfsnDetails" placeholder="MFSN Details" onChange={handleChange} />
      </div>

      <div className="space-y-2">
        <label>📎 Upload Photo ID</label>
        <Input name="photoId" type="file" onChange={handleFileChange} />

        <label>📎 Upload SSN Proof</label>
        <Input name="ssnProof" type="file" onChange={handleFileChange} />

        <label>📎 Upload Address Proof</label>
        <Input name="addressProof" type="file" onChange={handleFileChange} />

        <label>📎 Upload Other Documents</label>
        <Input name="otherDocs" type="file" multiple onChange={handleFileChange} />
      </div>

      <Button type="submit" className="mt-4">
        Submit Profile
      </Button>
    </form>
  );
}
