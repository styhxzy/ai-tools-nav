interface StatsBannerProps {
  toolCount: number;
  categoryCount: number;
  articleCount: number;
}

export function StatsBanner({ toolCount, categoryCount, articleCount }: StatsBannerProps) {
  const stats = [
    { value: toolCount, label: 'AI工具' },
    { value: categoryCount, label: '分类' },
    { value: articleCount, label: '教程文章' },
  ];

  return (
    <section className="section-container py-8">
      <div className="glass rounded-2xl p-6 sm:p-8">
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold gradient-text">
                {stat.value}+
              </div>
              <div className="text-xs sm:text-sm text-gray-500 mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
