// import React from "react";

const ScoreCard = ({ title, scores }) => (
  <div className="bg-white shadow rounded-lg p-6 mb-6">
    <h3 className="text-lg font-semibold mb-4 text-krishna-blue-900">
      {title}
    </h3>
    <div className="space-y-2">
      {scores.map((score, index) => (
        <div key={index} className="flex justify-between items-center">
          <span className="text-gray-600">{score.range}</span>
          <span className="font-medium text-krishna-blue-700">
            {score.marks} marks
          </span>
        </div>
      ))}
    </div>
  </div>
);

const MarkingScheme = () => {
  const schemes = [
    {
      title: "Sleep Time (Sleep Score)",
      scores: [
        { range: "Up to 22:15", marks: 25 },
        { range: "Up to 22:30", marks: 20 },
        { range: "Up to 22:45", marks: 15 },
        { range: "Up to 23:00", marks: 10 },
        { range: "Up to 23:15", marks: 5 },
        { range: "Up to 23:30", marks: 0 },
      ],
    },
    {
      title: "Wakeup Time (Wakeup Score)",
      scores: [
        { range: "Up to 04:45", marks: 25 },
        { range: "Up to 05:00", marks: 20 },
        { range: "Up to 05:15", marks: 15 },
        { range: "Up to 05:30", marks: 10 },
        { range: "Up to 05:45", marks: 5 },
        { range: "Up to 06:00", marks: 0 },
      ],
    },
    {
      title: "Day Rest Duration (Day Rest Score)",
      scores: [
        { range: "Up to 60 min", marks: 25 },
        { range: "Up to 75 min", marks: 20 },
        { range: "Up to 90 min", marks: 15 },
        { range: "Up to 105 min", marks: 10 },
        { range: "Up to 120 min", marks: 5 },
        { range: "Up to 135 min", marks: 0 },
        { range: "Up to 150 min", marks: -5 },
      ],
    },
    {
      title: "Target Chanting End Time (Chanting Score)",
      scores: [
        { range: "Up to 07:15", marks: 25 },
        { range: "Up to 09:30", marks: 20 },
        { range: "Up to 13:00", marks: 15 },
        { range: "Up to 19:00", marks: 10 },
        { range: "Up to 21:00", marks: 5 },
        { range: "Up to 23:00", marks: 0 },
        { range: "Up to 23:30", marks: -5 },
      ],
    },
    {
      title: "Hearing Duration (Hearing Score)",
      scores: [
        { range: "Up to 0 min", marks: 0 },
        { range: "Up to 5 min", marks: 5 },
        { range: "Up to 10 min", marks: 10 },
        { range: "Up to 20 min", marks: 15 },
        { range: "Up to 25 min", marks: 20 },
        { range: "Up to 30 min", marks: 25 },
      ],
    },
    {
      title: "Reading Duration (Reading Score)",
      scores: [
        { range: "Up to 0 min", marks: 0 },
        { range: "Up to 5 min", marks: 5 },
        { range: "Up to 10 min", marks: 10 },
        { range: "Up to 20 min", marks: 15 },
        { range: "Up to 25 min", marks: 20 },
        { range: "Up to 30 min", marks: 25 },
      ],
    },
    {
      title: "Service Duration (Service Score)",
      scores: [
        { range: "Up to 5 min", marks: 0 },
        { range: "Up to 10 min", marks: 5 },
        { range: "Up to 15 min", marks: 10 },
        { range: "Up to 20 min", marks: 15 },
        { range: "Up to 25 min", marks: 20 },
        { range: "Up to 30 min", marks: 25 },
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-krishna-blue-900 mb-6">
        Marking Scheme
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {schemes.map((scheme, index) => (
          <ScoreCard key={index} title={scheme.title} scores={scheme.scores} />
        ))}
      </div>
    </div>
  );
};

export default MarkingScheme;
