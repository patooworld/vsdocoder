import { sql } from '@vercel/postgres';
import { redirect } from 'next/navigation';

async function create(formData: FormData) {
  'use server';
  const { rows } = await sql`
    INSERT INTO products (name)
    VALUES (${formData.get('name')})
  `;
  redirect(`/product/${rows[0].slug}`);
}

export default function Page() {
  return (
    <form action={create}>
      <input type="text" name="name" />
      <button type="submit">Submit</button>
    </form>
  );
}
