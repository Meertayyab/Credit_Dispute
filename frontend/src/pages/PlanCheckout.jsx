import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import SkeletonLoader from "../components/skeletonLoader";


export default function PlanCheckout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plan, setPlan] = useState(null);
  const [card, setCard] = useState({ number: "", cvc: "", exp: "" });
  const [billing, setBilling] = useState({
    firstName: "",
    lastName: "",
    address: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
  });

  const userEmail = localStorage.getItem("userEmail");
  const userId = localStorage.getItem("userId");
  const [loading, setLoading] = useState(true);


  useEffect(() => {
  axios
    .get(`http://localhost:5000/api/plan/${id}`)
    .then((res) => {
      setPlan(res.data);
      setTimeout(() => setLoading(false), 1000); // Optional delay for smoother skeleton UX
    })
    .catch(() => {
      toast.error("Failed to load plan");
      setLoading(false);
    });
}, [id]);


  const handlePay = async () => {
    if (!card.number || !card.cvc || !card.exp) return toast.error("Enter card details");
    if (!billing.firstName || !billing.lastName || !billing.address || !billing.city || !billing.state || !billing.zip) {
      return toast.error("Complete billing info");
    }

    try {
      await axios.post("http://localhost:5000/api/plans/subscribe", {
        userId,
        packageName: plan.packageName,
        billingInfo: billing,
        cardDetails: card,
      });
      toast.success("✅ Subscribed successfully");
      navigate("/dashboard");
    } catch (err) {
      toast.error("❌ Payment failed");
    }
  };

  if (loading) return <SkeletonLoader variant="payment" />;

return (
  <div className="max-w-2xl mx-auto px-4 py-10">
    <h2 className="text-2xl font-bold mb-6 text-center">Payment Information</h2>

    <div className="mb-4">
      <p><strong>Amount:</strong> ${plan.price}</p>
    </div>

    <div className="space-y-4 mb-6">
      <Input placeholder="Card Number" onChange={(e) => setCard({ ...card, number: e.target.value })} />
      <div className="grid grid-cols-2 gap-2">
        <Input placeholder="MM/YY" onChange={(e) => setCard({ ...card, exp: e.target.value })} />
        <Input placeholder="CVC" onChange={(e) => setCard({ ...card, cvc: e.target.value })} />
      </div>
    </div>

    <h2 className="text-xl font-bold mb-4">Billing Information</h2>
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        <Input placeholder="Billing First Name" onChange={(e) => setBilling({ ...billing, firstName: e.target.value })} />
        <Input placeholder="Billing Last Name" onChange={(e) => setBilling({ ...billing, lastName: e.target.value })} />
      </div>
      <Input placeholder="Billing Address" onChange={(e) => setBilling({ ...billing, address: e.target.value })} />
      <Input placeholder="Billing Address Line 2" onChange={(e) => setBilling({ ...billing, address2: e.target.value })} />
      <div className="grid grid-cols-2 gap-2">
        <Input placeholder="Billing City" onChange={(e) => setBilling({ ...billing, city: e.target.value })} />
        <Input placeholder="Billing State" onChange={(e) => setBilling({ ...billing, state: e.target.value })} />
      </div>
      <Input placeholder="Billing Zip" onChange={(e) => setBilling({ ...billing, zip: e.target.value })} />
    </div>

    <Button className="w-full mt-6" onClick={handlePay}>Pay & Subscribe</Button>
  </div>
);
}