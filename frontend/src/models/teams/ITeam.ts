export interface ITeamShort {
  id: string;
  name: string;
  membersAmount: number;
  deleteLoading?: boolean;
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

export interface ITeamUserToggle {
  teamId: string;
  userId: string;
  username: string;
}
