import { Select, SelectProps } from 'antd';
import { debounce } from 'lodash';
import { useState } from 'react';
import { useGetBasecamps } from '../hooks/useQuery';

type BasecampSelectProps = SelectProps;

export default function BasecampSelect(props: BasecampSelectProps) {
  const { ...rest } = props;

  const [search, setSearch] = useState('');

  const dataHook = useGetBasecamps({
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
          label: `${item.community.name} - ${item.greenPlace.name}`,
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
