import { Select, SelectProps } from 'antd';
import { debounce } from 'lodash';
import { useState } from 'react';
import { useGetComments } from '../hooks/useQuery';

type CommentSelectProps = SelectProps;

export default function CommentSelect(props: CommentSelectProps) {
  const { ...rest } = props;

  const [search, setSearch] = useState('');

  const dataHook = useGetComments({
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
          label: item.message,
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
