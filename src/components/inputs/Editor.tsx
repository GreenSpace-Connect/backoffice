import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

type EditorProps = {
  value?: string;
  onChange?: (value: string) => void;
};

export default function Editor(props: EditorProps) {
  const { value, onChange } = props;

  return (
    <CKEditor
      editor={ClassicEditor}
      data={value}
      onChange={(event, editor) => {
        const data = editor.getData();
        onChange && onChange(data);
      }}
      config={{
        toolbar: {
          shouldNotGroupWhenFull: true,
          items: [
            'heading',
            '|',
            'bold',
            'italic',
            'link',
            '|',
            'bulletedList',
            'numberedList',
            '|',
            'blockQuote',
          ],
        },
      }}
    />
  );
}
