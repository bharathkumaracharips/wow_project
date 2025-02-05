import React, { useState, useEffect } from 'react';
import { Calendar, RotateCcw, UserCircle } from 'lucide-react';

interface Course {
  name: string;
  theory: number;
  practical: number;
  project: number;
}

interface CourseBasket {
  [key: string]: {
    [key: string]: Course;
  };
}

const courses: CourseBasket = {
  "Basket I": {
    "Differential Equations and Linear Algebra": {
      name: "Differential Equations and Linear Algebra",
      theory: 2,
      practical: 0,
      project: 1
    },
    "Laplace & Fourier Transforms": {
      name: "Laplace & Fourier Transforms",
      theory: 2,
      practical: 0,
      project: 1
    },
    "Complex Analysis & Numerical Methods": {
      name: "Complex Analysis & Numerical Methods",
      theory: 2,
      practical: 0,
      project: 1
    },
    "Discrete Mathematics": {
      name: "Discrete Mathematics",
      theory: 2,
      practical: 0,
      project: 1
    },
    "Probability & Statistics": {
      name: "Probability & Statistics",
      theory: 2,
      practical: 0,
      project: 1
    }
  },
  "Basket II": {
    "Optimisation Techniques": {
      name: "Optimisation Techniques",
      theory: 0,
      practical: 2,
      project: 0
    },
    "Engineering Economics and Costing": {
      name: "Engineering Economics and Costing",
      theory: 2,
      practical: 0,
      project: 1
    },
    "Project Management": {
      name: "Project Management",
      theory: 2,
      practical: 0,
      project: 1
    },
    "Gender, Human Rights and Ethics": {
      name: "Gender, Human Rights and Ethics",
      theory: 1.5,
      practical: 0,
      project: 1.5
    },
    "Climate Change, Sustainability and Organisation": {
      name: "Climate Change, Sustainability and Organisation",
      theory: 1.5,
      practical: 0,
      project: 1.5
    }
  },
  "Basket III": {
    "Industrial IOT and Automation": {
      name: "Industrial IOT and Automation",
      theory: 3,
      practical: 2,
      project: 1
    },
    "Data Analysis and Visualization using Python": {
      name: "Data Analysis and Visualization using Python",
      theory: 0,
      practical: 1,
      project: 3
    },
    "Machine Learning using Python": {
      name: "Machine Learning using Python",
      theory: 1,
      practical: 2,
      project: 1
    },
    "Robotic automation with ROS and C++": {
      name: "Robotic automation with ROS and C++",
      theory: 1,
      practical: 2,
      project: 1
    },
    "Design Thinking": {
      name: "Design Thinking",
      theory: 0,
      practical: 0,
      project: 2
    },
    "System Integration with DYMOLA": {
      name: "System Integration with DYMOLA",
      theory: 0,
      practical: 0,
      project: 2
    },
    "Smart Engineering Project (G2M)": {
      name: "Smart Engineering Project (G2M)",
      theory: 0,
      practical: 0,
      project: 3
    }
  },
  "Basket IV": {
    "IT Infrastructure Management": {
      name: "IT Infrastructure Management",
      theory: 2,
      practical: 2,
      project: 2
    },
    "Cloud Practitioners": {
      name: "Cloud Practitioners",
      theory: 0,
      practical: 2,
      project: 0
    },
    "Wireless Networks": {
      name: "Wireless Networks",
      theory: 2,
      practical: 1,
      project: 0
    },
    "Information Security": {
      name: "Information Security",
      theory: 2,
      practical: 1,
      project: 0
    },
    "Programming in C": {
      name: "Programming in C",
      theory: 1,
      practical: 2,
      project: 1
    },
    "Data Structures": {
      name: "Data Structures",
      theory: 1,
      practical: 2,
      project: 1
    },
    "Advanced Web Programming": {
      name: "Advanced Web Programming",
      theory: 1,
      practical: 2,
      project: 1
    },
    "Java Technologies": {
      name: "Java Technologies",
      theory: 2,
      practical: 1,
      project: 1
    },
    "Operating System Concepts": {
      name: "Operating System Concepts",
      theory: 1,
      practical: 1,
      project: 1
    },
    "Database Creation and Maintenance": {
      name: "Database Creation and Maintenance",
      theory: 2,
      practical: 1,
      project: 1
    },
    "Database Cluster Administration and Security": {
      name: "Database Cluster Administration and Security",
      theory: 2,
      practical: 1,
      project: 1
    },
    "Data Warehousing and Data Mining": {
      name: "Data Warehousing and Data Mining",
      theory: 2,
      practical: 2,
      project: 0
    },
    "Android App Development": {
      name: "Android App Development",
      theory: 2,
      practical: 2,
      project: 2
    },
    "Mathematical Problem Solving": {
      name: "Mathematical Problem Solving",
      theory: 2,
      practical: 2,
      project: 0
    },
    "Formal Language and Automata Theory": {
      name: "Formal Language and Automata Theory",
      theory: 2,
      practical: 1,
      project: 0
    }
  }
};

interface TimeSlot {
  subject: string;
  faculty: string;
  type: 'theory' | 'practical' | 'project' | '';
}

interface Schedule {
  [section: string]: {
    [day: string]: {
      [slot: string]: TimeSlot;
    };
  };
}

interface HistoryState {
  schedule: Schedule;
  facultyLoad: {[key: string]: number};
}

interface HoursSummary {
  [subject: string]: {
    theory: number;
    practical: number;
    project: number;
    faculty: string;
  };
}

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const SLOTS = ["9:00-10:00", "10:00-11:00", "11:00-12:00", "1:00-2:00", "2:00-3:00","3:00-4:00","4:00-5:00"];
const SECTIONS = ["A", "B", "C", "D"];
const FACULTIES = ["Faculty 1", "Faculty 2", "Faculty 3", "Faculty 4", "Faculty 5", "Faculty 6"];
const YEARS = [1, 2, 3, 4];
const SEMESTERS = [1, 2, 3, 4];

interface YearSchedule {
  [year: number]: {
    [semester: number]: Schedule;
  };
}

function App() {
  const [selectedYear, setSelectedYear] = useState(1);
  const [selectedSemester, setSelectedSemester] = useState(1);
  const [selectedBasket, setSelectedBasket] = useState("Basket I");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState(FACULTIES[0]);
  const [yearSchedule, setYearSchedule] = useState<YearSchedule>({});
  const [facultyLoad, setFacultyLoad] = useState<{[key: string]: number}>({});
  const [history, setHistory] = useState<HistoryState[]>([]);
  const [hoursSummary, setHoursSummary] = useState<HoursSummary>({});
  const [selectedFacultyView, setSelectedFacultyView] = useState<string>('');
  const [showFacultySchedule, setShowFacultySchedule] = useState(false);

  useEffect(() => {
    initializeSchedule();
  }, []);

  const initializeSchedule = () => {
    const newYearSchedule: YearSchedule = {};
    
    YEARS.forEach(year => {
      newYearSchedule[year] = {};
      SEMESTERS.forEach(semester => {
        newYearSchedule[year][semester] = {};
        SECTIONS.forEach(section => {
          if (!newYearSchedule[year][semester][section]) {
            newYearSchedule[year][semester][section] = {};
          }
          DAYS.forEach(day => {
            newYearSchedule[year][semester][section][day] = {};
            SLOTS.forEach(slot => {
              newYearSchedule[year][semester][section][day][slot] = {
                subject: '',
                faculty: '',
                type: ''
              };
            });
          });
        });
      });
    });
    
    setYearSchedule(newYearSchedule);
    setHistory([{ 
      schedule: newYearSchedule[selectedYear][selectedSemester], 
      facultyLoad: {} 
    }]);
  };

  const getCurrentSchedule = () => {
    return yearSchedule[selectedYear]?.[selectedSemester] || {};
  };

  const isFacultyAvailable = (
    faculty: string,
    day: string,
    slot: string,
    schedule: Schedule
  ) => {
    return !SECTIONS.some(section => 
      schedule[section][day][slot].faculty === faculty
    );
  };

  const findAvailableSlot = (
    section: string,
    schedule: Schedule,
    faculty: string,
    type: string
  ) => {
    for (const day of DAYS) {
      for (const slot of SLOTS) {
        if (
          !schedule[section][day][slot].subject &&
          isFacultyAvailable(faculty, day, slot, schedule)
        ) {
          return { day, slot };
        }
      }
    }
    return null;
  };

  const calculateHoursSummary = (schedule: Schedule) => {
    const summary: HoursSummary = {};
    
    SECTIONS.forEach(section => {
      DAYS.forEach(day => {
        SLOTS.forEach(slot => {
          const timeSlot = schedule[section][day][slot];
          if (timeSlot.subject) {
            if (!summary[timeSlot.subject]) {
              summary[timeSlot.subject] = {
                theory: 0,
                practical: 0,
                project: 0,
                faculty: timeSlot.faculty
              };
            }
            
            switch (timeSlot.type) {
              case 'theory':
                summary[timeSlot.subject].theory += 1.5;
                break;
              case 'practical':
                summary[timeSlot.subject].practical += 1.5;
                break;
              case 'project':
                summary[timeSlot.subject].project += 1;
                break;
            }
          }
        });
      });
    });

    setHoursSummary(summary);
  };

  const assignClasses = () => {
    if (!selectedSubject || !selectedFaculty) return;

    const currentSchedule = getCurrentSchedule();
    setHistory(prev => [...prev, { 
      schedule: JSON.parse(JSON.stringify(currentSchedule)),
      facultyLoad: { ...facultyLoad }
    }]);

    const course = courses[selectedBasket][selectedSubject];
    const newSchedule = { ...currentSchedule };
    const newFacultyLoad = { ...facultyLoad };

    if (!newFacultyLoad[selectedFaculty]) {
      newFacultyLoad[selectedFaculty] = 0;
    }

    const MAX_FACULTY_LOAD = 15;

    // Assign theory classes
    for (let i = 0; i < course.theory; i++) {
      for (const section of SECTIONS) {
        if (newFacultyLoad[selectedFaculty] >= MAX_FACULTY_LOAD) continue;

        const availableSlot = findAvailableSlot(section, newSchedule, selectedFaculty, 'theory');
        if (availableSlot) {
          const { day, slot } = availableSlot;
          newSchedule[section][day][slot] = {
            subject: selectedSubject,
            faculty: selectedFaculty,
            type: 'theory'
          };
          newFacultyLoad[selectedFaculty]++;
        }
      }
    }

    // Assign practical classes
    for (let i = 0; i < course.practical; i++) {
      for (const section of SECTIONS) {
        if (newFacultyLoad[selectedFaculty] >= MAX_FACULTY_LOAD) continue;

        const availableSlot = findAvailableSlot(section, newSchedule, selectedFaculty, 'practical');
        if (availableSlot) {
          const { day, slot } = availableSlot;
          newSchedule[section][day][slot] = {
            subject: selectedSubject,
            faculty: selectedFaculty,
            type: 'practical'
          };
          newFacultyLoad[selectedFaculty]++;
        }
      }
    }

    // Assign project classes
    for (let i = 0; i < course.project; i++) {
      for (const section of SECTIONS) {
        if (newFacultyLoad[selectedFaculty] >= MAX_FACULTY_LOAD) continue;

        const availableSlot = findAvailableSlot(section, newSchedule, selectedFaculty, 'project');
        if (availableSlot) {
          const { day, slot } = availableSlot;
          newSchedule[section][day][slot] = {
            subject: selectedSubject,
            faculty: selectedFaculty,
            type: 'project'
          };
          newFacultyLoad[selectedFaculty]++;
        }
      }
    }

    const newYearSchedule = { ...yearSchedule };
    newYearSchedule[selectedYear][selectedSemester] = newSchedule;

    setYearSchedule(newYearSchedule);
    setFacultyLoad(newFacultyLoad);
    calculateHoursSummary(newSchedule);
  };

  const handleUndo = () => {
    if (history.length > 1) {
      const previousState = history[history.length - 2];
      const newYearSchedule = { ...yearSchedule };
      newYearSchedule[selectedYear][selectedSemester] = previousState.schedule;
      
      setYearSchedule(newYearSchedule);
      setFacultyLoad(previousState.facultyLoad);
      setHistory(prev => prev.slice(0, -1));
      calculateHoursSummary(previousState.schedule);
    }
  };

  const getFacultySchedule = (facultyName: string) => {
    const facultySchedule: {
      [day: string]: {
        [slot: string]: {
          subject: string;
          section: string;
          type: string;
        }[];
      };
    } = {};

    DAYS.forEach(day => {
      facultySchedule[day] = {};
      SLOTS.forEach(slot => {
        facultySchedule[day][slot] = [];
        SECTIONS.forEach(section => {
          const timeSlot = getCurrentSchedule()[section]?.[day]?.[slot];
          if (timeSlot && timeSlot.faculty === facultyName) {
            facultySchedule[day][slot].push({
              subject: timeSlot.subject,
              section: section,
              type: timeSlot.type
            });
          }
        });
      });
    });

    return facultySchedule;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <Calendar className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">CSE Course Scheduler</h1>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Year
              </label>
              <select
                className="w-full rounded-md border border-gray-300 p-2"
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
              >
                {YEARS.map(year => (
                  <option key={year} value={year}>Year {year}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Semester
              </label>
              <select
                className="w-full rounded-md border border-gray-300 p-2"
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(Number(e.target.value))}
              >
                {SEMESTERS.map(semester => (
                  <option key={semester} value={semester}>Semester {semester}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Basket
              </label>
              <select
                className="w-full rounded-md border border-gray-300 p-2"
                value={selectedBasket}
                onChange={(e) => setSelectedBasket(e.target.value)}
              >
                {Object.keys(courses).map(basket => (
                  <option key={basket} value={basket}>{basket}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Subject
              </label>
              <select
                className="w-full rounded-md border border-gray-300 p-2"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                <option value="">Select a subject</option>
                {Object.keys(courses[selectedBasket]).map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Faculty
              </label>
              <select
                className="w-full rounded-md border border-gray-300 p-2"
                value={selectedFaculty}
                onChange={(e) => setSelectedFaculty(e.target.value)}
              >
                {FACULTIES.map(faculty => (
                  <option key={faculty} value={faculty}>{faculty}</option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={assignClasses}
                className="w-full bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700 transition-colors"
              >
                Assign Classes
              </button>
            </div>

            <div className="flex items-end">
              <button
                onClick={handleUndo}
                disabled={history.length <= 1}
                className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 rounded-md py-2 px-4 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RotateCcw className="w-4 h-4" />
                Undo
              </button>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              View Faculty Schedule
            </label>
            <select
              className="w-full rounded-md border border-gray-300 p-2"
              value={selectedFacultyView}
              onChange={(e) => {
                setSelectedFacultyView(e.target.value);
                setShowFacultySchedule(!!e.target.value);
              }}
            >
              <option value="">Select Faculty</option>
              {FACULTIES.map(faculty => (
                <option key={faculty} value={faculty}>{faculty}</option>
              ))}
            </select>
          </div>
        </div>

        {showFacultySchedule && selectedFacultyView && (
          <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
            <div className="p-4 bg-gray-50 border-b flex items-center gap-2">
              <UserCircle className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">
                Schedule for {selectedFacultyView}
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Day
                    </th>
                    {SLOTS.map(slot => (
                      <th key={slot} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {slot}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {DAYS.map(day => {
                    const facultySchedule = getFacultySchedule(selectedFacultyView);
                    return (
                      <tr key={day}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {day}
                        </td>
                        {SLOTS.map(slot => {
                          const classes = facultySchedule[day][slot];
                          return (
                            <td key={slot} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {classes.length > 0 ? (
                                <div className="space-y-1">
                                  {classes.map((cls, idx) => (
                                    <div key={idx} className="bg-blue-50 p-2 rounded">
                                      <div className="font-medium text-blue-900">{cls.subject}</div>
                                      <div className="text-xs text-blue-700">
                                        Section {cls.section} - {cls.type}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <span className="text-gray-400">Free</span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {Object.keys(hoursSummary).length > 0 && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Hours Summary - Year {selectedYear}, Semester {selectedSemester} (Per Week)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(hoursSummary).map(([subject, hours]) => (
                <div key={subject} className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">{subject}</h3>
                  <div className="text-sm text-gray-600">
                    <p>Faculty: {hours.faculty}</p>
                    <p>Theory: {hours.theory} hrs/week</p>
                    <p>Practical: {hours.practical} hrs/week</p>
                    <p>Project: {hours.project} hrs/week</p>
                    <p className="mt-1 font-medium">
                      Total: {hours.theory + hours.practical + hours.project} hrs/week
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-8">
          {SECTIONS.map(section => (
            <div key={section} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 bg-gray-50 border-b">
                <h2 className="text-xl font-semibold text-gray-900">
                  Year {selectedYear}, Semester {selectedSemester} - Section {section}
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Day
                      </th>
                      {SLOTS.map(slot => (
                        <th key={slot} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {slot}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {DAYS.map(day => (
                      <tr key={day}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {day}
                        </td>
                        {SLOTS.map(slot => {
                          const timeSlot = yearSchedule[selectedYear]?.[selectedSemester]?.[section]?.[day]?.[slot] || 
                                         { subject: '', faculty: '', type: '' };
                          return (
                            <td key={slot} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {timeSlot.subject ? (
                                <div>
                                  <div className="font-medium">{timeSlot.subject}</div>
                                  <div className="text-xs text-gray-400">
                                    {timeSlot.faculty} - {timeSlot.type}
                                  </div>
                                </div>
                              ) : (
                                'Free'
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;