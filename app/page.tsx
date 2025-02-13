"use client";
import Tabs from "./tabs";
import React, { useState, useEffect } from "react";
import Contender from "./contender";
import Overall from "./overall";
import Bonus from "./bonus";
import { createClient } from "@supabase/supabase-js";
import SignIn from "./signin";
import { ToastContainer, toast } from "react-toastify";

const supabaseUrl = "https://jjxmyijqqhzyfqdtbype.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqeG15aWpxcWh6eWZxZHRieXBlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkwOTg4OTAsImV4cCI6MjA1NDY3NDg5MH0.rMt7Xk9GNsEiKYsdL3Qva5XY9XOsnKjvbehZo3WdNSg";
const supabase = createClient(supabaseUrl, supabaseKey);

const formatDate = (date) => {
  const year = date.getFullYear(); // Get the full year (YYYY)
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Get the month (0-indexed, so add 1) and pad with leading zero
  const day = String(date.getDate()).padStart(2, "0"); // Get the day and pad with leading zero

  // Return the formatted date string
  return `${year}-${month}-${day}T00:00:00`;
};

const fetchUsers = async () => {
  const { data } = await supabase.from("users").select("*");
  return data;
};

const fetchLogs = async () => {
  const { data } = await supabase.from("daily_logs").select("*");
  return data;
};

const fetchBonusPoints = async () => {
  const { data } = await supabase
    .from("bonus_points")
    .select("*")
    .order("id", { ascending: true });
  return data;
};

const userTotalUpdate = (logs, bonusPoints, setAllUsersTotals) => {
  let miladTotal = 0;
  let emilyTotal = 0;
  let leahTotal = 0;
  let zeeshanTotal = 0;
  logs.forEach((element) => {
    if (element.user_id === 1) {
      miladTotal = miladTotal + element.total;
    } else if (element.user_id === 2) {
      emilyTotal = emilyTotal + element.total;
    } else if (element.user_id === 3) {
      leahTotal = leahTotal + element.total;
    } else if (element.user_id === 5) {
      zeeshanTotal = zeeshanTotal + element.total;
    }
  });
  let miladBonusTotal = 0;
  let emilyBonusTotal = 0;
  let leahBonusTotal = 0;
  let zeeshanBonusTotal = 0;
  bonusPoints.forEach((bp) => {
    if (bp.perfect_week) {
      bp.perfect_week.forEach((pw) => {
        if (pw.value === 1) {
          miladBonusTotal = miladBonusTotal + 30;
        } else if (pw.value === 2) {
          emilyBonusTotal = emilyBonusTotal + 30;
        } else if (pw.value === 3) {
          leahBonusTotal = leahBonusTotal + 30;
        } else if (pw.value === 5) {
          zeeshanBonusTotal = zeeshanBonusTotal + 30;
        }
      });
    }
    if (bp.most_steps) {
      bp.most_steps.forEach((ms) => {
        if (ms.value === 1) {
          miladBonusTotal = miladBonusTotal + 25;
        } else if (ms.value === 2) {
          emilyBonusTotal = emilyBonusTotal + 25;
        } else if (ms.value === 3) {
          leahBonusTotal = leahBonusTotal + 25;
        } else if (ms.value === 5) {
          zeeshanBonusTotal = zeeshanBonusTotal + 30;
        }
      });
    }
    if (bp.longest_plank) {
      bp.longest_plank.forEach((lp) => {
        if (lp.value === 1) {
          miladBonusTotal = miladBonusTotal + 20;
        } else if (lp.value === 2) {
          emilyBonusTotal = emilyBonusTotal + 20;
        } else if (lp.value === 3) {
          leahBonusTotal = leahBonusTotal + 20;
        } else if (lp.value === 5) {
          zeeshanBonusTotal = zeeshanBonusTotal + 30;
        }
      });
    }
  });
  setAllUsersTotals(
    [
      { name: "Milad", total: miladTotal + miladBonusTotal },
      { name: "Emily", total: emilyTotal + emilyBonusTotal },
      { name: "Leah", total: leahTotal + leahBonusTotal },
      { name: "Zeeshan", total: zeeshanTotal + zeeshanBonusTotal },
    ].sort((a, b) => b.total - a.total)
  );
};
//TODO
// Add backdating points system
// Points history to see where scoring is occuring
// Timeline UX, eg when it starts/finishes/how many days left
// Clean up code
// Add type safety
// Use sometime of reducer instead of so many useState hooks

export default function Home() {
  const [users, setUsers] = useState(null);
  const [logs, setLogs] = useState(null);
  const [userOptions, setUserOptions] = useState(null);
  const [bonusPointsOriginal, setBonusPointsOriginal] = useState(null);
  const [bonusPoints, setBonusPoints] = useState(null);
  const [currentLog, setCurrentLog] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [allUsersTotals, setAllUsersTotals] = useState([
    { name: "Milad", total: 0 },
    { name: "Emily", total: 0 },
    { name: "Leah", total: 0 },
    { name: "Zeeshan", total: 0 },
  ]);
  const [userDailyTotal, setUserDailyTotal] = useState(0);
  const [tabs, setTabs] = useState([
    { name: "Overall", current: true },
    { name: "My Progress", current: false },
    { name: "Bonus Points", current: false },
  ]);
  const [selectedPositiveOption, setSelectedPositiveOption] = useState(null);
  const [selectedNegativeOption, setSelectedNegativeOption] = useState(null);
  const [positiveOptions] = useState([
    { label: "Workout Completed", value: "Workout Completed - (10 points)" },
    { label: "Extra Workout", value: "Extra Workout - (10 points)" },
    {
      label: "Steps Goal Met (10,000 steps)",
      value: "Steps Goal Met (10,000 steps) - (10 points)",
    },
    {
      label: "Beating a Personal Best",
      value: "Beating a Personal Best - (15 points)",
    },
    { label: "Skipping Junk Food", value: "Skipping Junk Food - (5 points)" },
    {
      label: "Hydration Goal Met (2L Water)",
      value: "Hydration Goal Met (2L Water) - (5 points)",
    },
  ]);
  const [negativeOptions] = useState([
    { label: "Missed Workout", value: "Missed Workout - (-5 points)" },
    { label: "Too Much Junk Food", value: "Too Much Junk Food - (-5 points)" },
    {
      label: "Skipping Hydration Goal",
      value: "Skipping Hydration Goal - (-5 points)",
    },
  ]);

  const handleSaveBonusPoints = async () => {
    try {
      bonusPoints.forEach(async (element) => {
        await supabase.from("bonus_points").upsert({
          ...element,
        });
      });
    } catch {
      toast.error(`uh oh, Notify Milad ASAP!`);
    }
    setBonusPointsOriginal(bonusPoints);
    setBonusPoints(bonusPoints);
    userTotalUpdate(logs, bonusPoints, setAllUsersTotals);
  };

  const handleSubmit = async (currentBody, newBody) => {
    const data = await supabase.from("daily_logs").upsert({
      ...currentBody,
      total: newBody.total,
      positives: newBody.positives,
      negatives: newBody.negatives,
    });
    if (data.status === 200) {
      toast.success(`Data added, Good Job ${loggedInUser}!`);
    } else {
      toast.error(`uh oh, Notify Milad ASAP!`);
    }
    setCurrentLog({
      ...currentBody,
      total: newBody.total,
      positives: newBody.positives,
      negatives: newBody.negatives,
    });
    setSelectedPositiveOption(newBody?.positives);
    setSelectedNegativeOption(newBody?.negatives);
    setUserDailyTotal(newBody?.total);
    const f_logs = await fetchLogs();
    setLogs(f_logs);
    userTotalUpdate(f_logs, bonusPoints, setAllUsersTotals);
  };

  const initialFetch = async () => {
    const f_users = await fetchUsers();
    const f_logs = await fetchLogs();
    const f_bonusPoints = await fetchBonusPoints();
    setBonusPointsOriginal(f_bonusPoints);
    setBonusPoints(f_bonusPoints);
    const options = [];
    f_users.forEach((user) => {
      if (user.id !== 4) {
        options.push({
          value: user.id,
          label: user.name,
        });
      }
    });
    setUserOptions(options);
    setUsers(f_users);
    setLogs(f_logs);
  };

  const handleLogOut = () => {
    setLoggedIn(false);
    setLoggedInUser(null);
    setSelectedPositiveOption(null);
    setSelectedNegativeOption(null);
    setCurrentLog(null);
    setUserDailyTotal(0);
    setTabs([
      { name: "Overall", current: true },
      { name: "My Progress", current: false },
      { name: "Bonus Points", current: false },
    ]);
  };

  useEffect(() => {
    initialFetch();
    let current = null;
    if (loggedIn) {
      logs.forEach((element) => {
        if (
          element.log_date ===
          (loggedInUser === "test"
            ? formatDate(new Date("2025-02-01"))
            : formatDate(new Date()))
        ) {
          if (loggedInUser === "milad" && element.user_id === 1) {
            current = element;
            setCurrentLog(element);
          } else if (loggedInUser === "emily" && element.user_id === 2) {
            current = element;
            setCurrentLog(element);
          } else if (loggedInUser === "leah" && element.user_id === 3) {
            current = element;
            setCurrentLog(element);
          } else if (loggedInUser === "test" && element.user_id === 4) {
            current = element;
            setCurrentLog(element);
          } else if (loggedInUser === "zeeshan" && element.user_id === 5) {
            current = element;
            setCurrentLog(element);
          }
        }
      });

      userTotalUpdate(logs, bonusPoints, setAllUsersTotals);
      if (current) {
        setUserDailyTotal(current.total);
        if (current?.positives) {
          setSelectedPositiveOption(current?.positives);
        }
        if (current?.negatives) {
          setSelectedNegativeOption(current?.negatives);
        }
      }
    }
  }, [loggedIn]);

  useEffect(() => {
    let totalPositivePoints = 0;
    let totalNegativePoints = 0;
    if (selectedPositiveOption) {
      totalPositivePoints = selectedPositiveOption.reduce((total, item) => {
        // Use a regular expression to extract the numeric points value, including negative values
        const match = item.value.match(/\((-?\d+) points\)/);
        if (match) {
          // Convert the matched points value to a number and add it to the total
          return total + parseInt(match[1], 10);
        }
        return total; // Return the total if no match is found
      }, 0);
    }
    if (selectedNegativeOption) {
      totalNegativePoints = selectedNegativeOption.reduce((total, item) => {
        // Use a regular expression to extract the numeric points value, including negative values
        const match = item.value.match(/\((-?\d+) points\)/);
        if (match) {
          // Convert the matched points value to a number and add it to the total
          return total + parseInt(match[1], 10);
        }
        return total; // Return the total if no match is found
      }, 0);
    }
    const actualTotal = totalPositivePoints + totalNegativePoints;
    setUserDailyTotal(actualTotal);
  }, [selectedPositiveOption, selectedNegativeOption]);

  return (
    <div className="flex h-screen">
      <>
        {loggedIn ? (
          <div className="w-full">
            <div className="flex w-full flex-row my-4">
              <div className="flex w-1/5"></div>
              <div className="flex w-1/5"></div>
              <div className="flex w-1/5 text-4xl">ITD Health Challenge!</div>
              <div className="flex flex-row justify-end mr-4 w-2/5">
                <div className="self-center mr-4 text-xl">
                  Welcome, {loggedInUser}!
                </div>
                <button
                  onClick={() => {
                    handleLogOut();
                  }}
                  className="w-32 py-2 self-center text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
                >
                  Log Out
                </button>
              </div>
            </div>

            <Tabs tabs={tabs} setTabs={setTabs} />
            {tabs[0].current ? (
              <Overall allUsersTotals={allUsersTotals} />
            ) : null}
            {tabs[1].current ? (
              <Contender
                userDailyTotal={userDailyTotal}
                selectedPositiveOption={selectedPositiveOption}
                setSelectedPositiveOption={setSelectedPositiveOption}
                positiveOptions={positiveOptions}
                selectedNegativeOption={selectedNegativeOption}
                setSelectedNegativeOption={setSelectedNegativeOption}
                negativeOptions={negativeOptions}
                handleSubmit={handleSubmit}
                currentLog={currentLog}
              />
            ) : null}
            {tabs[2].current ? (
              <Bonus
                setBonusPoints={setBonusPoints}
                bonusPoints={bonusPoints}
                bonusPointsOriginal={bonusPointsOriginal}
                userOptions={userOptions}
                handleSaveBonusPoints={handleSaveBonusPoints}
              />
            ) : null}
          </div>
        ) : (
          <SignIn
            users={users}
            setLoggedIn={setLoggedIn}
            setLoggedInUser={setLoggedInUser}
          />
        )}
        <ToastContainer />
      </>
    </div>
  );
}
