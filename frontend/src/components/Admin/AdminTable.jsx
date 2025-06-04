import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
function AdminTable({ data = [], text }) {
  return (
    <div className="w-full text-black">
      <h1 className="w-full text-4xl mx-auto flex justify-center text-black">{text}</h1>
      <div className="border-2 m-5 border-black"></div>

      <Table className="text-black border border-black">
        <TableCaption className="text-black">A list of your Revenue Per Month</TableCaption>
        <TableHeader>
          <TableRow className="border-b border-black">
            <TableHead className="w-[100px] text-black border-r border-black">Month</TableHead>
            <TableHead className="text-black border-r border-black">Year</TableHead>
            <TableHead className="text-right text-black">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, idx) => (
            <TableRow key={idx} className="border-b border-black">
              <TableCell className="font-medium border-r border-black text-black">{item._id?.month}</TableCell>
              <TableCell className="border-r border-black text-black">{item._id?.year}</TableCell>
              <TableCell className="text-right text-black">₹{item.revenue}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default AdminTable;



   // AdminTableForMovie.jsx
function AdminTableForMovie({ data = [], text }) {
  return (
    <div className="w-full text-black">
      <h1 className="w-full text-4xl mx-auto flex justify-center">{text}</h1>
      <div className="border-2 m-5 border-black"></div>

      <Table className="text-black border border-black">
        <TableCaption className="text-black">A list of your Revenue Per Movie</TableCaption>
        <TableHeader>
          <TableRow className="border-b border-black">
            <TableHead className="w-[100px] border-r border-black text-black">Movie</TableHead>
            <TableHead className="text-right text-black">Revenue</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, idx) => (
            <TableRow key={idx} className="border-b border-black text-black">
              <TableCell className="border-r border-black text-black">{item.movie}</TableCell>
              <TableCell className="text-right text-black">₹{item.revenue}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export { AdminTableForMovie };
