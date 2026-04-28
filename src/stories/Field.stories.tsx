import type { Meta, StoryObj } from '@storybook/react-vite';
import { Field, fieldVariants } from '../ui/field';
import { Input } from '../ui/input';
import { prepareArgTypes } from '../lib/utils';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, UploadCloud } from 'lucide-react';

const meta: Meta<typeof Field> = {
	title: 'UI/Field',
	component: Field,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: prepareArgTypes(fieldVariants),
	subcomponents: {
		FieldLabel: Field.Label,
		FieldDescription: Field.Description,
		FieldError: Field.Error,
		FieldContent: Field.Content,
		FieldGroup: Field.Group,
		FieldWrapper: Field.Wrapper,
		FieldAddon: Field.Addon,
	},
};
export default meta;

type Story = StoryObj<typeof Field>;

export const FileFieldPreview: Story = {
	render: (props) => {
		return (
			<Field
				{...props}
				className="w-full">
				<Field.Content>
					<Field.Label>Email</Field.Label>
					<Field.Group>
						<Field.Wrapper>
							<Field.Control
								type={'file'}
								placeholder={'hello'}
							/>
							<Field.Addon
								appearance={'ghost'}
								data-slot={'field-addon-end'}
								mode={'icon'}>
								<UploadCloud />
							</Field.Addon>
						</Field.Wrapper>
					</Field.Group>
				</Field.Content>
				{props?.description && <Field.Description>{props?.description}</Field.Description>}
				<Field.Error match={!!props.invalid}>Simple error</Field.Error>
			</Field>
		);
	},
	args: {
		orientation: 'vertical',
		size: 'md',
		description: 'Simple Description',
		variant: 'default',
		invalid: false,
		disabled: false,
		required: true,
		excludeLeft: false,
	},
};

export const FieldPreview: Story = {
	render: (props) => {
		return (
			<Field
				{...props}
				className="w-80">
				<Field.Content>
					<Field.Label>Email</Field.Label>
					<Field.Group>
						<Field.Addon
							data-slot={'field-addon-left'}
							mode={'icon'}>
							<ArrowLeft />
						</Field.Addon>
						<Field.Wrapper>
							<Field.Addon
								data-slot={'field-addon-start'}
								mode={'icon'}>
								<ChevronLeft />
							</Field.Addon>
							<Field.Control placeholder={'hello'} />
							<Field.Addon
								data-slot={'field-addon-end'}
								mode={'icon'}>
								<ChevronRight />
							</Field.Addon>
						</Field.Wrapper>
						<Field.Addon
							data-slot={'field-addon-right'}
							mode={'icon'}>
							<ArrowRight />
						</Field.Addon>
					</Field.Group>
				</Field.Content>
				{props?.description && <Field.Description>{props?.description}</Field.Description>}
				<Field.Error match={!!props.invalid}>Simple error</Field.Error>
			</Field>
		);
	},
	args: {
		orientation: 'vertical',
		size: 'md',
		description: 'Simple Description',
		variant: 'default',
		invalid: false,
		disabled: false,
		required: true,
		excludeLeft: false,
	},
};

export const FieldRequired: Story = {
	render: () => (
		<Field
			className="w-80"
			required>
			<Field.Label>Username</Field.Label>
			<Input placeholder="Enter username" />
		</Field>
	),
};

export const FieldWithError: Story = {
	render: () => (
		<Field
			className="w-80"
			invalid>
			<Field.Label>Password</Field.Label>
			<Input
				type="password"
				placeholder="Enter password"
			/>
			<Field.Error>Password is required</Field.Error>
		</Field>
	),
};

export const FieldHorizontal: Story = {
	render: () => (
		<Field
			orientation="horizontal"
			className="w-96">
			<Field.Label className="w-24">Name</Field.Label>
			<Input placeholder="Enter your name" />
		</Field>
	),
};

export const FieldDisabled: Story = {
	render: () => (
		<Field
			className="w-80"
			disabled>
			<Field.Label>Disabled Field</Field.Label>
			<Input
				placeholder="Disabled input"
				disabled
			/>
		</Field>
	),
};
