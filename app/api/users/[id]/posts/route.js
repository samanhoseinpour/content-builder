import { connectToDB } from '@utils/database';
import Content from '@models/content';

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const contents = await Content.find({
      creator: params.id,
    }).populate('creator');

    return new Response(JSON.stringify(contents), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch all contents.', { status: 500 });
  }
};
