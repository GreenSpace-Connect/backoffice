'use client';

import { useGetGreenPlaces } from '@/modules/master-data/green-places/hooks/useQuery';
import { Row, Col, Empty } from 'antd';
import GreenSpaceCard from '../cards/GreenSpaceCard';
import ListColum from '../layouts/ListColumn';
import { useAppSelector } from '@/services/redux/store';

export default function GreenSpaceSection() {
  const filter = useAppSelector((state) => state.searchFilter);

  const greenplaceDataHook = useGetGreenPlaces({
    params: {
      ...filter,
    },
  });

  if (greenplaceDataHook.isFetching) {
    return (
      <Row gutter={16}>
        {[1, 2, 3].map((item) => (
          <ListColum key={item}>
            <GreenSpaceCard loading={true} />
          </ListColum>
        ))}
      </Row>
    );
  }

  if (greenplaceDataHook.data?.items.length === 0) {
    return <Empty />;
  }

  return (
    <Row gutter={[16, 16]}>
      {greenplaceDataHook.data?.items.map((greenplace) => (
        <Col key={greenplace.id} xs={12} lg={8} xl={6}>
          <GreenSpaceCard
            name={greenplace.name}
            address={greenplace.address}
            style={{ height: '100%' }}
          />
        </Col>
      ))}
    </Row>
  );
}
