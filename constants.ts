
import { ProgramTemplate, UserSettings, ExerciseType } from './types';

export const EXERCISE_TRANSLATIONS: Record<string, { zh: string; en: string }> = {
  [ExerciseType.Squat]: { zh: "深蹲", en: "Squat" },
  [ExerciseType.Bench]: { zh: "卧推", en: "Bench Press" },
  [ExerciseType.Deadlift]: { zh: "硬拉", en: "Deadlift" },
  [ExerciseType.SumoDeadlift]: { zh: "相扑硬拉", en: "Sumo Deadlift" },
  [ExerciseType.PullUp]: { zh: "引体向上", en: "Pull-up" },
  [ExerciseType.ChinUp]: { zh: "反手引体向上", en: "Chin-up" },
  [ExerciseType.PauseSquat]: { zh: "暂停深蹲", en: "Pause Squat" },
  [ExerciseType.BoxSquat]: { zh: "箱式深蹲", en: "Box Squat" },
  [ExerciseType.FrontSquat]: { zh: "前蹲", en: "Front Squat" },
  [ExerciseType.HackSquat]: { zh: "哈克深蹲", en: "Hack Squat" },
  [ExerciseType.LegPress]: { zh: "45°推蹬", en: "Leg Press" },
  [ExerciseType.SplitSquat]: { zh: "分腿蹲", en: "Split Squat" },
  [ExerciseType.BulgarianSplitSquat]: { zh: "保加利亚分腿蹲", en: "Bulgarian Split Squat" },
  [ExerciseType.WalkingLunge]: { zh: "行走箭步蹲", en: "Walking Lunge" },
  [ExerciseType.StepUp]: { zh: "台阶", en: "Step-up" },
  [ExerciseType.OverheadPress]: { zh: "推举", en: "Overhead Press" },
  [ExerciseType.PushPress]: { zh: "推举冲", en: "Push Press" },
  [ExerciseType.ArnoldPress]: { zh: "阿诺德推举", en: "Arnold Press" },
  [ExerciseType.InclineBench]: { zh: "上斜卧推", en: "Incline Bench" },
  [ExerciseType.DumbbellBench]: { zh: "哑铃卧推", en: "Dumbbell Bench" },
  [ExerciseType.DumbbellInclineBench]: { zh: "哑铃上斜卧推", en: "Dumbbell Incline Bench" },
  [ExerciseType.MachinePress]: { zh: "器械推胸", en: "Machine Press" },
  [ExerciseType.CloseGripBench]: { zh: "窄距卧推", en: "Close-Grip Bench" },
  [ExerciseType.RomanianDeadlift]: { zh: "罗马尼亚硬拉", en: "Romanian Deadlift" },
  [ExerciseType.StiffLegDeadlift]: { zh: "直腿硬拉", en: "Stiff-Leg Deadlift" },
  [ExerciseType.HipThrust]: { zh: "臀桥", en: "Hip Thrust" },
  [ExerciseType.LatPulldown]: { zh: "高位下拉", en: "Lat Pulldown" },
  [ExerciseType.BarbellRow]: { zh: "杠铃划船", en: "Barbell Row" },
  [ExerciseType.PendlayRow]: { zh: "彭德利划船", en: "Pendlay Row" },
  [ExerciseType.TBarRow]: { zh: "T杠划船", en: "T-Bar Row" },
  [ExerciseType.SeatedCableRow]: { zh: "坐姿划船", en: "Seated Cable Row" },
  [ExerciseType.MachineRow]: { zh: "器械划船", en: "Machine Row" },
  [ExerciseType.DumbbellRow]: { zh: "哑铃划船", en: "Dumbbell Row" },
  [ExerciseType.LegExtension]: { zh: "腿屈伸", en: "Leg Extension" },
  [ExerciseType.LegCurl]: { zh: "腿弯举", en: "Leg Curl" },
  [ExerciseType.RearDeltRaise]: { zh: "俯身侧平举", en: "Rear Delt Raise" },
  [ExerciseType.LateralRaise]: { zh: "侧平举", en: "Lateral Raise" },
  [ExerciseType.UprightRow]: { zh: "直立划船", en: "Upright Row" },
  [ExerciseType.BarbellCurl]: { zh: "杠铃弯举", en: "Barbell Curl" },
  [ExerciseType.DumbbellCurl]: { zh: "哑铃弯举", en: "Dumbbell Curl" },
  [ExerciseType.HammerCurl]: { zh: "锤式弯举", en: "Hammer Curl" },
  [ExerciseType.PreacherCurl]: { zh: "牧师椅弯举", en: "Preacher Curl" },
  [ExerciseType.InclineCurl]: { zh: "上斜弯举", en: "Incline Curl" },
  [ExerciseType.FacePull]: { zh: "面拉", en: "Face Pull" },
  [ExerciseType.Shrug]: { zh: "耸肩", en: "Shrug" },
  [ExerciseType.Dip]: { zh: "双杠臂屈伸", en: "Dip" },
  [ExerciseType.PushUp]: { zh: "俯卧撑", en: "Push-up" },
  [ExerciseType.CalfRaise]: { zh: "站姿提踵", en: "Calf Raise" },
  [ExerciseType.SeatedCalfRaise]: { zh: "坐姿提踵", en: "Seated Calf Raise" },
  [ExerciseType.SkullCrusher]: { zh: "仰卧臂屈伸", en: "Skull Crusher" },
  [ExerciseType.TricepsPushdown]: { zh: "绳索下压", en: "Triceps Pushdown" },
  [ExerciseType.OverheadTricepsExtension]: { zh: "头顶臂屈伸", en: "Overhead Triceps Extension" },
};

export const DEFAULT_SETTINGS: UserSettings = {
  bodyWeight: 75,
  smallestPlate: 1.25,
  oneRMs: {
    [ExerciseType.Squat]: 140,
    [ExerciseType.Bench]: 100,
    [ExerciseType.Deadlift]: 180,
    [ExerciseType.PullUp]: 20,
  },
  selectedTemplateId: "default-1",
};

export const DEFAULT_TEMPLATES: ProgramTemplate[] = [
    {
      "id": "default-1",
      "name": "通用模板（力训）",
      "author": "system",
      "description": "蹲推拉常规计划",
      "weeks": [
        {
          "name": "每周相同",
          "days": [
            {
              "name": "周一",
              "exercises": [
                {
                  "name": "Squat",
                  "percent": 93,
                  "sets": 1,
                  "reps": 4
                },
                {
                  "name": "Squat",
                  "percent": 89,
                  "sets": 4,
                  "reps": 6
                },
                {
                  "name": "Bench",
                  "percent": 87,
                  "sets": 4,
                  "reps": 4
                },
                {
                  "name": "PullUp",
                  "percent": 78,
                  "sets": 4,
                  "reps": 8
                }
              ]
            },
            {
              "name": "周三",
              "exercises": [
                {
                  "name": "Bench",
                  "percent": 88,
                  "sets": 4,
                  "reps": 4
                },
                {
                  "name": "Squat",
                  "percent": 89,
                  "sets": 4,
                  "reps": 6
                },
                {
                  "name": "OverheadPress",
                  "percent": 78,
                  "sets": 4,
                  "reps": 8
                },
                {
                  "name": "Deadlift",
                  "percent": 92,
                  "sets": 1,
                  "reps": 1
                }
              ]
            },
            {
              "name": "周五",
              "exercises": [
                {
                  "name": "Squat",
                  "percent": 96,
                  "sets": 1,
                  "reps": 4
                },
                {
                  "name": "Squat",
                  "percent": 90,
                  "sets": 4,
                  "reps": 6
                },
                {
                  "name": "Bench",
                  "percent": 88,
                  "sets": 4,
                  "reps": 4
                },
                {
                  "name": "PullUp",
                  "percent": 79,
                  "sets": 4,
                  "reps": 8
                }
              ]
            }
          ]
        }
      ]
    },
    {
        "id": "default-2",
        "name": "单手引体冲刺四周",
        "author": "system",
        "description": "从需要10kg（15%体重）辅助才能完成单手引体到最终达成一个的冲刺计划",
        "weeks": [
            {
                "name": "提高容量",
                "days": [
                    {
                        "name": "周一",
                        "exercises": [
                            {
                                "name": "Squat",
                                "percent": 86,
                                "sets": 4,
                                "reps": 4
                            },
                            {
                                "name": "Bench",
                                "percent": 86,
                                "sets": 4,
                                "reps": 4
                            },
                            {
                                "name": "PullUp",
                                "percent": 80,
                                "sets": 5,
                                "reps": 5
                            }
                        ]
                    },
                    {
                        "name": "周二",
                        "exercises": [
                            {
                                "name": "PullUp",
                                "percent": 80,
                                "sets": 5,
                                "reps": 5
                            }
                        ]
                    },
                    {
                        "name": "周三",
                        "exercises": [
                            {
                                "name": "Bench",
                                "percent": 80,
                                "sets": 5,
                                "reps": 5
                            },
                            {
                                "name": "Squat",
                                "percent": 80,
                                "sets": 5,
                                "reps": 5
                            },
                            {
                                "name": "PullUp",
                                "percent": 80,
                                "sets": 5,
                                "reps": 5
                            }
                        ]
                    },
                    {
                        "name": "周四",
                        "exercises": [
                            {
                                "name": "PullUp",
                                "percent": 80,
                                "sets": 5,
                                "reps": 5
                            }
                        ]
                    },
                    {
                        "name": "周五",
                        "exercises": [
                            {
                                "name": "PullUp",
                                "percent": 80,
                                "sets": 5,
                                "reps": 5
                            },
                            {
                                "name": "Squat",
                                "percent": 80,
                                "sets": 5,
                                "reps": 5
                            },
                            {
                                "name": "Bench",
                                "percent": 80,
                                "sets": 5,
                                "reps": 5
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
    "id": "default-3",
    "name": "增肌常见计划",
    "author": "system",
    "description": "",
    "weeks": [
      {
        "name": "Week 1",
        "days": [
          {
            "name": "Day 1",
            "exercises": [
              {
                "name": "PullUp",
                "percent": 72,
                "sets": 4,
                "reps": 8
              },
              {
                "name": "PendlayRow",
                "percent": 70,
                "sets": 3,
                "reps": 10
              },
              {
                "name": "SeatedCableRow",
                "percent": 68,
                "sets": 3,
                "reps": 12
              },
              {
                "name": "FacePull",
                "percent": 60,
                "sets": 3,
                "reps": 15
              },
              {
                "name": "HammerCurl",
                "percent": 65,
                "sets": 3,
                "reps": 12
              }
            ]
          },
          {
            "name": "Day 2",
            "exercises": [
              {
                "name": "Bench",
                "percent": 72,
                "sets": 4,
                "reps": 8
              },
              {
                "name": "InclineBench",
                "percent": 70,
                "sets": 3,
                "reps": 10
              },
              {
                "name": "OverheadPress",
                "percent": 70,
                "sets": 3,
                "reps": 10
              },
              {
                "name": "LateralRaise",
                "percent": 60,
                "sets": 3,
                "reps": 15
              },
              {
                "name": "TricepsPushdown",
                "percent": 65,
                "sets": 3,
                "reps": 12
              },
              {
                "name": "SkullCrusher",
                "percent": 65,
                "sets": 3,
                "reps": 10
              }
            ]
          },
          {
            "name": "Day 3",
            "exercises": [
              {
                "name": "OverheadPress",
                "percent": 72,
                "sets": 4,
                "reps": 8
              },
              {
                "name": "ArnoldPress",
                "percent": 68,
                "sets": 3,
                "reps": 10
              },
              {
                "name": "LateralRaise",
                "percent": 62,
                "sets": 4,
                "reps": 15
              },
              {
                "name": "RearDeltRaise",
                "percent": 62,
                "sets": 3,
                "reps": 15
              },
              {
                "name": "FacePull",
                "percent": 62,
                "sets": 3,
                "reps": 15
              }
            ]
          },
          {
            "name": "Day 4",
            "exercises": [
              {
                "name": "Squat",
                "percent": 75,
                "sets": 4,
                "reps": 8
              },
              {
                "name": "LegPress",
                "percent": 70,
                "sets": 3,
                "reps": 12
              },
              {
                "name": "BulgarianSplitSquat",
                "percent": 65,
                "sets": 3,
                "reps": 10
              },
              {
                "name": "LegExtension",
                "percent": 60,
                "sets": 3,
                "reps": 15
              },
              {
                "name": "CalfRaise",
                "percent": 65,
                "sets": 4,
                "reps": 15
              }
            ]
          },
          {
            "name": "Day 5",
            "exercises": [
              {
                "name": "RomanianDeadlift",
                "percent": 75,
                "sets": 3,
                "reps": 8
              },
              {
                "name": "TBarRow",
                "percent": 70,
                "sets": 3,
                "reps": 10
              },
              {
                "name": "LatPulldown",
                "percent": 68,
                "sets": 3,
                "reps": 12
              },
              {
                "name": "DumbbellRow",
                "percent": 68,
                "sets": 3,
                "reps": 12
              },
              {
                "name": "PreacherCurl",
                "percent": 65,
                "sets": 3,
                "reps": 12
              }
            ]
          }
        ]
      },
      {
        "name": "Week 2",
        "days": [
          {
            "name": "Day 1",
            "exercises": [
              {
                "name": "ChinUp",
                "percent": 74,
                "sets": 4,
                "reps": 8
              },
              {
                "name": "MachineRow",
                "percent": 70,
                "sets": 3,
                "reps": 12
              },
              {
                "name": "SeatedCableRow",
                "percent": 70,
                "sets": 3,
                "reps": 10
              },
              {
                "name": "FacePull",
                "percent": 62,
                "sets": 3,
                "reps": 15
              },
              {
                "name": "BarbellCurl",
                "percent": 70,
                "sets": 3,
                "reps": 10
              }
            ]
          },
          {
            "name": "Day 2",
            "exercises": [
              {
                "name": "DumbbellBench",
                "percent": 72,
                "sets": 4,
                "reps": 8
              },
              {
                "name": "DumbbellInclineBench",
                "percent": 70,
                "sets": 3,
                "reps": 10
              },
              {
                "name": "ArnoldPress",
                "percent": 68,
                "sets": 3,
                "reps": 12
              },
              {
                "name": "LateralRaise",
                "percent": 62,
                "sets": 3,
                "reps": 15
              },
              {
                "name": "TricepsPushdown",
                "percent": 68,
                "sets": 3,
                "reps": 12
              },
              {
                "name": "OverheadTricepsExtension",
                "percent": 68,
                "sets": 3,
                "reps": 12
              }
            ]
          },
          {
            "name": "Day 3",
            "exercises": [
              {
                "name": "OverheadPress",
                "percent": 74,
                "sets": 4,
                "reps": 8
              },
              {
                "name": "ArnoldPress",
                "percent": 70,
                "sets": 3,
                "reps": 10
              },
              {
                "name": "LateralRaise",
                "percent": 64,
                "sets": 4,
                "reps": 15
              },
              {
                "name": "RearDeltRaise",
                "percent": 64,
                "sets": 3,
                "reps": 15
              },
              {
                "name": "FacePull",
                "percent": 64,
                "sets": 3,
                "reps": 15
              }
            ]
          },
          {
            "name": "Day 4",
            "exercises": [
              {
                "name": "FrontSquat",
                "percent": 72,
                "sets": 4,
                "reps": 8
              },
              {
                "name": "LegPress",
                "percent": 72,
                "sets": 3,
                "reps": 12
              },
              {
                "name": "WalkingLunge",
                "percent": 65,
                "sets": 3,
                "reps": 12
              },
              {
                "name": "LegCurl",
                "percent": 65,
                "sets": 3,
                "reps": 12
              },
              {
                "name": "SeatedCalfRaise",
                "percent": 68,
                "sets": 4,
                "reps": 15
              }
            ]
          },
          {
            "name": "Day 5",
            "exercises": [
              {
                "name": "RomanianDeadlift",
                "percent": 77,
                "sets": 3,
                "reps": 8
              },
              {
                "name": "TBarRow",
                "percent": 72,
                "sets": 3,
                "reps": 10
              },
              {
                "name": "LatPulldown",
                "percent": 70,
                "sets": 3,
                "reps": 12
              },
              {
                "name": "DumbbellRow",
                "percent": 70,
                "sets": 3,
                "reps": 12
              },
              {
                "name": "BarbellCurl",
                "percent": 70,
                "sets": 3,
                "reps": 10
              }
            ]
          }
        ]
      }
    ]
  }
];

// Exercises that trigger the (1RM + BW) * % - BW formula
export const BODYWEIGHT_EXERCISES = [
  ExerciseType.Squat,
  ExerciseType.PullUp, 
  ExerciseType.ChinUp,
  ExerciseType.PauseSquat,
  ExerciseType.Dip,
  ExerciseType.PushUp
];
