interface FilosofiCardProps {
  review: string;
  image?: string;
  initial: string;
  name: string;
  profession: string;
}

export default function FilosofiCard({
  review,
  image,
  initial,
  name,
  profession,
}: FilosofiCardProps) {
  return (
    <div className="group bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_4px_20px_-2px_rgba(255,45,120,0.06)] hover:shadow-[0_12px_30px_-4px_rgba(255,45,120,0.12)] transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between">
      <div>
        <p className=" text-base/70 leading-relaxed italic">"{review}"</p>
      </div>
      <div className="inline-flex gap-2 mt-4 items-center">
        {image ? (
          <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
            <img
              src={image}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-12.5 h-12.5 rounded-full bg-primary-50 flex items-center justify-center font-bold text-primary">
            {initial}
          </div>
        )}
        <div className="flex flex-col">
          <p className="text-sm font-bold text-primary">{name}</p>
          <p className="text-sm text-secondary">{profession}</p>
        </div>
      </div>
    </div>
  );
}
