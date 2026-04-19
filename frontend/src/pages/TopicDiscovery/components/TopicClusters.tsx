import React from 'react';
import { TopicCard } from '@/components/cards/TopicCard';
import { useTopicStore } from '@/store';

export function TopicClusters() {
  const topics = useTopicStore((s) => s.topics);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 stagger-children">
      {topics.map((topic) => (
        <TopicCard key={topic.id} {...topic} />
      ))}
    </div>
  );
}
