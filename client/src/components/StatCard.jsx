const StatCard = ({
  title,

  value,
}) => {
  return (
    <div
      className="

bg-white

shadow-md

rounded-2xl

p-6

hover:shadow-xl

transition

"
    >
      <h2
        className="

text-gray-500

text-lg

"
      >
        {title}
      </h2>

      <p
        className="

text-5xl

font-bold

mt-4

"
      >
        {value}
      </p>
    </div>
  );
};

export default StatCard;
