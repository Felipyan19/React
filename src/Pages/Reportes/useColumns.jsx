import { useMemo } from "react";

/**
 * Genera las columnas para una tabla.
 *
 * @return {Array} El array de columnas.
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
