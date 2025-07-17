// import { Routes, Route, Navigate } from "react-router-dom";
// import AuthPage from "./pages/Auth"; // adjust path as needed
// import { Toaster } from "@/components/ui/sonner";
// import NewDashboard from "./pages/NewDashboard";
// import ManageProfileForm from "./pages/ManageProfile";
// import ManageProfiles from "./pages/ManageButton";
// import SubscriptionPlans from "./pages/SubscribePlan";
// import PlanCheckout from "./pages/PlanCheckout";

// export default function App() {
//   return (
//     <>
//       <Toaster position="top-center" />
//       <Routes>
//         <Route path="/" element={<Navigate to="/auth/login" />} />
//         <Route path="/auth/:mode" element={<AuthPage />} />
//         <Route path="/dashboard" element={<NewDashboard />} />
//          {/* Nested profile routes */}
//           <Route path="/profiles">
//             <Route index element={<ManageProfiles />} />
//             <Route path="add" element={<ManageProfileForm />} />
//           </Route>
//          <Route path="/profiles/add" element={<ManageProfileForm />} />
//         <Route path="/auth/forgot-password" element={<AuthPage />} />
//         <Route path="/auth/reset-password/:token" element={<AuthPage />} />
//         <Route path="/subscription" element={<SubscriptionPlans/>} />
//         <Route path="/plans/checkout/:id" element={<PlanCheckout/>} />
//       </Routes>
//     </>
//   );
// }

import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import AuthPage from "./pages/Auth";
import NewDashboard from "./pages/NewDashboard";
import ManageProfiles from "./pages/ManageButton";
import ManageProfileForm from "./pages/ManageProfile";
import SubscriptionPlans from "./pages/SubscribePlan";
import PlanCheckout from "./pages/PlanCheckout";
import ProtectedRoute from "./components/protectedRoutes";
import ThemeInitializer from "./components/ThemeInitializer";
import { MainLayout } from "./components/layout/MainLayout";
import DisputeForm from "./pages/DisputeForm";
import GeneratedLetters from "./pages/CreditDisputeLetter";

export default function App() {
  return (
    <>
      <Toaster position="top-center" />
      <ThemeInitializer />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/auth/login" />} />
        <Route path="/auth/login" element={<AuthPage />} />
        <Route path="/auth/signup" element={<AuthPage />} />
        <Route path="/auth/forgot-password" element={<AuthPage />} />
        <Route path="/auth/reset-password/:token" element={<AuthPage />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <MainLayout>
              <ProtectedRoute>
                <NewDashboard />
              </ProtectedRoute>
            </MainLayout>
          }
        />
        <Route
          path="/reportletter"
          element={
            <MainLayout>
              <ProtectedRoute>
                <GeneratedLetters />
              </ProtectedRoute>
            </MainLayout>
          }
        />
        <Route
          path="/DisputeLetter"
          element={
            <MainLayout>
              <ProtectedRoute>
                <DisputeForm />
              </ProtectedRoute>
            </MainLayout>
          }
        />

        <Route
          path="/profiles"
          element={
            <MainLayout>
              <ProtectedRoute>
                <ManageProfiles />
              </ProtectedRoute>
            </MainLayout>
          }
        />

        <Route
          path="/profiles/add"
          element={
            <MainLayout>
              <ProtectedRoute>
                <ManageProfileForm />
              </ProtectedRoute>
            </MainLayout>
          }
        />

        <Route
          path="/subscription"
          element={
            <MainLayout>
              <ProtectedRoute>
                <SubscriptionPlans />
              </ProtectedRoute>
            </MainLayout>
          }
        />

        <Route
          path="/plans/checkout/:id"
          element={
            <MainLayout>
              <ProtectedRoute>
                <PlanCheckout />
              </ProtectedRoute>
            </MainLayout>
          }
        />
      </Routes>
    </>
  );
}
