import { Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';

export const getnumberColumn = <T,>(): ColumnsType<T>[number] => ({
  title: '#',
  width: 50,
  align: 'center',
  fixed: 'left',
  rowScope: 'row',
  render: (value, record, index) => {
    return <Typography.Text>{index + 1}</Typography.Text>;
  },
});
