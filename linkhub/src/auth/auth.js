// Google login
await supabase.auth.signInWithOAuth({
  provider: "google",
  options: { redirectTo: "https://google.com" },
});

// Email login
await supabase.auth.signInWithPassword({ email, password });

// Get current user
const {
  data: { user },
} = await supabase.auth.getUser();

// Sign out
await supabase.auth.signOut();




// supabase.auth.onAuthStateChange(async (event, session) => {
//   if (event === "SIGNED_IN") {
//     console.log("User signed in:", session?.user?.id);
//   }

//   if (event === "USER_SIGNED_UP") {
//     const user = session?.user;
//     if (!user) return;

//     // Insert default bookmarks
//     const defaultsWithUser = defaultBookmarks.map((b) => ({
//       ...b,
//       user_id: user.id,
//       tags: [],
//       image_url: null,
//     }));

//     const { error } = await supabase.from("bookmarks").insert(defaultsWithUser);
//     if (error) console.error("Failed to insert default bookmarks:", error.message);
//   }
// });

