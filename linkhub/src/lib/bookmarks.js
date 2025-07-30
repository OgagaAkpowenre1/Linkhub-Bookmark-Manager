import { supabase } from "../auth/supabaseClient";

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

export async function createBookmark({
  url,
  title,
  description,
  image_url,
  tags,
}) {
  const userResponse = await supabase.auth.getUser();
  const user = userResponse.data.user;
  
  if (!user) throw new Error("Not logged in");
  console.log("User found", user)

  const { data, error } = await supabase
    .from("bookmarks")
    .insert([
      {
        user_id: user.id,
        url,
        title,
        description,
        image_url: image_url ?? null,
        tags: tags || [],
      },
    ])
    .select()
    .single();

  if (error) throw error;

  for (let tag of tags) {
    const { error: tagError } = await supabase
      .from("tags")
      .upsert([{ user_id: user.id, name: tag }], {
        onConflict: "user_id, name",
      });

    if (tagError) console.error("Tag insert error:", tagError);
  }

  return data;
}

export async function deleteBookmark(bookmarkId) {
  const { data, error } = await supabase
    .from("bookmarks")
    .delete()
    .eq("id", bookmarkId);

  if (error) throw error;

  return data;
}
