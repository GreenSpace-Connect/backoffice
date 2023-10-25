import { RcFile } from 'antd/es/upload';
import { FilePlace } from '../constant';

export type TUploadPayload = {
  file: string | Blob | RcFile;
  filePlace: FilePlace;
};
