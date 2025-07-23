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
