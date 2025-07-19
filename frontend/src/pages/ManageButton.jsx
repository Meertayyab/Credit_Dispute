// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { toast } from "sonner";
// import ManageProfileForm from "./ManageProfile";
// import {
//   Table,
//   TableHeader,
//   TableRow,
//   TableHead,
//   TableBody,
//   TableCell,
// } from "@/components/ui/table";

// export default function ManageProfiles() {
//   const [showForm, setShowForm] = useState(false);
//   const [profiles, setProfiles] = useState([]);
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const profilesPerPage = 5;

//   useEffect(() => {
//     fetchProfiles();
//   }, []);

//   const fetchProfiles = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/profiles/getdata");
//       setProfiles(res.data);
//     } catch (error) {
//       toast.error("❌ Failed to fetch profiles");
//       console.error(error);
//     }
//   };

//   const handleAddProfileClick = () => {
//     setShowForm(true);
//   };

//   const handleExportCSV = () => {
//     const headers = [
//       "First Name",
//       "Last Name",
//       "Email",
//       "Phone",
//       "State",
//       "Created At"
//     ];
//     const rows = profiles.map(profile => [
//       profile.firstName,
//       profile.lastName,
//       profile.email,
//       profile.phone,
//       profile.state,
//       new Date(profile.createdAt).toLocaleDateString()
//     ]);
//     const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
//     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.setAttribute("download", "profiles.csv");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const handleEdit = (id) => {
//     toast(`✏️ Edit clicked for ID: ${id}`);
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/profiles/${id}`);
//       toast.success("🗑️ Profile deleted");
//       fetchProfiles();
//     } catch (err) {
//       toast.error("❌ Failed to delete profile");
//     }
//   };

//   const filteredProfiles = profiles.filter((profile) =>
//     profile.firstName?.toLowerCase().includes(search.toLowerCase()) ||
//     profile.lastName?.toLowerCase().includes(search.toLowerCase()) ||
//     profile.email?.toLowerCase().includes(search.toLowerCase())
//   );

//   const indexOfLastProfile = currentPage * profilesPerPage;
//   const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
//   const currentProfiles = filteredProfiles.slice(indexOfFirstProfile, indexOfLastProfile);
//   const totalPages = Math.ceil(filteredProfiles.length / profilesPerPage);

//   return (
//     <div className="p-6">
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-2xl font-semibold">Add New Profile</h1>
//         <div className="flex gap-4">
//           <Button onClick={handleAddProfileClick}>Add Profile</Button>
//           <Button variant="outline" onClick={handleExportCSV}>
//             Export CSV
//           </Button>
//         </div>
//       </div>

//       {showForm ? (
//         <ManageProfileForm />
//       ) : (
//         <>
//           <div className="flex justify-end mb-4">
//             <Input
//               placeholder="🔍 Search by name or email"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full max-w-sm"
//             />
//           </div>

//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>First Name</TableHead>
//                 <TableHead>Last Name</TableHead>
//                 <TableHead>Email</TableHead>
//                 <TableHead>Phone</TableHead>
//                 <TableHead>State</TableHead>
//                 <TableHead>Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {currentProfiles.map((profile) => (
//                 <TableRow key={profile._id}>
//                   <TableCell>{profile.firstName}</TableCell>
//                   <TableCell>{profile.lastName}</TableCell>
//                   <TableCell>{profile.email}</TableCell>
//                   <TableCell>{profile.phone}</TableCell>
//                   <TableCell>{profile.state}</TableCell>
//                   <TableCell>
//                     <Button size="sm" onClick={() => handleEdit(profile._id)}>
//                       Edit
//                     </Button>
//                     <Button size="sm" variant="destructive" onClick={() => handleDelete(profile._id)} className="ml-2">
//                       Delete
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//               {currentProfiles.length === 0 && (
//                 <TableRow>
//                   <TableCell colSpan={6} className="text-center">
//                     😕 No profiles found.
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>

//           <div className="flex justify-center mt-6 gap-2">
//             {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//               <Button
//                 key={page}
//                 variant={currentPage === page ? "default" : "outline"}
//                 onClick={() => setCurrentPage(page)}
//               >
//                 {page}
//               </Button>
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "sonner";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   useReactTable,
//   getCoreRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   getFilteredRowModel,
//   flexRender,
// } from "@tanstack/react-table";

// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { ChevronDown } from "lucide-react";
// import ManageProfileForm from "./ManageProfile";

// export default function ManageProfiles() {
//   const [data, setData] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [filter, setFilter] = useState("");
//   const [sorting, setSorting] = useState([]);
//   const [columnFilters, setColumnFilters] = useState([]);
//   const [columnVisibility, setColumnVisibility] = useState({});
//   const [rowSelection, setRowSelection] = useState({});

//   const fetchData = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/profiles/getdata");
//       setData(res.data);
//     } catch (err) {
//       console.error(err);
//       toast.error("❌ Failed to load profiles");
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleExportCSV = () => {
//     const csvRows = [
//       ["First Name", "Last Name", "Email", "Phone", "SSN"],
//       ...data.map((item) => [
//         item.firstName,
//         item.lastName,
//         item.email,
//         item.phone,
//         item.ssn,
//       ]),
//     ];
//     const csvString = csvRows.map((row) => row.join(",")).join("\n");
//     const blob = new Blob([csvString], { type: "text/csv" });
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.download = "profiles.csv";
//     link.click();
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/profiles/delete/${id}`);
//       toast.success("🗑️ Profile deleted");
//       fetchData();
//     } catch (error) {
//       toast.error("❌ Delete failed");
//     }
//   };

//   const columns = [
//     {
//       accessorKey: "firstName",
//       header: "First Name",
//     },
//     {
//       accessorKey: "lastName",
//       header: "Last Name",
//     },
//     {
//       accessorKey: "email",
//       header: "Email",
//     },
//     {
//       accessorKey: "phone",
//       header: "Phone",
//     },
//     {
//       accessorKey: "ssn",
//       header: "SSN",
//     },
//     {
//       id: "actions",
//       header: "Actions",
//       cell: ({ row }) => (
//         <div className="flex gap-2">
//           <Button size="sm" variant="outline" onClick={() => toast("✏️ Edit soon")}>
//             Edit
//           </Button>
//           <Button size="sm" variant="destructive" onClick={() => handleDelete(row.original._id)}>
//             Delete
//           </Button>
//         </div>
//       ),
//     },
//   ];

//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     state: {
//       sorting,
//       columnFilters,
//       columnVisibility,
//       rowSelection,
//     },
//     onSortingChange: setSorting,
//     onColumnFiltersChange: setColumnFilters,
//     onColumnVisibilityChange: setColumnVisibility,
//     onRowSelectionChange: setRowSelection,
//   });

//   return (
//     <div className="p-6">
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-2xl font-semibold">Manage Profiles</h1>
//         <div className="flex gap-4">
//           <Button onClick={() => setShowForm(true)}>Add Profile</Button>
//           <Button variant="outline" onClick={handleExportCSV}>
//             Export CSV
//           </Button>
//         </div>
//       </div>

//       {showForm ? (
//         <ManageProfileForm />
//       ) : (
//         <>
//           <div className="flex items-center py-4">
//             <Input
//               placeholder="Search emails..."
//               value={filter}
//               onChange={(e) => {
//                 setFilter(e.target.value);
//                 table.getColumn("email")?.setFilterValue(e.target.value);
//               }}
//               className="max-w-sm"
//             />
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="outline" className="ml-auto">
//                   Columns <ChevronDown className="ml-1 h-4 w-4" />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end">
//                 {table
//                   .getAllColumns()
//                   .filter((col) => col.getCanHide())
//                   .map((col) => (
//                     <DropdownMenuCheckboxItem
//                       key={col.id}
//                       checked={col.getIsVisible()}
//                       onCheckedChange={(value) => col.toggleVisibility(!!value)}
//                     >
//                       {col.id}
//                     </DropdownMenuCheckboxItem>
//                   ))}
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>

//           <div className="rounded-md border">
//             <Table>
//               <TableHeader>
//                 {table.getHeaderGroups().map((headerGroup) => (
//                   <TableRow key={headerGroup.id}>
//                     {headerGroup.headers.map((header) => (
//                       <TableHead key={header.id}>
//                         {header.isPlaceholder
//                           ? null
//                           : flexRender(header.column.columnDef.header, header.getContext())}
//                       </TableHead>
//                     ))}
//                   </TableRow>
//                 ))}
//               </TableHeader>
//               <TableBody>
//                 {table.getRowModel().rows.length ? (
//                   table.getRowModel().rows.map((row) => (
//                     <TableRow key={row.id}>
//                       {row.getVisibleCells().map((cell) => (
//                         <TableCell key={cell.id}>
//                           {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                         </TableCell>
//                       ))}
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow>
//                     <TableCell colSpan={columns.length} className="text-center">
//                       No profiles found.
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </div>

//           <div className="flex justify-end py-4 gap-2">
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={() => table.previousPage()}
//               disabled={!table.getCanPreviousPage()}
//             >
//               Previous
//             </Button>
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={() => table.nextPage()}
//               disabled={!table.getCanNextPage()}
//             >
//               Next
//             </Button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import SkeletonLoader from "../components/skeletonLoader";
import axiosInstance from "../components/AxiosInstance";

export default function ManageProfiles() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await axiosInstance.get("/profiles/getdata");
      setData(res.data);
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to load profiles");
    }
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await fetchData();
      setTimeout(() => {
        setLoading(false); // minimum delay to see skeleton
      }, 1000); // adjust duration as needed
    };

    load();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/profiles/delete/${id}`);
      toast.success("🗑️ Profile deleted");
      fetchData();
    } catch (error) {
      toast.error("❌ Delete failed");
    }
  };

  const handleExportCSV = () => {
    const csvRows = [
      ["First Name", "Last Name", "Email", "Phone", "SSN"],
      ...data.map((item) => [
        item.firstName,
        item.lastName,
        item.email,
        item.phone,
        item.ssn,
      ]),
    ];
    const csvString = csvRows.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "profiles.csv";
    link.click();
  };

  const columns = [
    { accessorKey: "firstName", header: "First Name" },
    { accessorKey: "lastName", header: "Last Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "phone", header: "Phone" },
    { accessorKey: "ssn", header: "SSN" },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => toast("✏️ Edit soon")}
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => handleDelete(row.original._id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
  });

 return (
  <div className="p-6">
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-semibold">Manage Profiles</h1>
      <div className="flex gap-4">
        <Button onClick={() => navigate("/profiles/add")}>Add Profile</Button>
        <Button variant="outline" onClick={handleExportCSV}>
          Export CSV
        </Button>
      </div>
    </div>

    <div className="flex items-center py-4">
      <Input
        placeholder="Search emails..."
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value);
          table.getColumn("email")?.setFilterValue(e.target.value);
        }}
        className="max-w-sm"
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-auto">
            Columns <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {table
            .getAllColumns()
            .filter((col) => col.getCanHide())
            .map((col) => (
              <DropdownMenuCheckboxItem
                key={col.id}
                checked={col.getIsVisible()}
                onCheckedChange={(value) => col.toggleVisibility(!!value)}
              >
                {col.id}
              </DropdownMenuCheckboxItem>
            ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

    {loading ? (
      <SkeletonLoader variant="table" count={6} />
    ) : (
      <>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="text-center">
                    No profiles found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-end py-4 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </>
    )}
  </div>
);
}