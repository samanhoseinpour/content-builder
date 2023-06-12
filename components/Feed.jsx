'use client';

import { useState, useEffect } from 'react';
import ContentCard from './ContentCard';

const ContentCardList = ({
  data,
  handleTagClick,
  handleEdit,
  handleDelete,
}) => {
  const renderedContentCardList = data.map((post) => {
    return (
      <ContentCard
        key={post._id}
        post={post}
        handleTagClick={handleTagClick}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    );
  });

  return <div className="mt-16 content_layout">{renderedContentCardList}</div>;
};

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/content');
      const data = await response.json();

      setPosts(data);
    };

    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    e.preventDefault();
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          // value={SearchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <ContentCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
