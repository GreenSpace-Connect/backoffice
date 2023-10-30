import { Select, SelectProps } from 'antd';
import { debounce } from 'lodash';
import { useState } from 'react';
import { useGetCommunityUsers } from '../hooks/useQuery';

type CommunityUserSelectProps = SelectProps;

export default function CommunityUserSelect(props: CommunityUserSelectProps) {
  const { ...rest } = props;

  const [search, setSearch] = useState('');

  const dataHook = useGetCommunityUsers({
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
          label: `${item.user.fullname} - ${item.community.name}`,
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
