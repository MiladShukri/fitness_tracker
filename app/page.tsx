"use client";
import Tabs from "./tabs";
import React, { useState } from "react";
import Contender from "./contender";
import Overall from "./overall";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jjxmyijqqhzyfqdtbype.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
createClient(supabaseUrl, supabaseKey);

export default function Home() {
  const [tabs, setTabs] = useState([
    { name: "Overall", current: true },
    { name: "Milad", current: false },
    { name: "Emily", current: false },
    { name: "Leah", current: false },
  ]);

  return (
    <div className="h-screen">
      <div className="flex w-full justify-center text-4xl mb-2">
        ITD Health Challenge!
      </div>
      <Tabs tabs={tabs} setTabs={setTabs} />
      {tabs[0].current ? <Overall /> : null}
      {tabs[1].current ? <Contender /> : null}
      {tabs[2].current ? <Contender /> : null}
      {tabs[3].current ? <Contender /> : null}
    </div>
  );
}
