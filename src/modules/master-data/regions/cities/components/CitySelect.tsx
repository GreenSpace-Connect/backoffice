import { Select, SelectProps } from 'antd';
import { debounce } from 'lodash';
import { useState } from 'react';
import { useGetCities } from '../hooks/useQuery';
import { TProvinceResponse } from '../../provinces/entities/response';

type CitySelectProps = SelectProps & {
  provinceId?: TProvinceResponse['id'];
};

export default function CitySelect(props: CitySelectProps) {
  const { provinceId, ...rest } = props;

  const [search, setSearch] = useState('');

  const dataHook = useGetCities({
    params: {
      search,
      provinceId,
    },
    options: {
      staleTime: 3000,
      enabled: !!provinceId,
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
        onSearch={debounce(setSearch, 1000)}
        allowClear
        {...rest}
      />
    </>
  );
}
