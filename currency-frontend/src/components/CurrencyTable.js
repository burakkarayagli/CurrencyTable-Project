import React, { useMemo } from "react";
import { useTable, useGlobalFilter } from "react-table";
import { COLUMNS } from "./columns";
//import Currency_DATA from "../resources/Currency_DATA.json";
import FilterBar from "./FilterBar";
import TableStyle from "../styles/TableStyle.css"

export default function CurrencyTable({data}) {
    //Search for "useMemo" in the React documentation
    //https://reactjs.org/docs/hooks-reference.html#usememo
    const columns = useMemo(() => COLUMNS, []);
    //const data = useMemo(() => Currency_DATA, []);

    const [oldData, setOldData] = React.useState([]);


    const tableInstance = useTable(
        {   
            columns,
            data,
        },
        useGlobalFilter
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        setGlobalFilter,
    } = tableInstance;

    const { globalFilter } = state;

    return (
        <>
            <FilterBar filter={globalFilter} setFilter={setGlobalFilter}/>
            <table className="table" {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>
                                    {column.render("Header")}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, index) => {
                        prepareRow(row);
                        return (
                            <tr key={index} {...row.getRowProps()}>
                                {row.cells.map((cell, cellIndex) => {
                                    return (
                                        <td
                                            key={cellIndex}
                                            {...cell.getCellProps()}
                                        >
                                            {cell.render("Cell")}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
};
