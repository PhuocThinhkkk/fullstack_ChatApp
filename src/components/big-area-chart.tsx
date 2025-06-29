"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { resBigChart } from "@/type"
import { toast } from "sonner"

export const description = "A bar chart showing message counts"


const chartConfig = {
  count: {
    label: "Messages",
    color: "#9f1239",
  },
} satisfies ChartConfig

export function BigAssChart() {
  const [chartData, setChartData] = React.useState<resBigChart[]>([])
  const [total, setToal] = React.useState< number | null >(null)

  React.useEffect(() => {
    
    const initialFetching = async () =>{
      try { 
        const res = await fetch("/api/session")
        const data = await res.json();

        if(!res.ok) {
          throw new Error(`status: ${res.status}, ${data.message}`)
        }
        
        if (!data) {
          throw new Error(`No session. Please sign in to continue`)
        }
        const res2 = await fetch(`/api/users/${data}/dashboard/big-chart`, {
          cache: 'no-store'
        })
        const data2 = await res2.json()
        console.log(res2)
        if (res2.status == 504) {
          throw new Error("Please refrest again to see all the chart")
        }
        if (!res2.ok) {
          throw new Error(`status: ${res2.status}, ${data2.message}`)
        }
        
        setChartData(data2) 
        console.log("hello ",data2)
        let totals = 0;
        for (let index = 0; index < data2.length; index++) {
          totals += data2[index].count

        }
        setToal(totals);

      } catch (error) {
        toast.error(`${error}`)
      }
    }
    initialFetching();

  }, [])


  return (
    <Card>
      <CardHeader>
        <CardTitle>Message Activity</CardTitle>
        <CardDescription>
          Total messages sent: {total ? total.toString() : null }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <BarChart
            data={chartData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  nameKey="count"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                />
              }
            />
            <Bar 
              dataKey="count" 
              fill="#9f1239" 
              radius={[4, 4, 0, 0]} 
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}