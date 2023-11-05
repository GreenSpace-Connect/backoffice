import {
  DatePicker,
  Form,
  FormProps,
  Input,
  Tabs,
  TabsProps,
  Typography,
} from 'antd';
import { TEventPayload } from '../entities/request';
import { requiredRule } from '@/services/antd/validation';
import CommunitySelect from '../../communities/components/CommunitySelect';
import ProvinceSelect from '../../regions/provinces/components/ProvinceSelect';
import CitySelect from '../../regions/cities/components/CitySelect';
import DistrictSelect from '../../regions/districts/components/DistrictSelect';
import Map from '@/components/cards/Map';
import GreenPlaceSelect from '../../green-places/components/GreenPlaceSelect';
import { useGetGreenPlaceDetails } from '../../green-places/hooks/useQuery';
import { useEffect, useState } from 'react';
import { OwnUpload } from '@/components/inputs/OwnUpload';
import { FilePlace } from '@/modules/upload/constant';
import { TCommunityResponse } from '../../communities/entities/response';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

type FormManagementProps = FormProps<TEventPayload> & {
  communityId?: TCommunityResponse['id'];
};

export default function EventForm(props: FormManagementProps) {
  const { form, communityId, ...rest } = props;

  const watchForm = Form.useWatch<TEventPayload | undefined>([], form);

  const onChangeTab = (key: string) => {
    setActivedTab(key);
    form?.setFieldsValue({
      placeName: undefined,
      provinceId: undefined,
      cityId: undefined,
      districtId: undefined,
      address: undefined,
      latitude: undefined,
      longitude: undefined,
    });
  };

  const [activedTab, setActivedTab] = useState('1');
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Use Green Place',
      children: <UseGreenPlace form={form} activedTab={activedTab} />,
    },
    {
      key: '2',
      label: 'Custom Place',
      children: <CustomPlace form={form} />,
    },
  ];

  return (
    <Form layout="vertical" form={form} {...rest}>
      <Form.Item label="Name" name="name" rules={[requiredRule]}>
        <Input placeholder="Name..." />
      </Form.Item>
      <Form.Item label="Description" name="description" rules={[requiredRule]}>
        <ReactQuill theme="snow" />
        {/* <Input.TextArea placeholder="Description..." rows={10} /> */}
      </Form.Item>
      <Form.Item
        label="Community"
        name="communityId"
        rules={[requiredRule]}
        hidden={!!communityId}
      >
        <CommunitySelect />
      </Form.Item>
      <Form.Item label="Thumbnail Url" name="thumbnail" rules={[requiredRule]}>
        <OwnUpload
          filePlace={FilePlace.Events}
          defaultFile={watchForm?.thumbnail}
          onUploaded={(filename) => form?.setFieldValue('thumbnail', filename)}
        />
      </Form.Item>
      <Form.Item label="Schedule" name="schedule" rules={[requiredRule]}>
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>
      <Tabs defaultActiveKey="1" items={items} onChange={onChangeTab} />
    </Form>
  );
}

const UseGreenPlace = (props: FormManagementProps & { activedTab: string }) => {
  const { form, activedTab } = props;

  const [greenPlaceId, setGreenPlaceId] = useState<number | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const greenPlaceDetailHook = useGetGreenPlaceDetails({
    id: greenPlaceId || 0,
    options: {
      enabled: !!greenPlaceId,
      onSuccess: (resp) => {
        const { data } = resp;

        form?.setFieldsValue({
          placeName: data.name,
          address: data.address,
          provinceId: data.province.id,
          cityId: data.city.id,
          districtId: data.district.id,
          latitude: data.latitude,
          longitude: data.longitude,
        });
      },
    },
  });

  useEffect(() => {
    setGreenPlaceId(null);
  }, [activedTab]);

  return (
    <>
      <Form.Item label="Green Place" name="placeName" rules={[requiredRule]}>
        <GreenPlaceSelect value={greenPlaceId} onSelect={setGreenPlaceId} />
      </Form.Item>
    </>
  );
};

const CustomPlace = (props: FormManagementProps) => {
  const { form } = props;
  const watchForm = Form.useWatch<TEventPayload | undefined>([], form);

  return (
    <>
      <Form.Item label="Map" name="latitude">
        <div>
          <Map
            onSelectedPlace={(name, address) => {
              if (!form) return;
              form.setFieldsValue({
                placeName: name,
                address,
              });
            }}
            onChangedLatLng={(value) => {
              if (!form) return;
              form.setFieldsValue({
                latitude: String(value.lat),
                longitude: String(value.lng),
              });
            }}
          />
          {form?.getFieldsError().map((item) => {
            if (!['longitude'].includes(String(item.name))) return;
            return item.errors.map((error) => (
              <>
                <Typography.Text key={error} type="danger">
                  {error}
                </Typography.Text>
                <br />
              </>
            ));
          })}
          <Form.Item name="longitude" hidden>
            <div></div>
          </Form.Item>
        </div>
      </Form.Item>
      <Form.Item label="Place Name" name="placeName" rules={[requiredRule]}>
        <Input placeholder="Place Name..." />
      </Form.Item>
      <Form.Item label="Province" name="provinceId" rules={[requiredRule]}>
        <ProvinceSelect
          onSelect={() => {
            form?.setFieldsValue({
              cityId: undefined,
              districtId: undefined,
            });
          }}
        />
      </Form.Item>
      <Form.Item label="City" name="cityId" rules={[requiredRule]}>
        <CitySelect
          provinceId={watchForm?.provinceId}
          disabled={!watchForm?.provinceId}
          onSelect={() => {
            form?.setFieldsValue({
              districtId: undefined,
            });
          }}
        />
      </Form.Item>
      <Form.Item label="District" name="districtId" rules={[requiredRule]}>
        <DistrictSelect
          cityId={watchForm?.cityId}
          disabled={!watchForm?.cityId}
        />
      </Form.Item>
      <Form.Item label="Address" name="address" rules={[requiredRule]}>
        <Input.TextArea rows={3} placeholder="Address..." />
      </Form.Item>
    </>
  );
};
