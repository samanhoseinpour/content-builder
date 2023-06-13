import { connectToDB } from '@utils/database';
import Content from '@models/content';

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const content = await Content.findById(params.id).populate('creator');

    if (!content) return new Response('Content not found', { status: 404 });

    return new Response(JSON.stringify(content), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch all Contents.', { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  const { content, tag } = await request.json();

  try {
    await connectToDB();

    const existingContent = await Content.findById(params.id);

    if (!existingContent) {
      return new Response('Content not found', { status: 404 });
    }

    existingContent.content = content;
    existingContent.tag = tag;

    await existingContent.save();

    return new Response('Successfully updated the Contents', { status: 200 });
  } catch (error) {
    return new Response('Error Updating Content', { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    await Content.findByIdAndRemove(params.id);

    return new Response('Successfully deleted the Content', { status: 200 });
  } catch (error) {
    return new Response('Failed to delete Content.', { status: 500 });
  }
};
