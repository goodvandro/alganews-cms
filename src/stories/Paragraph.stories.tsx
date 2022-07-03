import { ComponentStory, ComponentMeta } from '@storybook/react';

import Paragraph, { ParagraphProps } from '../app/components/Typography/Paragraph';

export default {
  title: 'Typography/Paragraph',
  component: Paragraph,
} as ComponentMeta<typeof Paragraph>;

const Template: ComponentStory<typeof Paragraph> = (args: ParagraphProps) => <Paragraph {...args} />;

export const Default = Template.bind({});
Default.args = {
  size: 'default',
  children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel',
}

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel',
}
