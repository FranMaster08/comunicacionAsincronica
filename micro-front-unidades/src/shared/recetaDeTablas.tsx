import { Table } from "antd";
export const RecetasDeTablas = ({ columns, data }) => {

    return <Table columns={ columns } dataSource = { data } />
}
