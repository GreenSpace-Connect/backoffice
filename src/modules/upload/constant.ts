export const UPLOAD_ENDPOINT = '/v1.0.0/upload/file';

export enum FilePlace {
  Events = 'events',
  Avatars = 'avatars',
}

export enum FileType {
  Excel = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  Pdf = 'application/pdf',
  Png = 'image/png',
  Jpg = 'image/jpg',
  Jpeg = 'image/jpeg',
}
