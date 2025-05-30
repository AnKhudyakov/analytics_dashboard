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

export const Incorrect: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // const loginInput = canvas.getByPlaceholderText('Username');
    const emailInput = canvas.getByPlaceholderText('Email');
    const passwordInput = canvas.getByPlaceholderText('Password');
    const showButton = await canvas.findByTestId('Password');
    const confirmInput = canvas.getByPlaceholderText('Confirm Password');
    const showConfirmButton = await canvas.findByTestId('Confirm Password');
    const button = canvas.getByRole('button', { name: 'Signup' });
    // await userEvent.type(loginInput, '', { delay: 100 });
    await userEvent.type(emailInput, 'admin@.com', { delay: 100 });
    await userEvent.type(passwordInput, 'admin', { delay: 100 });
    await userEvent.click(showButton, { delay: 100 });
    await userEvent.type(confirmInput, 'admin111', { delay: 100 });
    await userEvent.click(showConfirmButton, { delay: 100 });
    await userEvent.click(button, { delay: 100 });
  },
};

export const Correct: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const loginInput = canvas.getByPlaceholderText('Username');
    const emailInput = canvas.getByPlaceholderText('Email');
    const passwordInput = canvas.getByPlaceholderText('Password');
    const showButton = await canvas.findByTestId('Password');
    const confirmInput = canvas.getByPlaceholderText('Confirm Password');
    const showConfirmButton = await canvas.findByTestId('Confirm Password');
    const button = canvas.getByRole('button', { name: 'Signup' });
    await userEvent.type(loginInput, 'admin', { delay: 100 });
    await userEvent.type(emailInput, 'admin@admin.com', { delay: 100 });
    await userEvent.type(passwordInput, 'admin111', { delay: 100 });
    await userEvent.click(showButton, { delay: 100 });
    await userEvent.type(confirmInput, 'admin111', { delay: 100 });
    await userEvent.click(showConfirmButton, { delay: 100 });
    await userEvent.click(button, { delay: 100 });
  },
};
