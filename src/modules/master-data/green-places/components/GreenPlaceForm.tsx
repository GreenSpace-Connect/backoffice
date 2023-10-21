import { Form, FormProps, Input, Typography } from 'antd';
import { TGreenPlacePayload } from '../entities/request';
import { requiredRule } from '@/services/antd/validation';
import ProvinceSelect from '../../regions/provinces/components/ProvinceSelect';
import CitySelect from '../../regions/cities/components/CitySelect';
import DistrictSelect from '../../regions/districts/components/DistrictSelect';
import Map from '@/components/cards/Map';

type FormManagementProps = FormProps<TGreenPlacePayload>;

export default function GreenPlaceForm(props: FormManagementProps) {
  const { form, ...rest } = props;
  const watchForm = Form.useWatch<TGreenPlacePayload | undefined>([], form);

  return (
    <Form layout="vertical" form={form} {...rest}>
      <Form.Item label="Map" name="latitude">
        <div>
          <Map
            onSelectedPlace={(name, address) => {
              if (!form) return;
              form.setFieldsValue({
                name,
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
      <Form.Item label="Name" name="name" rules={[requiredRule]}>
        <Input placeholder="Name..." />
      </Form.Item>
      <Form.Item label="Description" name="description" rules={[requiredRule]}>
        <Input.TextArea placeholder="Description..." rows={5} />
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
    </Form>
  );
}
