"use client"
import UserTable from "@/components/admin/UserTable";
import { User } from "@/store/authStore";
import { useEffect, useState } from "react";

export default function AdminUsersRoute() {

  return <UserTable />;
}
