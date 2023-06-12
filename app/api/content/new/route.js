import { connectToDB } from '@utils/database';
import Content from '@models/content';

export const POST = async (req) => {
  const { userId, content, tag } = await req.json();

  try {
    await connectToDB();
    const newContent = new Content({
      creator: userId,
      content,
      tag,
    });

    await newContent.save();

    return new Response(JSON.stringify(newContent), { status: 201 });
  } catch (error) {
    return new Response('Failed to create a new content.', { status: 500 });
  }
};
