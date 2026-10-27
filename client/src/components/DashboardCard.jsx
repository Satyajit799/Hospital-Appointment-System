const DashboardCard = ({ title, value, icon }) => {
  return (
    <div
      className="
      bg-white
      rounded-2xl
      shadow-md
      p-6
      hover:shadow-xl
      transition
      text-black
      "
    >
      <div className="text-4xl mb-4">{icon}</div>

      <h3 className="text-gray-500 text-lg">{title}</h3>

      <p className="text-4xl font-bold mt-3">{value}</p>
    </div>
  );
};

export default DashboardCard;
