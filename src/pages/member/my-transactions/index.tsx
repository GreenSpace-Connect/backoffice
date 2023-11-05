import TitleNavigation from '@/components/navigations/TitleNavigation';
import Datatable from '@/components/tables/Datatable';
import MemberLayout from '@/layouts/MemberLayout';
import { TDonationTransactionParams } from '@/modules/master-data/donation-transactions/entities/request';
import { TDonationTransactionResponse } from '@/modules/master-data/donation-transactions/entities/response';
import { useGetDonationTransactions } from '@/modules/master-data/donation-transactions/hooks/useQuery';
import { TTicketTransactionParams } from '@/modules/master-data/ticket-transactions/entities/request';
import { TTicketTransactionResponse } from '@/modules/master-data/ticket-transactions/entities/response';
import { useGetTicketTransactions } from '@/modules/master-data/ticket-transactions/hooks/useQuery';
import { getnumberColumn } from '@/services/antd/table';
import { convertToIdr } from '@/utils/helpers/string.helper';
import { useTableFilter } from '@/utils/hooks/useFilter';
import { Typography } from 'antd';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function MyTransactionsPage() {
  const session = useSession();
  const userId = session.data?.user?.id;

  const ticketTransactionFilterHook = useTableFilter<
    TTicketTransactionParams,
    TTicketTransactionResponse
  >();
  const ticketTransactionDataHook = useGetTicketTransactions({
    params: {
      ...ticketTransactionFilterHook.params,
      userId,
    },
    options: {
      enabled: !!userId,
    },
  });

  const donationTransactionFilterHook = useTableFilter<
    TDonationTransactionParams,
    TDonationTransactionResponse
  >();
  const donationTransactionDataHook = useGetDonationTransactions({
    params: {
      ...donationTransactionFilterHook.params,
      userId,
    },
    options: {
      enabled: !!userId,
    },
  });

  return (
    <MemberLayout title="My Transactions">
      <div style={{ display: 'grid', gap: '3rem' }}>
        <div>
          <TitleNavigation title="Ticket Transactions" />

          <Datatable
            onSearch={(value) =>
              ticketTransactionFilterHook.onChange('search', value)
            }
            tableProps={{
              dataSource: ticketTransactionDataHook.data?.items,
              loading: ticketTransactionDataHook.isFetching,
              pagination: ticketTransactionDataHook.data?.meta,
              onChange: ticketTransactionFilterHook.pagination.onChange,
              columns: [
                getnumberColumn<TTicketTransactionResponse>(),
                {
                  title: 'Event',
                  render: (_, record) => (
                    <Typography.Text>
                      <Link href={`/event/${record.ticket.event.id}`}>
                        {record.ticket.event.name}
                      </Link>
                    </Typography.Text>
                  ),
                },
                {
                  title: 'Ticket',
                  render: (_, record) => (
                    <Typography.Text>{record.ticket.name}</Typography.Text>
                  ),
                },
                {
                  title: 'Price',
                  render: (_, record) => (
                    <Typography.Text>
                      {convertToIdr(record.ticket.price)}
                    </Typography.Text>
                  ),
                },
              ],
            }}
          />
        </div>

        <div>
          <TitleNavigation title="Donation Transactions" />

          <Datatable
            onSearch={(value) =>
              donationTransactionFilterHook.onChange('search', value)
            }
            tableProps={{
              dataSource: donationTransactionDataHook.data?.items,
              loading: donationTransactionDataHook.isFetching,
              pagination: donationTransactionDataHook.data?.meta,
              onChange: donationTransactionFilterHook.pagination.onChange,
              columns: [
                getnumberColumn<TDonationTransactionResponse>(),
                {
                  title: 'Donation',
                  render: (_, record) => (
                    <Typography.Text>
                      <Link href={`/event/${record.donation.event.id}`}>
                        {record.donation.name}
                      </Link>
                    </Typography.Text>
                  ),
                },
                {
                  title: 'Amount',
                  render: (_, record) => (
                    <Typography.Text>
                      {convertToIdr(record.amount)}
                    </Typography.Text>
                  ),
                },
              ],
            }}
          />
        </div>
      </div>
    </MemberLayout>
  );
}
