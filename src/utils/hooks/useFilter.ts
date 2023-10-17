import { TablePaginationConfig } from 'antd';
import { useEffect, useState } from 'react';
import { TPaginateParams, TSortParams } from '../entities/request';

export const usePagination = () => {
  const [params, setParams] = useState<TPaginateParams>({
    page: 1,
    perPage: 10,
  });

  const onChange = (pagination: TablePaginationConfig) => {
    setParams({
      page: pagination.current,
      perPage: pagination.pageSize,
    });
  };

  return {
    params,
    onChange,
  };
};

export const useSort = <T>() => {
  const [params, setParams] = useState<TSortParams<T>>({
    orderBy: 'updatedAt',
    orderType: 'desc',
  });

  const onChangeBy = (key: keyof T) => {
    setParams((prev) => ({
      ...prev,
      orderBy: key,
    }));
  };

  const onChangeType = () => {
    setParams((prev) => ({
      ...prev,
      orderType: prev.orderType === 'desc' ? 'asc' : 'desc',
    }));
  };

  return {
    params,
    onChangeType,
    onChangeBy,
  };
};

export const useTableFilter = <TParams, TResponse>(initParams?: TParams) => {
  const paginationParams = usePagination();
  const sortParams = useSort<TResponse>();

  const [params, setParams] = useState({
    ...paginationParams.params,
    ...sortParams.params,
    ...initParams,
  });

  const onChange = (key: keyof TParams, value: TParams[keyof TParams]) => {
    setParams((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => {
    setParams((prev) => ({
      ...prev,
      ...paginationParams.params,
      ...sortParams.params,
    }));
  }, [paginationParams.params, sortParams.params]);

  return {
    pagination: paginationParams,
    sort: sortParams,
    params,
    onChange,
  };
};
