import { rest } from 'msw';
import { createEntityAdapter } from '@reduxjs/toolkit';

type Project = {
  id: number;
  start_date: string;
  completed_date: string;
  assignees: number[];
};

const adapter = createEntityAdapter<Project>();
let state = adapter.getInitialState();
let currentId = 1;

populateInitialData();
export const projectsHandlers = [
  rest.get('/api/projects', (req, res, ctx) => {
    return res(ctx.json(Object.values(state.entities)));
  }),
];

function populateInitialData() {
  state = adapter.setAll(state, [
    { id: 1, start_date: '2021-04-01', completed_date: '2021-04-05', assignees: [4] },
  ]);

  currentId = 2;
}

export const handlers = [...projectsHandlers];
