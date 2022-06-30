import { Story, Meta } from '@storybook/react';
import ImageUpload, { ImageUploadProps } from '../components/ImageUpload/ImageUpload';

export default {
  title: 'Example/ImageUpload',
  component: ImageUpload,
  argTypes: {
    onImageUpload: { action: 'ImageUpload' },
    onCancel: { action: 'cancel' },
  },
} as Meta;

const Template: Story<ImageUploadProps> = (args) => <ImageUpload {...args} />;

export const Default = Template.bind({})
Default.args = {
  label: 'Thumbnail do post'
}
