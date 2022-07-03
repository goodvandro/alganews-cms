import { Story, Meta } from '@storybook/react';
import Profile, { ProfileProps } from '../app/components/Profile';

export default {
  title: 'Example/Profile',
  component: Profile
} as Meta;

const Template: Story<ProfileProps> = (args) =>
  <Profile {...args} />

export const Default = Template.bind({})
Default.args = {
  name: 'Evandro Monteiro',
  description: 'editor há muito tempo'
}