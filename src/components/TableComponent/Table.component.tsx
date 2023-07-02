import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

interface Column {
  id: 'time' | 'water_content' | 'level' | 'temperature' | 'quality';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'time', label: 'Time', minWidth: 170 },
    { id: 'water_content', label: 'Water Content(Ltr)', minWidth: 100 },
    {
        id: 'level',
        label: 'Level(%)',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'temperature',
        label: 'Temperature (°C)',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'quality',
        label: 'Quality',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toFixed(2),
    },
];

interface Data {
    time: string;
    water_content: number;
    level: number;
    temperature: number;
    quality: string;
}

function createData(
    time: string,
    water_content: number,
    level: number,
    temperature: number,
    quality: string,
): Data {
//   const density = water_content / level;
  return { time , water_content, level,temperature, quality };
}

// const rows = [
//     //time,litre, level, temp, quality
//     createData('04:00AM', 341, 85, 30, 'Fresh'),
//     createData('05:00AM', 340, 75, 10, 'Fresh'),
//     createData('06:00AM', 329, 85, 20, 'Fresh'),
//     createData('07:00AM', 325, 82, 10, 'Fresh'),
//     createData('08:00AM', 323, 85, 40, 'Fresh'),
//     createData('09:00AM', 320, 35, 70, 'Fresh'),
//     createData('10:00AM', 310, 25, 30, 'Fresh'),
// ];
type Row={
    time: string
    litres: number,
    level: number,
    temp: number,
    quality: string
}
type Props = {
    rows1: Row[]
}

export default function StickyHeadTable({rows1}: Props) {
    console.log(rows1)
    const rows = rows1.map((row)=>{
        return createData(row.time,row.litres,row.level,row.temp,row.quality)
    })
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown,newPage: number) => {
        console.log(event)
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                    {columns.map((column) => (
                        <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth, width:'100px' }}
                        >
                        {column.label}
                        </TableCell>
                    ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row,idx) => {
                        return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={idx}>
                            {columns.map((column) => {
                            const value = row[column.id];
                            return (
                                <TableCell sx={value==="Fresh"?{color: '#F66868',}:{}} key={column.id} align={column.align}>
                                {column.format && typeof value === 'number'
                                    ? column.format(value)
                                    : value}
                                </TableCell>
                            );
                            })}
                        </TableRow>
                        );
                    })}
                </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}