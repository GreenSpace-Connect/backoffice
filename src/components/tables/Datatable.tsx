import { Table, TableProps } from 'antd';

type DatatableProps<Item> = {
  tableProps: TableProps<Item>;
};

export default function Datatable<Item extends { id: string }>(
  props: DatatableProps<Item>,
) {
  const { tableProps } = props;

  return (
    <div>
      <Table {...tableProps} />
    </div>
  );
}
