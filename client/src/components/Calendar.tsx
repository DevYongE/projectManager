import { useState } from 'react';
import type { Project } from '../types';

interface CalendarProps {
  projects: Project[];
}

function getMonthMatrix(year: number, month: number): Date[][] {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const matrix: Date[][] = [];
  let current = new Date(first);
  current.setDate(current.getDate() - current.getDay());

  while (current <= last || current.getDay() !== 0) {
    const week: Date[] = [];
    for (let i = 0; i < 7; i++) {
      week.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    matrix.push(week);
  }

  return matrix;
}

function Calendar({ projects }: CalendarProps): JSX.Element {
  const [date, setDate] = useState(() => {
    const d = new Date();
    d.setDate(1);
    return d;
  });

  const year = date.getFullYear();
  const month = date.getMonth();
  const weeks = getMonthMatrix(year, month);

  const prevMonth = (): void => {
    setDate(new Date(year, month - 1, 1));
  };

  const nextMonth = (): void => {
    setDate(new Date(year, month + 1, 1));
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <button type="button" onClick={prevMonth}>
          &lt;
        </button>
        <div>
          {year}년 {month + 1}월
        </div>
        <button type="button" onClick={nextMonth}>
          &gt;
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {['일', '월', '화', '수', '목', '금', '토'].map((d) => (
          <div key={d} className="text-center text-sm font-medium">
            {d}
          </div>
        ))}
        {weeks.map((week, wIdx) => (
          <div key={wIdx} className="contents">
            {week.map((day) => {
              const dayProjects = projects.filter(
                (p) =>
                  new Date(p.startDate) <= day && day <= new Date(p.endDate),
              );
              const isCurrent = day.getMonth() === month;
              return (
                <div
                  key={day.toISOString()}
                  className={`min-h-[4rem] rounded border p-1 text-xs ${
                    isCurrent ? 'bg-white' : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  <div className="text-right text-[10px]">{day.getDate()}</div>
                  {dayProjects.map((p) => (
                    <div key={p.id} className="truncate">
                      {p.name}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendar;
