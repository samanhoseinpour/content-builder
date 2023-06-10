'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import Form from '@components/Form';

const CreateContent = () => {
  const { data: session } = useSession();

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    content: '',
    tag: '',
  });

  const pause = (duration) => {
    return new Promise((resolve) => {
      setTimeout(resolve, duration);
    });
  };

  const createContent = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await pause(1000);
      const response = await axios.post('/api/content/new', {
        method: 'POST',
        body: JSON.stringify({
          content: post.content,
          userId: session?.user.id,
          tag: post.tag,
        }),
      });

      (e) => {
        e.preventDefault();
        if (response.ok) {
          router.push('/');
        }
      };
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createContent}
    />
  );
};

export default CreateContent;
