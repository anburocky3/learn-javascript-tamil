export default function VideoPlayer({ videoId }: { videoId: string }) {
  const src = `https://www.youtube.com/embed/${videoId}`;
  return (
    <div className="w-full aspect-video bg-black rounded overflow-hidden">
      <iframe
        className="w-full h-full"
        src={src}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
