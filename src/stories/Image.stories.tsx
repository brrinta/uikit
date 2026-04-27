import type { Meta, StoryObj } from '@storybook/react-vite';
import { Image } from '../ui/image';

const meta: Meta<typeof Image> = {
	title: 'Components/Image',
	component: Image,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		rounded: {
			control: 'boolean',
		},
		shadow: {
			control: 'boolean',
		},
		withSkeleton: {
			control: 'boolean',
		},
	},
};

export default meta;
type Story = StoryObj<typeof Image>;

export const ImagePreview: Story = {
	render: (args) => <Image {...args} />,
	args: {
		src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
		alt: 'Mountain landscape',
		width: 400,
		height: 300,
	},
};

export const ImageWithRatio: Story = {
	render: (args) => <Image {...args} />,
	args: {
		src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
		alt: 'Mountain landscape',
		ratio: '16/9',
		className: 'w-80',
	},
};

export const ImageRounded: Story = {
	render: (args) => <Image {...args} />,
	args: {
		src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
		alt: 'Mountain landscape',
		width: 300,
		height: 200,
		rounded: true,
		shadow: true,
	},
};

export const ImageWithSkeleton: Story = {
	render: (args) => <Image {...args} />,
	args: {
		src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
		alt: 'Mountain landscape',
		width: 300,
		height: 200,
		withSkeleton: true,
		rounded: true,
	},
};

export const ImageWithCaption: Story = {
	render: (args) => <Image {...args} />,
	args: {
		src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
		alt: 'Mountain landscape',
		width: 300,
		height: 200,
		caption: 'Beautiful mountain landscape',
		rounded: true,
	},
};
