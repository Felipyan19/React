import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Layout } from '../../Components/Layout';
import { MasivosContext } from '../../Context';
import { useTable, useSortBy } from 'react-table';
import useRows from './useRows';
import useColumns from './useColumns';
import { IoReturnUpBackOutline } from "react-icons/io5";
import { AiOutlineBars } from "react-icons/ai";
import { FiDownloadCloud } from "react-icons/fi";


/**
 * Renderiza un componente que muestra una tabla de informes.
 *
 * @return {JSX.Element} El componente renderizado.
 */
const Reportes = () => {
    const context = useContext(MasivosContext);
    const columns = useColumns();
    const data = useRows();
    const table = useTable({ columns, data }, useSortBy);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = table;

    return (
        <Layout title={context.homeDataClient.attributes.name + ' - Reportes'}>
            <div className="container mx-auto p-2">
                <div className='flex justify-between mb-2'>
                    <NavLink
                        to="/Menu"
                        className="text-black text-3xl font-bold"
                    >
                        <AiOutlineBars />
                    </NavLink>
                    <NavLink
                        to="/Home"
                        className="text-black text-3xl font-bold"
                    >
                        <IoReturnUpBackOutline />
                    </NavLink>
                    <NavLink
                        to="/Home"
                        className="text-black text-3xl font-bold"
                    >
                        <FiDownloadCloud />
                    </NavLink>
                </div>
                <table className="min-w-full bg-white border border-gray-300 shadow-lg">
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th
                                        {...column.getHeaderProps(column.getSortByToggleProps())}
                                        className={`py-2 px-4 border border-gray-300 shadow-lg ${column.isSorted
                                                ? column.isSortedDesc
                                                    ? 'bg-red-500 text-white'
                                                    : 'bg-green-500 text-white'
                                                : 'bg-gray-200'
                                            }`}
                                    >
                                        {column.render('Header')}
                                        <span className="ml-1">
                                            {column.isSorted ? (column.isSortedDesc ? '↓' : '↑') : ''}
                                        </span>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map(row => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()} className="border-t border-gray-300">
                                    {row.cells.map(cell => (
                                        <td {...cell.getCellProps()} className="border border-gray-300 py-2 px-4">
                                            {cell.render('Cell')}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

            </div>

        </Layout>
    );
};

export { Reportes };
