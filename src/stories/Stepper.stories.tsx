import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stepper } from '../ui/stepper';
import { useState } from 'react';
import { Button } from '../ui/button';

const meta: Meta<typeof Stepper> = {
	title: 'Components/Stepper',
	component: Stepper,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		orientation: {
			control: 'select',
			options: ['horizontal', 'vertical'],
		},
	},
	subcomponents: {
		StepperItem: Stepper.Item,
		StepperTrigger: Stepper.Trigger,
		StepperContent: Stepper.Content,
		StepperIndicator: Stepper.Indicator,
		StepperTitle: Stepper.Title,
		StepperDescription: Stepper.Description,
	},
};
export default meta;

type Story = StoryObj<typeof Stepper>;

export const StepperPreview: Story = {
	render: function StepperStory() {
		const [step, setStep] = useState(1);
		return (
			<div className="w-[600px] space-y-4">
				<Stepper
					value={step}
					onValueChange={setStep}>
					<Stepper.Nav>
						<Stepper.Item step={1}>
							<Stepper.Trigger>
								<Stepper.Indicator />
								<div className="flex flex-col">
									<Stepper.Title>Step 1</Stepper.Title>
									<Stepper.Description>Account details</Stepper.Description>
								</div>
							</Stepper.Trigger>
						</Stepper.Item>
						<Stepper.Separator />
						<Stepper.Item step={2}>
							<Stepper.Trigger>
								<Stepper.Indicator />
								<div className="flex flex-col">
									<Stepper.Title>Step 2</Stepper.Title>
									<Stepper.Description>Personal info</Stepper.Description>
								</div>
							</Stepper.Trigger>
						</Stepper.Item>
						<Stepper.Separator />
						<Stepper.Item step={3}>
							<Stepper.Trigger>
								<Stepper.Indicator />
								<div className="flex flex-col">
									<Stepper.Title>Step 3</Stepper.Title>
									<Stepper.Description>Confirmation</Stepper.Description>
								</div>
							</Stepper.Trigger>
						</Stepper.Item>
					</Stepper.Nav>

					<Stepper.Panel>
						<Stepper.Content value={1}>
							<p className="p-4">Enter your account details here.</p>
						</Stepper.Content>
						<Stepper.Content value={2}>
							<p className="p-4">Enter your personal information.</p>
						</Stepper.Content>
						<Stepper.Content value={3}>
							<p className="p-4">Review and confirm your details.</p>
						</Stepper.Content>
					</Stepper.Panel>
				</Stepper>
				<div className="flex gap-2 justify-center">
					<Button
						variant="secondary"
						onClick={() => setStep(Math.max(1, step - 1))}
						disabled={step === 1}>
						Previous
					</Button>
					<Button
						onClick={() => setStep(Math.min(3, step + 1))}
						disabled={step === 3}>
						Next
					</Button>
				</div>
			</div>
		);
	},
};

export const StepperVertical: Story = {
	render: function StepperVerticalStory() {
		const [step, setStep] = useState(2);
		return (
			<div className="w-[300px]">
				<Stepper
					value={step}
					onValueChange={setStep}
					orientation="vertical">
					<Stepper.Nav>
						<Stepper.Item step={1}>
							<Stepper.Trigger>
								<Stepper.Indicator />
								<Stepper.Title>Step 1</Stepper.Title>
							</Stepper.Trigger>
						</Stepper.Item>
						<Stepper.Item step={2}>
							<Stepper.Trigger>
								<Stepper.Indicator />
								<Stepper.Title>Step 2</Stepper.Title>
							</Stepper.Trigger>
						</Stepper.Item>
						<Stepper.Item step={3}>
							<Stepper.Trigger>
								<Stepper.Indicator />
								<Stepper.Title>Step 3</Stepper.Title>
							</Stepper.Trigger>
						</Stepper.Item>
					</Stepper.Nav>
					<Stepper.Panel>
						<Stepper.Content value={1}>
							<p className="p-4">First step content.</p>
						</Stepper.Content>
						<Stepper.Content value={2}>
							<p className="p-4">Second step content.</p>
						</Stepper.Content>
						<Stepper.Content value={3}>
							<p className="p-4">Third step content.</p>
						</Stepper.Content>
					</Stepper.Panel>
				</Stepper>
			</div>
		);
	},
};
