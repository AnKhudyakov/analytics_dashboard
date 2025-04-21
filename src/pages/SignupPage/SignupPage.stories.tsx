import { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { store } from 'app/store/store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { SignupPage } from './SignupPage';

const meta: Meta<typeof SignupPage> = {
  title: 'Pages/SignupPage',
  component: SignupPage,
  parameters: {},
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Provider store={store}>
          <Story />
        </Provider>
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SignupPage>;

export const Default: Story = {};

export const LoginIncorrect: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const passwordInput = canvas.getByPlaceholderText('Password');
    const button = canvas.getByRole('button', { name: 'Login' });
    await userEvent.type(passwordInput, 'admin111', { delay: 100 });
    await userEvent.click(button, { delay: 1000 });
  },
};

export const PasswordIncorrect: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const loginInput = canvas.getByPlaceholderText('Username');
    const passwordInput = canvas.getByPlaceholderText('Password');
    const button = canvas.getByRole('button', { name: 'Login' });
    await userEvent.type(loginInput, 'admin', { delay: 100 });
    await userEvent.type(passwordInput, 'admin', { delay: 100 });
    await userEvent.click(button, { delay: 100 });
  },
};
