import { Select, SelectProps } from 'antd';
import { debounce } from 'lodash';
import { useState } from 'react';
import { useGetTicketTransactions } from '../hooks/useQuery';

type TicketTransactionSelectProps = SelectProps;

export default function TicketTransactionSelect(
  props: TicketTransactionSelectProps,
) {
  const { ...rest } = props;

  const [search, setSearch] = useState('');

  const dataHook = useGetTicketTransactions({
    params: {
      search,
    },
    options: {
      staleTime: 3000,
    },
  });

  return (
    <>
      <Select
        showSearch
        placeholder="Select a user"
        optionFilterProp="children"
        filterOption={(input, option) =>
          (String(option?.label) ?? '')
            .toLowerCase()
            .includes(input.toLowerCase())
        }
        options={dataHook.data?.items.map((item) => ({
          label: `${item.ticket.name} - ${item.user.fullname}`,
          value: item.id,
        }))}
        loading={dataHook.isFetching}
        onSearch={debounce(setSearch, 1000)}
        allowClear
        {...rest}
      />
    </>
  );
}
