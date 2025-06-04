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

function MovieTable({ data = [], text, onEdit, onDelete }) {
  return (
    <div className="w-full text-black">
      <h1 className="w-full text-4xl mx-auto flex justify-center">{text}</h1>
      <div className="border-2 m-5 border-black"></div>

      <Table className="text-black">
        <TableCaption className="text-black">Movies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px] text-black">Movie</TableHead>
            <TableHead className="text-black">Genre</TableHead>
            <TableHead className="text-black">Formats</TableHead>
            <TableHead className="text-right text-black">Edit</TableHead>
            <TableHead className="text-right text-black">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, idx) => (
            <TableRow key={idx}>
              <TableCell className="font-medium text-black">{item.title}</TableCell>
              <TableCell className="text-black">{item.genre}</TableCell>
              <TableCell className="text-black">{item.formats.join("/")}</TableCell>
              <TableCell className="text-right text-black">
                <button onClick={() => onEdit(item._id)} className='cursor-pointer underline'>Edit</button>
              </TableCell>
              <TableCell className="text-right text-black">
                <button onClick={() => onDelete(item._id)} className='cursor-pointer underline'>Delete</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default MovieTable;
