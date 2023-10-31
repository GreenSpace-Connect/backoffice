'use client';

import CitySelect from '@/modules/master-data/regions/cities/components/CitySelect';
import ProvinceSelect from '@/modules/master-data/regions/provinces/components/ProvinceSelect';
import { changeSearchFilter } from '@/services/redux/reducers/searchFilterReducer';
import { useAppDispatch, useAppSelector } from '@/services/redux/store';
import { removeUndefinedProperties } from '@/utils/helpers/object.helper';
import { CollapseProps, Typography, Form, Collapse } from 'antd';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function FilterSection() {
  const router = useRouter();

  const filter = useAppSelector((state) => state.searchFilter);
  const dispatch = useAppDispatch();

  const onFilter = (key: string, value: string) => {
    const state = {
      ...router.query,
      [key]: value,
    };
    if (key === 'provinceId') {
      delete state.cityId;
    }

    router.push({
      pathname: '/search',
      query: removeUndefinedProperties(state),
    });
  };

  useEffect(() => {
    dispatch(changeSearchFilter(router.query));
  }, [router.query]);

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: <Typography.Text strong>Lokasi</Typography.Text>,
      children: (
        <Form layout="vertical">
          <Form.Item label="Provinsi">
            <ProvinceSelect
              value={filter.provinceId ? +filter.provinceId : null}
              onChange={(value) => onFilter('provinceId', value)}
            />
          </Form.Item>
          <Form.Item label="Kota">
            <CitySelect
              value={filter.cityId ? +filter.cityId : null}
              disabled={!filter.provinceId}
              provinceId={filter.provinceId}
              onChange={(value) => onFilter('cityId', value)}
            />
          </Form.Item>
        </Form>
      ),
    },
  ];

  return (
    <div>
      <Typography.Title level={5} style={{ marginTop: 0 }}>
        Filter
      </Typography.Title>

      <Collapse
        defaultActiveKey={items.map((item) => String(item.key))}
        ghost
        expandIconPosition="end"
        items={items}
      />
    </div>
  );
}
