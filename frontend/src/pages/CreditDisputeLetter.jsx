// import { useEffect, useState } from "react";
// import {
//   Card,
//   CardHeader,
//   CardContent,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { toast } from "sonner";
// import axiosInstance from "../components/AxiosInstance";

// export default function CreditDisputeLetter() {
//   const [reports, setReports] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     fetchReports();
//   }, []);

//   const fetchReports = async () => {
//     try {
//       const res = await axiosInstance.get("/credit-reports");
//       setReports(res.data);
//     } catch (err) {
//       toast.error("❌ Failed to fetch reports");
//     }
//   };

//   const handleDownload = async (reportId) => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await fetch(
//         `http://localhost:5000/api/generate-letter/${reportId}`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (!res.ok) throw new Error("Download failed");

//       const blob = await res.blob();
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.download = `Metro2-Dispute-${reportId}.pdf`;
//       link.click();
//       window.URL.revokeObjectURL(url);
//     } catch (err) {
//       toast.error("❌ Unable to download letter");
//       console.error(err);
//     }
//   };

//   const handleSendLetter = async (report) => {
//     try {
//       const token = localStorage.getItem("token");
//       await axiosInstance.post(
//         "/disputes/send-letter",
//         {
//           name: "Meer Tayyab",
//           email: report.email,
//           reportId: report._id,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       toast.success("📬 Dispute letter sent to bureaus");
//     } catch (err) {
//       console.error("❌ Send letter error:", err);
//       toast.error("❌ Failed to send dispute letter");
//     }
//   };

//   const filteredReports = reports.filter((r) =>
//     r._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     r.email?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="p-6 max-w-6xl mx-auto space-y-6">
//       <h1 className="text-3xl font-bold text-center">📄 Credit Report Letters</h1>

//       <div className="flex justify-center">
//         <Input
//           placeholder="Search by report ID or email..."
//           className="max-w-md"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       {filteredReports.length === 0 ? (
//         <div className="text-center text-muted-foreground">No matching reports.</div>
//       ) : (
//         filteredReports.map((report) => {
//           const totalViolations = report.accounts?.reduce(
//             (count, acc) => count + (acc.violations?.length || 0),
//             0
//           );

//           return (
//             <Card key={report._id} className="shadow-md border border-gray-200">
//               <CardHeader>
//                 <CardTitle className="flex items-center justify-between">
//                   <span>📁 Report ID: {report._id}</span>
//                   <Badge variant={totalViolations > 0 ? "destructive" : "default"}>
//                     {totalViolations > 0
//                       ? `${totalViolations} Violation${totalViolations > 1 ? "s" : ""}`
//                       : "Clean"}
//                   </Badge>
//                 </CardTitle>
//               </CardHeader>

//               <CardContent className="space-y-4">
//                 <p><strong>Email:</strong> {report.email || "N/A"}</p>
//                 <p><strong>Uploaded:</strong> {new Date(report.createdAt).toLocaleString()}</p>

//                 <Accordion type="single" collapsible className="w-full">
//                   {report.accounts?.map((acc, i) => (
//                     <AccordionItem key={i} value={`item-${i}`}>
//                       <AccordionTrigger>
//                         Account {i + 1}: {acc.name}
//                       </AccordionTrigger>
//                       <AccordionContent>
//                         <p><strong>Status:</strong> {acc.status}</p>
//                         <p><strong>Balance:</strong> {acc.balance}</p>
//                         <p><strong>Opened On:</strong> {acc.date_opened}</p>
//                         <p><strong>Last Activity:</strong> {acc.last_activity}</p>
//                         <p><strong>Bureau:</strong> {acc.bureau}</p>
//                         {acc.violations && acc.violations.length > 0 ? (
//                           <>
//                             <p className="mt-2 font-semibold text-red-600">⚠️ Violations:</p>
//                             <ul className="list-disc pl-5">
//                               {acc.violations.map((v, idx) => (
//                                 <li key={idx}>{v}</li>
//                               ))}
//                             </ul>
//                           </>
//                         ) : (
//                           <p className="text-green-600 mt-2">✅ No violations</p>
//                         )}
//                       </AccordionContent>
//                     </AccordionItem>
//                   ))}
//                 </Accordion>

//                 <div className="flex flex-wrap gap-3 mt-4">
//                   <Button onClick={() => handleDownload(report._id)}>
//                     📥 Download Letter
//                   </Button>
//                   <Button variant="outline" onClick={() => handleSendLetter(report)}>
//                     📬 Send Dispute Letter
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           );
//         })
//       )}
//     </div>
//   );
// }
// src/components/GeneratedLetters.jsx
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axiosInstance from "../components/AxiosInstance";
import SkeletonLoader from "../components/skeletonLoader";

export default function GeneratedLetters() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axiosInstance.get("/reports");
        setReports(res.data.reports || []);
      } catch (error) {
        console.error("❌ Failed to fetch reports:", error);
        setReports([]);
      } finally {
        // delay to make skeleton visible
        setTimeout(() => setLoading(false), 800);
      }
    };

    fetchReports();
  }, []);

  const handleDownload = async (id) => {
    try {
      const res = await axiosInstance.get(`/generate-letter/${id}`, {
        responseType: "blob",
      });

      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `Metro2_Letter_${id}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    } catch (err) {
      console.error("❌ PDF download failed:", err);
    }
  };

  const handleView = async (id) => {
    try {
      const res = await axiosInstance.get(`/generate-letter/${id}`, {
        responseType: "blob",
      });

      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      window.open(url, "_blank");
    } catch (err) {
      console.error("❌ PDF view failed:", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Previously Generated Letters</h2>

      {loading ? (
        <SkeletonLoader variant="cards" count={4} />
      ) : reports.length === 0 ? (
        <p>No letters found.</p>
      ) : (
        reports.map((r, i) => (
          <Card key={i} className="p-4 mb-4 shadow space-y-2">
            <p>
              <strong>Uploaded:</strong>{" "}
              {r.uploadedAt
                ? new Date(r.uploadedAt).toLocaleString()
                : "N/A"}
            </p>
            <p>
              <strong>Total Accounts:</strong> {r.accounts?.length || 0}
            </p>

            <div className="flex gap-2">
              <Button variant="default" onClick={() => handleView(r._id)}>
                View PDF
              </Button>
              <Button
                variant="secondary"
                onClick={() => handleDownload(r._id)}
              >
                Download PDF
              </Button>
            </div>
          </Card>
        ))
      )}
    </div>
  );
}
