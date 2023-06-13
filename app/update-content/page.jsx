'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

import Form from '@components/Form';

const EditContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const contentId = searchParams.get('id');

  const [post, setPost] = useState({ content: '', tag: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const getContentDetails = async () => {
      const response = await fetch(`/api/content/${contentId}`);

      const data = await response.json();

      setPost({
        content: data.content,
        tag: data.tag,
      });
    };

    if (contentId) getContentDetails();
  }, [contentId]);

  const updateContent = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!contentId) return alert('Content ID not found!');

    try {
      const response = await fetch(`/api/content/${contentId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          content: post.content,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updateContent}
    />
  );
};

export default EditContent;
