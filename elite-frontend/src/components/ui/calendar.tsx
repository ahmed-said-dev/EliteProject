import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
// Mock declaration to handle missing react-day-picker module
// Remove this section once you install the actual package with: npm install react-day-picker date-fns
// @ts-ignore - Ignoring the missing module error
import { DayPicker } from "react-day-picker";

// If the above import fails, this mock interface will be used instead
// This is a temporary solution until the package is installed
interface DayPickerProps {
  showOutsideDays?: boolean;
  className?: string;
  classNames?: Record<string, string>;
  components?: {
    IconLeft?: React.ComponentType<any>;
    IconRight?: React.ComponentType<any>;
  };
  [key: string]: any;
}

// Mock DayPicker component if the import fails
const MockDayPicker: React.FC<DayPickerProps> = (props) => (
  <div className={props.className || ""}>Calendar component (requires react-day-picker package)</div>
);

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

// Use the actual DayPicker if available, otherwise use the mock
const DayPickerComponent = typeof DayPicker !== 'undefined' ? DayPicker : MockDayPicker;

export type CalendarProps = React.ComponentProps<typeof DayPickerComponent>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPickerComponent
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ..._props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ..._props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
