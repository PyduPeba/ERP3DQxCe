"use client";
import ComingSoon from "../components/ComingSoon";
import PermissionGuard from "@/app/components/auth/PermissionGuard";

export default function ChaveiroArticuladoPage() {
  return (
    <PermissionGuard module="ESTUDIO">
      <ComingSoon />
    </PermissionGuard>
  );
}
