import type { Meta, StoryObj } from '@storybook/react-vite';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@uikit/ui/input-otp';

const meta: Meta<typeof InputOTP> = {
	title: 'Components/Input/OTP',
	component: InputOTP,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	subcomponents: {
		InputOTPGroup: InputOTPGroup,
		InputOTPSlot: InputOTPSlot,
		InputOTPSeparator: InputOTPSeparator,
	},
};
export default meta;

type Story = StoryObj<typeof InputOTP>;

export const InputOTPPreview: Story = {
	render: () => (
		<InputOTP maxLength={6}>
			<InputOTPGroup>
				<InputOTPSlot index={0} />
				<InputOTPSlot index={1} />
				<InputOTPSlot index={2} />
			</InputOTPGroup>
			<InputOTPSeparator />
			<InputOTPGroup>
				<InputOTPSlot index={3} />
				<InputOTPSlot index={4} />
				<InputOTPSlot index={5} />
			</InputOTPGroup>
		</InputOTP>
	),
};

export const InputOTPFour: Story = {
	render: () => (
		<InputOTP maxLength={4}>
			<InputOTPGroup>
				<InputOTPSlot index={0} />
				<InputOTPSlot index={1} />
				<InputOTPSlot index={2} />
				<InputOTPSlot index={3} />
			</InputOTPGroup>
		</InputOTP>
	),
};

export const InputOTPWithPattern: Story = {
	render: () => (
		<InputOTP
			maxLength={6}
			pattern="^[0-9]*$">
			<InputOTPGroup>
				<InputOTPSlot index={0} />
				<InputOTPSlot index={1} />
				<InputOTPSlot index={2} />
				<InputOTPSlot index={3} />
				<InputOTPSlot index={4} />
				<InputOTPSlot index={5} />
			</InputOTPGroup>
		</InputOTP>
	),
};

export const InputOTPDisabled: Story = {
	render: () => (
		<InputOTP
			maxLength={4}
			disabled>
			<InputOTPGroup>
				<InputOTPSlot index={0} />
				<InputOTPSlot index={1} />
				<InputOTPSlot index={2} />
				<InputOTPSlot index={3} />
			</InputOTPGroup>
		</InputOTP>
	),
};
