export interface UserSettings {
  bodyWeight: number;
  smallestPlate: number;
  oneRMs: Record<string, number>;
  selectedTemplateId: string;
}

export enum ExerciseType {
  Squat = "Squat",                    // 深蹲
  Bench = "Bench",                    // 卧推
  Deadlift = "Deadlift",              // 硬拉
  SumoDeadlift = "SumoDeadlift",      // 相扑硬拉
  PullUp = "PullUp",                  // 引体向上
  OverheadPress = "OverheadPress",    // 推举
  RomanianDeadlift = "RomanianDeadlift",   // 罗马尼亚硬拉
  StiffLegDeadlift = "StiffLegDeadlift",   // 直腿硬拉
  InclineBench = "InclineBench",      // 上斜卧推
  CloseGripBench = "CloseGripBench",   // 窄距卧推
  PauseSquat = "PauseSquat",          // 暂停深蹲
  BoxSquat = "BoxSquat",              // 箱式深蹲
  FrontSquat = "FrontSquat",          // 前蹲
  HackSquat = "HackSquat",            // 哈克深蹲
  LegPress = "LegPress",              // 45°推蹬
  SplitSquat = "SplitSquat",          // 分腿蹲
  BulgarianSplitSquat = "BulgarianSplitSquat", // 保加利亚分腿蹲
  WalkingLunge = "WalkingLunge",      // 行走箭步蹲
  StepUp = "StepUp",                  // 台阶
  LatPulldown = "LatPulldown",        // 高位下拉
  BarbellRow = "BarbellRow",          // 杠铃划船
  PendlayRow = "PendlayRow",          // 彭德利划船
  TBarRow = "TBarRow",                // T杠划船
  SeatedCableRow = "SeatedCableRow",  // 坐姿划船
  MachineRow = "MachineRow",          // 器械划船
  DumbbellRow = "DumbbellRow",        // 哑铃划船
  ChinUp = "ChinUp",                  // 反手引体向上
  LegExtension = "LegExtension",      // 腿屈伸
  LegCurl = "LegCurl",                // 腿弯举
  RearDeltRaise = "RearDeltRaise",    // 俯身侧平举
  LateralRaise = "LateralRaise",      // 侧平举
  UprightRow = "UprightRow",          // 直立划船
  FacePull = "FacePull",              // 面拉
  Shrug = "Shrug",                    // 耸肩
  Dip = "Dip",                        // 双杠臂屈伸
  PushUp = "PushUp",                  // 俯卧撑
  HipThrust = "HipThrust",            // 臀桥
  CalfRaise = "CalfRaise",            // 站姿提踵
  SeatedCalfRaise = "SeatedCalfRaise",// 坐姿提踵
  BarbellCurl = "BarbellCurl",        // 杠铃弯举
  DumbbellCurl = "DumbbellCurl",      // 哑铃弯举
  HammerCurl = "HammerCurl",          // 锤式弯举
  PreacherCurl = "PreacherCurl",      // 牧师椅弯举
  InclineCurl = "InclineCurl",        // 上斜弯举
  SkullCrusher = "SkullCrusher",      // 仰卧臂屈伸
  TricepsPushdown = "TricepsPushdown",// 绳索下压
  OverheadTricepsExtension = "OverheadTricepsExtension", // 头顶臂屈伸
  DumbbellBench = "DumbbellBench",    // 哑铃卧推
  DumbbellInclineBench = "DumbbellInclineBench", // 哑铃上斜卧推
  MachinePress = "MachinePress",      // 器械推胸
  PushPress = "PushPress",            // 推举冲
  ArnoldPress = "ArnoldPress",        // 阿诺德推举
}

export interface Exercise {
  name: string | ExerciseType;
  percent: number;
  sets: number;
  reps: number;
}

export interface Day {
  name: string;
  exercises: Exercise[];
}

export interface Week {
  name: string;
  days: Day[];
}

export interface ProgramTemplate {
  id: string;
  name: string;
  author: string;
  description: string;
  weeks: Week[];
}

export enum Language {
  ZH = 'zh',
  EN = 'en'
}
