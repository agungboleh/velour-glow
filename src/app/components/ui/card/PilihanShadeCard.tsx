interface PilihanShadeCardProps {
  image: string;
  badgeImage: string;
  number: string;
  name: string;
  badgeText: string;
  description: string;
}

export default function PilihanShadeCard({
  image,
  badgeImage,
  number,
  name,
  badgeText,
  description,
}: PilihanShadeCardProps) {
  return (
    <div className="bg-white rounded-3xl p-4 border border-gray-100 shadow-[0_4px_20px_-2px_rgba(255,45,120,0.06)] hover:shadow-[0_12px_30px_-4px_rgba(255,45,120,0.12)] transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group">
      <div>
        <div className="h-52 rounded-2xl bg-gray-100 relative overflow-hidden mb-6 flex items-center justify-center">
          <img
            src={image}
            alt={`Bibir Shade ${name}`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <span className="bg-primary-50 absolute top-4 left-4 text-xs px-3.5 py-1.5 rounded-full font-semibold shadow-sm text-secondary">
            {badgeImage}
          </span>
        </div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xl text-base font-bold">
            #{number} {name}
          </p>
          <span className="text-xs uppercase bg-primary-50 px-3 py-1 rounded-full text-primary font-bold">
            {badgeText}
          </span>
        </div>
        <p className="text-sm text-base/70 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
