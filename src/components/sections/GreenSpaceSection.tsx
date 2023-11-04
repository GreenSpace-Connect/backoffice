'use client';

import { useGetGreenPlaces } from '@/modules/master-data/green-places/hooks/useQuery';
import { Row, Col, Empty, Pagination, Typography } from 'antd';
import GreenSpaceCard from '../cards/GreenSpaceCard';
import ListColum from '../layouts/ListColumn';
import store, { useAppSelector } from '@/services/redux/store';
import { changeSearchFilter } from '@/services/redux/reducers/searchFilterReducer';
import Link from 'next/link';

type GreenSpaceProps = {
  seeMore?: boolean;
};

export default function GreenSpaceSection(props: GreenSpaceProps) {
  const { seeMore = false } = props;

  const filter = useAppSelector((state) => state.searchFilter);

  const greenplaceDataHook = useGetGreenPlaces({
    params: {
      ...filter,
      perPage: seeMore ? 4 : 8,
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
    <>
      {seeMore ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            marginBottom: '1rem',
          }}
        >
          <Typography.Title level={2}>GreenSpace</Typography.Title>
          <Link href="search">
            <Typography.Text>See more</Typography.Text>
          </Link>
        </div>
      ) : null}

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

      {!seeMore ? (
        <Pagination
          style={{ marginTop: '2rem' }}
          current={greenplaceDataHook.data?.meta.currentPage}
          pageSize={greenplaceDataHook.data?.meta.perPage}
          total={greenplaceDataHook.data?.meta.total}
          onChange={(page) => {
            store.dispatch(
              changeSearchFilter({
                page,
              }),
            );
          }}
        />
      ) : null}
    </>
  );
}
