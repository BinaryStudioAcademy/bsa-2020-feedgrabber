export interface ITeamShort {
  id: string;
  name: string;
  membersAmount: number;
}

export interface ITeam {
  id: string;
  name: string;
  membersId: string[];
}

export interface ITeamUpdate {
  id: string;
  name: string;
}
