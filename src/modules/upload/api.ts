import axios from '@/services/axios/axios';
import { UPLOAD_ENDPOINT } from './constant';
import { TUploadResponse } from './entities/response';
import { TUploadPayload } from './entities/request';
import { TResponseData } from '@/utils/entities/response';
import { AxiosRequestConfig } from 'axios';

export const uploadImage = async (payload: TUploadPayload) => {
  const result = await axios.post<TUploadResponse>(
    `${UPLOAD_ENDPOINT}`,
    payload,
  );
  return result.data;
};

export const uploadMedia = async (
  data: TUploadPayload,
  config?: AxiosRequestConfig,
) => {
  const formdata = new FormData();
  formdata.append('file', data.file);
  formdata.append('filePlace', data.filePlace);

  const result = await axios.post<TResponseData<TUploadResponse>>(
    `${UPLOAD_ENDPOINT}`,
    data,
    {
      ...config,
      headers: { 'Content-Type': 'multipart/form-data' },
    },
  );
  return result;
};
