import { supabase } from "../auth/supabaseClient"

// export async function createBookmark({ url, title, description, image_url, tags }) {
//   const userResponse = await supabase.auth.getUser()
//   const user = userResponse.data.user

//   if (!user) throw new Error("Not logged in")

// //   const { data, error } = await supabase.from('bookmarks').insert([
// //     {
// //       user_id: user.id,
// //       url,
// //       title,
// //       description,
// //     //   image_url,
// //       tags: [],
// //     },
// //   ])

// //   if (error) throw error

// //   return data?.[0];
// const { data, error } = await supabase
//   .from("bookmarks")
//   .insert([bookmark])
//   .select()
//   .single(); // 👈 gets single row

// if (error) throw error;

// return data; // ✅ now `data` is a single object with .id, .title, etc.

// }

export async function createBookmark({ url, title, description, image_url, tags }) {
  const userResponse = await supabase.auth.getUser();
  const user = userResponse.data.user;

  if (!user) throw new Error("Not logged in");

  const { data, error } = await supabase
    .from("bookmarks")
    .insert([
      {
        user_id: user.id,
        url,
        title,
        description,
        image_url,
        tags: tags || [],
      },
    ])
    .select()
    .single();

  if (error) throw error;

  return data;
}



export async function deleteBookmark(bookmarkId) {
  const { data, error } = await supabase
    .from('bookmarks')
    .delete()
    .eq('id', bookmarkId)

  if (error) throw error

  return data
}
