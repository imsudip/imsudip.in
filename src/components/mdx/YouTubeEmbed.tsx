interface YouTubeEmbedProps {
  url?: string;
  id?: string;
  loading?: 'lazy' | 'eager';
}

export default function YouTubeEmbed({
  url,
  id,
  loading = 'lazy',
}: YouTubeEmbedProps) {
  let videoId = id;

  if (!videoId && url) {
    try {
      const parsed = new URL(url);
      videoId =
        parsed.searchParams.get('v') ?? parsed.pathname.split('/').pop() ?? '';
    } catch {
      videoId = '';
    }
  }

  if (!videoId) return null;

  return (
    <div className="my-6 aspect-video w-full overflow-hidden rounded-lg">
      <iframe
        className="size-full"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video"
        loading={loading}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
