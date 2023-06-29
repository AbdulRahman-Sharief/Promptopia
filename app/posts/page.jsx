'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import PromptCard from '@components/PromptCard';

const TagPosts = () => {
  const [posts, setPosts] = useState([]);
  const searchParams = useSearchParams();
  const promptTag = searchParams.get('tag');
  useEffect(() => {
    const fetchTagPosts = async () => {
      const response = await fetch(`/api/prompt/tag/${promptTag}`);
      const data = await response.json();
      setPosts(data);
    };
    fetchTagPosts();
  }, []);
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">#{promptTag}</span>
      </h1>
      <p className="desc text-left">
        these are prompts related to{' '}
        <span className="blue_gradient">#{promptTag}</span>
      </p>
      <div className="mt-10 prompt_layout">
        {posts.map((post) => (
          <PromptCard key={post._id} post={post} />
        ))}
      </div>
    </section>
  );
};

export default TagPosts;
