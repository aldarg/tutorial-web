import React from 'react';
import { withUrqlClient } from 'next-urql';
import { NavBar } from 'src/components/NavBar';
import createUrqlClient from 'src/utils/createUrqlClient';
import { usePostsQuery } from 'src/generated/graphql';

const Index = () => {
  const [{ data }] = usePostsQuery();

  return (
    <>
      <NavBar />
      <div>Hello, world!</div>
      <br />
      {!data ? (
        <div>loading...</div>
      ) : (
        data.posts.map((post) => <div key={post.id}>{post.title}</div>)
      )}
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
