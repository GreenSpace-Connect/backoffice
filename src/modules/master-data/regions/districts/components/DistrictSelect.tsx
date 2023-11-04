import { Select, SelectProps } from 'antd';
import { debounce } from 'lodash';
import { useState } from 'react';
import { useGetDistricts } from '../hooks/useQuery';
import { TCityResponse } from '../../cities/entities/response';

type DistrictSelectProps = SelectProps & {
  cityId?: TCityResponse['id'];
};

export default function DistrictSelect(props: DistrictSelectProps) {
  const { cityId, ...rest } = props;

  const [search, setSearch] = useState('');

  const dataHook = useGetDistricts({
    params: {
      search,
      cityId,
    },
    options: {
      staleTime: 3000,
      enabled: !!cityId,
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
