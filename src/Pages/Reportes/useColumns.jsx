import { useMemo } from "react";

/**
 * Generates the columns for a table.
 *
 * @return {Array} The array of columns.
 */
export default function useColumns() {
 const columns = useMemo(
   () => [
     {
       Header: "Marca",
       accessor: "marca"
     },
     {
       Header: "Modelo",
       accessor: "modelo"
     },
     {
       Header: "Segmento",
       accessor: "segmento"
     },
     {
       Header: "Año",
       accessor: "anio"
     }
   ],
   []
 );

 return columns;
}
