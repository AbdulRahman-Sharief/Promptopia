'use client';

import { useEffect, useState } from 'react';
import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick, searchText }) => {
  return (
    <div className="mt-16 prompt_layout">
      {searchText
        ? data.map((post) => {
            if (
              post.creator.username.includes(searchText) ||
              post.tag.includes(searchText)
            ) {
              return (
                <PromptCard
                  key={post._id}
                  post={post}
                  handleTagClick={handleTagClick}
                />
              );
            }
          })
        : data.map((post) => (
            <PromptCard
              key={post._id}
              post={post}
              handleTagClick={handleTagClick}
            />
          ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);
  return (
    <section>
      <form className="relative w-full flex-center ">
        <input
          type="text"
          placeholder="search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        ></input>
      </form>
      <PromptCardList
        data={posts}
        searchText={searchText}
        // handleTagClick={handleTagClick}
      />
    </section>
  );
};

export default Feed;
