import { Select, SelectProps } from 'antd';
import { debounce } from 'lodash';
import { useState } from 'react';
import { useGetDonationTransactions } from '../hooks/useQuery';
import { convertToIdr } from '@/utils/helpers/string.helper';

type DonationTransactionSelectProps = SelectProps;

export default function DonationTransactionSelect(
  props: DonationTransactionSelectProps,
) {
  const { ...rest } = props;

  const [search, setSearch] = useState('');

  const dataHook = useGetDonationTransactions({
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
          label: `${convertToIdr(item.amount)} - ${item.donation.name} - ${
            item.user.fullname
          }`,
          value: item.id,
        }))}
        loading={dataHook.isFetching}
        onSearch={debounce(setSearch, 500)}
        allowClear
        {...rest}
      />
    </>
  );
}
