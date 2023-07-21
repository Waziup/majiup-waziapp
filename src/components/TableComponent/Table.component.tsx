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
type Row={
    time: string
    liters: number,
    waterLevel: number,
    waterTemperature: number,
    waterQuality: string
}
type Props = {
    rows1: Row[]
}
function getWaterQuality(tds: number):string{
    if (tds>0 && tds<300) {
        return 'Excellent'
    }else if(tds>300 &&tds<900){
        return'Good'
    }else if(tds>900){
        return 'Poor'
    }else{
        return('Not satisfied');
    }
}
export default function StickyHeadTable({rows1}: Props) {
    const rows = rows1.map((row)=>{
        return createData(row.time, row.liters, row.waterLevel, row.waterTemperature, getWaterQuality(parseInt(row.waterQuality)))
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
                                <TableCell sx={value==="Poor"?{ color: '#F66868',}:value==='Excellent'?{color:'#85ea2d'}:{}} key={column.id} align={column.align}>
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