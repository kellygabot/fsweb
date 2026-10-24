type FBPost = {
  id: string;
  message?: string;
  created_time: string;
  full_picture?: string;
};

export default async function TheFlightFeed() {
  // Environment Variables
  const pageId = process.env.FACEBOOK_PAGE_ID;
  const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;
  
  if (!accessToken) {
    return <p>Facebook token is missing.</p>;
  }

  // API Request
  const res = await fetch(
    `https://graph.facebook.com/v26.0/${pageId}/feed?fields=message,created_time,full_picture&access_token=${accessToken}`,
    {
      // Caches the fetch for 1 hour so Facebook doesn't rate-limit your website
      next: { revalidate: 3600 },
    },
  );

  if (!res.ok) {
    return <p>Failed to load feed.</p>;
  }

  const data = await res.json();
  const posts: FBPost[] = data.data || [];

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <div
          key={post.id}
          className="p-4 border border-gray-200 rounded-lg shadow-sm bg-white"
        >
          <p className="text-xs font-semibold text-gray-500 mb-2">
            {new Date(post.created_time).toLocaleDateString()}
          </p>

          {post.message && (
            <p className="text-gray-800 whitespace-pre-wrap mb-4">
              {post.message}
            </p>
          )}

          {post.full_picture && (
            <img
              src={post.full_picture}
              alt="Facebook Post Attachment"
              className="w-full h-auto rounded object-cover"
            />
          )}
        </div>
      ))}
    </div>
  );
}
