export const TaskStatus = {
    New: 'New',
    Canceled: 'Canceled',
    InWork: 'InWork',
    Done: 'Done',
    Failed: 'Failed'
  }

  export type TaskStatusType = keyof typeof TaskStatus