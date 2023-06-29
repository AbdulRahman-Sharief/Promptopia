'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

import Profile from '@components/Profile';

const UserProfile = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const username = searchParams.get('user');
  const [posts, setPosts] = useState([]);
  const { data: session } = useSession();
  useEffect(() => {
    const fetchPosts = async () => {
      // username == 'My'
      //     ? await fetch(`/api/users/${session?.user.id}/posts`)
      //     :
      // console.log(session?.user.name.toString().replace(' ', '').toLowerCase());
      console.log(session?.user);
      console.log(session?.user.name.replace(/\s/g, '').toLowerCase());
      const response = await fetch(
        `/api/users/${
          username == 'My'
            ? session?.user.name.replace(/\s/g, '').toLowerCase()
            : username
        }/posts`
      );
      const data = await response.json();

      setPosts(data);
    };
    if (session?.user.id) fetchPosts();
  }, []);

  const handleEdit = async (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      'Are you sure you want to delete this prompt ?'
    );
    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: 'DELETE',
        });
        const filteredPosts = posts.filter((p) => {
          return p._id !== post._id.toString();
        });
        setPosts(filteredPosts);
        router.refresh();
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Profile
      name={
        username == session?.user.name.replace(/\s/g, '').toLowerCase()
          ? 'My'
          : username
      }
      desc={`Welcome to ${
        username == 'My' || session?.user.name.replace(/\s/g, '').toLowerCase()
          ? 'your'
          : username
      } profile page.`}
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default UserProfile;
