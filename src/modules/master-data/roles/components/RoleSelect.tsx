import { Select, SelectProps } from 'antd';
import { debounce } from 'lodash';
import { useState } from 'react';
import { useGetRoles } from '../hooks/useQuery';

type RoleSelectProps = SelectProps;

export default function RoleSelect(props: RoleSelectProps) {
  const { ...rest } = props;

  const [search, setSearch] = useState('');

  const dataHook = useGetRoles({
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
          label: item.name,
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
