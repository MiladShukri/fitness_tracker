import React from "react";

interface User {
  name: string;
  total: number;
}

interface Props {
  allUsersTotals: User[];
}

const Overall = ({ allUsersTotals }: Props) => {
  // Sort users by total in descending order
  const sortedUsers = [...allUsersTotals].sort((a, b) => b.total - a.total);

  // Create a mapping for colors based on rank
  const rankColors: { [key: number]: string } = {
    1: "bg-yellow-400", // 1st place
    2: "bg-gray-300", // 2nd place
    3: "bg-orange-300", // 3rd place
  };

  // Create an array to hold the final display users with their ranks
  const displayUsers = [];
  let currentRank = 1;

  for (let i = 0; i < sortedUsers.length; i++) {
    const user = sortedUsers[i];

    // If the current user has the same total as the previous user, they share the same rank
    if (i > 0 && user.total === sortedUsers[i - 1].total) {
      // Use the same rank as the previous user
      displayUsers.push({ ...user, rank: currentRank });
    } else {
      // Assign a new rank
      currentRank = displayUsers.length + 1; // Update rank based on the number of users already added
      displayUsers.push({ ...user, rank: currentRank });
    }
  }

  return (
    <div className="flex flex-col items-center h-full bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-6">Overall Scores So Far!</h1>
      <div className="flex flex-col w-full max-w-4xl">
        <div className="flex flex-row mb-4">
          {displayUsers.map((user, index) => (
            <div
              key={index}
              className={`flex-1 h-16 mx-4 flex justify-center items-center border border-gray-400 rounded-lg shadow-md ${
                rankColors[user.rank] || "bg-gray-200" // Default color if rank is not in the mapping
              }`}
            >
              <span className="text-xl font-semibold">
                {user.name}: {user.total}
              </span>
            </div>
          ))}
        </div>
        <div className="text-center text-gray-600 mt-4">
          {displayUsers.map((user, index) => (
            <p key={index}>
              {user.rank}
              {user.rank === 1
                ? "st"
                : user.rank === 2
                ? "nd"
                : user.rank === 3
                ? "rd"
                : "th"}{" "}
              Place: <strong>{user.name}</strong>
              {user.rank === 1
                ? "🥇"
                : user.rank === 2
                ? "🥈"
                : user.rank === 3
                ? "🥉"
                : user.rank === 4
                ? "💩"
                : "🤡"}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Overall;
