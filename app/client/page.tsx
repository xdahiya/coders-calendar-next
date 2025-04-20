"use client";

import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import data from "./data.json"
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/constants";
import { EventsDataTable } from "../events-table";

export default function DashboardPage() {

  const [events, setEvents] = useState<any>([]);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/events`, { withCredentials: true })
      .then(function (response) {
        const events = response.data;
        setEvents(events);
        console.log(events);
      })
      .catch(function (error) {
        console.log("error:", error);
        setEvents(false);
      });
  }, []);

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {/* <SectionCards /> */}
              {/* <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div> */}
              {/* <DataTable data={data} /> */}
              <EventsDataTable data={events}/>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
