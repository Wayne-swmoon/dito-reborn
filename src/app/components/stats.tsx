export function Stats() {
  const stats = [
    {
      value: "15년+",
      label: "전문 경력"
    },
    {
      value: "5,000+",
      label: "성공 사례"
    },
    {
      value: "97.8%",
      label: "승인율"
    },
    {
      value: "평균 70%",
      label: "채무 감면율"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}