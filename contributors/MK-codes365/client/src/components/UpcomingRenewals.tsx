import React from "react";

interface Subscription {
  _id: string;
  name: string;
  amount?: number;
  price?: number;
  renewalDate: string;
  billingCycle?: string;
}

interface UpcomingRenewalsProps {
  subscriptions: Subscription[];
}

export default function UpcomingRenewals({
  subscriptions,
}: UpcomingRenewalsProps) {
  const renewals = subscriptions
    .map((sub) => {
      const renewalDate = new Date(sub.renewalDate);
      const today = new Date();

      today.setHours(0, 0, 0, 0);
      renewalDate.setHours(0, 0, 0, 0);

      const diffTime = renewalDate.getTime() - today.getTime();
      const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      return { ...sub, daysRemaining, parsedDate: renewalDate };
    })
    .filter((sub) => sub.daysRemaining >= 0 && sub.daysRemaining <= 30)
    .sort((a, b) => a.daysRemaining - b.daysRemaining);

  if (renewals.length === 0) {
    return null; // Don't show section if empty
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Upcoming Renewals
        </h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Next 30 Days
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {renewals.map((sub) => {
          const price = sub.price ?? sub.amount ?? 0;
          const isUrgent = sub.daysRemaining <= 7;

          return (
            <div
              key={sub._id}
              className={`p-4 rounded-xl border flex justify-between items-center transition-all hover:shadow-md ${
                isUrgent
                  ? "bg-red-50 border-red-100 dark:bg-red-900/10 dark:border-red-900/30"
                  : "bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700"
              }`}
            >
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {sub.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {sub.parsedDate.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>

              <div className="text-right">
                <p className="font-bold text-gray-900 dark:text-white">
                  ${price.toFixed(2)}
                </p>
                <div
                  className={`text-xs font-medium mt-1 px-2 py-0.5 rounded-full inline-block ${
                    isUrgent
                      ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                      : "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                  }`}
                >
                  {sub.daysRemaining === 0
                    ? "Today"
                    : sub.daysRemaining === 1
                    ? "Tomorrow"
                    : `In ${sub.daysRemaining} days`}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
