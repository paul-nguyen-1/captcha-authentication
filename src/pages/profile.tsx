import React from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import Image from 'next/image'

interface User {
  name: string;
  email: string;
  picture: string;
}

export default function Profile() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    user && (
      <div>
        <Image src={user.picture as string} alt={user.name as string} />
        <h2>{(user as User).name}</h2>
        <p>{(user as User).email}</p>
      </div>
    )
  );
}
