/* eslint-disable @typescript-eslint/no-unused-vars */
import { useGetCityDetails } from '@/modules/master-data/regions/cities/hooks/useQuery';
import { useGetProvinceDetails } from '@/modules/master-data/regions/provinces/hooks/useQuery';
import { theme, Space, Tag } from 'antd';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function Filtertag() {
  const router = useRouter();

  const {
    token: { colorPrimary },
  } = theme.useToken();

  const [filterList, setFilterList] = useState<
    { key: string; value: string }[]
  >([]);

  const provinceIdFound = filterList.find((item) => item.key === 'provinceId');
  const provinceDetails = useGetProvinceDetails({
    id: Number(provinceIdFound?.value),
    options: {
      onSuccess: (data) => {
        setFilterList((prev) => {
          const found = filterList.findIndex(
            (item) =>
              item.value === String(data.data.id) && item.key === 'provinceId',
          );
          if (prev[found]) {
            prev[found].value = data.data.name;
          }

          return [...prev];
        });
      },
    },
  });

  const cityIdFound = filterList.find((item) => item.key === 'cityId');
  const cityDetails = useGetCityDetails({
    id: Number(cityIdFound?.value),
    options: {
      onSuccess: (data) => {
        setFilterList((prev) => {
          const found = filterList.findIndex(
            (item) =>
              item.value === String(data.data.id) && item.key === 'cityId',
          );
          if (prev[found]) {
            prev[found].value = data.data.name;
          }

          return [...prev];
        });
      },
    },
  });

  useEffect(() => {
    setFilterList((prev) =>
      prev.filter((item) => Object.keys(router.query).includes(item.key)),
    );

    Object.keys(router.query).map((queryKey) => {
      setFilterList((prev) => {
        const value = String(router.query[queryKey]);
        const found = prev.find((item) => item.key === queryKey);

        if (!found) {
          prev.push({
            key: queryKey,
            value: value,
          });
        }

        return [...prev];
      });
    });
  }, [router.query]);

  return (
    <Space size={[8, 8]} wrap style={{ marginBottom: '1rem' }}>
      {filterList.map((item) => (
        <Tag key={item.key} color={colorPrimary}>
          {item.value}
        </Tag>
      ))}
    </Space>
  );
}
