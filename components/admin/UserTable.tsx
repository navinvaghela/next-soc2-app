"use client";

import { useCreateUser, useDeleteUser, useUpdateUser, useUsers } from "@/hooks/useUsers";
import { User } from "@/store/authStore";
import Link from "next/link";
import { useState } from "react";

export default function UserTable() {

  const [editing, setEditing] = useState<User | null>(null);
  const [show, setShow] = useState(false);

  // here use hooks for react-query 
  const deleteUser = useDeleteUser();
  const updateUser = useUpdateUser();
  const createUser = useCreateUser()
  const { data: users = [], isLoading } = useUsers();
  const [isNewUser, setIsNewUser] = useState(false)
  
  const openModal = (u: any, isNewUser = false) => {
    setEditing(u ? { ...u } : { name: "", email: "", password: "", role: "" });
    setShow(true);
    if (isNewUser) {
      setIsNewUser(true)
    }
  }
  console.log('ttttt', isNewUser)

  const save = () => {
      if (!editing) return;

      const payloadData = {...editing, password: 12345}
      
      if (isNewUser) {
        createUser.mutate(payloadData, {
          onSuccess: () => {setIsNewUser(false),setShow(false)},
          onError: (err: any) => alert(err.message),
        });
        return
      }

      const {
        password,
        id,
        createdAt,  
        updatedAt,
        ...payload
      }: any = editing;
      
      updateUser.mutate(
        { id: editing.id, data: payload },
        {
          onSuccess: () => {setIsNewUser(false), setShow(false) },
          onError: (err) => alert(err.message),
        }
      );
  };


  const handleDelete = async (id: number) => {
    deleteUser.mutate(id);
  }

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div>
      <div className="w-full flex justify-end">
        <button 
            onClick={() => openModal(null, true)}
            className="mr-4 px-2 py-1 cursor-pointer hover:bg-blue-700 rounded-xs bg-blue-400 text-white"
        >
          Add
        </button>
        <Link href="/dashboard/admin/invite"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Invite User
        </Link>        
      </div>
      <table className="w-full bg-white rounded shadow">
        <thead className="bg-gray-50">
          <tr><th className="p-3 text-left">Name</th><th className="p-3 text-left">Email</th><th className="p-3 text-left">Role</th><th className="text-right pr-6">Actions</th></tr>
        </thead>
        <tbody>
          {users.map((u: any) => (
            <tr key={u.id} className="border-t">
              <td className="p-3">{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td className="text-right pr-6">
                <button className="text-blue-600 mr-4" onClick={() => openModal(u, false)}>Edit</button>
                <button className="text-red-600" onClick={() => handleDelete(u.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {show && editing && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-96 shadow">
            <h3 className="text-lg font-bold mb-3">User Form {editing.name}</h3>
            <label className="block text-sm">Name</label>
            <input className="w-full border px-2 py-1 mb-2" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
            <label className="block text-sm">Email</label>
            <input className="w-full border px-2 py-1 mb-2" value={editing.email} onChange={(e) => setEditing({ ...editing, email: e.target.value })} />
            <label className="block text-sm">Role</label>
            <select className="w-full border px-2 py-1 mb-4" name="role" value={editing.role} onChange={(e) => setEditing({ ...editing, role: e.target.value })}>
              <option value="">Select</option>
              <option value="employer">employer</option>
              <option value="auditor">auditor</option>
              <option value="contractor">contractor</option>
            </select>

            <div className="flex justify-end">
              <button className="px-4 py-2 bg-gray-200 rounded mr-2" onClick={() => setShow(false)}>Cancel</button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={save}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
