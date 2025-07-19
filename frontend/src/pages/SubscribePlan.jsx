// // src/pages/SubscriptionPlans.jsx

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import {
//   Dialog,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { toast } from "sonner";
// import { useNavigate } from "react-router-dom";

// export default function SubscriptionPlans() {
//   const [plans, setPlans] = useState([]);
//   const [selectedPlan, setSelectedPlan] = useState(null);
//   const [cardDetails, setCardDetails] = useState({
//     number: "",
//     exp: "",
//     cvc: "",
//   });

//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/plan")
//       .then((res) => setPlans(res.data))
//       .catch(() => toast.error("Failed to load plans"));
//   }, []);

//   const handleSubscribe = async () => {
//     try {
//       // Optional: handle payment via Stripe API integration here (currently mocked)
//       if (!cardDetails.number || !cardDetails.exp || !cardDetails.cvc) {
//         toast.error("Enter valid card details");
//         return;
//       }

//       await axios.post("http://localhost:5000/api/plans/subscribe", {
//         packageName: selectedPlan.packageName,
//       });

//       toast.success("✅ Subscribed successfully");
//       setSelectedPlan(null);
//     } catch (err) {
//       toast.error("❌ Subscription failed");
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto py-10 px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//       {plans.map((plan) => (
//         <Card key={plan._id} className="rounded-2xl shadow border">
//           <CardContent className="p-6 space-y-4">
//             <div className="flex items-center justify-between">
//               <h2 className="text-xl font-bold">{plan.packageName}</h2>
//               <Badge>{plan.planType}</Badge>
//             </div>
//             <p className="text-3xl font-semibold text-purple-700">
//               ${plan.price} / month
//             </p>
//             <p className="text-sm text-muted-foreground">
//               Service {plan.peopleLimit} people / month
//             </p>
//             <ul className="text-sm list-disc ml-4 space-y-1">
//               {plan.features.map((f, i) => (
//                 <li key={i}>{f}</li>
//               ))}
//             </ul>
//             <Dialog>
//               <DialogTrigger asChild>
//                 {/* <Button onClick={() => setSelectedPlan(plan)} className="w-full mt-2">
//                   Buy
//                 </Button> */}
//                 <Button
//                   onClick={() => navigate(`/plans/checkout/${plan._id}`)}
//                   className="w-full mt-2"
//                 >
//                   Buy
//                 </Button>
//               </DialogTrigger>
//             </Dialog>
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import axiosInstance from "../components/AxiosInstance";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function SubscriptionPlans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get("/plan")
      .then((res) => {
        // simulate delay
        setTimeout(() => {
          setPlans(res.data);
          setLoading(false);
        }, 1000); // ✅ delay to show skeleton properly
      })
      .catch(() => {
        toast.error("Failed to load plans");
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {loading
        ? // Skeleton cards matching the actual card structure
          Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="rounded-2xl shadow border">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
                <Skeleton className="h-8 w-40" />
                <Skeleton className="h-4 w-48" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
                <Skeleton className="h-10 w-full rounded-md" />
              </CardContent>
            </Card>
          ))
        : plans.map((plan) => (
            <Card key={plan._id} className="rounded-2xl shadow border">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">{plan.packageName}</h2>
                  <Badge>{plan.planType}</Badge>
                </div>
                <p className="text-3xl font-semibold text-purple-700">
                  ${plan.price} / month
                </p>
                <p className="text-sm text-muted-foreground">
                  Service {plan.peopleLimit} people / month
                </p>
                <ul className="text-sm list-disc ml-4 space-y-1">
                  {plan.features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => navigate(`/plans/checkout/${plan._id}`)}
                      className="w-full mt-2"
                    >
                      Buy
                    </Button>
                  </DialogTrigger>
                </Dialog>
              </CardContent>
            </Card>
          ))}
    </div>
  );
}
