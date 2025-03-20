import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./protected-route";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Dashboard from "@/pages/Index";
import Clients from "@/pages/clients/Clients";
import Cases from "@/pages/Cases";
import Documents from "@/pages/Documents";
import Contracts from "@/pages/contracts/Contracts";
import PetitionGenerator from "@/pages/PetitionGenerator";
import Billing from "@/pages/Billing";
import Profile from "@/pages/Profile";
import Office from "@/pages/Office";
import NotFound from "@/pages/NotFound";
import LandingPage from "@/pages/LandingPage";
import { useAuth } from "@/contexts/auth";

const AuthRoutes: React.FC = () => {
  const { user } = useAuth();

  const renderAuthRoute = (Component: React.ComponentType) => {
    return user ? <Navigate to="/dashboard" /> : <Component />;
  };

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      
      <Route path="/login" element={renderAuthRoute(Login)} />
      <Route path="/signup" element={renderAuthRoute(Signup)} />

      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/clients" 
        element={
          <ProtectedRoute>
            <Clients />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/cases" 
        element={
          <ProtectedRoute>
            <Cases />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/documents" 
        element={
          <ProtectedRoute>
            <Documents />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/contracts" 
        element={
          <ProtectedRoute>
            <Contracts />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/petition-generator" 
        element={
          <ProtectedRoute>
            <PetitionGenerator />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/billing" 
        element={
          <ProtectedRoute>
            <Billing />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/office" 
        element={
          <ProtectedRoute>
            <Office />
          </ProtectedRoute>
        } 
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AuthRoutes;
