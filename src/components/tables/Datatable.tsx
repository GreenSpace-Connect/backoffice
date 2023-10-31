import { Input, Space, Table, TableProps } from 'antd';
import { debounce } from 'lodash';

type DatatableProps<Item> = {
  tableProps: TableProps<Item>;
  onSearch?: (value: string) => void;
};

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

export default function Datatable<Item extends { id: unknown }>(
  props: DatatableProps<Item>,
) {
  const { tableProps, onSearch } = props;

  return (
    <div>
      <Space style={{ display: 'flex', justifyContent: 'end' }}>
        {onSearch && (
          <Input.Search
            placeholder="Search..."
            onChange={debounce((value) => onSearch(value.target.value), 1000)}
            style={{ marginBottom: '1rem' }}
          />
        )}
      </Space>
      <Table
        rowKey={(record) => record?.id?.toString() || ''}
        {...tableProps}
        pagination={{
          ...tableProps.pagination,
          pageSizeOptions: PAGE_SIZE_OPTIONS,
        }}
      />
    </div>
  );
}
